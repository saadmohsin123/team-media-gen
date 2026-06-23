# nextjs-starter

A Next.js 16 starter with **shadcn/ui** pre-installed, layout templates, and example pages.

## Stack

- **Next.js 16** (App Router, TypeScript, Turbopack)
- **Tailwind CSS v4**
- **shadcn/ui** (Base Nova style, 45+ components)
- **next-themes** (light/dark mode)
- **Sonner** (toast notifications)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## What's included

### Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with hero, stats, features, and CTA sections |
| `/components` | Live gallery of UI components and form templates |
| `/dashboard` | Sidebar dashboard layout with metrics and table |

### Layout (`src/components/layout/`)

- `header.tsx` — Site header with nav and theme toggle
- `footer.tsx` — Site footer
- `site-shell.tsx` — Header + main + footer wrapper
- `theme-toggle.tsx` — Light/dark mode switch

### Page templates (`src/components/templates/`)

- `hero-section.tsx`
- `stats-section.tsx`
- `feature-cards.tsx`
- `cta-section.tsx`
- `contact-form.tsx`
- `component-gallery.tsx`
- `dashboard-shell.tsx`

### UI primitives (`src/components/ui/`)

All shadcn/ui components are pre-installed: accordion, alert, avatar, badge, breadcrumb, button, calendar, card, carousel, chart, checkbox, command, dialog, drawer, dropdown-menu, form inputs, navigation, pagination, popover, progress, select, separator, sheet, sidebar, skeleton, slider, sonner, switch, table, tabs, textarea, toggle, tooltip, and more.

## Add more components

```bash
npx shadcn@latest add [component-name]
```

Browse available components at [ui.shadcn.com](https://ui.shadcn.com).

## Project structure

```
src/
├── app/
│   ├── components/page.tsx   # Component gallery
│   ├── dashboard/page.tsx    # Dashboard template
│   ├── layout.tsx
│   └── page.tsx              # Home
├── components/
│   ├── layout/               # App chrome
│   ├── providers/            # Theme, tooltip, toast
│   ├── templates/            # Reusable page sections
│   └── ui/                   # shadcn/ui primitives
├── hooks/
└── lib/
```

## Scripts

- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run start` — Start production server
- `npm run lint` — Run ESLint
