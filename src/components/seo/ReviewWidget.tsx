"use client";

import { useState, useEffect } from "react";
import { Star, ThumbsUp, MessageSquare } from "lucide-react";

/**
 * ReviewWidget — Toon beoordelingen en laat gebruikers reviews achter.
 *
 * Waarom dit goed is voor SEO (E-E-A-T):
 * - Trustworthiness: sociale bewijs van andere gebruikers
 * - User Engagement: gebruikers blijven langer op de pagina
 * - Rich Results: kan leiden tot review rich snippets in Google
 *
 * Momenteel wordt data opgeslagen in localStorage (geen database nodig).
 * Uitbreidbaar naar een echte backend (API) voor persistente opslag.
 */

interface Review {
  id: string;
  rating: number;
  text: string;
  date: string;
}

interface Props {
  /** Calculator slug (voor unieke storage key) */
  calculatorSlug: string;
  /** Initiële/statische rating (bijv. uit een dataset) */
  initialRating?: number;
  /** Aantal reviews dat al bestaat (statisch, voor SEO) */
  initialCount?: number;
}

const STORAGE_PREFIX = "rekenhet_review_";

function getStoredReviews(slug: string): Review[] {
  try {
    const data = localStorage.getItem(`${STORAGE_PREFIX}${slug}`);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function storeReview(slug: string, review: Review) {
  const existing = getStoredReviews(slug);
  existing.push(review);
  localStorage.setItem(`${STORAGE_PREFIX}${slug}`, JSON.stringify(existing));
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("nl-NL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function ReviewWidget({
  calculatorSlug,
  initialRating = 0,
  initialCount = 0,
}: Props) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newRating, setNewRating] = useState(0);
  const [newText, setNewText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    const stored = getStoredReviews(calculatorSlug);
    setReviews(stored);
  }, [calculatorSlug]);

  // Combine stored + initial
  const allReviews = [...reviews];
  const totalCount = initialCount + allReviews.length;

  // Calculate average rating
  const storedTotal = allReviews.reduce((sum, r) => sum + r.rating, 0);
  const initialTotal = initialRating * initialCount;
  const avgRating =
    totalCount > 0
      ? ((storedTotal + initialTotal) / totalCount).toFixed(1)
      : "0.0";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newRating === 0 || !newText.trim()) return;

    const review: Review = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      rating: newRating,
      text: newText.trim(),
      date: new Date().toISOString(),
    };

    storeReview(calculatorSlug, review);
    setReviews([...reviews, review]);
    setNewRating(0);
    setNewText("");
    setSubmitted(true);
  };

  return (
    <section className="mt-10 pt-6 border-t border-gray-100" aria-label="Beoordelingen">
      <div className="flex items-center gap-3 mb-4">
        <MessageSquare className="h-5 w-5 text-indigo-500" />
        <h2 className="text-lg font-semibold text-gray-900">
          Beoordelingen
        </h2>
      </div>

      {/* Rating summary */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-5 w-5 ${
                star <= Math.round(Number(avgRating))
                  ? "fill-amber-400 text-amber-400"
                  : "text-gray-200"
              }`}
            />
          ))}
        </div>
        <span className="text-lg font-bold text-gray-900">{avgRating}</span>
        <span className="text-sm text-gray-500">
          ({totalCount} beoordeling{totalCount !== 1 ? "en" : ""})
        </span>
      </div>

      {/* Review list */}
      {allReviews.length > 0 && (
        <div className="space-y-3 mb-6">
          {[...allReviews].reverse().slice(0, 5).map((review) => (
            <div
              key={review.id}
              className="rounded-lg border border-gray-100 bg-gray-50/50 p-3"
            >
              <div className="flex items-center gap-1 mb-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-3.5 w-3.5 ${
                      star <= review.rating
                        ? "fill-amber-400 text-amber-400"
                        : "text-gray-200"
                    }`}
                  />
                ))}
                <span className="text-[11px] text-gray-400 ml-2">
                  {formatDate(new Date(review.date))}
                </span>
              </div>
              <p className="text-sm text-gray-700">{review.text}</p>
            </div>
          ))}
        </div>
      )}

      {/* Submit review */}
      {!submitted ? (
        <form onSubmit={handleSubmit} className="rounded-xl border border-gray-200 bg-white p-4">
          <p className="text-sm font-medium text-gray-700 mb-3">
            Wat vond je van deze calculator?
          </p>

          {/* Star rating input */}
          <div className="flex items-center gap-1 mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setNewRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="transition-transform hover:scale-110"
                aria-label={`${star} ster${star !== 1 ? "ren" : ""}`}
              >
                <Star
                  className={`h-6 w-6 ${
                    star <= (hoverRating || newRating)
                      ? "fill-amber-400 text-amber-400"
                      : "text-gray-200"
                  }`}
                />
              </button>
            ))}
            {newRating > 0 && (
              <span className="text-xs text-gray-400 ml-2">
                {newRating}/5
              </span>
            )}
          </div>

          <textarea
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            placeholder="Deel je ervaring (optioneel)"
            className="w-full rounded-lg border border-gray-200 p-2.5 text-sm text-gray-700 placeholder-gray-400 focus:border-indigo-300 focus:outline-none focus:ring-1 focus:ring-indigo-200 resize-none"
            rows={2}
          />

          <div className="flex items-center justify-between mt-3">
            <p className="text-[10px] text-gray-400">
              Je beoordeling wordt lokaal opgeslagen
            </p>
            <button
              type="submit"
              disabled={newRating === 0}
              className="rounded-lg bg-indigo-600 px-4 py-1.5 text-xs font-medium text-white hover:bg-indigo-700 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              <ThumbsUp className="inline h-3 w-3 mr-1" />
              Verstuur
            </button>
          </div>
        </form>
      ) : (
        <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-center">
          <p className="text-sm font-medium text-emerald-800">
            Bedankt voor je beoordeling! 🎉
          </p>
          <p className="text-xs text-emerald-600 mt-1">
            Je feedback helpt andere gebruikers.
          </p>
        </div>
      )}
    </section>
  );
}
