import Link from "next/link";
import { ArrowRight, Layers, Palette, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="border-b bg-linear-to-b from-muted/50 to-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-20 sm:px-6 lg:py-28">
        <Badge variant="secondary" className="w-fit">
          Next.js 16 + shadcn/ui
        </Badge>
        <div className="max-w-3xl space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            A starter app with UI templates ready to customize
          </h1>
          <p className="text-lg text-muted-foreground">
            Pre-loaded layout sections, dashboard shell, and 40+ shadcn/ui components so you can
            ship pages faster without rebuilding primitives from scratch.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button render={<Link href="/components" />}>
            View component gallery
            <ArrowRight data-icon="inline-end" />
          </Button>
          <Button variant="outline" render={<Link href="/dashboard" />}>
            Open dashboard template
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { icon: Layers, title: "Layout templates", desc: "Header, footer, sidebar shell" },
            { icon: Palette, title: "UI primitives", desc: "Buttons, forms, dialogs, tables" },
            { icon: Zap, title: "Page sections", desc: "Hero, stats, CTA, contact form" },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border bg-card p-4 text-card-foreground shadow-xs"
            >
              <item.icon className="mb-3 size-5 text-primary" />
              <h3 className="font-medium">{item.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
