"use client";

import { useState } from "react";
import { siteConfig } from "../../config/site.config";

// ── Waitlist Form ─────────────────────────────────────────────────────────────
function WaitlistForm({ ctaLabel, ctaNote }: { ctaLabel: string; ctaNote: string }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, idea: siteConfig.subdomain }),
      });
      if (!res.ok) throw new Error();
      setState("success");
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="text-4xl">🎉</div>
        <p className="text-lg font-semibold text-gray-900">You&apos;re on the list!</p>
        <p className="text-sm text-gray-500">We&apos;ll email you the moment we launch.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
      <input
        type="email"
        required
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
      />
      <button
        type="submit"
        disabled={state === "loading"}
        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-60 whitespace-nowrap"
      >
        {state === "loading" ? "Joining…" : ctaLabel}
      </button>
      {state === "error" && (
        <p className="text-red-500 text-xs mt-1 col-span-full">Something went wrong — try again.</p>
      )}
      {ctaNote && (
        <p className="text-xs text-gray-400 mt-1 w-full text-center sm:col-span-2">{ctaNote}</p>
      )}
    </form>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function Home() {
  const { hero, features, pricing, faq, footer } = siteConfig;
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-white text-gray-900 font-sans antialiased">

      {/* ── Hero ── */}
      <section className="relative px-6 pt-24 pb-20 flex flex-col items-center text-center bg-gradient-to-b from-indigo-50 to-white">
        <div className="inline-block mb-4 px-3 py-1 text-xs font-semibold text-indigo-600 bg-indigo-100 rounded-full uppercase tracking-wider">
          Early access
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight max-w-2xl leading-tight mb-4">
          {hero.headline}
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mb-8">
          {hero.subheadline}
        </p>
        <WaitlistForm ctaLabel={hero.ctaLabel} ctaNote={hero.ctaNote} />
      </section>

      {/* ── Features ── */}
      <section className="px-6 py-20 max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
          Everything you need
        </h2>
        <div className="grid sm:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="flex flex-col gap-3 p-6 rounded-2xl border border-gray-100 hover:border-indigo-100 hover:shadow-sm transition">
              <span className="text-3xl">{f.icon}</span>
              <h3 className="font-semibold text-lg">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="px-6 py-20 bg-indigo-50">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">{pricing.headline}</h2>
          <p className="text-gray-500 mb-10">{pricing.subheadline}</p>
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 flex flex-col items-center gap-5">
            <div className="flex items-end gap-1">
              <span className="text-5xl font-extrabold">{pricing.price}</span>
              <span className="text-gray-400 mb-1">{pricing.period}</span>
            </div>
            {pricing.earlyBirdNote && (
              <span className="text-xs text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full font-medium">
                {pricing.earlyBirdNote}
              </span>
            )}
            <ul className="w-full text-sm text-gray-600 space-y-3 text-left">
              {pricing.perks.map((perk, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-indigo-500">✓</span> {perk}
                </li>
              ))}
            </ul>
            {pricing.stripeLink ? (
              <a
                href={pricing.stripeLink}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl text-center transition-colors"
              >
                {pricing.ctaLabel}
              </a>
            ) : (
              <WaitlistForm ctaLabel={pricing.ctaLabel} ctaNote="" />
            )}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="px-6 py-20 max-w-2xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">
          Common questions
        </h2>
        <div className="divide-y divide-gray-100">
          {faq.map((item, i) => (
            <div key={i} className="py-5">
              <button
                className="w-full flex justify-between items-start text-left gap-4"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span className="font-medium text-gray-900">{item.question}</span>
                <span className="text-indigo-500 text-lg mt-0.5 shrink-0">
                  {openFaq === i ? "−" : "+"}
                </span>
              </button>
              {openFaq === i && (
                <p className="mt-3 text-sm text-gray-500 leading-relaxed">{item.answer}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="px-6 py-20 bg-indigo-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-3">{hero.headline}</h2>
        <p className="text-indigo-200 mb-8 text-lg">{hero.subheadline}</p>
        <div className="flex justify-center">
          <WaitlistForm ctaLabel={hero.ctaLabel} ctaNote={hero.ctaNote} />
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="px-6 py-8 text-center text-xs text-gray-400">
        Built by{" "}
        <a href={footer.builtByUrl} className="underline hover:text-gray-600">
          {footer.builtBy}
        </a>
      </footer>
    </main>
  );
}
