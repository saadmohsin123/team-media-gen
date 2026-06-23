import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

const IMAGINE_MCP_URL = "https://mcp.imagine.art";

function getBearerToken() {
  const token = process.env.IMAGINE_MCP_BEARER_TOKEN ?? process.env.IMAGINEART_API_KEY;
  if (!token) {
    throw new Error(
      "ImagineArt MCP is not configured. Set IMAGINE_MCP_BEARER_TOKEN or IMAGINEART_API_KEY.",
    );
  }
  return token;
}

function extractImageUrls(result: Awaited<ReturnType<Client["callTool"]>>): string[] {
  const urls: string[] = [];

  if (Array.isArray(result.content)) {
    for (const item of result.content) {
      if (item.type === "text") {
        const text = item.text;
        const matches = text.match(/https?:\/\/[^\s"'<>]+/g);
        if (matches) urls.push(...matches);
        if (text.startsWith("data:image/")) urls.push(text);
      }
      if (item.type === "image" && "data" in item && typeof item.data === "string") {
        const mimeType = "mimeType" in item && typeof item.mimeType === "string" ? item.mimeType : "image/png";
        urls.push(`data:${mimeType};base64,${item.data}`);
      }
    }
  }

  if (result.structuredContent && typeof result.structuredContent === "object") {
    const payload = result.structuredContent as Record<string, unknown>;
    const candidates = [
      payload.url,
      payload.image_url,
      payload.imageUrl,
      ...(Array.isArray(payload.output) ? payload.output : []),
      ...(Array.isArray(payload.images) ? payload.images : []),
    ];

    for (const candidate of candidates) {
      if (typeof candidate === "string") urls.push(candidate);
    }
  }

  return [...new Set(urls)];
}

async function resolveTextToImageTool(client: Client): Promise<string> {
  const { tools } = await client.listTools();
  const match =
    tools.find((tool) => tool.name === "imagine.generate") ??
    tools.find((tool) => tool.name.includes("generate") && tool.name.includes("image")) ??
    tools.find((tool) => tool.name.includes("generate"));

  if (!match) {
    throw new Error("ImagineArt MCP text-to-image tool was not found.");
  }

  return match.name;
}

export async function generateWithImagineArtMcp(
  prompt: string,
  aspectRatio: string,
): Promise<string[]> {
  const transport = new StreamableHTTPClientTransport(new URL(IMAGINE_MCP_URL), {
    requestInit: {
      headers: {
        Authorization: `Bearer ${getBearerToken()}`,
      },
    },
  });

  const client = new Client({ name: "team-media-gen", version: "1.0.0" });

  try {
    await client.connect(transport);
    const toolName = await resolveTextToImageTool(client);

    const result = await client.callTool({
      name: toolName,
      arguments: {
        prompt,
        aspect_ratio: aspectRatio,
      },
    });

    const urls = extractImageUrls(result);
    if (!urls.length) {
      throw new Error("ImagineArt MCP returned no image URLs.");
    }

    return urls;
  } finally {
    await client.close();
  }
}

export async function checkImagineArtMcpConnection(): Promise<{ ok: boolean; tools: string[] }> {
  const transport = new StreamableHTTPClientTransport(new URL(IMAGINE_MCP_URL), {
    requestInit: {
      headers: {
        Authorization: `Bearer ${getBearerToken()}`,
      },
    },
  });

  const client = new Client({ name: "team-media-gen", version: "1.0.0" });

  try {
    await client.connect(transport);
    const { tools } = await client.listTools();
    return { ok: true, tools: tools.map((tool) => tool.name) };
  } finally {
    await client.close();
  }
}
