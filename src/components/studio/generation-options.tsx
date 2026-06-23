"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RESOLUTIONS, STYLE_PRESETS } from "@/lib/models";
import type { GenerationOptions } from "@/types/generation";
import { cn } from "@/lib/utils";

interface GenerationOptionsFormProps {
  options: GenerationOptions;
  onChange: (options: GenerationOptions) => void;
}

export function GenerationOptionsForm({ options, onChange }: GenerationOptionsFormProps) {
  function update<K extends keyof GenerationOptions>(key: K, value: GenerationOptions[K]) {
    onChange({ ...options, [key]: value });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generation options</CardTitle>
        <CardDescription>
          Describe the shot, pick a style preset, and choose output size.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="prompt">Creative direction</Label>
          <Textarea
            id="prompt"
            rows={4}
            placeholder="e.g. Place the sneaker on a marble pedestal with soft shadows and a premium campaign feel."
            value={options.prompt}
            onChange={(event) => update("prompt", event.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="negative-prompt">Negative prompt (optional)</Label>
          <Input
            id="negative-prompt"
            placeholder="blurry, watermark, cropped, distorted logo"
            value={options.negativePrompt ?? ""}
            onChange={(event) => update("negativePrompt", event.target.value)}
          />
        </div>

        <div className="space-y-3">
          <Label>Style preset</Label>
          <div className="grid gap-2 sm:grid-cols-2">
            {STYLE_PRESETS.map((preset) => {
              const selected = options.style === preset.value;
              return (
                <button
                  key={preset.value}
                  type="button"
                  onClick={() => update("style", preset.value)}
                  className={cn(
                    "rounded-xl border px-3 py-3 text-left transition-colors",
                    selected ? "border-primary bg-primary/5" : "hover:bg-muted/40",
                  )}
                >
                  <p className="text-sm font-medium">{preset.label}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{preset.hint}</p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Resolution</Label>
            <Select
              value={options.resolution}
              onValueChange={(value) => update("resolution", value as GenerationOptions["resolution"])}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select resolution" />
              </SelectTrigger>
              <SelectContent>
                {RESOLUTIONS.map((resolution) => (
                  <SelectItem key={resolution.value} value={resolution.value}>
                    {resolution.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Outputs</Label>
            <Select
              value={String(options.outputCount)}
              onValueChange={(value) => update("outputCount", Number(value))}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="How many images?" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4].map((count) => (
                  <SelectItem key={count} value={String(count)}>
                    {count} image{count > 1 ? "s" : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
