import { NextResponse } from "next/server";
import { analyzeModelPhotos } from "@/lib/model-analysis";

export const runtime = "nodejs";
export const maxDuration = 90;

interface AnalyzeRequestBody {
  name?: string;
  photos: string[];
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as AnalyzeRequestBody;

    if (!body.photos?.length) {
      return NextResponse.json({ error: "At least one model photo is required." }, { status: 400 });
    }

    if (body.photos.length > 6) {
      return NextResponse.json({ error: "Upload up to 6 model photos." }, { status: 400 });
    }

    const result = await analyzeModelPhotos(body.photos, body.name);
    const { provider, ...analysis } = result;

    const messages: Record<string, string> = {
      openrouter: "OpenRouter vision analysis complete — full model profile captured.",
      openai: "OpenAI vision analysis complete — full model profile captured.",
      mock: "Demo analysis complete. Add OPENROUTER_API_KEY for exhaustive AI vision profiling.",
    };

    return NextResponse.json({
      ...analysis,
      provider: provider ?? "mock",
      usedMock: provider === "mock" || !provider,
      message: messages[provider ?? "mock"],
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Model analysis failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
