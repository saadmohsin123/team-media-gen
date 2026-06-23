import type { HumanModelLook, ModelAnalysisResult } from "@/types/human-model";

const ANALYSIS_SYSTEM_PROMPT = `You are an elite fashion casting director, Vogue editorial photographer, and AI prompt engineer. Analyze every provided model reference photo with maximum visual detail — miss nothing that would help an image model reproduce this exact person consistently.

Return a JSON object with exactly these fields:

{
  "look": one of "studio" | "lifestyle" | "editorial" | "athletic" | "commercial",
  "height": estimated height string like 5'11" or 6'0",
  "bio": one sentence for luxury/commercial product campaigns,
  "tags": array of 4-8 specific style tags,
  "attributes": {
    "heightEstimate": "height with cm in parentheses",
    "bodyType": "detailed body type",
    "build": "detailed build — shoulders, frame, muscle tone",
    "proportions": "torso, legs, neck, limb ratios",
    "faceShape": "precise face shape",
    "skinTone": "skin tone, undertones, texture, finish",
    "hair": "exact color, length, texture, part, highlights, volume",
    "eyes": "exact color, shape, lashes, expression quality",
    "eyebrows": "shape, thickness, color",
    "nose": "shape and bridge description",
    "lips": "shape, color, finish",
    "jawline": "jaw and chin definition",
    "makeup": "makeup level and style if visible",
    "distinguishingFeatures": "every unique identifying detail — moles, freckles, jewelry, expressions, signature traits",
    "poseStyle": "how they carry themselves and typical posing energy",
    "overallStyle": "modeling aesthetic and campaign fit",
    "appearanceSummary": "comprehensive 4-6 sentence generation prompt covering face, body, hair, skin, energy, and campaign use",
    "campaignTags": ["array of UPPER_SNAKE_CASE tags for image generation e.g. VOGUE_EDITORIAL, ULTRA_REALISTIC"],
    "lookVariations": [
      { "name": "Look name", "description": "Detailed outfit/styling description inferred or suggested for this model" }
    ],
    "designLanguage": "quiet luxury, fabric, silhouette, and aesthetic keywords",
    "stylingNotes": "makeup, hair styling, energy, mood",
    "photographyDirection": "lighting, studio setting, editorial direction"
  }
}

Rules:
- Be exhaustively specific. Include subtle details: exact hair color undertones, eye color variations, skin luminosity, bone structure, nail/jewelry if visible.
- Infer 2-4 look variations suitable for modern travel wear / product campaigns if not fully visible in photos.
- campaignTags should be prompt-ready tokens an image model can weight heavily.
- Only return valid JSON. No markdown.`;

function getVisionConfig() {
  const openRouterKey = process.env.OPENROUTER_API_KEY;
  if (openRouterKey) {
    return {
      apiKey: openRouterKey,
      baseUrl: "https://openrouter.ai/api/v1/chat/completions",
      model: process.env.OPENROUTER_VISION_MODEL ?? "openai/gpt-4o",
      provider: "openrouter" as const,
    };
  }

  const openAiKey = process.env.OPENAI_API_KEY;
  if (openAiKey) {
    return {
      apiKey: openAiKey,
      baseUrl: "https://api.openai.com/v1/chat/completions",
      model: process.env.OPENAI_VISION_MODEL ?? "gpt-4o",
      provider: "openai" as const,
    };
  }

  return null;
}

export async function analyzeModelPhotos(
  photos: string[],
  modelName?: string,
): Promise<ModelAnalysisResult & { provider?: string }> {
  const config = getVisionConfig();

  if (!config) {
    return { ...mockAnalyzeModelPhotos(photos, modelName), provider: "mock" };
  }

  const imageContent = photos.slice(0, 6).map((url) => ({
    type: "image_url" as const,
    image_url: { url, detail: "high" as const },
  }));

  const headers: Record<string, string> = {
    Authorization: `Bearer ${config.apiKey}`,
    "Content-Type": "application/json",
  };

  if (config.provider === "openrouter") {
    headers["HTTP-Referer"] = process.env.OPENROUTER_SITE_URL ?? "https://team-media-gen.local";
    headers["X-Title"] = process.env.OPENROUTER_APP_NAME ?? "team-media-gen";
  }

  const response = await fetch(config.baseUrl, {
    method: "POST",
    headers,
    body: JSON.stringify({
      model: config.model,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: ANALYSIS_SYSTEM_PROMPT },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: modelName
                ? `Perform exhaustive visual profiling of model "${modelName}" from these reference photos. Capture every facial, body, hair, skin, and styling detail for consistent ultra-realistic product image generation.`
                : "Perform exhaustive visual profiling from these model reference photos for product image generation.",
            },
            ...imageContent,
          ],
        },
      ],
      max_tokens: 2500,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Vision analysis failed (${response.status}).`);
  }

  const payload = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };

  const content = payload.choices?.[0]?.message?.content;
  if (!content) throw new Error("Vision model returned no analysis.");

  return { ...parseAnalysisResult(content), provider: config.provider };
}

function parseAnalysisResult(content: string): ModelAnalysisResult {
  const parsed = JSON.parse(content) as ModelAnalysisResult;

  const validLooks: HumanModelLook[] = [
    "studio",
    "lifestyle",
    "editorial",
    "athletic",
    "commercial",
  ];

  if (!validLooks.includes(parsed.look)) {
    parsed.look = "editorial";
  }

  parsed.attributes.analyzedAt = new Date().toISOString();

  return parsed;
}

function mockAnalyzeModelPhotos(photos: string[], modelName?: string): ModelAnalysisResult {
  const name = modelName?.trim() || "New model";
  const photoCount = photos.length;

  return {
    look: "editorial",
    height: "5'11\"",
    bio: `${name} is profiled from ${photoCount} reference photo${photoCount === 1 ? "" : "s"} for luxury product and travel-wear campaign generation.`,
    tags: ["AI profiled", "Ultra realistic", "Editorial", "Product ready"],
    attributes: {
      heightEstimate: "5'11\" (180 cm) — estimated from references",
      bodyType: "Lean athletic",
      build: "Tall lean frame inferred from reference proportions",
      proportions: "Long-limbed proportions suitable for full-body catalog and editorial shots",
      faceShape: "Match reference photos exactly",
      skinTone: "Match reference skin tone, undertones, and luminosity exactly",
      hair: "Match reference hair color, length, texture, and styling exactly",
      eyes: "Match reference eye color, shape, and expression exactly",
      eyebrows: "Match reference brow shape and density",
      nose: "Match reference nose shape",
      lips: "Match reference lip shape and color",
      jawline: "Match reference jaw and chin definition",
      makeup: "Match visible makeup level in references",
      distinguishingFeatures: "All unique facial and body identifiers from uploaded references",
      poseStyle: "Natural editorial energy as shown in references",
      overallStyle: "Luxury editorial product campaign model",
      appearanceSummary: `${name} must match uploaded reference photos exactly in every generated image — face structure, eye color, hair, skin tone, body proportions, height, and styling. Add OPENROUTER_API_KEY or OPENAI_API_KEY for full AI vision profiling.`,
      campaignTags: ["ULTRA_REALISTIC", "VOGUE_EDITORIAL", "AI_PROFILED"],
      lookVariations: [
        {
          name: "Sporty Chic",
          description: "Modern travel wear with technical fabric, clean lines, luxury sneakers.",
        },
        {
          name: "Sophisticated",
          description: "Tailored blazer silhouette with slim pant and refined flats.",
        },
      ],
      designLanguage: "Quiet luxury, engineered fit, tone-on-tone texture, modern travel wear.",
      stylingNotes: "Natural makeup, luminous skin, effortless confidence.",
      photographyDirection: "White luxury studio, soft natural daylight, ultra-realistic.",
      analyzedAt: new Date().toISOString(),
    },
  };
}
