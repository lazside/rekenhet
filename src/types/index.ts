import { LucideIcon } from "lucide-react";
import { z } from "zod";

// ─── Category ─────────────────────────────────────────────────────
export interface Category {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string; // Tailwind color class (e.g., "bg-blue-500")
}

// ─── Calculator Field Types ───────────────────────────────────────
export type FieldType = "number" | "currency" | "percent" | "select" | "text" | "range";

export interface CalculatorField {
  id: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  defaultValue?: string | number;
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
  prefix?: string;
  /** For select type */
  options?: { label: string; value: string }[];
  /** Zod validation schema applied client-side */
  validation?: z.ZodTypeAny;
}

// ─── Calculator Definition ────────────────────────────────────────
export interface CalculatorMeta {
  slug: string;
  categorySlug: string;
  title: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  featured?: boolean;
  fields: CalculatorField[];
  computeFn: (values: Record<string, number | string>) => Record<string, string | number>;
}

// ─── Result Row ───────────────────────────────────────────────────
export interface ResultRow {
  label: string;
  value: string | number;
  type?: "default" | "success" | "warning" | "info" | "highlight";
}

// ─── FAQ ──────────────────────────────────────────────────────────
export interface FaqItem {
  question: string;
  answer: string;
}

// ─── SEO Data ─────────────────────────────────────────────────────
export interface SeoData {
  title: string;
  description: string;
  canonical: string;
  keywords: string[];
  ogImage?: string;
}

// ─── JSON-LD Types ────────────────────────────────────────────────
export type JsonLd =
  | SoftwareApplicationJsonLd
  | WebSiteJsonLd
  | FaqPageJsonLd
  | BreadcrumbListJsonLd;

export interface SoftwareApplicationJsonLd {
  "@context": "https://schema.org";
  "@type": "SoftwareApplication";
  name: string;
  description: string;
  url: string;
  applicationCategory: "UtilitiesApplication" | "FinanceApplication" | "MathApplication";
  operatingSystem: "Web";
  offers: {
    "@type": "Offer";
    price: "0";
    priceCurrency: "EUR";
  };
}

export interface WebSiteJsonLd {
  "@context": "https://schema.org";
  "@type": "WebSite";
  name: string;
  url: string;
  description: string;
}

export interface FaqPageJsonLd {
  "@context": "https://schema.org";
  "@type": "FAQPage";
  mainEntity: {
    "@type": "Question";
    name: string;
    acceptedAnswer: {
      "@type": "Answer";
      text: string;
    };
  }[];
}

export interface BreadcrumbListJsonLd {
  "@context": "https://schema.org";
  "@type": "BreadcrumbList";
  itemListElement: {
    "@type": "ListItem";
    position: number;
    name: string;
    item: string;
  }[];
}
