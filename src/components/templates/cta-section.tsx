import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="rounded-2xl border bg-card px-6 py-10 text-center shadow-xs sm:px-10">
        <h2 className="text-2xl font-semibold tracking-tight">Start building your next page</h2>
        <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
          Duplicate a template, wire up your data, and keep the design system consistent across the
          app.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button render={<Link href="/dashboard" />}>Dashboard template</Button>
          <Button variant="outline" render={<Link href="/components" />}>
            Component gallery
          </Button>
        </div>
      </div>
    </section>
  );
}
