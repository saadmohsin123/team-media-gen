"use client";

import { Skeleton } from "@/components/ui/skeleton";
import type { GenerationProgress } from "@/lib/mock-generation";
import type { GenerationResult } from "@/types/generation";

interface OutputPanelProps {
  results: GenerationResult[];
  isGenerating: boolean;
  progress: GenerationProgress | null;
}

export function OutputPanel({ results, isGenerating, progress }: OutputPanelProps) {
  const activeResult = results[0];

  return (
    <div className="flex h-full min-h-[640px] flex-col bg-background">
      <div className="border-b border-border/60 px-4 py-3">
        <h2 className="text-sm font-medium">Output</h2>
        <p className="text-xs text-muted-foreground">Your generated product images appear here.</p>
      </div>

      <div className="flex flex-1 flex-col overflow-auto p-4">
        {isGenerating ? (
          <div className="flex flex-1 flex-col gap-4">
            <Skeleton className="min-h-[420px] w-full flex-1 rounded-lg" />
            {progress ? (
              <p className="text-sm text-muted-foreground">
                {progress.message} · {progress.percent}%
              </p>
            ) : null}
          </div>
        ) : activeResult ? (
          <div className="flex flex-1 flex-col gap-4">
            <div className="flex min-h-[420px] flex-1 items-center justify-center overflow-hidden rounded-lg border border-border/60 bg-muted/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeResult.imageUrl}
                alt="Generated product image"
                className="max-h-full max-w-full object-contain"
              />
            </div>
            {results.length > 1 ? (
              <div className="grid grid-cols-4 gap-2">
                {results.map((result) => (
                  <div key={result.id} className="overflow-hidden rounded-md border border-border/60">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={result.imageUrl} alt="" className="aspect-square object-cover" />
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        ) : (
          <div className="flex min-h-[420px] flex-1 items-center justify-center rounded-lg border border-dashed border-border/60 bg-muted/10 p-8 text-center text-sm text-muted-foreground">
            Generated product images will show up here.
          </div>
        )}
      </div>
    </div>
  );
}
