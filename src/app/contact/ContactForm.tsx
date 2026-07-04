"use client";

import { useCallback, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import {
  ChevronRight, Mail, MessageSquare, Lightbulb, Bug, Building2,
  Copy, ExternalLink, Check,
} from "lucide-react";
import Link from "next/link";

const CONTACT_EMAIL = "lazside61@gmail.com";

export default function ContactForm() {
  const [copied, setCopied] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(CONTACT_EMAIL).then(() => {
      setCopied(true);
      clearTimeout(timeout.current);
      timeout.current = setTimeout(() => setCopied(false), 2000);
    });
  }, []);

  return (
    <Container className="py-10 md:py-16">
      <div className="mx-auto max-w-2xl">
        {/* Breadcrumbs */}
        <nav className="mb-6 text-sm text-gray-500" aria-label="Kruimelpad">
          <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
          <ChevronRight className="inline h-3 w-3 mx-1 text-gray-400" />
          <span className="text-gray-900" aria-current="page">Contact</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-3">
            Contact
          </h1>
          <p className="text-gray-600 leading-relaxed">
            We horen graag van je! Stuur een e-mail naar onderstaand adres en we
            nemen zo snel mogelijk contact met je op.
          </p>
        </div>

        {/* Email kaart */}
        <div className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-white p-8 shadow-sm mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100">
            <Mail className="h-7 w-7 text-indigo-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Stuur een e-mail
          </h2>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors break-all"
          >
            {CONTACT_EMAIL}
          </a>
          <div className="mt-5 flex justify-center gap-3">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 transition-colors shadow-sm"
            >
              {copied ? (
                <><Check className="h-4 w-4" />Gekopieerd!</>
              ) : (
                <><Copy className="h-4 w-4" />Kopieer e-mailadres</>
              )}
            </button>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:border-indigo-200 hover:text-indigo-600 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              Open in e-mail
            </a>
          </div>
        </div>

        {/* Contact redenen */}
        <div className="grid gap-4 sm:grid-cols-2 mb-8">
          {[
            { icon: MessageSquare, title: "Algemene vraag", desc: "Vraag over het gebruik van de calculators of de website." },
            { icon: Bug, title: "Fout melden", desc: "Werkt een calculator niet? Laat het ons weten." },
            { icon: Lightbulb, title: "Nieuwe calculator", desc: "Idee voor een handige tool? We horen het graag." },
            { icon: Building2, title: "Zakelijk", desc: "Adverteren, partnerships of samenwerkingen." },
          ].map((item, i) => (
            <a
              key={i}
              href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(item.title)}`}
              className="group flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:border-indigo-200 hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-indigo-600 group-hover:scale-110 transition-transform">
                <item.icon className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                  {item.title}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Notitie */}
        <div className="rounded-xl bg-gray-50 border border-gray-100 p-5">
          <p className="text-xs text-gray-500 leading-relaxed">
            <strong>Reactietijd:</strong> We streven ernaar om binnen 24 uur te reageren
            op werkdagen. Gebruik de onderwerpregel om je bericht snel te kunnen
            plaatsen.
          </p>
        </div>
      </div>
    </Container>
  );
}
