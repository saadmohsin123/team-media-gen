"use client";

import { Download, ImageIcon, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getModelById } from "@/lib/models";
import type { GenerationResult, UploadedReference } from "@/types/generation";

interface ResultPanelProps {
  results: GenerationResult[];
  references: UploadedReference[];
  humanModelPhoto?: string;
  isGenerating: boolean;
  outputCount: number;
}

export function ResultPanel({
  results,
  references,
  humanModelPhoto,
  isGenerating,
  outputCount,
}: ResultPanelProps) {
  const primaryReference = references[0];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <div>
            <CardTitle className="flex items-center gap-2 text-base">
              <Sparkles className="size-4" />
              Output preview
            </CardTitle>
        <CardDescription>
          Mock renders for UI review. ImagineArt uses MCP when configured.
        </CardDescription>
          </div>
          {results.length ? <Badge>{results.length} ready</Badge> : null}
        </div>
      </CardHeader>
      <CardContent>
        {isGenerating ? (
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              {Array.from({ length: Math.max(outputCount, 1) }).map((_, index) => (
                <div key={index} className="space-y-2">
                  <Skeleton className="aspect-square w-full rounded-xl" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ))}
            </div>
          </div>
        ) : results.length ? (
          <Tabs defaultValue="results">
            <TabsList>
              <TabsTrigger value="results">Generated</TabsTrigger>
              <TabsTrigger value="compare">Compare</TabsTrigger>
            </TabsList>
            <TabsContent value="results" className="mt-4">
              <div className="grid gap-4 sm:grid-cols-2">
                {results.map((result) => {
                  const model = getModelById(result.modelId);
                  return (
                    <div key={result.id} className="overflow-hidden rounded-xl border">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={result.imageUrl}
                        alt="Generated product visual"
                        className="aspect-square w-full object-cover"
                      />
                      <div className="flex items-center justify-between gap-2 p-3">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">{model?.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(result.createdAt).toLocaleTimeString()}
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          render={
                            <a
                              href={result.imageUrl}
                              download={`${result.id}.png`}
                              target="_blank"
                              rel="noreferrer"
                            />
                          }
                        >
                          <Download data-icon="inline-start" />
                          Save
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>
            <TabsContent value="compare" className="mt-4 space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                {humanModelPhoto ? (
                  <div className="overflow-hidden rounded-xl border">
                    <div className="border-b bg-muted/30 px-3 py-2 text-xs font-medium">Human model</div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={humanModelPhoto}
                      alt="Human model reference"
                      className="aspect-square w-full object-cover"
                    />
                  </div>
                ) : null}
                {primaryReference ? (
                  <div className="overflow-hidden rounded-xl border">
                    <div className="border-b bg-muted/30 px-3 py-2 text-xs font-medium">Product</div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={primaryReference.dataUrl}
                      alt={primaryReference.name}
                      className="aspect-square w-full object-cover"
                    />
                  </div>
                ) : null}
                {results[0] ? (
                  <div className="overflow-hidden rounded-xl border">
                    <div className="border-b bg-muted/30 px-3 py-2 text-xs font-medium">Generated</div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={results[0].imageUrl}
                      alt="Generated comparison"
                      className="aspect-square w-full object-cover"
                    />
                  </div>
                ) : null}
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="flex min-h-56 flex-col items-center justify-center rounded-xl border border-dashed bg-muted/20 p-8 text-center">
            <ImageIcon className="mb-3 size-10 text-muted-foreground" />
            <p className="text-sm font-medium">No previews yet</p>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              Complete the steps on the left, then generate to see mocked output in this panel.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
