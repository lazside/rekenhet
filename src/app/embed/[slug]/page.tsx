import { notFound } from "next/navigation";
import Link from "next/link";
import { getCalculatorBySlug, calculatorRegistry } from "@/data/calculators";
import { getCalculatorComponent, hasCalculatorComponent } from "@/lib/calculators/component-registry";
import { CalculatorErrorBoundary } from "@/components/calculator/CalculatorErrorBoundary";
import { CalculatorSkeleton } from "@/components/calculator/CalculatorSkeleton";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return calculatorRegistry.map((calc) => ({ slug: calc.slug }));
}

export default async function EmbedPage({ params }: Props) {
  const { slug } = await params;
  const calculator = getCalculatorBySlug(slug);
  if (!calculator) notFound();

  const CalculatorComponent = getCalculatorComponent(slug);
  const hasComponent = hasCalculatorComponent(slug);

  return (
    <html lang="nl">
      <head>
        <meta name="robots" content="noindex" />
        <style>{`
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background: transparent;
            color: #1a1a1a;
            -webkit-font-smoothing: antialiased;
          }
          .calc-wrapper {
            padding: 8px;
            min-height: 100%;
          }
          .calc-footer {
            text-align: center;
            padding: 8px 0 4px;
            font-size: 9px;
            color: #999;
          }
          .calc-footer a {
            color: #555;
            text-decoration: none;
          }
          .calc-footer a:hover { text-decoration: underline; }
        `}</style>
      </head>
      <body>
        <div className="calc-wrapper">
          {hasComponent && CalculatorComponent ? (
            <CalculatorErrorBoundary
              fallback={
                <div style={{ padding: 20, textAlign: "center", color: "#999", fontSize: 13 }}>
                  Calculator tijdelijk niet beschikbaar.
                </div>
              }
            >
              <CalculatorComponent />
            </CalculatorErrorBoundary>
          ) : (
            <CalculatorSkeleton />
          )}
          <div className="calc-footer">
            <Link href="https://rekenhet.nl" target="_top">
              Mede mogelijk gemaakt door Rekenhet.nl
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
