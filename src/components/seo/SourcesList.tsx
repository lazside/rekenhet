import { ExternalLink, ShieldCheck } from "lucide-react";

/**
 * SourcesList — Toont bronvermeldingen prominent op elke calculator pagina.
 *
 * Waarom dit goed is voor SEO (E-E-A-T):
 * - Experience: toont dat de data gebaseerd is op echte bronnen
 * - Expertise: verwijst naar officiële instanties
 * - Authoritativeness: laat zien dat we autoriteiten citeren
 * - Trustworthiness: transparantie over waar data vandaan komt
 *
 * Google's Search Quality Rater Guidelines benadrukken het belang
 * van bronverwijzingen, vooral voor YMYL (Your Money Your Life)
 * onderwerpen zoals belastingen, hypotheken en financiën.
 */

export interface Source {
  /** Naam van de bron (bijv. "Belastingdienst") */
  name: string;
  /** URL naar de bron */
  url: string;
  /** Optioneel: extra context (bijv. "Tarief 2026") */
  context?: string;
}

interface Props {
  /** Lijst van bronnen */
  sources: Source[];
  /** Optioneel: className override */
  className?: string;
  /** Titel van de sectie (default: "Bronnen") */
  title?: string;
}

export function SourcesList({
  sources,
  className = "",
  title = "Bronnen & verantwoording",
}: Props) {
  if (!sources || sources.length === 0) return null;

  return (
    <section
      className={`rounded-xl border border-gray-100 bg-gradient-to-br from-gray-50 to-blue-50/30 p-5 ${className}`}
      aria-label={title}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-100">
          <ShieldCheck className="h-4 w-4 text-indigo-600" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">{title}</h3>
          <ul className="space-y-1.5">
            {sources.map((source, i) => (
              <li key={i}>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-sm text-indigo-600 hover:text-indigo-800 underline underline-offset-2 decoration-indigo-200 hover:decoration-indigo-600 transition-all"
                >
                  <span className="font-medium">{source.name}</span>
                  {source.context && (
                    <span className="text-gray-400 group-hover:text-gray-500">
                      — {source.context}
                    </span>
                  )}
                  <ExternalLink className="h-3 w-3 opacity-60 group-hover:opacity-100 transition-opacity shrink-0" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
