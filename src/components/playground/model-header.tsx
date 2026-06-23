"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { HumanModel } from "@/types/human-model";
import type { GenerationModel } from "@/types/generation";
import { Circle, Images } from "lucide-react";

interface ModelHeaderProps {
  humanModel: HumanModel;
  aiModel: GenerationModel;
  onChangeModel: () => void;
}

export function ModelHeader({ humanModel, aiModel, onChangeModel }: ModelHeaderProps) {
  return (
    <div className="border-b border-border/60 px-4 py-6 lg:px-6">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex gap-4">
          <div className="size-14 shrink-0 overflow-hidden rounded-lg border border-border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={humanModel.photos[0]}
              alt={humanModel.name}
              className="size-full object-cover"
            />
          </div>
          <div className="space-y-2">
            <h1 className="text-xl font-semibold tracking-tight">Generate product images</h1>
            <p className="max-w-3xl text-sm text-muted-foreground">
              Using <span className="text-foreground">{humanModel.name}</span> with{" "}
              <span className="font-mono text-foreground">{aiModel.slug}</span>. Upload product
              photos and generate campaign-ready visuals for your team.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="gap-1.5">
                <Circle className="size-2 fill-emerald-500 text-emerald-500" />
                Ready
              </Badge>
              <Badge variant="outline" className="gap-1.5">
                <Images className="size-3.5" />
                {humanModel.photos.length} model photos
              </Badge>
              <Badge variant="outline" className="font-mono">
                {aiModel.slug}
              </Badge>
            </div>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={onChangeModel}>
          Change model
        </Button>
      </div>
    </div>
  );
}
