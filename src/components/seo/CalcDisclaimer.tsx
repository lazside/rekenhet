
import { cn } from"@/lib/utils";

interface CalcDisclaimerProps {
 className?: string;
}

/**
 * CalcDisclaimer — Accessible financial disclaimer banner.
 *
 * Placed beneath calculator metrics to satisfy legal compliance
 * requirements. Uses low-contrast slate tones, small text, and
 * a neutral icon to inform without alarming.
 */
export function CalcDisclaimer({ className }: CalcDisclaimerProps) {
 return (
 <div
 className={cn(
"flex items-start gap-2 rounded-lg border border-slate-200 bg-slate-50/50 p-3",
"",
 className
 )}
 role="note"
 aria-label="Juridische disclaimer"
 >
 {/* Info icon */}
 <svg
 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400"
 viewBox="0 0 16 16"
 fill="currentColor"
 aria-hidden="true"
 >
 <path
 fillRule="evenodd"
 d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1ZM7 5a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm1 2a.75.75 0 0 0-.75.75v3a.75.75 0 0 0 1.5 0v-3A.75.75 0 0 0 8 7Z"
 clipRule="evenodd"
 />
 </svg>

 <p className="text-xs leading-relaxed text-slate-500">
 <strong className="font-medium text-slate-600">
 Disclaimer:
 </strong>{""}
 De getoonde resultaten zijn indicatieve berekeningen op basis van
 openbare overheidsgegevens (2026). Hoewel wij streven naar 100%
 nauwkeurigheid, kunnen aan deze uitkomsten geen rechten worden
 ontleend. Raadpleeg bij grote financiële beslissingen altijd een
 gecertificeerd adviseur of de officiële instanties.
 </p>
 </div>
 );
}
