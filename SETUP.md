# Sarthi MVP — Setup Guide

**Time to first demo: ~25 minutes**

---

## 1. Free Accounts to Create (in order)

### A. Clerk (Auth) — https://clerk.com
1. Create account → New Application → name it "Sarthi"
2. Enable "Email & Password" sign-in
3. Go to **API Keys** → copy `Publishable Key` and `Secret Key`

### B. Neon (Database) — https://neon.tech
1. Create account → New Project → Region: "AWS Mumbai (ap-south-1)"
2. Database name: `sarthi`
3. Copy the **Connection String** (starts with `postgresql://`)

### C. Google Gemini (AI) — https://aistudio.google.com/apikey
1. Sign in → Create API Key → copy it
2. Free tier: 1,500 requests/day, 1M tokens/minute — more than enough for demo

### D. Upstash Redis (Cache) — https://upstash.com
1. Create account → Create Database → Region: "ap-south-1 (Mumbai)"
2. Copy **REST URL** and **REST Token**

### E. Resend (Email) — https://resend.com
1. Create account → API Keys → Create API Key
2. Add your domain or use the free sandbox (resend.dev)

---

## 2. Configure Environment Variables

Copy `.env.local.example` to `.env.local` and fill in all values:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your actual keys from step 1.

---

## 3. Set Up Database

Run the database migrations to create all tables:

```bash
# Install drizzle-kit if not already installed
npx drizzle-kit generate
npx drizzle-kit migrate
```

---

## 4. Run Locally

```bash
npm run dev
```

Open http://localhost:3000

**The demo runs entirely on realistic simulated data** — no real API connections needed to show the demo to entrepreneurs. The Shopify, Meta Ads, Razorpay, Shiprocket, Blinkit, and Zepto data are generated from authentic Indian D2C brand patterns.

---

## 5. Deploy to Vercel (Free)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

During deployment, add all environment variables from `.env.local` in the Vercel dashboard under:
**Project → Settings → Environment Variables**

The build will succeed on Vercel (their infrastructure supports modern CPUs, unlike some local Windows machines).

---

## Demo Flow for Entrepreneurs

1. **Landing page** → Click "Start your Margin Audit free"
2. **Sign up** with email
3. **Onboarding** → Brand profile → Connect channels (simulated OAuth) → Launch audit
4. **Margin Audit report** → 5 findings, total ₹3.5L/month opportunity identified
5. **Dashboard** → Daily Brief with AI observations
6. **Action Center** → Approve/decline specific agent recommendations
7. **Channels** → All connectors visible with status
8. **Margin** → Full contribution margin waterfall
9. **Forecast** → 3-scenario 90-day projections
10. **Benchmarks** → vs 28 peer brands in same category/scale

---

## What's Real vs Simulated in the MVP

| Feature | Status |
|---|---|
| Auth (sign up / sign in) | REAL — Clerk |
| Database | REAL — Neon PostgreSQL |
| AI Margin Audit narrative | REAL — Gemini 1.5 Pro |
| AI Daily Brief generation | REAL — Gemini 1.5 Flash |
| Shopify data | Simulated (real OAuth ready — add SHOPIFY_CLIENT_ID) |
| Meta Ads data | Simulated (real API structure, ready to wire) |
| Razorpay data | Simulated (real test-mode API ready) |
| All UI/dashboards | REAL — fully functional |
| All margin math | REAL — deterministic computation |
| Benchmark data | Simulated with authentic D2C industry numbers |

---

## Transition to Paid (Post-Investment)

When you're ready for production:
1. Replace free Neon (0.5GB) with paid Neon or RDS → same code, change DATABASE_URL
2. Add real Shopify OAuth using `SHOPIFY_CLIENT_ID` (already scaffolded)
3. Add Meta Ads API connection (scaffolded in `lib/connectors/`)
4. Add real WhatsApp BSP via Gupshup (free to set up, per-message cost)
5. Replace Gemini free tier with Gemini Pro paid API (same code, just costs money at scale)

**Estimated monthly infra cost at 10 paying customers:** < ₹8,000/month on free/low-cost tiers
**Estimated monthly infra cost at 100 paying customers:** ~₹80,000/month (all paid tiers)
