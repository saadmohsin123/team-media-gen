"use client";

import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { AppView } from "@/components/app/app-dashboard";
import { cn } from "@/lib/utils";

interface TopNavProps {
  activeView: AppView;
  onViewChange: (view: AppView) => void;
}

const NAV_LINKS: { id: AppView; label: string }[] = [
  { id: "playground", label: "Generate" },
  { id: "models", label: "Models" },
  { id: "history", label: "History" },
];

export function TopNav({ activeView, onViewChange }: TopNavProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-[1600px] items-center gap-4 px-4 lg:px-6">
        <button
          type="button"
          onClick={() => onViewChange("playground")}
          className="flex shrink-0 items-center gap-2 font-semibold"
        >
          <span className="flex size-8 items-center justify-center rounded-md border border-border bg-muted/40">
            <Sparkles className="size-4" />
          </span>
          <span className="hidden sm:inline">team-media-gen</span>
        </button>

        <p className="hidden text-sm text-muted-foreground md:block">
          Generate product images for your team
        </p>

        <nav className="ml-auto flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Button
              key={link.id}
              variant="ghost"
              size="sm"
              className={cn(
                "text-muted-foreground",
                activeView === link.id && "bg-muted text-foreground",
              )}
              onClick={() => onViewChange(link.id)}
            >
              {link.label}
            </Button>
          ))}
        </nav>
      </div>
    </header>
  );
}
