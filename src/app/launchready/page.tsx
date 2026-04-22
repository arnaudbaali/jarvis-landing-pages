"use client";

import { useState } from "react";
import { siteConfig } from "../../../config/site.config";

function WaitlistForm({ label = "Join the waitlist", dark = false }: { label?: string; dark?: boolean }) {
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
      <div className="text-center py-2">
        <p className="font-semibold">🎉 You&apos;re on the list!</p>
        <p className={`text-sm mt-1 ${dark ? "text-gray-400" : "text-gray-500"}`}>
          We&apos;ll email you when beta opens.
        </p>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 w-full">
        <input
          type="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-sm text-black placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-black"
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="px-6 py-3 bg-black text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-60 whitespace-nowrap"
        >
          {state === "loading" ? "Joining…" : label}
        </button>
      </form>
      {state === "error" && (
        <p className="text-red-500 text-xs mt-1">Something went wrong — try again.</p>
      )}
    </>
  );
}

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-white text-black font-sans antialiased">

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="px-6 pt-24 pb-16 max-w-3xl mx-auto text-center">
        <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">
          For indie &amp; self-published authors
        </p>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-4">
          Know if your book cover will get clicked —<br className="hidden sm:block" />
          before you publish
        </h1>
        <p className="text-lg text-gray-500 mb-2 max-w-xl mx-auto">
          Upload your cover and blurb. Get an AI score on click-worthiness compared to bestsellers in your genre.
        </p>
        <p className="text-sm text-gray-400 mb-8">
          Test your packaging before you pay Amazon to find out.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
          <a href="#waitlist" className="px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors">
            👉 Get early access
          </a>
        </div>
      </section>

      {/* ── Pain ─────────────────────────────────────────────────────── */}
      <section className="bg-gray-50 border-y border-gray-100 px-6 py-16">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-2">A weak launch is expensive. And invisible.</h2>
          <p className="text-gray-500 mb-8">You spend months writing. Then you guess on the cover. If you guess wrong:</p>
          <ul className="space-y-4 mb-8">
            {[
              "Your ads run — Amazon charges you — no one clicks",
              "Your launch week ranking tanks before you've had a fair shot",
              "You realise after going live that the cover needs a redesign",
            ].map((pain, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-red-500 mt-0.5 shrink-0">✗</span>
                <span className="text-gray-700">{pain}</span>
              </li>
            ))}
          </ul>
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <p className="font-semibold">
              👉 Authors are paying Amazon to test their packaging — after the book is live.
            </p>
          </div>
        </div>
      </section>

      {/* ── Solution ─────────────────────────────────────────────────── */}
      <section className="px-6 py-16 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-2">LaunchReady scores your package before launch.</h2>
        <p className="text-gray-500 mb-8">Everything you need to know if your book is ready to sell — in minutes.</p>
        <ul className="space-y-4">
          {siteConfig.features.map((f, i) => (
            <li key={i} className="flex items-center gap-3">
              <span className="text-xl">{f.icon}</span>
              <div>
                <span className="font-medium">{f.title}</span>
                <span className="text-gray-500"> — {f.description}</span>
              </div>
            </li>
          ))}
          <li className="flex items-center gap-3">
            <span className="text-xl">🔍</span>
            <div>
              <span className="font-medium">Genre positioning check</span>
              <span className="text-gray-500"> — does your cover signal the right genre at a glance?</span>
            </div>
          </li>
          <li className="flex items-center gap-3">
            <span className="text-xl">📝</span>
            <div>
              <span className="font-medium">Specific rewrite suggestions</span>
              <span className="text-gray-500"> — ranked by expected impact on CTR, not just a score.</span>
            </div>
          </li>
        </ul>
      </section>

      {/* ── How it works ─────────────────────────────────────────────── */}
      <section className="bg-gray-50 border-y border-gray-100 px-6 py-16">
        <div className="max-w-2xl mx-auto">
          <p className="text-sm text-gray-400 uppercase tracking-wider font-semibold mb-6">How it works</p>
          <div className="space-y-8">
            {[
              { n: "01", title: "Upload your package", desc: "Drop in your cover image, paste your blurb, and add your genre + 2–3 comparable titles." },
              { n: "02", title: "AI analyses click-worthiness", desc: "We score your cover against current bestsellers — thumbnail legibility, emotional tone, genre fit, and blurb hook strength." },
              { n: "03", title: "Get a clear action report", desc: "Receive a scored report with specific, ranked changes. Know what to fix before you go live — not after." },
            ].map((step) => (
              <div key={step.n} className="flex gap-5">
                <div className="text-3xl font-extrabold text-gray-200 leading-none w-10 shrink-0">{step.n}</div>
                <div>
                  <p className="font-semibold mb-1">{step.title}</p>
                  <p className="text-gray-500 text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who it's for ─────────────────────────────────────────────── */}
      <section className="bg-gray-50 border-y border-gray-100 px-6 py-16">
        <div className="max-w-2xl mx-auto">
          <p className="text-sm text-gray-400 uppercase tracking-wider font-semibold mb-6">Built for</p>
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: "📚", label: "KDP authors" },
              { icon: "✍️", label: "Indie publishers" },
              { icon: "🚀", label: "Serial launchers" },
            ].map((item) => (
              <div key={item.label} className="bg-white border border-gray-200 rounded-xl p-5 text-center">
                <p className="text-2xl mb-2">{item.icon}</p>
                <p className="text-sm font-medium">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ──────────────────────────────────────────────────── */}
      <section className="px-6 py-16 max-w-2xl mx-auto text-center">
        <p className="text-sm text-gray-400 uppercase tracking-wider font-semibold mb-6">Pricing</p>
        <div className="inline-block border border-gray-200 rounded-2xl p-8 text-left max-w-sm w-full">
          <p className="text-4xl font-extrabold mb-1">
            {siteConfig.pricing.price}
            <span className="text-lg font-normal text-gray-400">{siteConfig.pricing.period}</span>
          </p>
          <p className="text-sm text-gray-400 mb-6">{siteConfig.pricing.earlyBirdNote}</p>
          <ul className="space-y-2 mb-6">
            {siteConfig.pricing.perks.map((perk, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                <span className="text-green-500">✓</span> {perk}
              </li>
            ))}
          </ul>
          <a href="#waitlist" className="block w-full text-center px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors text-sm">
            {siteConfig.pricing.ctaLabel}
          </a>
          <p className="text-xs text-gray-400 text-center mt-3">Free during beta · No card required</p>
        </div>
      </section>

      {/* ── Waitlist CTA ─────────────────────────────────────────────── */}
      <section id="waitlist" className="bg-black text-white px-6 py-20 text-center">
        <h2 className="text-3xl font-bold mb-3">🚀 Want early access?</h2>
        <p className="text-gray-400 mb-8">Free while we&apos;re in beta. Be the first to know if your book is ready to sell.</p>
        <div className="max-w-md mx-auto">
          <WaitlistForm label="Join the waitlist" dark />
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section className="px-6 py-16 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-8">Common questions</h2>
        <div className="divide-y divide-gray-100">
          {siteConfig.faq.map((item, i) => (
            <div key={i} className="py-4">
              <button
                className="w-full flex justify-between items-center text-left gap-4"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span className="font-medium">{item.question}</span>
                <span className="text-xl shrink-0">{openFaq === i ? "−" : "+"}</span>
              </button>
              {openFaq === i && (
                <p className="mt-3 text-sm text-gray-500">{item.answer}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────── */}
      <section className="border-t border-gray-100 px-6 py-20 text-center">
        <h2 className="text-2xl font-bold mb-3">Stop guessing. Start knowing.</h2>
        <p className="text-gray-500 mb-8">Get your book&apos;s click-worthiness score before you publish.</p>
        <a href="#waitlist" className="inline-block px-8 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors">
          👉 Get early access
        </a>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <footer className="px-6 py-8 text-center text-xs text-gray-400 border-t border-gray-100">
        Built by{" "}
        <a href={siteConfig.footer.builtByUrl} className="underline hover:text-gray-600">
          {siteConfig.footer.builtBy}
        </a>
      </footer>
    </main>
  );
}
