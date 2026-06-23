import type { HumanModel } from "@/types/human-model";
import type {
  GenerationModel,
  GenerationOptions,
  GenerationResult,
  UploadedReference,
} from "@/types/generation";

export type GenerationStage =
  | "idle"
  | "validating"
  | "uploading"
  | "processing"
  | "rendering"
  | "complete";

export interface GenerationProgress {
  stage: GenerationStage;
  message: string;
  percent: number;
}

export interface GenerationJob {
  id: string;
  humanModel: HumanModel;
  aiModel: GenerationModel;
  references: UploadedReference[];
  options: GenerationOptions;
  results: GenerationResult[];
  createdAt: string;
  status: "completed" | "failed";
}

export const GENERATION_STAGES: { stage: GenerationStage; message: string }[] = [
  { stage: "validating", message: "Validating model and product references" },
  { stage: "uploading", message: "Uploading reference assets" },
  { stage: "processing", message: "Loading AI engine" },
  { stage: "rendering", message: "Compositing model with product" },
  { stage: "complete", message: "Generation complete" },
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Failed to load image."));
    image.src = src;
  });
}

async function createPreviewImage(
  humanPhotoUrl: string,
  productReference: UploadedReference,
  index: number,
  options: GenerationOptions,
  humanName: string,
): Promise<string> {
  const [width, height] = options.resolution.split("x").map(Number);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas unavailable.");

  const gradients: Record<string, [string, string]> = {
    "product-studio": ["#f8fafc", "#e2e8f0"],
    lifestyle: ["#fef3c7", "#fde68a"],
    minimal: ["#ffffff", "#f4f4f5"],
    luxury: ["#1c1917", "#44403c"],
    "ecommerce-white": ["#ffffff", "#ffffff"],
    custom: ["#eef2ff", "#e0e7ff"],
  };

  const [from, to] = gradients[options.style] ?? gradients["product-studio"];
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, from);
  gradient.addColorStop(1, to);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  try {
    const [humanImage, productImage] = await Promise.all([
      loadImage(humanPhotoUrl),
      loadImage(productReference.dataUrl),
    ]);

    const humanHeight = height * 0.88;
    const humanScale = humanHeight / humanImage.height;
    const humanWidth = humanImage.width * humanScale;
    ctx.drawImage(humanImage, width * 0.08, height - humanHeight, humanWidth, humanHeight);

    const productSize = Math.min(width, height) * 0.28;
    const productX = width * 0.58;
    const productY = height * 0.52;
    ctx.fillStyle = "rgba(255,255,255,0.85)";
    ctx.fillRect(productX - 12, productY - 12, productSize + 24, productSize + 24);
    ctx.drawImage(productImage, productX, productY, productSize, productSize);
  } catch {
    const productImage = await loadImage(productReference.dataUrl);
    const productSize = Math.min(width, height) * 0.6;
    const productX = (width - productSize) / 2;
    const productY = (height - productSize) / 2;
    ctx.drawImage(productImage, productX, productY, productSize, productSize);
  }

  ctx.fillStyle = options.style === "luxury" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)";
  ctx.fillRect(0, 0, width, height);

  ctx.font = "600 18px Inter, system-ui, sans-serif";
  ctx.fillStyle = options.style === "luxury" ? "#fafaf9" : "#18181b";
  ctx.fillText(`Preview ${index + 1}`, 24, height - 24);

  ctx.font = "14px Inter, system-ui, sans-serif";
  ctx.fillStyle = options.style === "luxury" ? "#d6d3d1" : "#71717a";
  ctx.fillText(`${humanName} · ${options.resolution}`, 24, height - 48);

  return canvas.toDataURL("image/png");
}

export async function mockGenerateImages(
  humanModel: HumanModel,
  aiModel: GenerationModel,
  references: UploadedReference[],
  options: GenerationOptions,
  onProgress: (progress: GenerationProgress) => void,
): Promise<GenerationResult[]> {
  const primaryProduct = references[0];
  if (!primaryProduct) throw new Error("At least one product image is required.");

  for (let index = 0; index < GENERATION_STAGES.length; index++) {
    const { stage, message } = GENERATION_STAGES[index];
    onProgress({
      stage,
      message,
      percent: Math.round(((index + 1) / GENERATION_STAGES.length) * 100),
    });
    await delay(700 + index * 200);
  }

  const humanPhoto = humanModel.photos[0];
  const results: GenerationResult[] = [];

  for (let index = 0; index < options.outputCount; index++) {
    const photo = humanModel.photos[index % humanModel.photos.length] ?? humanPhoto;
    const imageUrl = await createPreviewImage(
      photo,
      primaryProduct,
      index,
      options,
      humanModel.name,
    );
    results.push({
      id: `${aiModel.id}-${Date.now()}-${index}`,
      imageUrl,
      modelId: aiModel.id,
      createdAt: new Date().toISOString(),
    });
  }

  return results;
}
