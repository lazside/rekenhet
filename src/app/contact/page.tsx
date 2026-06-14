import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbListSchema } from "@/lib/seo/jsonld";
import ContactForm from "./ContactForm";

const SITE_URL = "https://www.rekenhet.nl";

export const metadata: Metadata = {
  title: "Contact — Rekenhet.nl",
  description:
    "Neem contact op met Rekenhet.nl. Stel een vraag, meld een fout in een calculator, doe een suggestie voor een nieuwe tool, of neem zakelijk contact op.",
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    siteName: "Rekenhet.nl",
    title: "Contact — Rekenhet.nl",
    description:
      "Neem contact op met Rekenhet.nl. Stel een vraag, meld een fout in een calculator, doe een suggestie voor een nieuwe tool, of neem zakelijk contact op.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact — Rekenhet.nl",
    description:
      "Neem contact op met Rekenhet.nl. Stel een vraag, meld een fout in een calculator, doe een suggestie voor een nieuwe tool, of neem zakelijk contact op.",
  },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbListSchema([
        { name: "Home", item: SITE_URL },
        { name: "Contact", item: `${SITE_URL}/contact` },
      ])} />
      <ContactForm />
    </>
  );
}
