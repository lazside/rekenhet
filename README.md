<div align="center">
  <img src="public/favicon.ico" alt="Rekenhet.nl" width="64" height="64" />

  # 🧮 Rekenhet.nl

  **Moderne, snelle online calculators voor Nederland**

  [![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_v4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
  [![License](https://img.shields.io/badge/license-MIT-blue?style=flat)](LICENSE)

  [rekenhet.nl](https://rekenhet.nl) — Gratis online calculators voor werk & inkomen, ondernemen, geld & verzekeringen, gezondheid, wiskunde en auto & vervoer.
</div>

---

## 📋 Inhoud

- [Over Rekenhet](#-over-rekenhet)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Projectstructuur](#-projectstructuur)
- [Snel Starten](#-snel-starten)
- [Calculator Toevoegen](#-calculator-toevoegen)
- [SEO & Content](#-seo--content)
- [Advertenties & Monetisatie](#-advertenties--monetisatie)
- [Scripts](#-scripts)
- [Configuratie](#-configuratie)
- [Deployment](#-deployment)

---

## 🎯 Over Rekenhet

Rekenhet.nl is een Nederlands rekenplatform met **50+ gratis online calculators**. Het platform is volledig Nederlandstalig, geoptimaliseerd voor zoekmachines en gebouwd met een SSG-first (Static Site Generation) architectuur voor maximale snelheid.

Het platform volgt de **actuele Nederlandse wet- en regelgeving** (belastingtarieven, toeslagen, Nibud-normen) en wordt continu bijgewerkt.

### Categorieën

| Categorie | Voorbeeld calculators |
|-----------|----------------------|
| 💼 **Werk & Inkomen** | Bruto/netto salaris, uurtarief, vakantiegeld, WW, ontslagvergoeding |
| 📊 **Ondernemen** | BTW, winst/verlies, break-even, kostprijs, bijtelling |
| 💰 **Geld & Verzekeringen** | Hypotheek, box 3, dividend, spaardoel, huurtoeslag, studieschuld |
| 🏠 **Hypotheek & Wonen** | Energielabel, maximale hypotheek, maandlasten, overwaarde |
| ❤️ **Gezondheid** | BMI, calorieën, bloeddruk, hartslag, hardlooppace |
| 🔢 **Wiskunde** | Procenten, worteltrekken, breuken, cirkelberekeningen |
| 🚗 **Auto & Vervoer** | Kenteken check, wegenbelasting, ritkosten, snelheidsboete |
| 📅 **Algemeen** | Lengte/gewicht omrekenen, datumtools, weeknummer |

---

## ✨ Features

- ⚡ **SSG-first architectuur** — razendsnelle pagina's via static generation
- 🇳🇱 **Volledig Nederlandstalig** — alle teksten, labels, foutmeldingen en SEO
- 📱 **Mobile-first responsive** — werkt op elk scherm (320px+)
- 🔍 **SEO-geoptimaliseerd** — JSON-LD structured data, sitemap, canonical URLs
- 🧮 **50+ calculators** — elk met eigen rekenlogica en validatie
- 📊 **Result tracking** — resultaten delen, opslaan en PDF-export
- 🛡️ **CLS-zero advertenties** — vaste min-height, adblock-detectie met affiliate fallback
- 🔐 **API beveiliging** — Zod-validatie, rate limiting, honeypot
- ♿ **WCAG-toegankelijk** — aria-labels, skip-link, kleurcontrast

---

## 🏗 Tech Stack

| Onderdeel | Keuze |
|-----------|-------|
| **Framework** | [Next.js 16.2.7](https://nextjs.org/) (App Router) |
| **Bundler** | [Turbopack](https://turbo.build/pack) (`next dev --turbopack`) |
| **Taal** | [TypeScript 5](https://www.typescriptlang.org/) (strict mode) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) + `@tailwindcss/postcss` |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Validatie** | [Zod v4](https://zod.dev/) |
| **E-mail** | [Resend](https://resend.com/) |
| **Advertenties** | Google AdSense + adblock-detectie + affiliate fallback |
| **PDF** | [pdf-lib](https://pdf-lib.org/) |
| **Linting** | ESLint v9 + `eslint-config-next` |
| **Utilities** | `clsx` + `tailwind-merge` (cn()), `class-variance-authority` |

---

## 📁 Projectstructuur

```
src/
├── app/                    # Next.js App Router (pages + API)
│   ├── [category]/         #   Dynamische categorie + calculator pages (SSG)
│   ├── [category]/[slug]/  #     /werk-en-inkomen/bruto-netto-salaris-calculator
│   ├── api/                #   API endpoints (contact, rates, pdf, share, etc.)
│   ├── calculators/        #   Calculator overzicht + SEO content pagina's
│   ├── bruto-netto/        #   Parameterized /bruto-netto/[amount] (SSG)
│   ├── omrekenen/          #   /omrekenen/[pair] unit conversions (SSG)
│   ├── embed/              #   Embeddable calculator iframes (SSG)
│   ├── lokaal/             #   City-localized pages (SSG)
│   ├── layout.tsx          #   Root layout (nl, light-mode)
│   ├── page.tsx            #   Homepage
│   ├── sitemap.ts          #   Dynamische sitemap generator
│   └── robots.ts           #   Robots.txt
├── components/
│   ├── ads/                #   AdSense banners + adblock detectie
│   ├── affiliate/          #   Affiliate offer cards
│   ├── calculator/         #   50+ calculator componenten
│   ├── charts/             #   Lijn- en cirkeldiagrammen
│   ├── content/            #   SEO content layout
│   ├── cookies/            #   Cookie consent banner
│   ├── home/               #   Homepage-specifieke componenten
│   ├── layout/             #   Header, Footer, CalculatorLayout, AdSenseSlots
│   ├── seo/                #   JSON-LD, RelatedCalculators, Disclaimer
│   ├── share/              #   Deelbare links + toolbar
│   ├── ui/                 #   Primitives (Button, Card, Badge, Container)
│   └── ...
├── content/                #   SEO content pagina data
│   ├── index.ts            #   Registratie + exports
│   ├── types.ts            #   SeoContentPage interface
│   └── pages/              #   Individuele content data bestanden
├── data/                   #   Statische data registries
│   ├── calculators.ts      #   Master calculator registry (metadata + computeFn)
│   ├── categories.ts       #   8 categorieën met slugs, icons, colors
│   ├── calculator-faqs.ts  #   FAQ data per calculator (→ FAQPage JSON-LD)
│   ├── affiliate-offers.json
│   ├── tax-rates-2026.json
│   └── units.json          #   Eenheidconversies
├── lib/                    #   Business logic & utilities
│   ├── ads/                #   Ad configuratie (sizes, slots, breakpoints)
│   ├── affiliate/          #   Offer lookup
│   ├── calculators/        #   Compute functies + component registry
│   ├── email/              #   Resend integratie
│   ├── pdf/                #   PDF rapport generator
│   ├── rates/              #   Tax rate fetcher + cache
│   ├── schemas/            #   Zod schemas
│   ├── seo/                #   Title builder + JSON-LD generators
│   ├── utils.ts            #   cn(), formatNL(), formatEUR(), formatPct()
│   ├── rate-limit.ts       #   Per-endpoint rate limiter
│   └── ...
├── types/                  #   Gedeelde TypeScript types
├── proxy.ts                #   Edge rate-limiting middleware
└── scripts/                #   Validatie- en consistency scripts
```

---

## 🚀 Snel Starten

### Vereisten

- **Node.js 20+** (LTS aanbevolen)
- **npm** (meegeleverd met Node.js)

### Installatie

```bash
# 1. Clone de repository
git clone https://github.com/jouw-gebruiker/rekenhet.git
cd rekenhet

# 2. Installeer afhankelijkheden
npm install

# 3. Kopieer en vul environment variabelen in
cp .env.example .env.local
# Bewerk .env.local met je eigen keys

# 4. Start de development server (Turbopack)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in je browser.

### Productie build

```bash
npm run build    # Build de statische + server-side pagina's
npm run start    # Start de productie server
```

---

## 🧩 Calculator Toevoegen

Elke nieuwe calculator volgt een **dual-registry protocol**. Volg deze stappen:

### 1. Registreer in de data registry
`src/data/calculators.ts` — voeg een entry toe aan de `registry` array:

```ts
{
  slug: "mijn-calculator",
  categorySlug: "werk-en-inkomen",
  title: "Mijn Calculator",
  description: "Beschrijving voor SEO en weergave.",
  metaTitle: "Mijn Calculator — Unieke Title Tag | Rekenhet.nl",
  metaDescription: "SEO meta description met zoekwoorden.",
  keywords: ["mijn", "calculator", "zoekwoorden"],
  featured: true,
  relatedSlugs: ["bruto-netto-salaris-calculator"],
}
```

### 2. Maak de compute functie (optioneel)
In `src/lib/calculators/` voor complexe rekenlogica.

### 3. Registreer in de component registry
`src/lib/calculators/component-registry.tsx`:

```tsx
registry.set("mijn-calculator", () => import("@/components/calculator/MijnCalculator"));
```

### 4. Bouw het component
`src/components/calculator/MijnCalculator.tsx` — `"use client"`, met state, inputs en resultaten.

### 5. Voeg FAQs toe
`src/data/calculator-faqs.ts` — minimaal 3-5 FAQs voor FAQPage JSON-LD.

### 6. Optioneel: SEO content pagina
`src/content/pages/` — een keyword-targeted guide met de ingebedde calculator.

---

## 🔍 SEO & Content

Het project heeft een **SEO-first architectuur**:

| Onderdeel | Beschrijving |
|-----------|-------------|
| `generateMetadata` | Elke pagina exporteert metadata via `buildMetadata()` helper |
| `canonical URL` | Elke pagina heeft `alternates: { canonical }` |
| **JSON-LD** | Homepage: WebSite + Organization. Calculator: BreadcrumbList + WebApplication + FAQPage |
| **Sitemap** | Dynamische sitemap via `sitemap.ts` met prioriteiten per categorie |
| **Content pages** | 12+ keyword-targeted SEO landingspagina's in `src/content/pages/` |
| **FAQ strategy** | Elke calculator heeft 3-5 FAQs voor FAQPage rich snippet |

---

## 📢 Advertenties & Monetisatie

- **Google AdSense** met CLS-zero garantie (vaste `min-height` containers)
- **Adblock detectie** — automatische fallback naar affiliate offers
- **Ad plaatsing** — 728×90 boven, 300×600 sidebar, 336×280 inline, 320×100 anchor (mobiel)
- **Affiliate marketing** — contextuele aanbiedingen in sidebar + adblock fallback

Alle AdSense slot ID's worden via environment variabelen gezet (`.env.local`).

---

## 📜 Scripts

| Commando | Beschrijving |
|----------|-------------|
| `npm run dev` | Start dev server met Turbopack |
| `npm run build` | Productie build |
| `npm run start` | Start productie server |
| `npm run lint` | ESLint check |
| `npm run check` | Consistentie check (registries vs components) |

---

## ⚙️ Configuratie

Kopieer `.env.example` naar `.env.local` en vul in:

| Variabele | Verplicht | Beschrijving |
|-----------|-----------|-------------|
| `NEXT_PUBLIC_ADSENSE_ID` | ✅ | Google AdSense Publisher ID |
| `NEXT_PUBLIC_SITE_URL` | ✅ | https://rekenhet.nl |
| `RESEND_API_KEY` | ❌* | Voor contactformulier e-mail |
| `EMAIL_FROM` | ❌* | Afzender e-mailadres |
| `REVALIDATION_TOKEN` | ❌ | Token voor /api/revalidate |

*\* Optioneel — zonder Resend worden formulierberichten alleen gelogd.*

---

## 🚢 Deployment

Het project draait op **Vercel** (aanbevolen) of elke Node.js host:

```bash
npm run build    # → .next/ klaar voor server-mode
```

Voor **volledige SSG** (statische export):
```ts
// next.config.ts
output: "export",
```

---

## 📄 Licentie

MIT © Rekenhet.nl

---

<div align="center">
  <sub>Gemaakt met ❤️ in Nederland · <a href="https://rekenhet.nl/contact">Contact</a></sub>
</div>
