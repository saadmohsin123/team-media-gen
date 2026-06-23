import type { HumanModel } from "@/types/human-model";
import { buildModelAppearancePrompt } from "@/lib/model-attributes";
import { buildStylePrompt } from "@/lib/models";
import type { GenerationOptions } from "@/types/generation";

export const DEFAULT_PRODUCT_PROMPT =
  "Professional product campaign photo. The model naturally presents the uploaded product in a clean commercial studio setup with soft lighting, sharp focus, realistic skin tones, premium e-commerce composition, and subtle shadows.";

export function buildGenerationPrompt(
  humanModel: HumanModel,
  options: GenerationOptions,
): string {
  const stylePrompt = buildStylePrompt(options.style, options.prompt || DEFAULT_PRODUCT_PROMPT);
  const appearancePrompt = buildModelAppearancePrompt(humanModel);
  return `${stylePrompt} ${appearancePrompt} Preserve product details from the reference image.`;
}
