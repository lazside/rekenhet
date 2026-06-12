"use client";

import { useState } from "react";
import { Baby, Calendar, Heart, Sparkles } from "lucide-react";
import { ShareToolbar } from "@/components/share/ShareToolbar";
import { zwangerschap } from "@/lib/calculators/extra-calculators";

type Mode = "laatste-menstruatie" | "uitgerekende-datum";

const TRIMESTER_INFO = {
  1: {
    title: "Eerste trimester",
    description: "De organen van de baby worden aangelegd. Veel vrouwen ervaren vermoeidheid en misselijkheid.",
    color: "from-pink-400 to-rose-500",
    icon: "✨",
  },
  2: {
    title: "Tweede trimester",
    description: "De baby groeit snel en je kunt de eerste bewegingen voelen. Vaak de prettigste fase.",
    color: "from-rose-500 to-pink-600",
    icon: "💫",
  },
  3: {
    title: "Derde trimester",
    description: "De baby oefent met ademhalen en draait zich in de juiste positie. De laatste loodjes.",
    color: "from-pink-600 to-rose-700",
    icon: "🌟",
  },
};

export default function ZwangerschapCalculator() {
  const [mode, setMode] = useState<Mode>("laatste-menstruatie");
  const [lmp, setLmp] = useState("2026-01-01");
  const [dueDate, setDueDate] = useState("");

  const input = mode === "laatste-menstruatie" ? lmp : dueDate;
  const r = zwangerschap(input, mode);

  const trimesterInfo = TRIMESTER_INFO[r.trimesterNummer as keyof typeof TRIMESTER_INFO] ?? TRIMESTER_INFO[1];

  return (
    <div className="space-y-6">
      {/* ─── Input Section ─── */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
        <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
          <Baby className="h-4 w-4 text-pink-500" />
          Zwangerschap
        </h2>

        {/* Mode Toggle */}
        <div className="flex gap-1 rounded-lg bg-gray-100 p-1">
          <button
            onClick={() => setMode("laatste-menstruatie")}
            className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-all ${
              mode === "laatste-menstruatie"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Laatste menstruatie
          </button>
          <button
            onClick={() => setMode("uitgerekende-datum")}
            className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-all ${
              mode === "uitgerekende-datum"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Uitgerekende datum
          </button>
        </div>

        {/* Input Fields */}
        {mode === "laatste-menstruatie" ? (
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Eerste dag laatste menstruatie
            </label>
            <input
              type="date"
              value={lmp}
              onChange={(e) => setLmp(e.target.value)}
              className="block w-full rounded-lg border border-gray-300 bg-white py-2.5 px-3 text-sm text-gray-900 tabular-nums placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
        ) : (
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Uitgerekende datum (via echo)
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="block w-full rounded-lg border border-gray-300 bg-white py-2.5 px-3 text-sm text-gray-900 tabular-nums placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
        )}

        {/* Error Message */}
        {r.foutmelding && (
          <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
            {r.foutmelding}
          </div>
        )}
      </div>

      {/* ─── Results Section ─── */}
      {!r.foutmelding && r.week > 0 && (
        <>
          {/* Main Trimester Card */}
          <div
            className={`rounded-xl bg-gradient-to-br ${trimesterInfo.color} p-5 text-white shadow-lg text-center space-y-2`}
          >
            <p className="text-sm text-white/80 flex items-center justify-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              Week {r.week}
              <span className="text-white/60">·</span>
              <span className="tabular-nums">{r.wekenDagen}</span>
            </p>
            <p className="text-3xl font-bold tabular-nums mt-1">
              {r.week}
              <span className="text-lg font-normal text-white/70">+{r.dag}</span>
            </p>
            <p className="text-sm text-white/90 flex items-center justify-center gap-1">
              <Sparkles className="h-3.5 w-3.5" />
              {trimesterInfo.title}
            </p>
            <p className="text-xs text-white/70 max-w-sm mx-auto leading-relaxed">
              {trimesterInfo.description}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm space-y-2">
            <div className="flex justify-between text-xs text-gray-500">
              <span>0 weken</span>
              <span className="font-medium text-pink-600">{r.percentage}%</span>
              <span>40 weken</span>
            </div>
            <div className="h-3 w-full rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-pink-400 to-rose-500 transition-all duration-300"
                style={{ width: `${Math.min(100, r.percentage)}%` }}
              />
            </div>
            <p className="text-center text-xs text-gray-400">
              {r.percentage}% van de zwangerschap is voltooid
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-pink-50 p-3 text-center border border-pink-100">
              <Calendar className="h-4 w-4 text-pink-500 mx-auto mb-1" />
              <p className="text-[10px] text-pink-600">Uitgerekende datum</p>
              <p className="text-sm font-bold text-pink-700">{r.uitgerekendeDatum}</p>
            </div>

            <div className="rounded-lg bg-emerald-50 p-3 text-center border border-emerald-100">
              <Heart className="h-4 w-4 text-emerald-500 mx-auto mb-1" />
              <p className="text-[10px] text-emerald-600">Nog te gaan</p>
              <p className="text-sm font-bold text-emerald-700 tabular-nums">
                {r.dagenTotUitgerekend} dagen
              </p>
            </div>

            <div className="rounded-lg bg-blue-50 p-3 text-center border border-blue-100">
              <Baby className="h-4 w-4 text-blue-500 mx-auto mb-1" />
              <p className="text-[10px] text-blue-600">Zwangerschapsduur</p>
              <p className="text-sm font-bold text-blue-700 tabular-nums">
                {r.dagenZwanger} dagen
              </p>
            </div>

            <div className="rounded-lg bg-purple-50 p-3 text-center border border-purple-100">
              <Sparkles className="h-4 w-4 text-purple-500 mx-auto mb-1" />
              <p className="text-[10px] text-purple-600">Huidige maand</p>
              <p className="text-sm font-bold text-purple-700 tabular-nums">
                Maand {r.maand}
              </p>
            </div>
          </div>

          {/* Conception Date */}
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-pink-400" />
                <span className="text-sm text-gray-600">Geschatte conceptiedatum</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">{r.conceptieDatum}</span>
            </div>
          </div>

          {/* Trimester Legend */}
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm space-y-2">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Trimester overzicht</p>
            {[1, 2, 3].map((t) => {
              const info = TRIMESTER_INFO[t as keyof typeof TRIMESTER_INFO];
              const isActive = r.trimesterNummer === t;
              return (
                <div
                  key={t}
                  className={`rounded-lg p-3 border transition-all ${
                    isActive
                      ? "border-pink-200 bg-pink-50"
                      : "border-gray-100 bg-white opacity-60"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{info.icon}</span>
                    <span className={`text-sm font-semibold ${isActive ? "text-pink-700" : "text-gray-500"}`}>
                      {info.title}
                    </span>
                    {isActive && (
                      <span className="ml-auto text-[10px] font-medium text-pink-600 bg-pink-100 px-2 py-0.5 rounded-full">
                        Huidig
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 ml-7">{info.description}</p>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* ─── Share ─── */}
      <ShareToolbar
        calculatorType="zwangerschap"
        calculatorName="Zwangerschap"
        categoryName="Gezondheid"
        inputs={[
          {
            label: mode === "laatste-menstruatie" ? "Laatste menstruatie" : "Uitgerekende datum",
            value: input,
          },
        ]}
        results={[
          { label: "Uitgerekend", value: r.uitgerekendeDatum, type: "success" as const },
        ]}
      />
    </div>
  );
}
