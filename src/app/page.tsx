"use client";

import { useState } from "react";
import { siteConfig } from "../../config/site.config";

const faqs = [
  { q: "Do I need a big audience?", a: "No — even small audiences can swap. Fit matters more than size." },
  { q: "Is this just another directory?", a: "No — we match you and help you execute. Not just a list of founders." },
  { q: "Why not just use Twitter?", a: "Because this replaces hours of manual outreach with a 5-minute setup." },
];

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
          We&apos;ll email you the moment we launch.
        </p>
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
        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-sm text-black placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-black"
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

function ComingSoonModal({ onClose }: { onClose: () => void }) {
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
          Matching is in progress. Join the waitlist to be first in line.
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

  return (
    <main className="min-h-screen bg-white text-black font-sans antialiased">
      {showModal && <ComingSoonModal onClose={() => setShowModal(false)} />}

      {/* Hero */}
      <section className="px-6 pt-24 pb-16 max-w-3xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-4">
          Find SaaS partners to grow your users — without cold DMs
        </h1>
        <p className="text-lg text-gray-500 mb-3 max-w-xl mx-auto">
          Stop wasting hours messaging founders on Twitter. Get matched instantly with SaaS targeting the same audience and launch co-marketing campaigns in minutes.
        </p>
        <p className="text-sm text-gray-400 mb-8">
          Built for indie founders doing newsletter swaps, cross-promos &amp; launches
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="#waitlist"
            className="px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
          >
            👉 Join early access
          </a>
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-3 border border-gray-300 font-semibold rounded-lg hover:bg-gray-50 transition-colors text-gray-500"
          >
            Get matched <span className="text-xs font-normal">(coming soon)</span>
          </button>
        </div>
      </section>

      {/* Pain */}
      <section className="bg-gray-50 border-y border-gray-100 px-6 py-16">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-2">Co-marketing should be easy. It isn&apos;t.</h2>
          <p className="text-gray-500 mb-8">Here&apos;s what actually happens:</p>
          <ul className="space-y-4 mb-8">
            {[
              "You DM 10 founders → 2 reply",
              "You wait days → nothing happens",
              "You end up managing everything in spreadsheets",
            ].map((pain, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-red-500 mt-0.5 shrink-0">✗</span>
                <span className="text-gray-700">{pain}</span>
              </li>
            ))}
          </ul>
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <p className="font-semibold">
              👉 A 20-minute growth hack becomes a 3-hour task
            </p>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="px-6 py-16 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-2">SaasSwap does the matching for you.</h2>
        <p className="text-gray-500 mb-8">Everything you need to run co-marketing campaigns — without the manual work.</p>
        <ul className="space-y-4">
          {[
            { icon: "🎯", text: "Find SaaS with the same ICP instantly" },
            { icon: "📊", text: "See audience size before reaching out" },
            { icon: "💬", text: "Message directly in-app" },
            { icon: "📈", text: "Track partnerships — no spreadsheets" },
          ].map((item, i) => (
            <li key={i} className="flex items-center gap-3">
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.text}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Fake product preview */}
      <section className="bg-gray-50 border-y border-gray-100 px-6 py-16">
        <div className="max-w-2xl mx-auto">
          <p className="text-sm text-gray-400 uppercase tracking-wider font-semibold mb-6">Example match</p>
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <div className="mb-5 pb-5 border-b border-gray-100">
              <p className="text-xs text-gray-400 mb-1">Your SaaS</p>
              <p className="font-semibold">AI email writer <span className="text-gray-400 font-normal text-sm">— founders &amp; marketers</span></p>
            </div>
            <div className="mb-5">
              <p className="text-xs text-gray-400 mb-3">Matched with</p>
              <p className="font-semibold mb-3">Notion template SaaS</p>
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">📬 2,400 subscribers</span>
                <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium">ICP overlap: High</span>
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">💡 Newsletter swap</span>
              </div>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="w-full sm:w-auto px-6 py-2.5 bg-black text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition-colors"
            >
              👉 Start conversation
            </button>
          </div>
        </div>
      </section>

      {/* Value prop reframe */}
      <section className="px-6 py-16 max-w-2xl mx-auto text-center">
        <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-4">The bigger picture</p>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
          Get users from other SaaS audiences<br />— without ads
        </h2>
        <p className="text-gray-500">
          Every partnership is a distribution channel. SaasSwap helps you find and close them fast.
        </p>
      </section>

      {/* Who it's for */}
      <section className="bg-gray-50 border-y border-gray-100 px-6 py-16">
        <div className="max-w-2xl mx-auto">
          <p className="text-sm text-gray-400 uppercase tracking-wider font-semibold mb-6">Built for</p>
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: "⚡", label: "Indie hackers" },
              { icon: "🛠", label: "Micro-SaaS founders" },
              { icon: "🧍", label: "Solo builders" },
            ].map((item) => (
              <div key={item.label} className="bg-white border border-gray-200 rounded-xl p-5 text-center">
                <p className="text-2xl mb-2">{item.icon}</p>
                <p className="text-sm font-medium">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing anchor */}
      <section className="px-6 py-16 max-w-2xl mx-auto text-center">
        <p className="text-sm text-gray-400 uppercase tracking-wider font-semibold mb-6">Pricing</p>
        <div className="inline-block border border-gray-200 rounded-2xl p-8">
          <p className="text-4xl font-extrabold mb-2">Free</p>
          <p className="text-gray-500 mb-1">during early access</p>
          <p className="text-sm text-gray-400">→ £19/month once public</p>
        </div>
      </section>

      {/* Waitlist CTA */}
      <section id="waitlist" className="bg-black text-white px-6 py-20 text-center">
        <h2 className="text-3xl font-bold mb-3">🚀 Want early access?</h2>
        <p className="text-gray-400 mb-8">
          Free while we&apos;re in beta. We&apos;ll email you when your first match is ready.
        </p>
        <div className="max-w-md mx-auto">
          <WaitlistForm label="Join the waitlist" dark />
        </div>
      </section>

      {/* Objection handling */}
      <section className="px-6 py-16 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-8">Common questions</h2>
        <div className="divide-y divide-gray-100">
          {faqs.map((item, i) => (
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
      </section>

      {/* Final CTA */}
      <section className="border-t border-gray-100 px-6 py-20 text-center">
        <h2 className="text-2xl font-bold mb-3">Stop wasting time on co-marketing.</h2>
        <p className="text-gray-500 mb-8">Get your first match in minutes, not days.</p>
        <a
          href="#waitlist"
          className="inline-block px-8 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
        >
          👉 Get early access
        </a>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 text-center text-xs text-gray-400 border-t border-gray-100">
        Built by{" "}
        <a href={siteConfig.footer.builtByUrl} className="underline hover:text-gray-600">
          {siteConfig.footer.builtBy}
        </a>
      </footer>
    </main>
  );
}
