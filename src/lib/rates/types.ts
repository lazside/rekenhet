/**
 * Tax Rate Data — Shared TypeScript Types
 */

export interface TaxBracket {
  min: number;
  max: number | null;
  rate: number;
  label: string;
}

export interface TaxRateInfo {
  incomeTax: number;
  socialPremiums: number;
  total: number;
}

export interface HeffingskortingAlgemeen {
  max: number;
  phaseOutStart: number;
  phaseOutRate: number;
  min: number;
}

export interface HeffingskortingArbeidBracket {
  min: number;
  max: number;
  rate: number;
}

export interface HeffingskortingArbeid {
  bracket1: HeffingskortingArbeidBracket;
  bracket2: HeffingskortingArbeidBracket;
  bracket3: HeffingskortingArbeidBracket;
  phaseOutStart: number;
  phaseOutRate: number;
  max: number;
}

export interface SocialPremiums {
  aow: number;
  anw: number;
  wlz: number;
  maxPremiumIncome: number;
  totalRate: number;
}

export interface BijtellingOption {
  percentage: number;
  label: string;
}

export interface TaxRates {
  year: number;
  country: string;
  currency: string;
  source: string;
  lastVerified: string;
  brackets: TaxBracket[];
  incomeTaxRates: Record<string, TaxRateInfo>;
  heffingskortingen: {
    algemeen: HeffingskortingAlgemeen;
    arbeid: HeffingskortingArbeid;
  };
  socialPremiums: SocialPremiums;
  vakantiegeld: {
    rate: number;
    label: string;
    description: string;
  };
  bijtelling: {
    rates: BijtellingOption[];
  };
  meta: {
    disclaimer: string;
    updatedAt: string;
    schemaVersion: number;
  };
}

export interface FetchResult<T> {
  data: T;
  source: "cache" | "api" | "fallback";
  fetchedAt: string;
  ageMs: number;
}
