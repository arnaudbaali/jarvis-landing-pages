# Deploying a landing page to tinylabs.tech

## One-time setup (do this once)

### 1. Push template to GitHub
```bash
cd landing-template
git init
git add .
git commit -m "init landing template"
gh repo create tinylabs-landing --private --push
```

### 2. Connect to Vercel
- Go to vercel.com → Add New Project → import `tinylabs-landing`
- Framework: Next.js (auto-detected)
- Deploy — your base URL will be `tinylabs-landing.vercel.app`

### 3. Add tinylabs.tech to Vercel
- In Vercel project settings → Domains → Add `*.tinylabs.tech`
- Vercel gives you a CNAME record to add in Namecheap

### 4. Add wildcard DNS in Namecheap
- Go to Namecheap → Manage tinylabs.tech → Advanced DNS
- Add: `CNAME | * | cname.vercel-dns.com | Automatic TTL`
- This means every subdomain (idea1.tinylabs.tech, etc.) routes to Vercel automatically

---

## Per-idea workflow (each new idea, same day)

### Step 1 — Generate the page
```bash
node generate.mjs "Idea Name" "One paragraph describing what the product does and who it's for."
```

### Step 2 — Preview locally
```bash
npm run dev
# open http://localhost:3000
```

### Step 3 — Deploy
```bash
git add config/site.config.ts
git commit -m "launch: idea-name"
git push
# Vercel auto-deploys in ~30 seconds
```

### Step 4 — Add subdomain in Vercel
- Vercel project → Settings → Domains → Add `ideaname.tinylabs.tech`
- It resolves instantly via the wildcard DNS

### Step 5 — Add Supabase (optional, takes 5 min)
- Create free project at supabase.com
- Run: `CREATE TABLE waitlist (id uuid default gen_random_uuid(), email text unique, idea text, created_at timestamptz default now());`
- Copy URL + service role key to Vercel environment variables
- Redeploy

### Step 6 — Add Stripe link (when ready to charge)
- Create a Payment Link in Stripe dashboard (£10/month subscription)
- Paste the link into `siteConfig.pricing.stripeLink` in `site.config.ts`
- Push — pricing button now goes directly to checkout

---

## Validating an idea
- **Signal = someone paid or gave you their email unprompted**
- If no signups after 1 week of sharing → kill it, move on
- If 5+ signups → buy the dedicated domain, build the MVP
