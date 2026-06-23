export type HumanModelLook = "studio" | "lifestyle" | "editorial" | "athletic" | "commercial";

export interface ModelLookVariation {
  name: string;
  description: string;
}

export interface ModelAttributes {
  heightEstimate: string;
  bodyType: string;
  build: string;
  proportions: string;
  faceShape: string;
  skinTone: string;
  hair: string;
  eyes: string;
  eyebrows?: string;
  nose?: string;
  lips?: string;
  jawline?: string;
  makeup?: string;
  distinguishingFeatures: string;
  poseStyle: string;
  overallStyle: string;
  appearanceSummary: string;
  campaignTags?: string[];
  lookVariations?: ModelLookVariation[];
  designLanguage?: string;
  stylingNotes?: string;
  photographyDirection?: string;
  analyzedAt?: string;
}

export interface HumanModel {
  id: string;
  name: string;
  look: HumanModelLook;
  photos: string[];
  tags: string[];
  height: string;
  bio: string;
  attributes: ModelAttributes;
  custom?: boolean;
}

export interface ModelAnalysisResult {
  look: HumanModelLook;
  height: string;
  bio: string;
  tags: string[];
  attributes: ModelAttributes;
}
