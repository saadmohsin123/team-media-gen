import Replicate from "replicate";
import type { GenerationModel, GenerationOptions, UploadedReference } from "@/types/generation";
import { buildStylePrompt, parseResolution } from "@/lib/models";

function getClient() {
  const token = process.env.REPLICATE_API_TOKEN;
  if (!token) {
    throw new Error("REPLICATE_API_TOKEN is not configured.");
  }
  return new Replicate({ auth: token });
}

function dataUrlToBuffer(dataUrl: string): Buffer {
  const base64 = dataUrl.split(",")[1];
  if (!base64) throw new Error("Invalid reference image data.");
  return Buffer.from(base64, "base64");
}

async function runReplicate(
  model: GenerationModel,
  references: UploadedReference[],
  options: GenerationOptions,
): Promise<string[]> {
  const replicate = getClient();
  const { width, height } = parseResolution(options.resolution);
  const prompt = buildStylePrompt(options.style, options.prompt);
  const primaryReference = references[0];

  if (!primaryReference) {
    throw new Error("At least one reference image is required.");
  }

  const referenceBuffer = dataUrlToBuffer(primaryReference.dataUrl);
  const referenceUri = `data:${primaryReference.mimeType};base64,${referenceBuffer.toString("base64")}`;

  let input: Record<string, unknown>;

  if (model.id === "replicate-flux-kontext-pro") {
    input = {
      prompt,
      input_image: referenceUri,
      aspect_ratio: width === height ? "1:1" : width > height ? "3:2" : "2:3",
      output_format: "png",
      safety_tolerance: 2,
    };
  } else if (model.id === "replicate-flux-schnell") {
    input = {
      prompt,
      image: referenceUri,
      num_outputs: options.outputCount,
      aspect_ratio: width === height ? "1:1" : width > height ? "3:2" : "2:3",
      output_format: "png",
    };
  } else {
    input = {
      prompt,
      image: referenceUri,
      width,
      height,
      num_outputs: options.outputCount,
      negative_prompt: options.negativePrompt ?? "blurry, low quality, distorted",
    };
  }

  const output = await replicate.run(model.replicateModel as `${string}/${string}`, { input });

  const urls = normalizeReplicateOutput(output);
  if (!urls.length) throw new Error("Replicate returned no images.");
  return urls.slice(0, options.outputCount);
}

function normalizeReplicateOutput(output: unknown): string[] {
  if (typeof output === "string") return [output];
  if (Array.isArray(output)) {
    return output
      .map((item) => {
        if (typeof item === "string") return item;
        if (item && typeof item === "object" && "url" in item) {
          const url = (item as { url?: string | (() => string) }).url;
          return typeof url === "function" ? url() : url;
        }
        return null;
      })
      .filter((url): url is string => Boolean(url));
  }
  if (output && typeof output === "object" && "url" in output) {
    const url = (output as { url?: string | (() => string) }).url;
    const resolved = typeof url === "function" ? url() : url;
    return resolved ? [resolved] : [];
  }
  return [];
}

export async function generateWithReplicate(
  model: GenerationModel,
  references: UploadedReference[],
  options: GenerationOptions,
): Promise<string[]> {
  return runReplicate(model, references, options);
}
