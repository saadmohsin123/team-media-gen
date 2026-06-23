"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { TopNav } from "@/components/playground/top-nav";
import { PlaygroundView } from "@/components/playground/playground-view";
import { HumanModelsCatalog } from "@/components/dashboard/human-models-catalog";
import { HistoryView } from "@/components/dashboard/history-view";
import { useHumanModels } from "@/hooks/use-human-models";
import { getModelById } from "@/lib/models";
import { DEFAULT_HUMAN_MODELS } from "@/lib/human-models";
import { DEFAULT_PRODUCT_PROMPT } from "@/lib/prompts";
import {
  mockGenerateImages,
  type GenerationJob,
  type GenerationProgress,
} from "@/lib/mock-generation";
import type {
  GenerationOptions,
  GenerationResponse,
  GenerationResult,
  UploadedReference,
} from "@/types/generation";
import type { HumanModel } from "@/types/human-model";

export type AppView = "playground" | "models" | "history";

const defaultOptions: GenerationOptions = {
  prompt: DEFAULT_PRODUCT_PROMPT,
  resolution: "1024x1024",
  style: "product-studio",
  outputCount: 1,
};

export function AppDashboard() {
  const { models, addModel, getModelById: getHumanModelById } = useHumanModels();
  const [activeView, setActiveView] = useState<AppView>("playground");
  const [selectedHumanModelId, setSelectedHumanModelId] = useState(DEFAULT_HUMAN_MODELS[0].id);
  const [selectedAiModelId, setSelectedAiModelId] = useState("openai-gpt-image-2");
  const [references, setReferences] = useState<UploadedReference[]>([]);
  const [options, setOptions] = useState<GenerationOptions>(defaultOptions);
  const [results, setResults] = useState<GenerationResult[]>([]);
  const [history, setHistory] = useState<GenerationJob[]>([]);
  const [progress, setProgress] = useState<GenerationProgress | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const humanModel = useMemo(
    () => getHumanModelById(selectedHumanModelId),
    [getHumanModelById, selectedHumanModelId],
  );
  const aiModel = useMemo(() => getModelById(selectedAiModelId), [selectedAiModelId]);

  async function handleGenerate() {
    if (!humanModel || !aiModel) return;

    if (!references.length) {
      toast.error("Upload at least one product photo.");
      return;
    }

    setIsGenerating(true);
    setResults([]);
    setProgress({
      stage: "validating",
      message: "Validating model and product references",
      percent: 15,
    });
    setActiveView("playground");

    try {
      let generated: GenerationResult[] = [];

      if (aiModel.provider === "imagineart") {
        setProgress({
          stage: "processing",
          message: "Calling ImagineArt MCP",
          percent: 45,
        });

        const response = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            modelId: aiModel.id,
            humanModel,
            references,
            options,
          }),
        });

        const data = (await response.json()) as GenerationResponse & { error?: string };

        if (!response.ok) {
          throw new Error(data.error ?? "ImagineArt generation failed.");
        }

        generated = data.results;
      } else {
        generated = await mockGenerateImages(
          humanModel,
          aiModel,
          references,
          options,
          setProgress,
        );
      }

      setResults(generated);
      setProgress({
        stage: "complete",
        message: "Generation complete",
        percent: 100,
      });

      setHistory((current) => [
        {
          id: crypto.randomUUID(),
          humanModel,
          aiModel,
          references,
          options,
          results: generated,
          createdAt: new Date().toISOString(),
          status: "completed",
        },
        ...current,
      ]);
      toast.success(
        aiModel.provider === "imagineart"
          ? "ImagineArt generation complete."
          : "Preview generation complete.",
      );
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Generation failed.");
    } finally {
      setIsGenerating(false);
      setTimeout(() => setProgress(null), 800);
    }
  }

  function restoreJob(job: GenerationJob) {
    setSelectedHumanModelId(job.humanModel.id);
    setSelectedAiModelId(job.aiModel.id);
    setReferences(job.references);
    setOptions(job.options);
    setResults(job.results);
    setActiveView("playground");
  }

  function resetOutput() {
    setResults([]);
  }

  function handleAddModel(model: HumanModel) {
    addModel(model);
    setSelectedHumanModelId(model.id);
    setActiveView("playground");
  }

  return (
    <div className="min-h-svh bg-background">
      <TopNav activeView={activeView} onViewChange={setActiveView} />

      {activeView === "playground" ? (
        <PlaygroundView
          models={models}
          selectedHumanModelId={selectedHumanModelId}
          selectedAiModelId={selectedAiModelId}
          references={references}
          options={options}
          defaultOptions={defaultOptions}
          results={results}
          progress={progress}
          isGenerating={isGenerating}
          onSelectHumanModel={() => setActiveView("models")}
          onSelectAiModel={setSelectedAiModelId}
          onReferencesChange={setReferences}
          onOptionsChange={setOptions}
          onReset={resetOutput}
          onRun={() => void handleGenerate()}
        />
      ) : null}

      {activeView === "models" ? (
        <div className="mx-auto max-w-[1600px] px-4 py-6 lg:px-6">
          <HumanModelsCatalog
            models={models}
            selectedHumanModelId={selectedHumanModelId}
            onSelectHumanModel={setSelectedHumanModelId}
            onOpenGenerate={() => setActiveView("playground")}
            onAddModel={handleAddModel}
          />
        </div>
      ) : null}

      {activeView === "history" ? (
        <div className="mx-auto max-w-[1600px] px-4 py-6 lg:px-6">
          <HistoryView jobs={history} onRestore={restoreJob} />
        </div>
      ) : null}
    </div>
  );
}
