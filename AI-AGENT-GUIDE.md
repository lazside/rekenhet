# 🤖 AI Agent Guide — Rekenhet.nl

> **Doel:** Dit bestand beschrijft de architectuur, conventies en werkwijze van Rekenhet.nl, specifiek voor AI coding agents.  
> Een agent die dit bestand leest, moet zelfstandig een nieuwe calculator kunnen bouwen, bugs kunnen fixen en UI-verbeteringen kunnen doorvoeren.

---

## 📋 Inhoud

- [1. Overzicht](#1-overzicht)
- [2. Calculator Architectuur (dual-registry)](#2-calculator-architectuur-dual-registry)
- [3. Stappenplan: Nieuwe Calculator](#3-stappenplan-nieuwe-calculator)
- [4. UI Componenten Bibliotheek](#4-ui-componenten-bibliotheek)
- [5. SEO & Metadata](#5-seo--metadata)
- [6. AdSense & Analytics](#6-adsense--analytics)
- [7. Conventies](#7-conventies)
- [8. Veelgemaakte Fouten](#8-veelgemaakte-fouten)
- [9. Dutch Tax Data Patterns](#9-dutch-tax-data-patterns)
- [10. Checklist voor Livegang](#10-checklist-voor-livegang)

---

## 1. Overzicht

**Tech stack:** Next.js 16 (App Router) + TypeScript 5 (strict) + Tailwind v4 + Turbopack

**Architectuur:**
- **SSG-first** — alle calculators worden statisch gegenereerd bij buildtijd
- **`"use client"`** — calculator componenten zijn client-side (rekenlogica is interactief)
- **Geen API nodig** voor calculators — alle rekenlogica draait in de browser
- **Data** in statische TypeScript/JSON — geen database voor calculator content

**Mapstructuur (relevant voor AI):**
```
src/
├── data/                    ← Calculator metadata, categorieën, FAQs
│   ├── calculators.ts       ← MASTER REGISTRY — alle calculators hier
│   ├── categories.ts        ← 8 categorieën met iconen/kleuren
│   ├── calculator-faqs.ts   ← FAQ data per calculator
│   └── tax-rates-2026.json  ← Gedeelde belastingdata
├── components/
│   ├── calculator/          ← Elke calculator in eigen bestand
│   ├── ui/                  ← Herbruikbare primitieven (Tooltip, Toggle, etc.)
│   ├── home/                ← Homepage-secties
│   ├── layout/              ← Header, Footer, layout
│   ├── cookies/             ← Cookie consent bar
│   └── share/               ← ShareToolbar, PDF export
├── lib/
│   ├── calculators/         ← Rekenlogica + component registry
│   │   ├── bruto-netto-2026.ts  ← Tax engine (voorbeeld complexe logica)
│   │   ├── box3.ts              ← Vermogensbelasting
│   │   ├── annuity.ts           ← Annuïteiten formule
│   │   ├── tax-types.ts         ← Gedeelde type-definities
│   │   ├── component-registry.tsx ← LAZY LOADING REGISTRY
│   │   └── *.ts                ← Alle compute functies
│   ├── seo/                 ← Metadata/JSON-LD builders
│   ├── ads/                 ← AdSense configuratie
│   └── utils.ts             ← cn(), formatEUR(), formatNL(), formatPct()
├── app/
│   ├── [category]/[slug]/   ← Calculator pagina (SSG via generateStaticParams)
│   ├── layout.tsx           ← Root layout (fonts, JSON-LD, analytics)
│   ├── page.tsx             ← Homepage
│   ├── sitemap.ts           ← Dynamische sitemap
│   ├── feed.xml/route.ts    ← RSS feed
│   └── updates/page.tsx     ← Updates & Wetgeving pagina
```

---

## 2. Calculator Architectuur (dual-registry)

Elke calculator bestaat uit **twee registraties** en maximaal **drie bestanden**:

```
┌──────────────────────────────────────────────────────────┐
│                   src/data/calculators.ts                │
│                                                          │
│  DATA REGISTRY — metadata voor SEO, routing, sitemap    │
│  { slug, title, description, metaTitle, keywords, ... } │
└───────────────────────┬──────────────────────────────────┘
                        │
┌───────────────────────▼──────────────────────────────────┐
│           src/lib/calculators/component-registry.tsx     │
│                                                          │
│  COMPONENT REGISTRY — lazy-loaded React component        │
│  registry.set("slug", () => import("./path"))           │
└───────────────────────┬──────────────────────────────────┘
                        │
┌───────────────────────▼──────────────────────────────────┐
│           src/components/calculator/MijnCalc.tsx         │
│                                                          │
│  REACT COMPONENT — "use client", useState, useMemo       │
│  Optioneel: los compute bestand in lib/calculators/     │
└──────────────────────────────────────────────────────────┘
```

**Waarom twee registraties?**
- `calculators.ts` → wordt gebruikt door sitemap, metadata, categorie-pagina's (server-side)
- `component-registry.tsx` → lazy-loaded client-side components (optimale bundle size)
- Ze zijn gescheiden zodat server-componenten niet de client-code importeren

**Verdeling rekenlogica:**
- **Simpele calculators** (procenten, BMI): logica inline in component met `useMemo`
- **Complexe calculators** (bruto/netto, box3): losse compute functies in `src/lib/calculators/`

---

## 3. Stappenplan: Nieuwe Calculator

### Stap 1 — Maak het compute bestand (optioneel)

Alleen voor complexe rekenlogica. Bestand in `src/lib/calculators/`.

**Regels:**
- Pure functies — geen React, geen side-effects
- TypeScript strict: types voor input en output
- Nederlandse namen voor NL-specifieke concepten
- Ronden met `Math.round(x * 100) / 100` voor EUR-bedragen
- Géén `"use client"` — dit is server-safe

**Voorbeeld** `src/lib/calculators/minimumloon.ts`:
```ts
export interface MinimumloonInput {
  leeftijd: number;
  urenPerWeek: number;
  periode: "eerste" | "tweede";
}

export interface MinimumloonUitslag {
  uurloon: number;
  maandloonBruto: number;
  jaarBruto: number;
}

export function berekenMinimumloon(input: MinimumloonInput): MinimumloonUitslag {
  // pure rekenlogica hier
}
```

### Stap 2 — Maak het React component

`src/components/calculator/MijnCalculator.tsx`

**Regels:**
- `"use client"` bovenaan
- `export default function MijnCalculator()`
- State met `useState`, resultaten met `useMemo`
- Gebruik UI primitieven uit `@/components/ui/` (Tooltip, Toggle, ResultRow, etc.)
- Gebruik `formatEUR()` / `formatNL()` voor getalweergave
- Gebruik `cn()` uit `@/lib/utils` voor conditional classes
- Voeg `ShareToolbar` onderaan toe
- Voeg `aria-label` op form containers

**Vaste component structuur:**
```tsx
"use client";

import { useState, useMemo } from "react";
import { IconName } from "lucide-react";
import { formatEUR } from "@/lib/utils";
import { ShareToolbar } from "@/components/share/ShareToolbar";
import { Toggle, ResultRow } from "@/components/ui";

export default function MijnCalculator() {
  const [input, setInput] = useState(defaultValue);
  const result = useMemo(() => berekenIets(input), [input]);

  return (
    <div className="space-y-5" role="form" aria-label="Mijn Calculator">
      {/* Input sectie */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
        <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
          <IconName className="h-4 w-4 text-indigo-600" />
          Jouw gegevens
        </h2>
        {/* inputs hier */}
      </div>

      {/* Resultaat sectie */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-3">
        {/* resultaten hier */}
      </div>

      {/* Share */}
      <ShareToolbar calculatorType="mijn-calculator" calculatorName="..." categoryName="..."
        inputs={[...]} results={[...]} />
    </div>
  );
}
```

### Stap 3 — Registreer in data registry

In `src/data/calculators.ts`, voeg toe aan de `registry` array:

```ts
{
  slug: "mijn-calculator",
  categorySlug: "werk-en-inkomen",     // bestaande slug uit categories.ts
  title: "Mijn Calculator",
  description: "Korte beschrijving voor SEO en kaartweergave (max 160 chars).",
  metaTitle: "Mijn Calculator — Unieke Title Tag | Rekenhet.nl",
  metaDescription: "SEO meta description met zoekwoorden (max 160 chars).",
  keywords: ["mijn", "calculator", "zoekwoorden"],
  featured: true,                       // toont op homepage + hoge sitemap priority
  relatedSlugs: ["bruto-netto-salaris-calculator"],  // voor interne linkbuilding
}
```

**Velden verplicht:** `slug`, `categorySlug`, `title`, `description`, `metaTitle`, `metaDescription`, `keywords`

### Stap 4 — Registreer in component registry

In `src/lib/calculators/component-registry.tsx`:

```tsx
registry.set("mijn-calculator", () => import("@/components/calculator/MijnCalculator"));
```

### Stap 5 — Voeg FAQs toe

In `src/data/calculator-faqs.ts`:

```ts
{
  slug: "mijn-calculator",
  faqs: [
    { question: "Hoe werkt deze calculator?", answer: "Vul uw gegevens in..." },
    { question: "Is deze calculator gratis?", answer: "Ja, alle calculators op Rekenhet.nl zijn gratis." },
    { question: "Hoe nauwkeurig is de berekening?", answer: "Gebaseerd op actuele wet- en regelgeving..." },
  ],
}
```

**Minimaal 3 FAQs** voor FAQPage JSON-LD rich snippet in Google.

### Stap 6 — Optioneel: SEO content pagina

Maak een content pagina in `src/content/pages/` voor een keyword-targeted SEO landingspagina met ingebedde calculator.

---

## 4. UI Componenten Bibliotheek

Deze componenten zijn beschikbaar voor **alle** calculators:

### Uit `@/components/ui/`

| Component | Import | Use case |
|-----------|--------|----------|
| `Container` | `import { Container } from "@/components/ui"` | Max-width wrapper |
| `Badge` | `import { Badge } from "@/components/ui"` | Labels (variant: info, warning, success, outline) |
| `Card` | `import { Card } from "@/components/ui"` | Content card met shadow/hover |
| `Tooltip` | `import { Tooltip } from "@/components/ui"` | Info popover op hover |
| `Toggle` | `import { Toggle } from "@/components/ui"` | Aan/uit switch met label |
| `ResultRow` | `import { ResultRow } from "@/components/ui"` | Label + waarde rij (type: default, success, warning, info, highlight) |
| `SalarySlider` | `import { SalarySlider } from "@/components/ui"` | Range slider met EUR display |

### Uit `@/components/share/`

| Component | Use case |
|-----------|----------|
| `ShareToolbar` | Deel/download knoppen onder calculator |
| `ShareCalculationLink` | Deelbare URL met state |

### Uit `@/lib/utils.ts`

| Functie | Use case |
|---------|----------|
| `cn(...classes)` | Merge Tailwind classes (clsx + tailwind-merge) |
| `formatEUR(num)` | €1.234,56 formaat |
| `formatNL(num, decimals?)` | 1.234,56 formaat (zonder €) |
| `formatPct(num, decimals?)` | 12,3% formaat (deelt door 100) |

---

## 5. SEO & Metadata

### Elke calculator heeft:

1. **`metaTitle` en `metaDescription`** — in `src/data/calculators.ts`, gebruikt door `buildCalculatorMetadata()`
2. **JSON-LD** — automatisch via `calculatorPageSchemas()`: `WebApplication` + `BreadcrumbList` + `FAQPage`
3. **Canonical URL** — automatisch via `buildMetadata()` (pad is `/${categorySlug}/${slug}`)
4. **Keywords** — voor interne search index

### Sitemap wordt automatisch gegenereerd:

`src/app/sitemap.ts` leest `getAllCalculators()` en genereert entries met:
- `priority`: featured calculators = 0.84, overig = 0.64
- `changeFrequency`: per categorie (wiskunde = yearly, rest = monthly)
- `lastModified`: gebaseerd op bestandswijzigingsdatum

**Nieuwste calculators worden ook op de homepage getoond** (laatste 4 uit registry).

---

## 6. AdSense & Analytics

### AdSense
- Script wordt **niet** statisch geladen — alleen na cookie consent
- `CookieConsentBar` moet zichtbaar zijn vóór AdSense mag laden
- `useAdSenseLoader()` in `RootLayoutInner` wacht op `rekenhet-consent-granted` event
- Alle containers hebben `min-height` → **CLS-zero garantie**
- Adblock detectie via `ins.clientHeight === 0` na 3s → affiliate fallback

### Analytics
- **Geen Google Analytics** — vervangen door **Plausible** (privacy-first, cookieloos)
- Server-side telemetry proxy in `/api/telemetry` (omzeilt adblockers)
- Stuurt alleen anonieme data: calculatorId + action

---

## 7. Conventies

### Naamgeving
| Type | Conventie | Voorbeeld |
|------|-----------|-----------|
| Calculator slug | `kebab-case` | `bruto-netto-salaris-calculator` |
| Category slug | `kebab-case` | `werk-en-inkomen` |
| Compute functie | `bereken` prefix | `berekenMinimumloon()` |
| Component bestand | PascalCase | `BrutoNettoCalculator.tsx` |
| TypeScript types | PascalCase | `BrutoNettoBreakdown` |
| Interfaces | `Interface` suffix in bestand | inline in compute bestand |

### Imports volgorde
```tsx
// 1. React/Next
import { useState, useMemo } from "react";
import Link from "next/link";

// 2. Externe packages
import { Euro } from "lucide-react";

// 3. Interne app imports
import { formatEUR } from "@/lib/utils";
import { Toggle, ResultRow } from "@/components/ui";
import { berekenIets } from "@/lib/calculators/iets";
```

### Styling
- Tailwind v4 utility classes — geen CSS modules of styled-components
- Kleurenschema: indigo (primary), emerald (success), amber (warning), rose/red (danger)
- Border radius: `rounded-xl` voor kaarten, `rounded-lg` voor inputs
- Shadows: `shadow-sm` voor kaarten, `shadow-lg` voor modals
- Font: IBM Plex Sans (sans) + JetBrains Mono (mono)

### Toegankelijkheid
- Alle inputs hebben `aria-label` of `<label>`
- Toggle gebruikt `role="switch"` en `aria-checked`
- Knoppen hebben duidelijke `aria-label`
- Focus-visible ring op alle interactive elementen

---

## 8. Veelgemaakte Fouten

### 🔴 KRITIEK: Box 3 schulden
**Fout:** Schulden werden met 6,01% vermenigvuldigd en **opgeteld** bij rendementsgrondslag.
**Correct:** Schulden boven €3.700 drempel **aftrekken** van bezittingen, vóór heffingsvrij vermogen.

### 🟡 MEDIUM: Zelfstandigenaftrek MKB-besparing
**Fout:** MKB-besparing berekend over `totaleOndernemersaftrek`.
**Correct:** MKB-besparing = `mkbVrijstellingBedrag × marginaalTarief`.

### 🟡 MEDIUM: Ontslagvergoeding afronding
**Fout:** `0.33` gebruikt (te weinig).
**Correct:** `1/3` gebruiken.

### 🟡 MEDIUM: Bonus Netto drempels
**Fout:** Vaste drempels (38498/77936) die niet matchen met belastingschijven.
**Correct:** Koppelen aan actuele schijven of tabel gebruiken.

### 🟢 MINOR: Hydration mismatch
**Fout:** Script dat DOM manipuleert tijdens React hydration.
**Correct:** Gebruik CSS-only animaties, geen JS die style attributes aanpast.

### 🟢 MINOR: Formule duplicatie
**Fout:** `HuurtoeslagCalculator.tsx` heeft eigen berekening los van `toeslagen.ts`.
**Correct:** Eén source of truth.

### 🟢 MINOR: Vakantiegeld toggle label
**Fout:** Label zegt alleen "Vakantiegeld (8%)" — onduidelijk of het toegevoegd of inbegrepen is.
**Correct:** Label moet actie beschrijven: "Voeg 8% vakantiegeld toe".

---

## 9. Dutch Tax Data Patterns

### Belastingschijven (Box 1) — 2026
```ts
const BRACKETS = [
  { min: 0,       max: 40018, rate: 35.82 },
  { min: 40018,   max: 76817, rate: 37.48 },
  { min: 76817,   max: Infinity, rate: 49.50 },
];
```

### Heffingskortingen — 2026
```ts
const AHK = { max: 3070, phaseOutStart: 24928, phaseOutRate: 6.595 };
const AK = {
  brackets: [
    { min: 0, max: 11500, rate: 9.8 },
    { min: 11500, max: 23500, rate: 30.074 },
    { min: 23500, max: 40018, rate: 2.685 },
  ],
  phaseOutStart: 40018, phaseOutRate: 6.51, max: 5598,
};
```

### PaaS bij werken met bedragen
- **Altijd** `Math.round(x * 100) / 100` voor EUR-bedragen (2 decimalen)
- **Nooit** floating point vergelijkingen — gebruik `> 0.005` i.p.v. `> 0`
- **Gebruik** `formatEUR()` voor weergave — nooit handmatige formatting
- **Documenteer** de bron van tarieven (Rijksoverheid, Belastingdienst, SVB)

---

## 10. Checklist voor Livegang

### Bij elke nieuwe calculator:
- [ ] `src/data/calculators.ts` — metadata entry toegevoegd
- [ ] `src/lib/calculators/component-registry.tsx` — lazy import toegevoegd
- [ ] `src/data/calculator-faqs.ts` — min. 3 FAQs
- [ ] TypeScript strict: geen `any`, geen impliciete types
- [ ] Alle inputs hebben `aria-label` of `<label>`
- [ ] `ShareToolbar` onderaan component
- [ ] Disclaimer tekst onderaan
- [ ] Edge cases getest (lege input, 0, negatief, extreme waardes)
- [ ] `npm run build` slaagt zonder errors of warnings
- [ ] `npm run check` (consistency) slaagt

### Bij wijzigen van belastingtarieven:
- [ ] Ook `tax-rates-2026.json` updaten
- [ ] `src/lib/calculators/bruto-netto-2026.ts` constanten updaten
- [ ] `src/lib/calculators/tax-comparison.ts` vergelijking updaten
- [ ] `src/data/calculator-faqs.ts` FAQ antwoorden updaten
- [ ] Homepage `"Bijgewerkt tot ..."` badge updaten
- [ ] `/updates` pagina nieuwe entry toevoegen

### Bij deploy:
- [ ] `.env.local` aanwezig met echte AdSense ID
- [ ] `NEXT_PUBLIC_SITE_URL` correct
- [ ] `NEXT_PUBLIC_GOOGLE_VERIFICATION` ingevuld voor Search Console
- [ ] Plausible/Umami credentials in environment (optioneel)
- [ ] `npm run build` ✅
- [ ] `npm run check` ✅

---

> **Laatste tip:** Als AI-agent: lees altijd eerst de bestaande code van een vergelijkbare calculator om het patroon te begrijpen. De `BMI`, `Procenten` of `Minimumloon` calculators zijn goede referenties voor eenvoudige calculators; `BrutoNettoCalculator` is de referentie voor complexe calculators.
