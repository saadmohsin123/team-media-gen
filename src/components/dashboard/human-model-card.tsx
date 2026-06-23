"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { HumanModel } from "@/types/human-model";
import { cn } from "@/lib/utils";
import { ArrowRight, Check, Images } from "lucide-react";

interface HumanModelCardProps {
  model: HumanModel;
  selected?: boolean;
  onSelect: (modelId: string) => void;
  onViewProfile?: (model: HumanModel) => void;
  compact?: boolean;
}

const LOOK_LABELS: Record<HumanModel["look"], string> = {
  studio: "Studio",
  lifestyle: "Lifestyle",
  editorial: "Editorial",
  athletic: "Athletic",
  commercial: "Commercial",
};

export function HumanModelCard({
  model,
  selected = false,
  onSelect,
  onViewProfile,
  compact = false,
}: HumanModelCardProps) {
  const [cover, ...thumbnails] = model.photos;

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all hover:shadow-md",
        selected && "ring-2 ring-primary",
      )}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={cover} alt={model.name} className="size-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <Badge className="bg-white/15 text-white backdrop-blur">{LOOK_LABELS[model.look]}</Badge>
          {model.custom ? (
            <Badge className="bg-white/15 text-white backdrop-blur">Custom</Badge>
          ) : null}
          <Badge className="bg-white/15 text-white backdrop-blur">
            <Images className="size-3" />
            {model.photos.length} photos
          </Badge>
        </div>
        {selected ? (
          <div className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-full bg-white text-primary">
            <Check className="size-4" />
          </div>
        ) : null}
        <div className="absolute right-4 bottom-4 left-4 text-white">
          <p className="text-lg font-semibold">{model.name}</p>
          <p className="text-sm text-white/80">{model.height}</p>
        </div>
      </div>

      <CardHeader className={cn(compact && "pb-2")}>
        <CardDescription className={cn(compact && "line-clamp-2")}>{model.bio}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {!compact && thumbnails.length ? (
          <div className="grid grid-cols-3 gap-2">
            {thumbnails.slice(0, 3).map((photo) => (
              <div key={photo} className="aspect-square overflow-hidden rounded-lg border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo} alt={`${model.name} reference`} className="size-full object-cover" />
              </div>
            ))}
          </div>
        ) : null}

        <div className="flex flex-wrap gap-1.5">
          {model.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {onViewProfile ? (
            <Button variant="outline" size="sm" onClick={() => onViewProfile(model)}>
              View photos
            </Button>
          ) : null}
          <Button
            size="sm"
            className="ml-auto"
            variant={selected ? "default" : "outline"}
            onClick={() => onSelect(model.id)}
          >
            {selected ? "Selected" : "Open playground"}
            {!selected ? <ArrowRight data-icon="inline-end" /> : null}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
