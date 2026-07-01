"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <Container className="py-24">
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100">
          <AlertTriangle className="h-8 w-8 text-amber-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">
          Er ging iets mis
        </h1>
        <p className="mt-2 text-gray-600">
          Er is een fout opgetreden. Probeer het opnieuw of ga terug naar de homepagina.
        </p>
        {process.env.NODE_ENV === "development" && (
          <p className="mt-2 text-xs text-gray-400 font-mono bg-gray-50 rounded-lg p-3 text-left">
            {error.message}
          </p>
        )}
        <div className="mt-6 flex items-center justify-center gap-3">
          <Button onClick={reset}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Opnieuw proberen
          </Button>
          <Link href="/">
            <Button variant="secondary">
              <Home className="mr-2 h-4 w-4" />
              Home
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
}
