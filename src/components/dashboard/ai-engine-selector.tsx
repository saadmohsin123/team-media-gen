"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GENERATION_MODELS } from "@/lib/models";
import type { GenerationModel } from "@/types/generation";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface AiEngineSelectorProps {
  selectedAiModelId: string;
  onSelect: (modelId: string) => void;
}

export function AiEngineSelector({ selectedAiModelId, onSelect }: AiEngineSelectorProps) {
  const providers: { label: string; models: GenerationModel[] }[] = [
    {
      label: "Replicate",
      models: GENERATION_MODELS.filter((model) => model.provider === "replicate"),
    },
    {
      label: "ImagineArt",
      models: GENERATION_MODELS.filter((model) => model.provider === "imagineart"),
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">AI generation engine</CardTitle>
        <CardDescription>
          Choose which provider renders the final image using the selected model and product references.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {providers.map((group) => (
          <div key={group.label} className="space-y-2">
            <p className="text-sm font-medium">{group.label}</p>
            <div className="grid gap-2">
              {group.models.map((model) => {
                const selected = model.id === selectedAiModelId;
                return (
                  <button
                    key={model.id}
                    type="button"
                    onClick={() => onSelect(model.id)}
                    className={cn(
                      "flex items-start justify-between gap-3 rounded-xl border p-3 text-left transition-colors",
                      selected ? "border-primary bg-primary/5" : "hover:bg-muted/40",
                    )}
                  >
                    <div>
                      <p className="text-sm font-medium">{model.name}</p>
                      <p className="text-xs text-muted-foreground">{model.description}</p>
                    </div>
                    {selected ? (
                      <Badge>
                        <Check className="size-3" />
                        Active
                      </Badge>
                    ) : (
                      <Badge variant="outline">Select</Badge>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
