"use client";

import { useMemo } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { GENERATION_MODELS, RESOLUTIONS, STYLE_PRESETS } from "@/lib/models";
import { getHumanModelById } from "@/lib/human-models";
import type { HumanModel } from "@/types/human-model";
import type { GenerationOptions, UploadedReference } from "@/types/generation";
import { ImagePlus, X } from "lucide-react";

interface InputPanelProps {
  models: HumanModel[];
  selectedHumanModelId: string;
  selectedAiModelId: string;
  references: UploadedReference[];
  options: GenerationOptions;
  isGenerating: boolean;
  onSelectHumanModel: () => void;
  onSelectAiModel: (id: string) => void;
  onReferencesChange: (refs: UploadedReference[]) => void;
  onOptionsChange: (options: GenerationOptions) => void;
  onReset: () => void;
  onRun: () => void;
}

export function InputPanel({
  models,
  selectedHumanModelId,
  selectedAiModelId,
  references,
  options,
  isGenerating,
  onSelectHumanModel,
  onSelectAiModel,
  onReferencesChange,
  onOptionsChange,
  onReset,
  onRun,
}: InputPanelProps) {
  const humanModel = useMemo(
    () => getHumanModelById(selectedHumanModelId, models),
    [models, selectedHumanModelId],
  );

  function updateOption<K extends keyof GenerationOptions>(key: K, value: GenerationOptions[K]) {
    onOptionsChange({ ...options, [key]: value });
  }

  async function handleFiles(fileList: FileList | null) {
    if (!fileList?.length) return;
    const files = Array.from(fileList).filter((f) => f.type.startsWith("image/"));
    const uploaded = await Promise.all(
      files.map(
        (file) =>
          new Promise<UploadedReference>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () =>
              resolve({
                id: crypto.randomUUID(),
                name: file.name,
                dataUrl: reader.result as string,
                mimeType: file.type,
              });
            reader.onerror = () => reject(new Error("Failed to read file."));
            reader.readAsDataURL(file);
          }),
      ),
    );
    onReferencesChange([...references, ...uploaded].slice(0, 4));
  }

  return (
    <div className="flex h-full min-h-[640px] flex-col border-r border-border/60 bg-background">
      <div className="border-b border-border/60 px-4 py-3">
        <h2 className="text-sm font-medium">Generate product images</h2>
        <p className="text-xs text-muted-foreground">
          Pick a model, upload products, and generate.
        </p>
      </div>

      <div className="flex-1 space-y-5 overflow-auto p-4">
        <div className="space-y-2">
          <Label>Human model</Label>
          <button
            type="button"
            onClick={onSelectHumanModel}
            className="flex w-full items-center gap-3 rounded-lg border border-border/80 bg-muted/20 p-3 text-left transition-colors hover:bg-muted/40"
          >
            {humanModel ? (
              <>
                <div className="size-12 overflow-hidden rounded-md border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={humanModel.photos[0]}
                    alt={humanModel.name}
                    className="size-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium">{humanModel.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {humanModel.look} · {humanModel.height}
                  </p>
                  <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                    {humanModel.attributes.appearanceSummary}
                  </p>
                </div>
              </>
            ) : null}
          </button>
        </div>

        <div className="space-y-2">
          <Label>AI engine</Label>
          <Select
            value={selectedAiModelId}
            onValueChange={(value) => value && onSelectAiModel(value)}
          >
            <SelectTrigger className="w-full border-border/80 bg-muted/20">
              <SelectValue placeholder="Select AI engine" />
            </SelectTrigger>
            <SelectContent>
              {GENERATION_MODELS.map((model) => (
                <SelectItem key={model.id} value={model.id}>
                  {model.slug}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Product photos</Label>
          <div
            className="flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-border/80 bg-muted/10 p-4 text-center"
            onClick={() => document.getElementById("product-upload")?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              void handleFiles(e.dataTransfer.files);
            }}
          >
            <ImagePlus className="mb-2 size-5 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">Drop images or click to upload</p>
            <input
              id="product-upload"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => void handleFiles(e.target.files)}
            />
          </div>
          {references.length ? (
            <div className="grid grid-cols-3 gap-2">
              {references.map((ref) => (
                <div key={ref.id} className="relative overflow-hidden rounded-md border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={ref.dataUrl} alt={ref.name} className="aspect-square object-cover" />
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon-xs"
                    className="absolute top-1 right-1"
                    onClick={() => onReferencesChange(references.filter((r) => r.id !== ref.id))}
                  >
                    <X />
                  </Button>
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label>Prompt</Label>
          <Textarea
            rows={5}
            value={options.prompt}
            onChange={(e) => updateOption("prompt", e.target.value)}
            className="min-h-[120px] resize-y border-border/80 bg-muted/20 text-sm"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Resolution</Label>
            <Select
              value={options.resolution}
              onValueChange={(v) => v && updateOption("resolution", v as GenerationOptions["resolution"])}
            >
              <SelectTrigger className="w-full border-border/80 bg-muted/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {RESOLUTIONS.map((r) => (
                  <SelectItem key={r.value} value={r.value}>
                    {r.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Outputs</Label>
            <Select
              value={String(options.outputCount)}
              onValueChange={(v) => v && updateOption("outputCount", Number(v))}
            >
              <SelectTrigger className="w-full border-border/80 bg-muted/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4].map((n) => (
                  <SelectItem key={n} value={String(n)}>
                    {n} image{n > 1 ? "s" : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Style</Label>
          <Select
            value={options.style}
            onValueChange={(v) => v && updateOption("style", v as GenerationOptions["style"])}
          >
            <SelectTrigger className="w-full border-border/80 bg-muted/20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {STYLE_PRESETS.map((preset) => (
                <SelectItem key={preset.value} value={preset.value}>
                  {preset.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Avoid (optional)</Label>
          <Input
            value={options.negativePrompt ?? ""}
            onChange={(e) => updateOption("negativePrompt", e.target.value)}
            placeholder="blurry, watermark, cropped..."
            className="border-border/80 bg-muted/20 text-sm"
          />
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-border/60 p-4">
        <Button variant="outline" size="sm" onClick={onReset}>
          Reset
        </Button>
        <Button size="sm" disabled={isGenerating} onClick={onRun}>
          {isGenerating ? "Generating..." : "Generate product images"}
        </Button>
      </div>
    </div>
  );
}
