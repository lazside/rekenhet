import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <Container className="py-24">
      <div className="mx-auto max-w-md text-center">
        <p className="text-6xl font-bold text-gray-300">404</p>
        <h1 className="mt-4 text-2xl font-bold text-gray-900">
          Pagina niet gevonden
        </h1>
        <p className="mt-2 text-gray-600">
          De pagina die je zoekt bestaat niet of is verplaatst.
        </p>
        <Link href="/" className="mt-6 inline-block">
          <Button>
            <Home className="mr-2 h-4 w-4" />
            Terug naar home
          </Button>
        </Link>
      </div>
    </Container>
  );
}
