import Link from "next/link";
import { Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Sparkles className="size-4" />
          </span>
          <span>team-media-gen</span>
        </Link>

        <div className="flex items-center gap-3">
          <p className="hidden rounded-full border bg-muted/50 px-3 py-1 text-xs text-muted-foreground sm:block">
            Frontend prototype
          </p>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
