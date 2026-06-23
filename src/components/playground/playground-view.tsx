"use client";

import { useEffect, useMemo } from "react";
import { ModelHeader } from "@/components/playground/model-header";
import { InputPanel } from "@/components/playground/input-panel";
import { OutputPanel } from "@/components/playground/output-panel";
import { getHumanModelById } from "@/lib/human-models";
import { getModelById } from "@/lib/models";
import type { HumanModel } from "@/types/human-model";
import type { GenerationProgress } from "@/lib/mock-generation";
import type { GenerationOptions, GenerationResult, UploadedReference } from "@/types/generation";

interface PlaygroundViewProps {
  models: HumanModel[];
  selectedHumanModelId: string;
  selectedAiModelId: string;
  references: UploadedReference[];
  options: GenerationOptions;
  defaultOptions: GenerationOptions;
  results: GenerationResult[];
  progress: GenerationProgress | null;
  isGenerating: boolean;
  onSelectHumanModel: () => void;
  onSelectAiModel: (id: string) => void;
  onReferencesChange: (refs: UploadedReference[]) => void;
  onOptionsChange: (options: GenerationOptions) => void;
  onReset: () => void;
  onRun: () => void;
}

export function PlaygroundView({
  models,
  selectedHumanModelId,
  selectedAiModelId,
  references,
  options,
  defaultOptions,
  results,
  progress,
  isGenerating,
  onSelectHumanModel,
  onSelectAiModel,
  onReferencesChange,
  onOptionsChange,
  onReset,
  onRun,
}: PlaygroundViewProps) {
  const humanModel = useMemo(
    () => getHumanModelById(selectedHumanModelId, models),
    [models, selectedHumanModelId],
  );
  const aiModel = useMemo(() => getModelById(selectedAiModelId), [selectedAiModelId]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
        event.preventDefault();
        onRun();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onRun]);

  if (!humanModel || !aiModel) return null;

  return (
    <div className="flex min-h-[calc(100svh-3.5rem)] flex-col">
      <ModelHeader
        humanModel={humanModel}
        aiModel={aiModel}
        onChangeModel={onSelectHumanModel}
      />

      <div className="mx-auto grid w-full max-w-[1600px] flex-1 lg:grid-cols-2">
        <InputPanel
          models={models}
          selectedHumanModelId={selectedHumanModelId}
          selectedAiModelId={selectedAiModelId}
          references={references}
          options={options}
          isGenerating={isGenerating}
          onSelectHumanModel={onSelectHumanModel}
          onSelectAiModel={onSelectAiModel}
          onReferencesChange={onReferencesChange}
          onOptionsChange={onOptionsChange}
          onReset={() => {
            onOptionsChange(defaultOptions);
            onReferencesChange([]);
            onReset();
          }}
          onRun={onRun}
        />
        <OutputPanel results={results} isGenerating={isGenerating} progress={progress} />
      </div>
    </div>
  );
}
