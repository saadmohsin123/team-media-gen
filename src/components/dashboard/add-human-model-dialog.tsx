"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ModelAttributesPanel } from "@/components/dashboard/human-model-profile";
import { slugifyModelName } from "@/lib/model-attributes";
import type { HumanModel, ModelAnalysisResult } from "@/types/human-model";
import type { UploadedReference } from "@/types/generation";
import { ImagePlus, Loader2, ScanFace, Sparkles, X } from "lucide-react";

interface AddHumanModelDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddModel: (model: HumanModel) => void;
}

export function AddHumanModelDialog({ open, onOpenChange, onAddModel }: AddHumanModelDialogProps) {
  const [name, setName] = useState("");
  const [photos, setPhotos] = useState<UploadedReference[]>([]);
  const [analysis, setAnalysis] = useState<
    (ModelAnalysisResult & { usedMock?: boolean; provider?: string }) | null
  >(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  function reset() {
    setName("");
    setPhotos([]);
    setAnalysis(null);
    setIsAnalyzing(false);
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
    setPhotos((current) => [...current, ...uploaded].slice(0, 6));
    setAnalysis(null);
  }

  async function handleAnalyze() {
    if (!name.trim()) {
      toast.error("Enter a model name first.");
      return;
    }
    if (!photos.length) {
      toast.error("Upload at least one model photo.");
      return;
    }

    setIsAnalyzing(true);
    try {
      const response = await fetch("/api/models/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          photos: photos.map((photo) => photo.dataUrl),
        }),
      });

      const data = (await response.json()) as ModelAnalysisResult & {
        error?: string;
        usedMock?: boolean;
        provider?: string;
        message?: string;
      };

      if (!response.ok) {
        throw new Error(data.error ?? "Analysis failed.");
      }

      setAnalysis(data);
      toast.success(data.message ?? "Model analysis complete.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Analysis failed.");
    } finally {
      setIsAnalyzing(false);
    }
  }

  function handleSave() {
    if (!name.trim() || !photos.length || !analysis) return;

    const id = slugifyModelName(name.trim());
    const model: HumanModel = {
      id,
      name: name.trim(),
      look: analysis.look,
      height: analysis.height,
      bio: analysis.bio,
      tags: analysis.tags,
      photos: photos.map((photo) => photo.dataUrl),
      attributes: analysis.attributes,
      custom: true,
    };

    onAddModel(model);
    toast.success(`${model.name} added to your roster.`);
    reset();
    onOpenChange(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) reset();
        onOpenChange(next);
      }}
    >
      <DialogContent className="flex h-[min(92dvh,920px)] w-[calc(100vw-1rem)] max-w-[calc(100vw-1rem)] flex-col gap-0 overflow-hidden p-0 sm:max-w-2xl lg:max-w-3xl">
        <DialogHeader className="shrink-0 border-b px-4 py-4 pr-12 sm:px-6">
          <DialogTitle className="flex items-center gap-2 text-lg">
            <ScanFace className="size-5 shrink-0" />
            Add model
          </DialogTitle>
          <DialogDescription className="text-left">
            Upload model photos. AI analyzes face, body, height, and style so product generations
            match their appearance.
          </DialogDescription>
        </DialogHeader>

        <div className="min-h-0 flex-1 space-y-5 overflow-y-auto overscroll-contain p-4 sm:p-6">
          <div className="space-y-2">
            <Label htmlFor="model-name">Model name</Label>
            <Input
              id="model-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Keira"
            />
          </div>

          <div className="space-y-2">
            <Label>Model photos</Label>
            <div
              className="flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-border/80 bg-muted/10 p-4 text-center"
              onClick={() => document.getElementById("model-photo-upload")?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                void handleFiles(e.dataTransfer.files);
              }}
            >
              <ImagePlus className="mb-2 size-5 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">
                Full-body and face shots work best · up to 6 photos
              </p>
              <input
                id="model-photo-upload"
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => void handleFiles(e.target.files)}
              />
            </div>
            {photos.length ? (
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {photos.map((photo) => (
                  <div key={photo.id} className="relative overflow-hidden rounded-md border">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={photo.dataUrl} alt={photo.name} className="aspect-square object-cover" />
                    <Button
                      type="button"
                      variant="secondary"
                      size="icon-xs"
                      className="absolute top-1 right-1"
                      onClick={() => {
                        setPhotos(photos.filter((p) => p.id !== photo.id));
                        setAnalysis(null);
                      }}
                    >
                      <X />
                    </Button>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            disabled={isAnalyzing || !name.trim() || !photos.length}
            onClick={() => void handleAnalyze()}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="animate-spin" data-icon="inline-start" />
                Analyzing photos...
              </>
            ) : (
              <>
                <Sparkles data-icon="inline-start" />
                Analyze with AI
              </>
            )}
          </Button>

          {analysis ? (
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-medium">AI profile</p>
                {analysis.usedMock ? (
                  <Badge variant="secondary">Demo mode</Badge>
                ) : analysis.provider === "openrouter" ? (
                  <Badge variant="secondary">OpenRouter vision</Badge>
                ) : (
                  <Badge variant="secondary">Vision analyzed</Badge>
                )}
              </div>
              <ModelAttributesPanel attributes={analysis.attributes} />
              <div className="flex flex-wrap gap-1.5">
                {analysis.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <DialogFooter className="shrink-0 gap-2 border-t bg-popover px-4 py-4 sm:flex-row sm:justify-end sm:px-6">
          <Button variant="outline" className="w-full sm:w-auto" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button className="w-full sm:w-auto" disabled={!analysis} onClick={handleSave}>
            Add to roster
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
