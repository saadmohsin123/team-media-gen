import { NextResponse } from "next/server";
import { generateWithImagineArt } from "@/lib/imagineart";
import { getModelById } from "@/lib/models";
import { generateWithReplicate } from "@/lib/replicate";
import type { GenerationRequest, GenerationResponse } from "@/types/generation";

export const runtime = "nodejs";
export const maxDuration = 120;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as GenerationRequest;

    if (!body.modelId || !body.humanModel || !body.references?.length) {
      return NextResponse.json(
        { error: "AI engine, human model, and product image are required." },
        { status: 400 },
      );
    }

    const aiModel = getModelById(body.modelId);

    if (!aiModel) {
      return NextResponse.json({ error: "Unknown AI engine selected." }, { status: 400 });
    }

    if (body.references.length > aiModel.maxReferenceImages) {
      return NextResponse.json(
        { error: `This engine accepts up to ${aiModel.maxReferenceImages} product image(s).` },
        { status: 400 },
      );
    }

    const imageUrls =
      aiModel.provider === "replicate"
        ? await generateWithReplicate(aiModel, body.references, body.options)
        : await generateWithImagineArt(aiModel, body.humanModel, body.references, body.options);

    const response: GenerationResponse = {
      provider: aiModel.provider,
      modelId: aiModel.id,
      results: imageUrls.map((imageUrl, index) => ({
        id: `${aiModel.id}-${Date.now()}-${index}`,
        imageUrl,
        modelId: aiModel.id,
        createdAt: new Date().toISOString(),
      })),
    };

    return NextResponse.json(response);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Generation failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
