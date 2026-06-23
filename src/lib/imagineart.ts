import type { HumanModel } from "@/types/human-model";
import type { GenerationModel, GenerationOptions, UploadedReference } from "@/types/generation";
import { buildGenerationPrompt } from "@/lib/prompts";
import { generateWithImagineArtMcp } from "@/lib/imagineart-mcp";

const IMAGINE_API_URL = "https://api.vyro.ai/v2/image/generations";

function getApiKey() {
  const key = process.env.IMAGINEART_API_KEY ?? process.env.IMAGINE_MCP_BEARER_TOKEN;
  if (!key) throw new Error("IMAGINEART_API_KEY is not configured.");
  return key;
}

async function blobFromDataUrl(dataUrl: string): Promise<Blob> {
  const response = await fetch(dataUrl);
  return response.blob();
}

function resolutionToAspectRatio(resolution: GenerationOptions["resolution"]): string {
  switch (resolution) {
    case "1024x1536":
      return "2:3";
    case "1536x1024":
      return "3:2";
    default:
      return "1:1";
  }
}

async function generateWithImagineArtRest(
  model: GenerationModel,
  references: UploadedReference[],
  prompt: string,
  aspectRatio: string,
): Promise<string[]> {
  const primaryReference = references[0];
  if (!primaryReference) throw new Error("At least one reference image is required.");

  const form = new FormData();
  form.append("prompt", prompt);
  form.append("style", model.imagineStyle ?? "realistic");
  form.append("aspect_ratio", aspectRatio);

  const imageBlob = await blobFromDataUrl(primaryReference.dataUrl);
  form.append("image", imageBlob, primaryReference.name);

  const response = await fetch(IMAGINE_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getApiKey()}`,
    },
    body: form,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `ImagineArt request failed (${response.status}).`);
  }

  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    const payload = (await response.json()) as {
      data?: Array<{ url?: string; image?: string }>;
      output?: string[];
      url?: string;
    };

    const urls =
      payload.output ??
      payload.data?.map((item) => item.url ?? item.image).filter(Boolean) ??
      (payload.url ? [payload.url] : []);

    if (!urls.length) throw new Error("ImagineArt returned no images.");
    return urls as string[];
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  const base64 = buffer.toString("base64");
  const mimeType = contentType || "image/png";
  return [`data:${mimeType};base64,${base64}`];
}

export async function generateWithImagineArt(
  model: GenerationModel,
  humanModel: HumanModel,
  references: UploadedReference[],
  options: GenerationOptions,
): Promise<string[]> {
  const prompt = buildGenerationPrompt(humanModel, options);
  const aspectRatio = resolutionToAspectRatio(options.resolution);

  let urls: string[] = [];

  try {
    urls = await generateWithImagineArtMcp(prompt, aspectRatio);
  } catch (mcpError) {
    const message = mcpError instanceof Error ? mcpError.message : "ImagineArt MCP failed.";
    if (!process.env.IMAGINEART_API_KEY && !process.env.IMAGINE_MCP_BEARER_TOKEN) {
      throw new Error(message);
    }
    urls = await generateWithImagineArtRest(model, references, prompt, aspectRatio);
  }

  return urls.slice(0, options.outputCount);
}
