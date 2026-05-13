# Onboarding: marketing site (`utapwebsiite`)

**Location:** sibling repository **`utapwebsiite`** (marketing / landing site). This onboarding file lives under **`utap-docs`** `docs/fibery/onboarding/` with the unified handbook.

---

## What this app is

A **Vite + React** (TypeScript) marketing-style site: hero, sections, contact-style content. It may pull optional imagery or Supabase later—check `src/App.tsx` and `package.json` for current dependencies.

---

## Prerequisites

- Node.js + npm

---

## First-time setup

```bash
cd utapwebsiite
npm install
```

If you add Supabase-powered forms, follow the same **`VITE_`** pattern as other Vite apps and document vars in [`../operations/environment-variables.md`](../operations/environment-variables.md).

---

## Run locally

```bash
npm run dev
npm run build
npm run preview
npm run typecheck   # if configured
```

---

## Where things live

- Main UI: **`src/App.tsx`** (large single-file layout is common in this repo).  
- Hooks: **`src/hooks/`**  
- Styles: **`src/index.css`**, Tailwind if configured in `package.json`

---

## Contributing

1. Keep **performance** reasonable: optimise images, avoid blocking third-party calls on first paint.  
2. **Accessibility:** heading order, contrast, focus states for interactive elements.  
3. **Links** to app store listings or deep links should stay updated when bundle IDs or campaigns change.

---

## Related docs

- [`../platform/platform-map.md`](../platform/platform-map.md)  
