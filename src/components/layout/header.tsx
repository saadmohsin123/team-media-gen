import Link from "next/link";
import { LayoutGrid, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/components", label: "Components" },
  { href: "/dashboard", label: "Dashboard" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Sparkles className="size-4" />
          </span>
          <span>nextjs-starter</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Button key={item.href} variant="ghost" size="sm" render={<Link href={item.href} />}>
              {item.label}
            </Button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button size="sm" className="hidden sm:inline-flex" render={<Link href="/components" />}>
            <LayoutGrid data-icon="inline-start" />
            Browse UI
          </Button>
        </div>
      </div>
    </header>
  );
}
