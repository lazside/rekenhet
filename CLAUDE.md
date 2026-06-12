<!--
╔═══════════════════════════════════════════════════════════════╗
║              REKENHET.NL — ULTIMATE VIBE CODING              ║
║              STRICT AGENTIC WORKSPACE INSTRUCTIONS           ║
╚═══════════════════════════════════════════════════════════════╝
-->

# 🚨 CRITICAL: This is NOT the Next.js you know

This project runs **Next.js 16.2.7** with **Turbopack**. This is a pre-release, cutting-edge version. APIs, conventions, and file structure may all differ from your training data. **Before writing any code**, always read the relevant guide in `node_modules/next/dist/docs/`. Heed all deprecation notices. Do NOT assume APIs work the way older Next.js versions worked.

---

# 🧠 PROJECT DNA

| Attribute | Value |
|-----------|-------|
| **Domain** | `rekenhet.nl` — Dutch calculator platform |
| **Language** | **Dutch (nl_NL)** — ALL text, URLs, slugs, content, alt text, labels, error messages |
| **Framework** | Next.js 16.2.7 (App Router) |
| **Rendering** | SSG via `generateStaticParams` (hybrid — some SSR) |
| **Build** | `next dev --turbopack` / `next build` |
| **Styling** | Tailwind CSS v4 + `@tailwindcss/postcss` |
| **Icons** | `lucide-react` |
| **Utility** | `clsx` + `tailwind-merge` (`cn()`), `class-variance-authority` |
| **Validation** | Zod v4 (API inputs, forms) |
| **TypeScript** | Strict mode, `@/*` path alias → `./src/*` |
| **Linting** | ESLint v9 with `eslint-config-next@16.2.7` |
| **Email** | Resend API |
| **Auth** | None (public platform) |
| **Analytics** | Plausible / Umami (opt-in via env) |
| **Ads** | Google AdSense with CLS-safe banners + adblock detection + affiliate fallback |
| **PDF** | `pdf-lib` for report generation |

---

# 📁 DIRECTORY LAYOUT (source)

```
src/
├── app/                  # Next.js App Router pages + API routes
│   ├── [category]/       # Dynamic category dashboard + calculator pages
│   ├── api/              # All API endpoints
│   ├── calculators/      # Calculators listing + topic pages
│   ├── bruto-netto/      # Parameterized salary lookup pages
│   ├── omrekenen/        # Unit conversion pages
│   ├── embed/            # Embeddable calculator iframes
│   ├── lokaal/           # City-localized pages
│   ├── contact/          # Contact form page
│   ├── layout.tsx        # Root layout (Dutch HTML lang, light-mode force)
│   ├── page.tsx          # Homepage
│   ├── sitemap.ts        # Dynamic sitemap
│   ├── robots.ts         # Robots.txt
│   └── ...
├── components/
│   ├── ads/              # AdSense + adblock detection
│   ├── affiliate/        # Affiliate marketing offers
│   ├── calculator/       # ALL calculator components (30+)
│   ├── charts/           # Chart rendering
│   ├── content/          # SEO content page layouts
│   ├── cookies/          # Cookie consent
│   ├── embed/            # Embed code generator
│   ├── home/             # Homepage-specific components
│   ├── layout/           # Shell: Header, Footer, RootLayoutInner, CalculatorLayout, AdSenseSlots
│   ├── seo/              # JsonLd, CalcDisclaimer, RelatedCalculators, LiveDataBadge
│   ├── share/            # Share links
│   ├── ui/               # Primitives: Badge, Button, Card, Container
│   └── ...
├── content/              # SEO content pages (keyword-targeted guides)
│   ├── index.ts          # Registry with registerPages(), getAllContentPages()
│   ├── types.ts          # SeoContentPage interface
│   └── pages/            # Individual content page data files
├── data/                 # Static data registries
│   ├── calculators.ts    # Master calculator registry (CalculatorMeta[])
│   ├── categories.ts     # 7 categories with slugs, icons, colors
│   ├── calculator-faqs.ts
│   ├── affiliate-offers.json
│   ├── cities.json / municipalities.json / postcode-coords.json
│   ├── tax-rates-2026.json
│   ├── units.json
│   └── updates.json
├── lib/                  # Business logic, utilities, services
│   ├── ads/config.ts     # Ad sizes, slots, breakpoints
│   ├── affiliate/        # Affiliate offer lookup
│   ├── calculators/      # Compute functions, component registry, types
│   ├── cookies/          # Consent management
│   ├── email/            # Resend integration + templates
│   ├── pdf/              # PDF report generation
│   ├── profile/          # Persistent user profile
│   ├── rates/            # Tax rate fetching + caching
│   ├── schemas/          # Zod schemas
│   ├── search/           # Search index utilities
│   ├── seo/              # Title builder, JSON-LD generators
│   ├── session/          # Calculator state persistence
│   ├── share/            # Share URL encoding
│   ├── solar/            # Solar calculator logic
│   ├── telemetry/        # Analytics provider
│   ├── units/            # Unit conversion engine
│   ├── vehicle/          # RDW + MRB (vehicle tax) logic
│   ├── utils.ts          # cn(), formatNL(), formatEUR(), formatPct(), slugify()
│   └── rate-limit.ts     # Per-endpoint rate limiter
├── proxy.ts              # Edge rate-limiting middleware
├── scripts/              # Dev tooling
├── types/index.ts        # Shared types (Category, CalculatorMeta, SeoData, JsonLd, FaqItem, etc.)
└── lib/utils.ts          # Utility functions
```

---

# 🔒 UNBREACHABLE CODING CONVENTIONS

## 1. LANGUAGE — DUTCH ONLY
All user-facing text MUST be in Dutch (nl_NL). This includes:
- Page titles, headings, descriptions
- Form labels, placeholders, error messages
- Button text, alt text, aria labels
- FAQ questions and answers
- SEO meta titles, meta descriptions, keywords
- Breadcrumb labels
- JSON-LD `name` and `description` fields
- Error pages and toasts
- Cookie consent text
- **NEVER** use English for user-facing text

## 2. IMPORTS — ALWAYS USE @/ ALIAS
```
✅ import { Button } from "@/components/ui/Button";
✅ import { cn } from "@/lib/utils";
✅ import type { CalculatorMeta } from "@/data/calculators";
❌ import Button from "../../components/ui/Button";
```

## 3. TAILWIND CLASSES — USE cn() UTILITY
```tsx
import { cn } from "@/lib/utils";
<div className={cn("base-class", condition && "conditional-class")} />
```

## 4. CALCULATOR COMPONENTS — ALWAYS 'use client'
Every calculator component that uses React state/effects MUST be:
- Marked `"use client"` at the top
- Lazy-loaded via the component registry (`src/lib/calculators/component-registry.tsx`)
- Wrapped in `CalculatorErrorBoundary` when rendered

## 5. SEO — EVERY PAGE NEEDS:
| Element | Required? | How |
|---------|-----------|-----|
| `generateMetadata` | ✅ Always | Use `buildMetadata()` or page-specific builder from `@/lib/seo/title-builder` |
| Canonical URL | ✅ Always | Set `alternates: { canonical: url }` |
| JSON-LD | ✅ Always | Use components from `@/components/seo/JsonLd` |
| BreadcrumbList schema | ✅ Always | Every page deeper than root |
| `robots` | ✅ Always | `index: true/false` + `follow: true/false` |
| Open Graph | ✅ Always | locale `nl_NL`, type `website` |
| Twitter card | ✅ Always | `summary_large_image` |
| Keywords | ✅ Always | Array of Dutch keyword strings |

## 6. 🚀 CALCULATOR DEPLOYMENT CHECKLIST — 10 VERPLICHTE STAPPEN

Elke nieuwe calculator doorloopt dit exacte stappenplan. Niets overslaan.

| # | Stap | Waar | Typefoutrisico |
|---|------|------|----------------|
| 1 | **Rekenkern** schrijven | `src/lib/calculators/modules/[slug]/compute.ts` | ✅ |
| 2 | **Meta** toevoegen | `src/lib/calculators/modules/[slug]/meta.ts` — `CalculatorMeta` object | ✅ |
| 3 | **Schema** toevoegen | `src/lib/calculators/modules/[slug]/schema.ts` — Zod validatie | ✅ |
| 4 | **React component** maken | `src/lib/calculators/modules/[slug]/ui.tsx` — `"use client"` | ✅ |
| 5 | **FAQs** toevoegen | `src/lib/calculators/modules/[slug]/faqs.ts` — minimaal 3-5 stuks | ✅ |
| 6 | **Barrel export** | `src/lib/calculators/modules/[slug]/index.ts` — re-export alles | ✅ |
| 7 | **Data registry** | `src/data/calculators.ts` — import `META` uit `modules/[slug]/meta` | ❌ VERGETEN |
| 8 | **Component registry** | `src/lib/calculators/component-registry.tsx` — `import` naar `modules/[slug]/ui` | ❌ VERGETEN |
| 9 | **FAQ registry** | `src/data/calculator-faqs.ts` — import `FAQs` uit `modules/[slug]/faqs` | ❌ VERGETEN |
| 10 | **Typecheck + consistency** | `npx tsc --noEmit` + `npm run check` | ✅ |

**De 6 verplichte bestanden per module:**

```
src/lib/calculators/modules/[calculator-slug]/
├── index.ts       → Barrel export (re-export alles)
├── meta.ts        → CalculatorMeta object (SEO, routing)
├── schema.ts      → Zod validatie schema + field definitions
├── compute.ts     → Pure rekenkern (computeFn)
├── faqs.ts        → 3-5 FAQ items voor FAQPage JSON-LD
└── ui.tsx         → "use client" React component
```

**✅ GEBRUIK ALTIJD de gedeelde UI-primitives** uit `@/lib/calculators/ui-primitives`:

| Primitieve | Vervangt | Voorbeeld |
|-----------|----------|-----------|
| `<CalcCard>` | `rounded-xl border border-gray-200 bg-white p-5 shadow-sm` | `CalcCard` wrap elke form/result sectie |
| `<CalcSectionTitle icon={...} title="..." />` | `h2` met icoon + `flex items-center gap-2` | Sectie kopjes |
| `<CalcInput id label value onChange prefix="€" />` | Input met label, border, focus ring | Alle getalvelden |
| `<CalcRange id label value onChange min max />` | Slider met gradient + thumb styling | Schuifregelaars |
| `<CalcSelect id label value onChange options />` | Select met label + border | Keuzelijsten |
| `<CalcToggle id label checked onChange />` | `button[role="switch"]` met animatie | Aan/uit opties |
| `<CalcResultRow label value type />` | `flex justify-between rounded-xl px-5 py-3.5` | Resultaatrijen (type: default/success/warning/info/highlight) |
| `<CalcHero label value gradient />` | `bg-gradient-to-br ... p-6 text-white shadow-lg` | Primaire uitkomst |
| `<CalcTooltip text />` | `Info` icon + popup | Uitleg bij velden |
| `<CalcDisclaimer>` | `text-xs text-gray-400 text-center` | Footer disclaimer |

**Kopieer `src/lib/calculators/modules/_template/`** voor elke nieuwe calculator.
Dit template bevat alle 6 bestanden met TODO's en een werkend voorbeeld van alle primitives.

**✅ GEBRUIK ALTIJD de gedeelde input classes** uit `@/lib/calculators/ui-primitives`:
- `INPUT_CLASSES` — voor alle `<input>` velden (standaard)
- `SELECT_CLASSES` — voor alle `<select>` dropdowns
- `inputCn(prefix)` — voor inputs met €-teken (geeft `pl-7` mee)
- Of gebruik `<CalcInput>`, `<CalcSelect>` componenten die dit automatisch doen

Nooit hand-rolled `className` voor inputs. Geen `type="number"` — altijd `type="text"`.

**Let op bij verhuizingen:** Als een calculator van categorie verandert (bv. `geld-en-verzekeringen` → `hypotheek`):
- Voeg een **308 redirect** toe in `next.config.ts` (`redirects()`)
- Update de href in `popularTools[]` op de homepage
- Check of er `relatedSlugs` in andere calculators naar de oude slug verwijzen

## 7. API ROUTES — MANDATORY PATTERNS:
- ✅ Zod schema validation on ALL inputs
- ✅ Rate limiting (import from `@/lib/rate-limit.ts`)
- ✅ Honeypot on contact forms
- ✅ NextResponse.json() — never use Response directly
- ✅ Return Dutch error messages
- ✅ Set `X-Robots-Tag: noindex` header (already handled in next.config.ts for `/api/`)
- ✅ 5xx errors → return JSON, never throw

## 8. COMPONENT ARCHITECTURE
- ✅ Barrel exports: each component dir has `index.ts` re-exporting all public components
- ✅ Interface-first: define Props interface before the component function
- ✅ Default export for page components (Next.js requirement)
- ✅ Named export for non-page components
- ✅ Server Components by default, `"use client"` only when state/effects needed

## 9. FORMATTING NUMBERS
```tsx
import { formatNL, formatEUR, formatPct } from "@/lib/utils";
formatNL(1234.56)    // → "1.234,56"
formatEUR(1234.56)   // → "€ 1.234,56"
formatPct(21)        // → "21,0%"
```

## 10. JSON-LD BEST PRACTICES
- Use pure functions from `@/lib/seo/jsonld` (do NOT write ad-hoc JSON-LD objects)
- Use React components from `@/components/seo/JsonLd` for rendering
- Calculator pages MUST get: BreadcrumbList + WebApplication + optional FAQPage
- Homepage MUST get: WebSite (with SearchAction) + Organization
- Use `<script type="application/ld+json">` with `dangerouslySetInnerHTML`

## 11. AD PLACEMENT RULES
- ✅ Every ad container MUST have a fixed `min-height` (zero CLS guarantee)
- ✅ Use `AdSenseBanner` component from `@/components/ads/AdSenseBanner`
- ✅ AdSense slot IDs come from environment variables only
- ✅ Adblock detection is automatic — affiliate fallback shows when adblock is detected
- ❌ Never hardcode AdSense slot IDs in components

## 12. ENVIRONMENT VARIABLES
All public vars are prefixed `NEXT_PUBLIC_`. See `.env.example` for complete list. Never hardcode values that belong in env.

## 13. ROUTE PATTERNS
| Pattern | Type | Description |
|---------|------|-------------|
| `/[category]/[slug]` | SSG | Calculator pages |
| `/calculators/[topic]` | SSG | SEO content landing pages |
| `/calculators` | Static | Calculator listing hub |
| `/bruto-netto/[amount]` | SSG | Parameterized salary pages |
| `/omrekenen/[pair]` | SSG | Unit conversion pages |
| `/embed/[slug]` | SSG | Embeddable iframes |
| `/lokaal/[city]` | SSG | City-localized pages |
| `/api/*` | Dynamic | JSON API endpoints |

## 14. ERRORS & EDGE CASES
- Calculator errors → caught by `CalculatorErrorBoundary`, show friendly Dutch message
- 404 → custom `not-found.tsx` with Dutch copy
- API rate limit → 429 with Dutch "Te veel verzoeken" message
- Missing calculator slug → `notFound()` from `next/navigation`
- Missing env vars → graceful fallback, never crash

## 15. GIT COMMIT CONVENTIONS
Format: `type(scope): Dutch description`
Types: feat, fix, refactor, perf, seo, style, content, chore

---

# 🛡️ ERROR-PREVENTION CHECKLIST (run before every commit)

- [ ] `npm run lint` passes with zero errors
- [ ] `npm run check` (consistency check) passes
- [ ] All **10 stappen** van de Calculator Deployment Checklist zijn doorlopen
- [ ] `updates.json` heeft een entry voor nieuwe calculators (toont op homepage)
- [ ] `popularTools` op homepage is up-to-date (nieuwe tools + correcte href's)
- [ ] Alle nieuwe calculator slugs zijn uniek in de registry
- [ ] Elke nieuwe pagina heeft `generateMetadata` met een Metadata object
- [ ] Elke nieuwe pagina heeft JSON-LD structured data (BreadcrumbList + WebApplication)
- [ ] Elke nieuwe pagina heeft een canonical URL in alternates
- [ ] Elke nieuwe API route heeft Zod validation + rate limiting
- [ ] Geen hardcoded strings — alle user-facing tekst is Nederlands
- [ ] `cn()` is gebruikt voor alle conditional Tailwind classes
- [ ] Alle nieuwe componenten hebben barrel exports in hun `index.ts`
- [ ] Geen `any` types — gebruik `unknown` + narrowing
- [ ] AdSense slots verwijzen naar env vars, geen hardcoded IDs
- [ ] Bij verhuizing van een calculator: 308 redirect + oude links updaten

---

# 🔍 HOW TO RESEARCH BEFORE CODING

1. **Always read the Next.js 16 docs first** — `node_modules/next/dist/docs/` — before writing any code involving Next.js APIs
2. **Check for existing patterns** — search the codebase for how similar things are done before creating something new
3. **Run the linter and type checker** — `npx next lint` and `npx tsc --noEmit`
4. **Run the project** — `npm run dev` (Turbopack) to test changes live
