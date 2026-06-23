"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { GenerationJob } from "@/lib/mock-generation";
import { STYLE_PRESETS } from "@/lib/models";
import { Download, RotateCcw } from "lucide-react";

interface HistoryViewProps {
  jobs: GenerationJob[];
  onRestore: (job: GenerationJob) => void;
}

export function HistoryView({ jobs, onRestore }: HistoryViewProps) {
  if (!jobs.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Generation history</CardTitle>
          <CardDescription>Preview runs from this browser session will appear here.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex min-h-48 items-center justify-center rounded-xl border border-dashed bg-muted/20 p-8 text-center text-sm text-muted-foreground">
            No generations yet. Pick a human model and product photos to create your first preview.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">Generation history</h2>
        <p className="text-sm text-muted-foreground">
          Review, restore, and download outputs from this session.
        </p>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        {jobs.map((job) => {
          const styleLabel = STYLE_PRESETS.find((preset) => preset.value === job.options.style)?.label;

          return (
            <Card key={job.id} className="overflow-hidden">
              <div className="grid gap-0 md:grid-cols-[180px_minmax(0,1fr)]">
                <div className="grid grid-cols-2 gap-px bg-border md:grid-cols-1">
                  {job.results.slice(0, 2).map((result) => (
                    <div key={result.id} className="aspect-square bg-muted">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={result.imageUrl} alt="Generated output" className="size-full object-cover" />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col">
                  <CardHeader>
                    <div className="flex flex-wrap items-center gap-2">
                      <CardTitle className="text-base">{job.humanModel.name}</CardTitle>
                      <Badge variant="secondary">{job.results.length} outputs</Badge>
                      <Badge variant="outline">{job.aiModel.name}</Badge>
                    </div>
                    <CardDescription>{new Date(job.createdAt).toLocaleString()}</CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto space-y-4">
                    <div className="space-y-1 text-sm">
                      <p className="line-clamp-2">{job.options.prompt}</p>
                      <p className="text-xs text-muted-foreground">
                        {styleLabel} · {job.options.resolution}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm" variant="outline" onClick={() => onRestore(job)}>
                        <RotateCcw data-icon="inline-start" />
                        Restore setup
                      </Button>
                      {job.results[0] ? (
                        <Button
                          size="sm"
                          variant="outline"
                          render={
                            <a
                              href={job.results[0].imageUrl}
                              download={`${job.id}.png`}
                              target="_blank"
                              rel="noreferrer"
                            />
                          }
                        >
                          <Download data-icon="inline-start" />
                          Download
                        </Button>
                      ) : null}
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
