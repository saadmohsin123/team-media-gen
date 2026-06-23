"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AddHumanModelDialog } from "@/components/dashboard/add-human-model-dialog";
import { HumanModelCard } from "@/components/dashboard/human-model-card";
import { HumanModelProfile } from "@/components/dashboard/human-model-profile";
import { HUMAN_MODEL_LOOKS } from "@/lib/human-models";
import type { HumanModel, HumanModelLook } from "@/types/human-model";
import { Plus, Search } from "lucide-react";

interface HumanModelsCatalogProps {
  models: HumanModel[];
  selectedHumanModelId: string;
  onSelectHumanModel: (modelId: string) => void;
  onOpenGenerate: () => void;
  onAddModel: (model: HumanModel) => void;
}

export function HumanModelsCatalog({
  models,
  selectedHumanModelId,
  onSelectHumanModel,
  onOpenGenerate,
  onAddModel,
}: HumanModelsCatalogProps) {
  const [query, setQuery] = useState("");
  const [look, setLook] = useState<HumanModelLook | "all">("all");
  const [profileModel, setProfileModel] = useState<HumanModel | null>(null);
  const [addOpen, setAddOpen] = useState(false);

  const filteredModels = useMemo(() => {
    return models.filter((model) => {
      const matchesLook = look === "all" || model.look === look;
      const matchesQuery =
        !query.trim() ||
        model.name.toLowerCase().includes(query.toLowerCase()) ||
        model.bio.toLowerCase().includes(query.toLowerCase()) ||
        model.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()));
      return matchesLook && matchesQuery;
    });
  }, [look, models, query]);

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">Model roster</h2>
            <p className="text-sm text-muted-foreground">
              Pick a human model or add a new one — AI profiles face, body, and style for product
              generation.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{models.length} models</Badge>
            <Button size="sm" onClick={() => setAddOpen(true)}>
              <Plus data-icon="inline-start" />
              Add model
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <Tabs value={look} onValueChange={(value) => setLook(value as HumanModelLook | "all")}>
            <TabsList>
              {HUMAN_MODEL_LOOKS.map((item) => (
                <TabsTrigger key={item.value} value={item.value}>
                  {item.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <div className="relative w-full max-w-sm">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by name or style..."
              className="pl-9"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredModels.map((model) => (
            <HumanModelCard
              key={model.id}
              model={model}
              selected={model.id === selectedHumanModelId}
              onViewProfile={setProfileModel}
              onSelect={(modelId) => {
                onSelectHumanModel(modelId);
                onOpenGenerate();
              }}
            />
          ))}
        </div>
      </div>

      <HumanModelProfile
        model={profileModel}
        open={Boolean(profileModel)}
        onOpenChange={(open) => !open && setProfileModel(null)}
        onSelect={(modelId) => {
          onSelectHumanModel(modelId);
          onOpenGenerate();
        }}
      />

      <AddHumanModelDialog open={addOpen} onOpenChange={setAddOpen} onAddModel={onAddModel} />
    </>
  );
}
