import { Container } from "@/components/ui/Container";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface LegalPageLayoutProps {
  title: string;
  children: React.ReactNode;
  lastUpdated?: string;
}

/**
 * Consistent layout for legal pages (Privacy, Cookies, Disclaimer).
 * Provides breadcrumbs, title, last-updated date, and constrained
 * content width for readability.
 */
export function LegalPageLayout({
  title,
  children,
  lastUpdated = "1 januari 2026",
}: LegalPageLayoutProps) {
  return (
    <Container>
      <div className="mx-auto max-w-3xl py-10 md:py-16">
        {/* Breadcrumbs */}
        <nav aria-label="Kruimelpad" className="mb-4 text-sm text-gray-500">
          <Link href="/" className="text-gray-500 hover:text-gray-700">
            Home
          </Link>
          <ChevronRight className="inline h-3 w-3 mx-1 text-gray-400" />
          <span className="text-gray-900" aria-current="page">
            {title}
          </span>
        </nav>

        {/* Title */}
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">
          {title}
        </h1>
        <p className="text-sm text-gray-400 mb-8">
          Laatst bijgewerkt: {lastUpdated}
        </p>

        {/* Content */}
        <div className="prose prose-sm md:prose-base prose-gray max-w-none space-y-6 text-gray-700 leading-relaxed">
          {children}
        </div>
      </div>
    </Container>
  );
}
