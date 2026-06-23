import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>Next.js starter with shadcn/ui templates pre-loaded.</p>
        <div className="flex gap-4">
          <Link href="/components" className="hover:text-foreground">
            Components
          </Link>
          <a
            href="https://ui.shadcn.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground"
          >
            shadcn/ui docs
          </a>
        </div>
      </div>
    </footer>
  );
}
