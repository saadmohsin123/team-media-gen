import type { HumanModel } from "@/types/human-model";

export type Provider = "replicate" | "imagineart";

export type Resolution = "512x512" | "768x768" | "1024x1024" | "1024x1536" | "1536x1024";

export type StylePreset =
  | "product-studio"
  | "lifestyle"
  | "minimal"
  | "luxury"
  | "ecommerce-white"
  | "custom";

export interface GenerationModel {
  id: string;
  slug: string;
  name: string;
  provider: Provider;
  description: string;
  supportsReference: boolean;
  replicateModel?: string;
  imagineStyle?: string;
  maxReferenceImages: number;
  category: string;
  badge?: string;
  accent: string;
  capabilities: string[];
}

export interface GenerationOptions {
  prompt: string;
  negativePrompt?: string;
  resolution: Resolution;
  style: StylePreset;
  outputCount: number;
}

export interface UploadedReference {
  id: string;
  name: string;
  dataUrl: string;
  mimeType: string;
}

export interface GenerationRequest {
  modelId: string;
  humanModel: HumanModel;
  references: UploadedReference[];
  options: GenerationOptions;
}

export interface GenerationResult {
  id: string;
  imageUrl: string;
  modelId: string;
  createdAt: string;
}

export interface GenerationResponse {
  results: GenerationResult[];
  provider: Provider;
  modelId: string;
}
