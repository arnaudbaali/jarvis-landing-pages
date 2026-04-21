"use client";

import { useState } from "react";
import { siteConfig } from "../../config/site.config";

const listings = [
  {
    name: "Email Marketing SaaS",
    stats: ["💰 £120 MRR", "👥 34 users", "🧑‍💻 Next.js"],
    price: "£1,800",
  },
  {
    name: "Chrome Extension (SEO Tool)",
    stats: ["💰 £42 MRR", "📈 Growing 8% MoM", "🧑‍💻 React"],
    price: "£650",
  },
  {
    name: "AI Resume Builder",
    stats: ["💰 £310 MRR", "🚀 Recently launched", "🤖 OpenAI API"],
    price: "£4,200",
  },
];

const faq = [
  { q: "Is this like Flippa?", a: "No. We focus only on small, simple SaaS deals under £10k." },
  { q: "Do you take a commission?", a: "No. Early users get 0% fees, permanently locked in." },
  { q: "What kind of SaaS can I list?", a: "Micro-SaaS, side projects, tools, browser extensions." },
  { q: "Is this legit?", a: "We manually review every listing before it goes live." },
];

function WaitlistForm({ label = "Get early access" }: { label?: string }) {
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
        <p className="text-sm text-gray-400 mt-1">We&apos;ll email you the moment we launch.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 w-full">
      <input
        type="email"
        required
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
      />
      <button
        type="submit"
        disabled={state === "loading"}
        className="px-6 py-3 bg-black text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-60 whitespace-nowrap"
      >
        {state === "loading" ? "Joining…" : label}
      </button>
      {state === "error" && (
        <p className="text-red-500 text-xs mt-1 w-full">Something went wrong — try again.</p>
      )}
    </form>
  );
}

function FakeDoorModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-8 max-w-md w-full border border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-4xl mb-4">🚧</p>
        <h2 className="text-2xl font-bold mb-2">Coming soon</h2>
        <p className="text-gray-500 mb-6">
          We&apos;re opening access soon. Join the waitlist to get in first.
        </p>
        <WaitlistForm label="Get early access" />
        <button
          onClick={onClose}
          className="mt-4 text-sm text-gray-400 hover:text-gray-600 w-full text-center"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  const openWaitlist = () => setShowModal(true);

  return (
    <main className="min-h-screen bg-white text-black font-sans antialiased">
      {showModal && <FakeDoorModal onClose={() => setShowModal(false)} />}

      {/* Hero */}
      <section className="px-6 pt-24 pb-16 max-w-3xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-4">
          Buy or sell micro-SaaS<br />in days — not months
        </h1>
        <p className="text-lg text-gray-500 mb-3">
          A curated marketplace for indie hackers to exit side projects or acquire profitable SaaS under £10k.
        </p>
        <p className="text-sm text-gray-400 mb-8">No brokers. No fees (early users). No bullshit.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={openWaitlist}
            className="px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
          >
            👉 Browse SaaS deals
          </button>
          <button
            onClick={openWaitlist}
            className="px-6 py-3 border border-gray-300 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
          >
            👉 List your SaaS
          </button>
        </div>
      </section>

      {/* Social proof */}
      <section className="border-y border-gray-100 py-8 px-6">
        <div className="max-w-3xl mx-auto grid grid-cols-3 divide-x divide-gray-100 text-center">
          <div className="px-4">
            <p className="text-xl sm:text-2xl font-bold">🔥 27</p>
            <p className="text-xs text-gray-500 mt-1">SaaS already listed</p>
          </div>
          <div className="px-4">
            <p className="text-xl sm:text-2xl font-bold">💰 £18,400</p>
            <p className="text-xs text-gray-500 mt-1">total deal volume</p>
          </div>
          <div className="px-4">
            <p className="text-xl sm:text-2xl font-bold">⚡ 6</p>
            <p className="text-xs text-gray-500 mt-1">sold in last 30 days</p>
          </div>
        </div>
      </section>

      {/* Free valuation bonus CTA */}
      <section className="px-6 py-10 max-w-3xl mx-auto">
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">💡 Curious what your SaaS is worth?</p>
            <p className="font-semibold text-lg">Get a free valuation</p>
          </div>
          <button
            onClick={openWaitlist}
            className="px-5 py-2.5 bg-black text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition-colors whitespace-nowrap"
          >
            👉 Get free valuation
          </button>
        </div>
      </section>

      {/* Live listings */}
      <section className="px-6 pb-16 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Live listings</h2>
        <div className="flex flex-col gap-4">
          {listings.map((listing, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div>
                <p className="font-semibold mb-2">📦 {listing.name}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
                  {listing.stats.map((s, j) => (
                    <span key={j}>{s}</span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <p className="font-bold">💸 {listing.price}</p>
                <button
                  onClick={openWaitlist}
                  className="px-4 py-2 bg-black text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition-colors"
                >
                  View deal
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <button
            onClick={openWaitlist}
            className="px-6 py-3 border border-gray-300 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
          >
            👉 See all listings
          </button>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 border-y border-gray-100 px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">How it works</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { n: "1", title: "List your SaaS", desc: "Describe your project in 2 minutes" },
              { n: "2", title: "Get matched", desc: "Buyers contact you directly" },
              { n: "3", title: "Close the deal", desc: "No middleman. No commission." },
            ].map((step) => (
              <div key={step.n} className="bg-white border border-gray-100 rounded-xl p-6">
                <p className="text-4xl font-extrabold text-gray-100 mb-3">{step.n}</p>
                <p className="font-semibold mb-1">{step.title}</p>
                <p className="text-sm text-gray-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seller + Buyer */}
      <section className="px-6 py-16 max-w-3xl mx-auto grid sm:grid-cols-2 gap-6">
        <div className="border border-gray-200 rounded-2xl p-7 flex flex-col">
          <p className="text-3xl mb-3">🧑‍💻</p>
          <h2 className="text-lg font-bold mb-2">Sitting on a side project you don&apos;t maintain?</h2>
          <p className="text-sm text-gray-500 mb-5">Stop letting your SaaS die silently.</p>
          <ul className="text-sm text-gray-600 space-y-2 mb-6 flex-1">
            <li>✓ Sell in days, not months</li>
            <li>✓ No negotiation headaches</li>
            <li>✓ Direct buyers only</li>
          </ul>
          <button
            onClick={openWaitlist}
            className="px-5 py-2.5 bg-black text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition-colors"
          >
            👉 List your SaaS
          </button>
        </div>

        <div className="border border-gray-200 rounded-2xl p-7 flex flex-col">
          <p className="text-3xl mb-3">💰</p>
          <h2 className="text-lg font-bold mb-2">Want to skip the &quot;idea phase&quot;?</h2>
          <p className="text-sm text-gray-500 mb-5">Buy a SaaS that already makes money.</p>
          <ul className="text-sm text-gray-600 space-y-2 mb-6 flex-1">
            <li>✓ Real revenue</li>
            <li>✓ Real users</li>
            <li>✓ No fake listings</li>
          </ul>
          <button
            onClick={openWaitlist}
            className="px-5 py-2.5 bg-black text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition-colors"
          >
            👉 Browse deals
          </button>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 border-y border-gray-100 px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Common questions</h2>
          <div className="divide-y divide-gray-200">
            {faq.map((item, i) => (
              <div key={i} className="py-4">
                <button
                  className="w-full flex justify-between items-center text-left gap-4"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-medium">{item.q}</span>
                  <span className="text-xl shrink-0">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && (
                  <p className="mt-3 text-sm text-gray-500">{item.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-black text-white px-6 py-20 text-center">
        <h2 className="text-3xl font-bold mb-3">Don&apos;t miss the first deals.</h2>
        <p className="text-gray-400 mb-8">Join the waitlist. We&apos;ll notify you when we launch.</p>
        <div className="max-w-md mx-auto">
          <WaitlistForm label="Join the waitlist" />
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 text-center text-xs text-gray-400">
        Built by{" "}
        <a href={siteConfig.footer.builtByUrl} className="underline hover:text-gray-600">
          {siteConfig.footer.builtBy}
        </a>
      </footer>
    </main>
  );
}
