import Link from "next/link"
import {
  ArrowRight,
  TrendingUp,
  Bot,
  Zap,
  ShieldCheck,
  BarChart3,
  CheckCircle2,
  Star,
  Layers,
  Activity,
  Globe,
  IndianRupee,
  Bell,
  ScrollText,
} from "lucide-react"

const ECOSYSTEM = [
  "Shopify", "Meta Ads", "Google Ads", "Blinkit", "Zepto",
  "Amazon", "Razorpay", "Shiprocket", "Tally",
]

const STATS = [
  { value: "₹2.93L", label: "Avg opportunity found in first audit", hindi: "पहले audit में" },
  { value: "13% → 8%", label: "Average RTO rate reduction in 90 days", hindi: "RTO rate घटाओ" },
  { value: "4 AI Agents", label: "Working 24/7 — you stay in control", hindi: "हमेशा काम करते हैं" },
  { value: "+10pp", label: "Average CM% improvement in first quarter", hindi: "margin improvement" },
]

const FEATURES = [
  {
    icon: TrendingUp,
    title: "Margin Truth Ledger",
    hindi: "असली मुनाफ़ा जानो",
    desc: "Real CM = Revenue − GST − Channel Fee − PG Fee − Freight − Ad Attribution − COGS − Packaging − RTO. Per SKU, per channel, refreshed every 5 minutes.",
    badge: "Core Engine",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  {
    icon: Bot,
    title: "Ad Intelligence — CMPR",
    hindi: "ROAS नहीं, CMPR देखो",
    desc: "ROAS misleads. CMPR (Contribution Margin per Rupee spent) shows which Meta and Google campaigns are actually profitable after every deduction.",
    badge: "Acquisition Agent",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  {
    icon: ShieldCheck,
    title: "RTO Shield",
    hindi: "वापसी रोको",
    desc: "Pincode-level RTO risk scoring, COD verification on WhatsApp, pre-dispatch confirmation. Cut return losses by 40–55%.",
    badge: "Margin Analyst",
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
  },
  {
    icon: Zap,
    title: "Quick Commerce Ops",
    hindi: "Dark store हमेशा भरा रहे",
    desc: "Track Blinkit, Zepto & Instamart dark store inventory daily. Automatic replenishment triggers. Never lose a quick commerce sale to stockout.",
    badge: "QC Agent",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
  {
    icon: BarChart3,
    title: "Peer Benchmarks",
    hindi: "दूसरों से खुद को compare करो",
    desc: "Compare your CM%, RTO rate, ROAS, and repeat rate vs 28 anonymised brands in your exact category and revenue band.",
    badge: "Insights",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
  },
  {
    icon: Globe,
    title: "Geography-Agnostic",
    hindi: "भारत पहले, दुनिया बाद में",
    desc: "Built for Indian D2C brands first — Shopify, Meta, Google, Razorpay are all global. When you expand to US, UK, UAE, you carry the same platform.",
    badge: "Future-Ready",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
  },
  {
    icon: Bell,
    title: "Daily Brief — every 7am",
    hindi: "रोज़ सुबह तैयार report",
    desc: "Orchestrator assembles your P&L summary, top 3 actions, and 5 key observations every morning. Delivered on WhatsApp + email. No dashboards to open.",
    badge: "Orchestrator",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
  },
  {
    icon: ScrollText,
    title: "Full Audit Trail",
    hindi: "हर action का हिसाब",
    desc: "Every recommendation, every action, every outcome — logged immutably with full reasoning. Rollback any executed action in 24 hours with one tap.",
    badge: "Trust Layer",
    color: "text-zinc-400",
    bg: "bg-zinc-500/10",
    border: "border-zinc-500/20",
  },
]

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Connect in 5 minutes",
    desc: "OAuth with Shopify, Meta Ads, Google Ads, Razorpay, Shiprocket. No spreadsheets.",
    color: "text-primary",
  },
  {
    step: "02",
    title: "Margin Audit in 24 hours",
    desc: "Margin Analyst agent surfaces your 5 biggest leaks from 90 days of data, ranked by ₹ impact.",
    color: "text-emerald-400",
  },
  {
    step: "03",
    title: "Approve actions",
    desc: "Every recommendation shows reasoning, confidence score, and expected monthly impact. You approve or decline.",
    color: "text-amber-400",
  },
  {
    step: "04",
    title: "Weekly brief — every Monday",
    desc: "Orchestrator delivers your P&L summary, what improved, and what needs attention this week.",
    color: "text-purple-400",
  },
]

const TESTIMONIALS = [
  {
    name: "Aditi Rao",
    business: "Velvet Skin Co. — Skincare D2C, Mumbai",
    revenue: "₹8L/month",
    quote: "Sarthi found that my Vitamin C Serum on Blinkit had negative contribution margin — the 18% quick commerce fee plus ₹45 freight wiped the profit. Spreadsheet mein yeh kabhi nahi dikhta.",
    stars: 5,
  },
  {
    name: "Rahul Mahajan",
    business: "PureForm Nutrition — Supplements, Delhi",
    revenue: "₹12L/month",
    quote: "ROAS 3.8x dikh raha tha, sab theek lag raha tha. But CMPR was 0.19 after GST, freight, and channel fee. Ek campaign alone ₹38,000/month burn kar raha tha.",
    stars: 5,
  },
  {
    name: "Neha Gupta",
    business: "Morning Ritual — Wellness D2C, Bangalore",
    revenue: "₹6L/month",
    quote: "Performance marketing manager hire karne wali thi — ₹80,000/month. Sarthi's Acquisition Agent yeh better karta hai aur reasoning bhi dikhata hai. ₹999/month mein.",
    stars: 5,
  },
]

const AGENTS = [
  { name: "Orchestrator", role: "Coordinates all agents. Daily brief + weekly P&L.", dot: "bg-purple-400", tag: "text-purple-400 bg-purple-500/10" },
  { name: "Margin Analyst", role: "Finds margin leaks. Flags underpriced SKUs, RTO hotspots.", dot: "bg-blue-400", tag: "text-blue-400 bg-blue-500/10" },
  { name: "Acquisition Agent", role: "Optimizes by CMPR. Pauses negative-margin campaigns.", dot: "bg-emerald-400", tag: "text-emerald-400 bg-emerald-500/10" },
  { name: "Quick Commerce Agent", role: "Tracks dark stores. Prevents stockouts.", dot: "bg-amber-400", tag: "text-amber-400 bg-amber-500/10" },
]

const PRICING = [
  {
    name: "Free Demo",
    price: "₹0",
    period: "forever",
    desc: "Full platform with realistic demo brand",
    features: [
      "All 12 pages with live demo data",
      "Margin Audit walkthrough",
      "Ad Intelligence (CMPR) preview",
      "All 4 AI agents in demo mode",
      "Benchmark comparison",
    ],
    cta: "Start Free Demo",
    href: "/sign-up",
    highlight: false,
  },
  {
    name: "Sarthi Pro",
    price: "₹999",
    period: "/ month",
    desc: "For D2C brands up to ₹5Cr ARR",
    features: [
      "Shopify + Meta + Google + Razorpay + Shiprocket",
      "All 4 AI agents — real brand data",
      "Real-time Margin Truth Ledger",
      "RTO Shield with WhatsApp verification",
      "Quick Commerce inventory alerts",
      "Peer benchmark access",
    ],
    cta: "Start 14-day free trial",
    href: "/sign-up",
    highlight: true,
  },
  {
    name: "Sarthi Scale",
    price: "₹2,499",
    period: "/ month",
    desc: "For brands ₹5–50Cr ARR",
    features: [
      "Everything in Pro",
      "Tally Prime + ERP integration",
      "Custom agent rules & thresholds",
      "Team access (5 seats)",
      "API + custom dashboards",
      "Priority WhatsApp support",
    ],
    cta: "Talk to us",
    href: "/sign-up",
    highlight: false,
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* ── NAV ─────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex h-14 items-center justify-between px-4 sm:px-6 border-b border-border/60 bg-background/90 backdrop-blur">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
            <Layers className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-base">Sarthi</span>
          <span className="text-[10px] text-muted-foreground border border-border/50 px-1.5 py-0.5 rounded font-medium hidden sm:inline">D2C Growth OS</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/sign-in" className="text-sm font-medium text-foreground/90 hover:text-foreground transition-colors px-3 py-1.5 rounded-md border border-border/70 hover:border-border hover:bg-white/5 hidden sm:block">
            Sign in
          </Link>
          <Link href="/sign-up" className="text-sm font-semibold bg-primary hover:bg-primary/90 text-white px-4 py-1.5 rounded-md transition-colors">
            Free Audit
          </Link>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────────────────────── */}
      <section className="india-glow pt-28 pb-16 px-4 sm:px-6 text-center">
        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            🇮🇳 Made in Bharat · India-first
          </div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
            <Activity className="h-3 w-3" />
            4 AI Agents Live
          </div>
        </div>

        <h1 className="mx-auto max-w-3xl text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
          Stop leaving money on the table.{" "}
          <span className="saffron-text">Know your real margin</span>{" "}
          — by SKU, by channel, by hour.
        </h1>

        <p className="mt-3 text-sm text-muted-foreground font-medium tracking-wide">
          सही margin जानो · सही फ़ैसला करो · सही brand बनाओ
        </p>

        <p className="mt-5 mx-auto max-w-xl text-sm sm:text-base text-muted-foreground leading-relaxed">
          Sarthi connects your Shopify, Meta Ads, Google Ads, Blinkit, and Amazon — then runs 4 AI agents 24/7 to find margin leaks, cut RTO losses, and scale only the campaigns that actually make money.
        </p>

        {/* Ecosystem pills */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-1.5">
          {ECOSYSTEM.map((name) => (
            <span key={name} className="text-xs text-muted-foreground border border-border/60 bg-white/3 px-2.5 py-1 rounded-full">
              {name}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/sign-up"
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-md bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-3 text-sm transition-colors"
          >
            <IndianRupee className="h-4 w-4" />
            Start Free Margin Audit
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/dashboard"
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-md border border-border/60 hover:border-border text-muted-foreground hover:text-foreground font-medium px-6 py-3 text-sm transition-colors"
          >
            <Activity className="h-4 w-4" />
            Live Demo Dashboard
          </Link>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">No credit card · 5 minute setup · Hindi + English</p>
      </section>

      {/* ── STATS ───────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 pb-16">
        <div className="mx-auto max-w-4xl grid grid-cols-2 lg:grid-cols-4 gap-3">
          {STATS.map((s) => (
            <div key={s.value} className="rounded-xl border border-border/60 bg-card p-4 text-center">
              <p className="text-xl sm:text-2xl font-bold text-primary">{s.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
              <p className="mt-0.5 text-[10px] text-primary/60 font-medium">{s.hindi}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4 AGENTS ────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 pb-16 border-t border-border/60 pt-16">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-2">4 AI agents. एक platform.</h2>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto">
              Unlike a dashboard that just shows data, Sarthi&apos;s agents watch your business in real time, propose specific actions with reasoning, and wait for your approval before executing.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {AGENTS.map((agent) => (
              <div key={agent.name} className="rounded-xl border border-border/60 bg-card p-4">
                <div className="flex items-center gap-2.5 mb-2">
                  <span className={`h-2 w-2 rounded-full ${agent.dot} animate-pulse flex-shrink-0`} />
                  <span className={`text-sm font-semibold px-2 py-0.5 rounded-full text-xs ${agent.tag}`}>
                    {agent.name}
                  </span>
                  <span className="ml-auto text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded">ACTIVE</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{agent.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 pb-20 border-t border-border/60 pt-16">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-xl sm:text-2xl font-bold mb-2">Every metric that matters to a D2C founder</h2>
            <p className="text-sm text-muted-foreground">हर rupee की सच — tracked automatically</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURES.map((f) => (
              <div key={f.title} className={`rounded-xl border ${f.border} bg-card p-5`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${f.bg} flex-shrink-0`}>
                    <f.icon className={`h-4.5 w-4.5 ${f.color}`} />
                  </div>
                  <span className={`text-xs font-medium ${f.color} bg-white/5 px-2 py-0.5 rounded-full`}>
                    {f.badge}
                  </span>
                </div>
                <h3 className="font-semibold text-sm mb-0.5">{f.title}</h3>
                <p className="text-[10px] text-primary/70 font-medium mb-2">{f.hindi}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HUMAN-IN-THE-LOOP GUARANTEE ─────────────────────────────── */}
      <section className="px-4 sm:px-6 pb-16 border-t border-border/60 pt-12">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-8">
            <div className="text-center mb-6">
              <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">Human-in-the-Loop — Always</p>
              <h2 className="text-lg sm:text-xl font-bold">Agents propose. You decide. Sarthi executes.</h2>
              <p className="text-sm text-muted-foreground mt-2 max-w-lg mx-auto">
                Sarthi agents never act without your approval — unless you explicitly set a rule to allow it. Every action is reversible.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  icon: Bot,
                  title: "Agent proposes",
                  desc: "Agent finds an opportunity, computes the expected ₹ impact, and files a recommendation with full reasoning and confidence score.",
                  color: "text-blue-400",
                  bg: "bg-blue-500/10",
                },
                {
                  icon: CheckCircle2,
                  title: "You approve or decline",
                  desc: "You see exactly what will happen and why. Approve in one tap — or decline and the agent learns from your decision.",
                  color: "text-emerald-400",
                  bg: "bg-emerald-500/10",
                },
                {
                  icon: ScrollText,
                  title: "Full audit + 24h rollback",
                  desc: "Every action is logged immutably. Changed your mind? Rollback any executed action within 24 hours with a single tap.",
                  color: "text-primary",
                  bg: "bg-primary/10",
                },
              ].map((g) => (
                <div key={g.title} className="flex items-start gap-3 p-4 rounded-xl bg-white/3 border border-border/40">
                  <div className={`h-8 w-8 rounded-lg ${g.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                    <g.icon className={`h-4 w-4 ${g.color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-1">{g.title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{g.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 pb-20 border-t border-border/60 pt-16">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-xl sm:text-2xl font-bold mb-2">कैसे काम करता है Sarthi?</h2>
            <p className="text-sm text-muted-foreground">From zero to first insight in under 24 hours</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={step.step} className="relative">
                <div className={`text-3xl font-black ${step.color} mb-3`}>{step.step}</div>
                <h3 className="font-semibold text-sm mb-1.5">{step.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 pb-20 border-t border-border/60 pt-16">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-xl sm:text-2xl font-bold mb-2">Founders speak — unfiltered</h2>
            <p className="text-sm text-muted-foreground">Solo founders & 2-person teams getting enterprise-grade intelligence</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="rounded-xl border border-border/60 bg-card p-5 flex flex-col">
                <div className="flex mb-3">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed italic flex-1 mb-4">&quot;{t.quote}&quot;</p>
                <div className="border-t border-border/60 pt-3">
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.business}</p>
                  <p className="text-xs text-primary mt-0.5 font-medium">{t.revenue} GMV</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CM FORMULA ──────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 pb-20">
        <div className="mx-auto max-w-3xl rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-8">
          <p className="text-center text-xs font-semibold text-primary uppercase tracking-widest mb-4">
            Sarthi Contribution Margin Formula
          </p>
          <div className="font-mono text-xs sm:text-sm text-center leading-7 text-muted-foreground">
            <span className="text-emerald-400 font-bold text-sm sm:text-base">CM</span>
            {" = Gross Revenue"}
            <br />
            <span className="text-red-400"> − Discount − GST − Channel Fee − PG Fee</span>
            <br />
            <span className="text-red-400"> − Freight Forward − Freight Reverse − Ad Attribution</span>
            <br />
            <span className="text-red-400"> − COGS − Packaging Cost − RTO Provision</span>
          </div>
          <p className="text-center text-xs text-muted-foreground mt-4">
            यही असली number है। Revenue नहीं। ROAS नहीं। <strong className="text-foreground">Contribution Margin.</strong>
          </p>
        </div>
      </section>

      {/* ── PRICING ─────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 pb-20 border-t border-border/60 pt-16">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-xl sm:text-2xl font-bold mb-2">Simple, honest pricing</h2>
            <p className="text-sm text-muted-foreground">Start free. Upgrade only when you see real value.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PRICING.map((p) => (
              <div
                key={p.name}
                className={`rounded-xl border p-5 flex flex-col ${
                  p.highlight
                    ? "border-primary/40 bg-primary/5"
                    : "border-border/60 bg-card"
                }`}
              >
                {p.highlight && (
                  <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full self-start mb-3">
                    Most Popular
                  </span>
                )}
                <h3 className="font-bold text-base">{p.name}</h3>
                <div className="mt-1.5 mb-1">
                  <span className="text-2xl sm:text-3xl font-bold">{p.price}</span>
                  <span className="text-sm text-muted-foreground ml-1">{p.period}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-4">{p.desc}</p>
                <ul className="space-y-2 flex-1 mb-5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={p.href}
                  className={`flex items-center justify-center gap-2 rounded-md font-semibold px-4 py-2.5 text-sm transition-colors ${
                    p.highlight
                      ? "bg-primary hover:bg-primary/90 text-white"
                      : "border border-border/60 hover:border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {p.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>

          {/* Indian trust signals */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {["GST compliant", "UPI ready", "RBI guidelines", "AWS Mumbai", "DPDP Act compliant"].map((t) => (
              <span key={t} className="text-xs text-muted-foreground border border-border/40 px-2.5 py-1 rounded-full">
                ✓ {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ───────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 pb-16 text-center">
        <div className="mx-auto max-w-xl rounded-2xl border border-primary/20 bg-primary/5 p-8 sm:p-12">
          <div className="text-3xl mb-3">🪔</div>
          <h2 className="text-xl sm:text-2xl font-bold mb-2">
            Pehla Margin Audit free hai.
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
            Connect Shopify + Meta + Google in 5 minutes. Get 5 findings ranked by ₹ impact — in 24 hours.
          </p>
          <div className="space-y-2 mb-6">
            {["No spreadsheets", "Apna Shopify + Meta + Google connect karo", "India-first, globally ready"].map((pt) => (
              <div key={pt} className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                {pt}
              </div>
            ))}
          </div>
          <Link
            href="/sign-up"
            className="inline-flex items-center gap-2 rounded-md bg-primary hover:bg-primary/90 text-white font-semibold px-7 py-3 text-sm transition-colors"
          >
            <IndianRupee className="h-4 w-4" />
            Free Margin Audit shuru karo
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────── */}
      <footer className="border-t border-border/60 px-4 sm:px-6 py-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary">
            <Layers className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="font-bold text-sm">Sarthi</span>
        </div>
        <p className="text-xs text-muted-foreground">
          © 2026 Sarthi Technologies Pvt. Ltd. · Proudly built in Bharat 🇮🇳
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          India-first · Geography-agnostic · AWS Mumbai + Singapore
        </p>
      </footer>
    </div>
  )
}
