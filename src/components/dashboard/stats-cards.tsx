"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HUMAN_MODELS } from "@/lib/human-models";
import { GENERATION_MODELS } from "@/lib/models";
import { Clock3, ImageIcon, UserRound, Wand2 } from "lucide-react";

interface StatsCardsProps {
  generationCount: number;
}

export function StatsCards({ generationCount }: StatsCardsProps) {
  const stats = [
    {
      title: "Human models",
      value: String(HUMAN_MODELS.length),
      hint: "In your team roster",
      icon: UserRound,
    },
    {
      title: "AI engines",
      value: String(GENERATION_MODELS.length),
      hint: "Replicate & ImagineArt",
      icon: Wand2,
    },
    {
      title: "Session generations",
      value: String(generationCount),
      hint: "Preview runs this session",
      icon: ImageIcon,
    },
    {
      title: "Status",
      value: "Prototype",
      hint: "Frontend UI ready for backend",
      icon: Clock3,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <stat.icon className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold tabular-nums">{stat.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{stat.hint}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
