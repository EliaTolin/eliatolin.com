# eliatolin.com

Personal website of [Elia Tolin](https://github.com/EliaTolin) — software engineer and entrepreneur.

Bilingual (🇮🇹 / 🇬🇧), statically rendered, self-hosted on [Coolify](https://coolify.io).

## Stack

| Concern    | Choice                                                                            |
| ---------- | --------------------------------------------------------------------------------- |
| Framework  | [Next.js 16](https://nextjs.org) — App Router, Turbopack                          |
| Language   | TypeScript (strict)                                                               |
| Styling    | [Tailwind CSS v4](https://tailwindcss.com) — CSS-first config                     |
| i18n       | [next-intl](https://next-intl.dev) — `/it` and `/en` prefixes                     |
| Theming    | [next-themes](https://github.com/pacocoursey/next-themes) — light / dark / system |
| Deployment | Docker (`output: 'standalone'`) on Coolify                                        |

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

The site is served on http://localhost:3000 and redirects to `/it`.

### Scripts

| Command                | What it does                                      |
| ---------------------- | ------------------------------------------------- |
| `npm run dev`          | Dev server with hot reload                        |
| `npm run build`        | Production build into `.next/`                    |
| `npm run start`        | Serve the production build                        |
| `npm run lint`         | ESLint (flat config, Next + React Compiler rules) |
| `npm run typecheck`    | `tsc --noEmit`                                    |
| `npm run format`       | Prettier, with Tailwind class sorting             |
| `npm run format:check` | Prettier in check mode — what CI runs             |

## Project layout

```
messages/            it.json, en.json — every user-facing string
public/              static assets served at the root
src/
  app/
    [locale]/        all pages; layout.tsx is the root layout
    globals.css      design tokens + Tailwind theme
    robots.ts        /robots.txt
    sitemap.ts       /sitemap.xml, with hreflang alternates
  components/        UI, one file per component
  config/site.ts     site-wide, non-translatable values
  i18n/              routing, navigation helpers, request config
  lib/               small shared helpers
  proxy.ts           locale negotiation (Next 16's renamed middleware)
```

### Adding content

1. Add the strings to **both** `messages/it.json` and `messages/en.json` — the
   two files must stay structurally identical or the build fails on the missing key.
2. Create the page under `src/app/[locale]/<route>/page.tsx`.
3. Add the route to the `routes` array in `src/app/sitemap.ts`.

### Adding a page link to the nav

Update `navItems` in `src/components/site-header.tsx` and add the matching key
under `nav` in both message files.

### Design tokens

Colours, fonts and spacing live in `src/app/globals.css`. Components read the
**semantic** tokens (`--background`, `--foreground`, `--muted-foreground`,
`--border`, `--accent`), never the raw palette, so the whole site can be
re-skinned from that one file.

## Internationalisation

- Locales: `it` (default) and `en`, declared in `src/i18n/routing.ts`.
- `localePrefix: 'always'` — every URL carries its locale (`/it/about`, `/en/about`).
- Always import `Link`, `useRouter`, `usePathname` and `redirect` from
  `@/i18n/navigation`, **never** from `next/link` or `next/navigation`, or the
  locale prefix gets lost.

## Deployment (Coolify)

The repository ships a multi-stage `Dockerfile` that builds the Next.js
standalone output and runs it as a non-root user on port `3000`.

In Coolify:

1. **New Resource → Application → Public/Private Repository**, pointing at this repo.
2. Build Pack: **Dockerfile**.
3. Port: `3000`.
4. Build-time variable: `NEXT_PUBLIC_SITE_URL=https://eliatolin.com` — it is
   baked into the client bundle at build time, so a runtime-only variable is
   **not** enough.
5. Set the domain and let Coolify handle TLS.

To check the production image locally:

```bash
docker compose up --build
```

> The build fetches Inter and Instrument Serif from Google Fonts via
> `next/font`, so the build environment needs outbound network access.

## Environment variables

| Variable               | Required | Notes                                                                  |
| ---------------------- | -------- | ---------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | yes      | Canonical base URL. Build-time — used by metadata, sitemap and robots. |

This repository is **public**. Never commit real secrets: `.env*` files are
gitignored, and `.env.example` documents the shape only.

## License

[MIT](./LICENSE) — the code is free to reuse. The written content, images and
personal branding are not.
