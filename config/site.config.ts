// ============================================================
// SITE CONFIG — edit this file only to customise the landing page
// The agent fills this in automatically from the idea description
// ============================================================

export const siteConfig = {
  // ── Meta ──────────────────────────────────────────────────
  name: "SaasSwap",
  tagline: "Find your next co-marketing partner in minutes",
  description: "SaasSwap matches indie SaaS founders for newsletter swaps, joint promos, and cross-sells — without the cold DMs.",
  subdomain: "saasswap", // → saasswap.tinylabs.tech
  twitterHandle: "", // optional, e.g. "@saasswap"

  // ── Hero ──────────────────────────────────────────────────
  hero: {
    headline: "Grow your SaaS by swapping audiences with the right founders",
    subheadline: "Stop cold DM'ing strangers on Twitter. SaasSwap matches you with indie founders whose audience fits your ICP — for newsletter swaps, joint promos, and cross-sells.",
    ctaLabel: "Get early access",
    ctaNote: "Free for 3 months. No credit card required.",
  },

  // ── Features ──────────────────────────────────────────────
  features: [
    {
      icon: "🔍",
      title: "Smart matching",
      description: "Filter by niche, audience size, and partnership type. Get matched with founders whose audience is your ideal customer — not just anyone.",
    },
    {
      icon: "📊",
      title: "Verified metrics upfront",
      description: "See real subscriber counts and audience data before you reach out. No surprises, no wasted calls, no ghosting.",
    },
    {
      icon: "💬",
      title: "Close deals in-app",
      description: "Agree on swap terms and track your partnerships without leaving SaasSwap. One tool to find, negotiate, and track.",
    },
  ],

  // ── Pricing ───────────────────────────────────────────────
  pricing: {
    headline: "Simple, founder-friendly pricing",
    subheadline: "No per-seat nonsense. Cancel any time.",
    price: "£19",
    period: "/month",
    earlyBirdNote: "Early access — first 3 months free, no credit card needed.",
    perks: [
      "List your SaaS and get matched",
      "Unlimited messages with matched founders",
      "Partnership tracker",
      "Verified metrics badge",
      "Cancel any time",
    ],
    ctaLabel: "Get early access",
    stripeLink: "", // paste your Stripe payment link here once created
  },

  // ── FAQ ───────────────────────────────────────────────────
  faq: [
    {
      question: "Do I need a big audience to join?",
      answer: "Not at all. We match on fit, not size. A 500-subscriber newsletter in a tight niche is more valuable to the right partner than a 50,000-subscriber generic list.",
    },
    {
      question: "What types of partnerships does SaasSwap support?",
      answer: "Newsletter swaps, joint promos, affiliate deals, podcast guest spots, and social media collabs. You pick what you're open to when you list your product.",
    },
    {
      question: "What if a partner ghosts me after agreeing?",
      answer: "We track completion rates. Founders who don't follow through lose their verified badge and get deprioritised in matching. Reliability is baked into the system.",
    },
  ],

  // ── Footer ────────────────────────────────────────────────
  footer: {
    builtBy: "tinylabs.tech",
    builtByUrl: "https://tinylabs.tech",
  },
};
