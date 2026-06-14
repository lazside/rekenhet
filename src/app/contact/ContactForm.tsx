"use client";

import { useState, useCallback } from "react";
import { Container } from "@/components/ui/Container";
import {
  ChevronRight, Mail, MessageSquare, Lightbulb, Bug,
  Send, Check, Loader2, Building2,
} from "lucide-react";
import Link from "next/link";

// ─── Calculator options for bug reports ───────────────────────

const CALCULATOR_OPTIONS = [
  { slug: "btw-calculator", label: "BTW Calculator" },
  { slug: "bruto-netto-salaris-calculator", label: "Bruto Netto Salaris Calculator" },
  { slug: "bmi-calculator", label: "BMI Calculator" },
  { slug: "procenten-calculator", label: "Procenten Calculator" },
];

// ─── Zod Schema (client-side) ────────────────────────────────

const contactSchema = {
  name: (v: string) =>
    v.length < 2 ? "Naam is verplicht (min. 2 tekens)" : undefined,
  email: (v: string) =>
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "Ongeldig e-mailadres" : undefined,
  subject: (v: string) =>
    !["algemeen", "bug", "suggestie", "zakelijk"].includes(v)
      ? "Selecteer een onderwerp"
      : undefined,
  message: (v: string) =>
    v.length < 10
      ? "Bericht is te kort (min. 10 tekens)"
      : v.length > 5000
        ? "Bericht is te lang (max. 5000 tekens)"
        : undefined,
};

type FieldErrors = Partial<Record<"name" | "email" | "subject" | "message", string>>;
type Status = "idle" | "sending" | "success" | "error";

// ─── Subject options ──────────────────────────────────────────

const SUBJECTS = [
  { value: "", label: "— Selecteer een onderwerp —", disabled: true },
  { value: "algemeen", label: "Algemene vraag", icon: MessageSquare },
  { value: "bug", label: "Fout in calculator melden (Bug)", icon: Bug },
  { value: "suggestie", label: "Suggestie voor nieuwe calculator", icon: Lightbulb },
  { value: "zakelijk", label: "Zakelijk / Adverteren", icon: Building2 },
];

// ─── ContactForm ──────────────────────────────────────────────

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [calculatorSlug, setCalculatorSlug] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");

  // ── Validate single field ──
  const validateField = useCallback(
    (field: keyof typeof contactSchema, value: string) => {
      const err = contactSchema[field](value);
      setErrors((prev) => ({ ...prev, [field]: err }));
    },
    []
  );

  // ── Validate all ──
  const validateAll = (): boolean => {
    const newErrors: FieldErrors = {};
    for (const key of Object.keys(contactSchema) as (keyof typeof contactSchema)[]) {
      const val =
        key === "subject"
          ? subject
          : key === "name"
            ? name
            : key === "email"
              ? email
              : message;
      newErrors[key] = contactSchema[key](val);
    }
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  // ── Submit ──
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!validateAll()) return;

      setStatus("sending");
      setServerError("");

      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            subject,
            calculatorSlug: subject === "bug" ? calculatorSlug : undefined,
            message,
            _hp: "", // Honeypot — empty = human
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          setServerError(data.error || "Er is iets misgegaan");
          setStatus("error");
          return;
        }

        setStatus("success");
      } catch {
        setServerError("Kon de server niet bereiken. Probeer het later opnieuw.");
        setStatus("error");
      }
    },
    [name, email, subject, calculatorSlug, message, validateAll]
  );

  // ── Success state ──
  if (status === "success") {
    return (
      <Container className="py-20">
        <div className="mx-auto max-w-lg text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
            <Check className="h-8 w-8 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Bericht verzonden!
          </h1>
          <p className="text-gray-600 leading-relaxed mb-8">
            Bedankt voor je bericht, {name}! We nemen binnen 24 uur contact met je op.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
          >
            Terug naar home
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-10 md:py-16">
      <div className="mx-auto max-w-5xl">
        {/* Breadcrumbs */}
        <nav className="mb-4 text-sm text-gray-500" aria-label="Kruimelpad">
          <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
          <ChevronRight className="inline h-3 w-3 mx-1 text-gray-400" />
          <span className="text-gray-900" aria-current="page">Contact</span>
        </nav>

        <div className="grid md:grid-cols-5 gap-10">
          {/* ── Left: Info ── */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-3">
                Contact
              </h1>
              <p className="text-gray-600 leading-relaxed">
                We horen graag van je! Of je nu een vraag hebt, een fout hebt
                ontdekt in een calculator, een suggestie hebt voor een nieuwe
                tool, of zakelijk wilt adverteren — we staan voor je klaar.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { icon: MessageSquare, title: "Algemene vraag", desc: "Vraag over het gebruik van de calculators of de website." },
                { icon: Bug, title: "Fout melden", desc: "Werkt een calculator niet zoals verwacht? Laat het ons weten!" },
                { icon: Lightbulb, title: "Nieuwe calculator", desc: "Heb je een idee voor een handige calculator? We horen het graag." },
                { icon: Building2, title: "Zakelijk", desc: "Adverteren, partnerships of samenwerkingen." },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                    <item.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-xl bg-gray-50 p-5 border border-gray-100">
              <p className="text-xs text-gray-500 leading-relaxed">
                <strong>Reactietijd:</strong> We streven ernaar om binnen 24 uur
                te reageren op werkdagen. Voor dringende vragen kun je ons ook
                vinden via onze{" "}
                <Link href="/privacy" className="text-blue-600 underline">
                  privacy
                </Link>{" "}
                en{" "}
                <Link href="/disclaimer" className="text-blue-600 underline">
                  disclaimer
                </Link>{" "}
                pagina&apos;s.
              </p>
            </div>
          </div>

          {/* ── Right: Form ── */}
          <div className="md:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm space-y-5"
              noValidate
            >
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Mail className="h-5 w-5 text-blue-600" />
                Stuur een bericht
              </h2>

              {/* Honeypot — hidden from users, bots fill it */}
              <input
                type="text"
                name="_hp"
                tabIndex={-1}
                autoComplete="off"
                style={{ position: "absolute", left: "-9999px" }}
                aria-hidden="true"
              />

              {/* Name */}
              <FormField label="Naam" error={errors.name}>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    validateField("name", e.target.value);
                  }}
                  onBlur={() => validateField("name", name)}
                  placeholder="Jouw naam"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  aria-label="Naam"
                />
              </FormField>

              {/* Email */}
              <FormField label="E-mailadres" error={errors.email}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    validateField("email", e.target.value);
                  }}
                  onBlur={() => validateField("email", email)}
                  placeholder="jouw@email.nl"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  aria-label="E-mailadres"
                />
              </FormField>

              {/* Subject */}
              <FormField label="Onderwerp" error={errors.subject}>
                <select
                  value={subject}
                  onChange={(e) => {
                    setSubject(e.target.value);
                    setCalculatorSlug("");
                    validateField("subject", e.target.value);
                  }}
                  onBlur={() => validateField("subject", subject)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  aria-label="Onderwerp"
                >
                  {SUBJECTS.map((s) => (
                    <option key={s.value} value={s.value} disabled={s.disabled}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </FormField>

              {/* Conditional: calculator selector (only for bug reports) */}
              {subject === "bug" && (
                <FormField label="Welke calculator?" error={undefined}>
                  <select
                    value={calculatorSlug}
                    onChange={(e) => setCalculatorSlug(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    aria-label="Selecteer calculator"
                  >
                    <option value="">— Selecteer —</option>
                    {CALCULATOR_OPTIONS.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </FormField>
              )}

              {/* Message */}
              <FormField label="Bericht" error={errors.message}>
                <textarea
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    validateField("message", e.target.value);
                  }}
                  onBlur={() => validateField("message", message)}
                  rows={5}
                  placeholder="Beschrijf je vraag, bug of suggestie..."
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-y min-h-[120px]"
                  aria-label="Bericht"
                />
                <p className="text-xs text-gray-400 mt-1 text-right">
                  {message.length}/5000
                </p>
              </FormField>

              {/* Server error */}
              {serverError && (
                <p className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-2.5">
                  {serverError}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "sending"}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50 transition-all shadow-sm"
              >
                {status === "sending" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                {status === "sending" ? "Bezig met versturen..." : "Verstuur bericht"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
}

// ─── FormField helper ─────────────────────────────────────────

function FormField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string | null;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      {children}
      {error && <p className="text-xs text-red-600 mt-0.5">{error}</p>}
    </div>
  );
}
