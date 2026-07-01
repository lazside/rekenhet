
import { ExternalLink, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

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

interface ContextualOfferCardProps {
  offer: OfferData;
  className?: string;
}

/**
 * Contextual Offer Card
 *
 * Renders an affiliate recommendation as a native, helpful tool card
 * that blends seamlessly with the site design.
 *
 * Features:
 *   - Native look (same Card component design language)
 *   - Click tracking via /go/[offerId] (masks referral + logs event)
 *   - Icon + description + CTA button layout
 *   - "Aanbevolen" badge for high-priority offers
 *   - Full keyboard accessibility
 */
export function ContextualOfferCard({ offer, className }: ContextualOfferCardProps) {
  const trackUrl = `/go/${offer.id}`;

  return (
    <div
      className={cn(
        "rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50/80 to-white p-5 shadow-sm",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <span className="text-xl shrink-0 mt-0.5" aria-hidden="true">
          {offer.icon}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-gray-900">
              {offer.name}
            </h3>
            {offer.priority >= 9 && (
              <span className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-700 whitespace-nowrap">
                <TrendingUp className="h-2.5 w-2.5 mr-0.5" />
                Aanbevolen
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
            {offer.description}
          </p>
        </div>
      </div>

      {/* CTA Button */}
      <a
        href={trackUrl}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-indigo-700 hover:shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <span>{offer.cta}</span>
        <ExternalLink
          className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </a>
    </div>
  );
}

