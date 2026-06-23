# team-media-gen

Internal team app for **automated product media generation**. Users pick a model (Replicate or ImagineArt), upload product reference images, configure shot options, and generate new visuals from those references.

## Current phase: frontend prototype

The studio UI is fully interactive, but generation is **mocked in the browser** for now. This lets the team review workflow, layout, and options before we wire up Replicate and ImagineArt on the backend.

### What works today

- Step-based studio flow (model → references → options)
- Model picker for Replicate and ImagineArt
- Drag-and-drop reference upload
- Style presets, resolution, output count, prompts
- Mock preview generation with progress states
- Side-by-side reference vs output comparison
- Session history (in-browser only)

### Backend (next phase)

- `POST /api/generate` route scaffold exists but is not used by the UI yet
- Add `REPLICATE_API_TOKEN` and `IMAGINEART_API_KEY` when ready

## Stack

- Next.js 16 (App Router, TypeScript)
- shadcn/ui + Tailwind CSS v4
- Replicate API (planned)
- ImagineArt API (planned)

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
src/
├── app/page.tsx                 # Generation studio
├── components/studio/           # UI flow, upload, options, results
├── lib/
│   ├── mock-generation.ts       # Frontend-only preview engine
│   ├── models.ts                # Model registry & presets
│   ├── replicate.ts             # Backend (not wired yet)
│   └── imagineart.ts            # Backend (not wired yet)
└── types/generation.ts
```
