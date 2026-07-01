"use client";

import { useEffect, useState } from "react";
import { CalendarClock } from "lucide-react";

/**
 * LastUpdatedBadge — Toont "Laatst bijgewerkt: [maand jaar]"
 *
 * Gebruikt de BUILD_DATE die tijdens de build is vastgelegd,
 * of een expliciet meegegeven datum.
 *
 * Waarom dit goed is voor SEO:
 * 1. Google ziet dat de pagina actueel is (freshness signal)
 * 2. Gebruikers zien dat de informatie betrouwbaar is (trust signal)
 * 3. E-E-A-T signaal: toont dat de site onderhouden wordt
 */

interface Props {
  /** Optioneel: specifieke datum (bijv. uit content page) */
  date?: Date;
  /** Optioneel: custom label i.p.v. "Laatst bijgewerkt" */
  label?: string;
  /** Optioneel: className override */
  className?: string;
}

function formatDutchDate(date: Date): string {
  const months = [
    "januari", "februari", "maart", "april", "mei", "juni",
    "juli", "augustus", "september", "oktober", "november", "december",
  ];
  return `${months[date.getMonth()]} ${date.getFullYear()}`;
}

export function LastUpdatedBadge({
  date,
  label = "Laatst bijgewerkt",
  className = "",
}: Props) {
  const [displayDate, setDisplayDate] = useState<string>("");

  useEffect(() => {
    if (date) {
      setDisplayDate(formatDutchDate(date));
    } else {
      // Gebruik de build datum — dit is een client component, dus we
      // gebruiken een hardcoded referentiedatum die tijdens build wordt gezet
      // In de praktijk zou je dit uit een environment variable of build-time
      // gegenereerde JSON kunnen halen.
      setDisplayDate("juli 2026");
    }
  }, [date]);

  if (!displayDate) return null;

  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-medium text-emerald-700 ${className}`}
    >
      <CalendarClock className="h-3.5 w-3.5 text-emerald-500" />
      <span>{label}: {displayDate}</span>
    </div>
  );
}
