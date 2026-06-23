import type { GenerationModel, Resolution, StylePreset } from "@/types/generation";

export const GENERATION_MODELS: GenerationModel[] = [
  {
    id: "openai-gpt-image-2",
    slug: "openai/gpt-image-2",
    name: "GPT Image 2",
    provider: "replicate",
    description: "OpenAI's latest image model for high-quality product and campaign visuals.",
    supportsReference: true,
    replicateModel: "openai/gpt-image-2",
    maxReferenceImages: 4,
    category: "Flagship",
    badge: "Recommended",
    accent: "from-zinc-700 via-zinc-900 to-black",
    capabilities: ["Reference image", "Instruction following", "High quality"],
  },
  {
    id: "replicate-flux-kontext-pro",
    slug: "black-forest-labs/flux-kontext-pro",
    name: "FLUX Kontext Pro",
    provider: "replicate",
    description: "Reference-guided edits with strong product fidelity and commercial polish.",
    supportsReference: true,
    replicateModel: "black-forest-labs/flux-kontext-pro",
    maxReferenceImages: 4,
    category: "Image editing",
    badge: "Best quality",
    accent: "from-violet-600 via-indigo-600 to-blue-600",
    capabilities: ["Reference image", "Multi-image", "High fidelity"],
  },
  {
    id: "replicate-flux-schnell",
    slug: "black-forest-labs/flux-schnell",
    name: "FLUX Schnell",
    provider: "replicate",
    description: "Fast drafts for quick option reviews and internal approvals.",
    supportsReference: true,
    replicateModel: "black-forest-labs/flux-schnell",
    maxReferenceImages: 1,
    category: "Fast generation",
    badge: "Fastest",
    accent: "from-cyan-500 via-sky-500 to-blue-600",
    capabilities: ["Reference image", "Low latency", "Drafts"],
  },
  {
    id: "replicate-sdxl-img2img",
    slug: "stability-ai/sdxl",
    name: "SDXL",
    provider: "replicate",
    description: "Stylized img2img pipeline for creative product variations.",
    supportsReference: true,
    replicateModel: "stability-ai/sdxl",
    maxReferenceImages: 1,
    category: "Stylized",
    badge: "Creative",
    accent: "from-fuchsia-600 via-purple-600 to-violet-700",
    capabilities: ["Reference image", "Style transfer", "Variations"],
  },
  {
    id: "imagineart-v5",
    slug: "imagineart/imagine-v5",
    name: "ImagineArt V5",
    provider: "imagineart",
    description: "ImagineArt flagship model for polished marketing visuals.",
    supportsReference: true,
    imagineStyle: "imagine-v5",
    maxReferenceImages: 1,
    category: "Marketing",
    badge: "ImagineArt",
    accent: "from-orange-500 via-rose-500 to-pink-600",
    capabilities: ["Reference image", "Campaign ready"],
  },
  {
    id: "imagineart-realistic",
    slug: "imagineart/realistic",
    name: "ImagineArt Realistic",
    provider: "imagineart",
    description: "Photorealistic catalog and lifestyle scenes for e-commerce.",
    supportsReference: true,
    imagineStyle: "realistic",
    maxReferenceImages: 1,
    category: "Photorealistic",
    badge: "Catalog",
    accent: "from-amber-500 via-orange-500 to-red-500",
    capabilities: ["Reference image", "Photoreal"],
  },
];

export function getModelBySlug(slug: string): GenerationModel | undefined {
  return GENERATION_MODELS.find((model) => model.slug === slug);
}

export function getModelById(id: string): GenerationModel | undefined {
  return GENERATION_MODELS.find((model) => model.id === id);
}

export const RESOLUTIONS: { value: Resolution; label: string }[] = [
  { value: "512x512", label: "512 × 512" },
  { value: "768x768", label: "768 × 768" },
  { value: "1024x1024", label: "1024 × 1024" },
  { value: "1024x1536", label: "1024 × 1536 (portrait)" },
  { value: "1536x1024", label: "1536 × 1024 (landscape)" },
];

export const STYLE_PRESETS: { value: StylePreset; label: string; hint: string }[] = [
  {
    value: "product-studio",
    label: "Product studio",
    hint: "Clean studio lighting on a neutral backdrop",
  },
  {
    value: "lifestyle",
    label: "Lifestyle",
    hint: "Product placed in a natural everyday scene",
  },
  {
    value: "minimal",
    label: "Minimal",
    hint: "Simple composition with lots of negative space",
  },
  {
    value: "luxury",
    label: "Luxury",
    hint: "Premium materials, rich lighting, editorial feel",
  },
  {
    value: "ecommerce-white",
    label: "E-commerce white",
    hint: "Pure white background for marketplace listings",
  },
  {
    value: "custom",
    label: "Custom",
    hint: "Follow the prompt without a preset bias",
  },
];

export function parseResolution(resolution: Resolution): { width: number; height: number } {
  const [width, height] = resolution.split("x").map(Number);
  return { width, height };
}

export function buildStylePrompt(style: StylePreset, userPrompt: string): string {
  const styleHints: Record<StylePreset, string> = {
    "product-studio":
      "Professional product photography, soft studio lighting, sharp focus, commercial quality.",
    lifestyle: "Lifestyle product photography in a realistic environment, natural light.",
    minimal: "Minimalist product shot, clean composition, subtle shadows.",
    luxury: "Luxury editorial product photography, premium styling, dramatic lighting.",
    "ecommerce-white":
      "E-commerce product photo on pure white background, even lighting, no distractions.",
    custom: "",
  };

  const hint = styleHints[style];
  if (!hint) return userPrompt.trim();
  return userPrompt.trim() ? `${hint} ${userPrompt.trim()}` : hint;
}
