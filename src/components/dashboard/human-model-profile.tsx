"use client";

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
import type { HumanModel, ModelAttributes } from "@/types/human-model";

interface HumanModelProfileProps {
  model: HumanModel | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (modelId: string) => void;
}

export function HumanModelProfile({
  model,
  open,
  onOpenChange,
  onSelect,
}: HumanModelProfileProps) {
  if (!model) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex h-[min(92dvh,920px)] w-[calc(100vw-1rem)] max-w-[calc(100vw-1rem)] flex-col gap-0 overflow-hidden p-0 sm:max-w-2xl lg:max-w-5xl xl:max-w-6xl">
        <DialogHeader className="shrink-0 space-y-2 border-b px-4 py-4 pr-12 sm:px-6">
          <DialogTitle className="flex flex-wrap items-center gap-2 text-lg sm:text-xl">
            {model.name}
            {model.custom ? <Badge variant="secondary">Custom</Badge> : null}
            {model.attributes.analyzedAt ? <Badge variant="outline">AI profiled</Badge> : null}
          </DialogTitle>
          <DialogDescription className="text-left text-sm leading-relaxed">
            {model.height} · {model.bio}
          </DialogDescription>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {model.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </DialogHeader>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <div className="flex flex-col gap-5 p-4 sm:p-6 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(260px,340px)] lg:items-start lg:gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(300px,380px)]">
            <div className="min-w-0 space-y-4">
              <ModelAttributesPanel attributes={model.attributes} />
            </div>

            <div className="min-w-0 space-y-2 lg:sticky lg:top-0">
              <p className="text-sm font-medium">Reference photos</p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-2">
                {model.photos.map((photo, index) => (
                  <div
                    key={photo}
                    className="overflow-hidden rounded-lg border sm:rounded-xl"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={photo}
                      alt={`${model.name} photo ${index + 1}`}
                      className="aspect-[3/4] w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="shrink-0 border-t bg-popover px-4 py-4 sm:px-6">
          <Button
            className="w-full sm:ml-auto sm:w-auto"
            onClick={() => {
              onSelect(model.id);
              onOpenChange(false);
            }}
          >
            Use {model.name} for generation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function ModelAttributesPanel({ attributes: a }: { attributes: ModelAttributes }) {
  return (
    <div className="space-y-4 rounded-lg border border-border/80 bg-muted/20 p-3 sm:p-4">
      <div>
        <p className="mb-2 text-sm font-medium">Appearance profile</p>
        <p className="text-sm leading-relaxed text-muted-foreground">{a.appearanceSummary}</p>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        <ProfileField label="Height" value={a.heightEstimate} />
        <ProfileField label="Body type" value={a.bodyType} />
        <ProfileField label="Build" value={a.build} />
        <ProfileField label="Proportions" value={a.proportions} />
        <ProfileField label="Face" value={a.faceShape} />
        {a.jawline ? <ProfileField label="Jawline" value={a.jawline} /> : null}
        <ProfileField label="Eyes" value={a.eyes} />
        {a.eyebrows ? <ProfileField label="Eyebrows" value={a.eyebrows} /> : null}
        {a.nose ? <ProfileField label="Nose" value={a.nose} /> : null}
        {a.lips ? <ProfileField label="Lips" value={a.lips} /> : null}
        <ProfileField label="Skin tone" value={a.skinTone} />
        <ProfileField label="Hair" value={a.hair} />
        {a.makeup ? <ProfileField label="Makeup" value={a.makeup} /> : null}
        <ProfileField label="Pose style" value={a.poseStyle} />
        <ProfileField label="Overall style" value={a.overallStyle} />
      </div>

      {a.distinguishingFeatures ? (
        <ProfileField label="Features" value={a.distinguishingFeatures} fullWidth />
      ) : null}

      {a.stylingNotes ? (
        <TextBlock label="Styling" value={a.stylingNotes} />
      ) : null}

      {a.designLanguage ? (
        <TextBlock label="Design language" value={a.designLanguage} />
      ) : null}

      {a.photographyDirection ? (
        <TextBlock label="Photography" value={a.photographyDirection} />
      ) : null}

      {a.campaignTags?.length ? (
        <div className="flex flex-wrap gap-1.5">
          {a.campaignTags.map((tag) => (
            <Badge key={tag} variant="outline" className="font-mono text-[10px] sm:text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      ) : null}

      {a.lookVariations?.length ? (
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground sm:text-sm">Look variations</p>
          {a.lookVariations.map((look) => (
            <div
              key={look.name}
              className="rounded-md bg-background/60 px-3 py-2 text-xs leading-relaxed sm:text-sm"
            >
              <span className="font-medium">{look.name}: </span>
              {look.description}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function ProfileField({
  label,
  value,
  fullWidth = false,
}: {
  label: string;
  value: string;
  fullWidth?: boolean;
}) {
  return (
    <div
      className={`rounded-md bg-background/60 px-3 py-2 ${fullWidth ? "sm:col-span-2" : ""}`}
    >
      <p className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
        {label}
      </p>
      <p className="mt-1 text-xs leading-relaxed sm:text-sm">{value}</p>
    </div>
  );
}

function TextBlock({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="mb-1 text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
        {label}
      </p>
      <p className="text-xs leading-relaxed sm:text-sm">{value}</p>
    </div>
  );
}
