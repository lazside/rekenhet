/**
 * Affiliate Offer Lookup — Server-side
 *
 * Pure functions to find matching offers for a given context.
 * Used by the /api/go/[offerId] redirect endpoint.
 */
import offersData from "@/data/affiliate-offers.json";

interface OfferData {
  id: string;
  name: string;
  description: string;
  cta: string;
  url: string;
  icon: string;
  matchSlugs?: string[];
  matchCategories?: string[];
  priority: number;
}

const allOffers: OfferData[] = (offersData as { offers: OfferData[] }).offers;

/**
 * Find an offer by its unique ID.
 */
export function getOfferById(id: string): OfferData | undefined {
  return allOffers.find((o) => o.id === id);
}

/**
 * Get all offers that match a calculator slug or category slug,
 * sorted by relevance score (descending).
 */
export function getOffersForContext(
  calculatorSlug?: string,
  categorySlug?: string
): OfferData[] {
  const scored = allOffers
    .map((offer) => {
      let score = 0;
      if (calculatorSlug && offer.matchSlugs?.includes(calculatorSlug)) score += 100;
      if (categorySlug && offer.matchCategories?.includes(categorySlug)) score += 50;
      score += offer.priority || 0;
      return { offer, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.map((s) => s.offer);
}

/**
 * Find the best matching offer for a given calculator slug and category slug.
 * Returns null if no offers match.
 */
export function findBestOffer(
  calculatorSlug?: string,
  categorySlug?: string
): OfferData | null {
  let best: OfferData | null = null;
  let bestScore = -1;

  for (const offer of allOffers) {
    let score = 0;
    if (calculatorSlug && offer.matchSlugs?.includes(calculatorSlug)) score += 100;
    if (categorySlug && offer.matchCategories?.includes(categorySlug)) score += 50;
    score += offer.priority || 0;
    if (score > bestScore) {
      bestScore = score;
      best = offer;
    }
  }
  return bestScore > 0 ? best : null;
}

export type { OfferData };
