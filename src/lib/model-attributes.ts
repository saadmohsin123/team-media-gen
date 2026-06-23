import type { HumanModel, ModelAttributes } from "@/types/human-model";

export function buildModelAppearancePrompt(model: HumanModel): string {
  const { attributes: a } = model;
  const parts: string[] = [
    `[SUPERMODEL: ${model.name.toUpperCase()}]`,
    `Height: ${a.heightEstimate}. Body type: ${a.bodyType}. Build: ${a.build}. Proportions: ${a.proportions}.`,
    `Face: ${a.faceShape}.`,
    a.jawline ? `Jawline: ${a.jawline}.` : "",
    `Eyes: ${a.eyes}.`,
    a.eyebrows ? `Eyebrows: ${a.eyebrows}.` : "",
    a.nose ? `Nose: ${a.nose}.` : "",
    a.lips ? `Lips: ${a.lips}.` : "",
    `Skin tone: ${a.skinTone}.`,
    `Hair: ${a.hair}.`,
    a.makeup ? `Makeup: ${a.makeup}.` : "",
    a.distinguishingFeatures ? `Distinguishing features: ${a.distinguishingFeatures}.` : "",
    `Pose and presence: ${a.poseStyle}. Overall style: ${a.overallStyle}.`,
    a.stylingNotes ? `Styling: ${a.stylingNotes}.` : "",
    a.designLanguage ? `Design language: ${a.designLanguage}.` : "",
    a.photographyDirection ? `Photography direction: ${a.photographyDirection}.` : "",
  ];

  if (a.campaignTags?.length) {
    parts.push(`Campaign tags: ${a.campaignTags.join(", ")}.`);
  }

  if (a.lookVariations?.length) {
    const looks = a.lookVariations
      .map((look, index) => `Look ${index + 1} — ${look.name}: ${look.description}`)
      .join(" ");
    parts.push(looks);
  }

  parts.push(a.appearanceSummary);
  parts.push(
    "Preserve this person's exact face, bone structure, eye color, hair color and texture, skin tone, body proportions, height, and overall appearance in every generated product image.",
  );

  return parts.filter(Boolean).join(" ");
}

export function slugifyModelName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function createPlaceholderAttributes(name: string): ModelAttributes {
  return {
    heightEstimate: "To be analyzed",
    bodyType: "To be analyzed",
    build: "To be analyzed",
    proportions: "To be analyzed",
    faceShape: "To be analyzed",
    skinTone: "To be analyzed",
    hair: "To be analyzed",
    eyes: "To be analyzed",
    distinguishingFeatures: "",
    poseStyle: "To be analyzed",
    overallStyle: "To be analyzed",
    appearanceSummary: `${name} — upload photos and run AI analysis to capture appearance details for generation.`,
    analyzedAt: new Date().toISOString(),
  };
}
