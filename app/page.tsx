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
} from "lucide-react"

const STATS = [
  { value: "₹2.93L", label: "Avg monthly opportunity found in first audit" },
  { value: "13.2% → 8.1%", label: "Average RTO rate reduction in 90 days" },
  { value: "4 AI Agents", label: "Running 24/7 so you don't have to" },
  { value: "18% → 28%", label: "Average CM% improvement in first quarter" },
]

const FEATURES = [
  {
    icon: TrendingUp,
    title: "Margin Truth Ledger",
    desc: "Real CM = Revenue − GST − Channel Fee − PG Fee − Freight − Ad Attribution − COGS − Packaging − RTO Provision. Per SKU. Per channel. Refreshed every 5 minutes.",
    badge: "Core Engine",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    icon: Bot,
    title: "Ad Intelligence (CMPR, not ROAS)",
    desc: "ROAS lies. CMPR (Contribution Margin per Rupee of Ad Spend) tells the truth. See exactly which Meta and Google campaigns are profitable after all deductions.",
    badge: "Acquisition Agent",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    icon: ShieldCheck,
    title: "RTO Shield",
    desc: "Pincode-level RTO risk scoring, COD verification automation, and pre-dispatch WhatsApp confirmation. Cut your return-to-origin losses by 40-55%.",
    badge: "Margin Analyst",
    color: "text-red-400",
    bg: "bg-red-500/10",
  },
  {
    icon: Zap,
    title: "Quick Commerce Ops",
    desc: "Dark store inventory tracking, daily run rate forecasting, and automatic replenishment triggers across Blinkit, Zepto, and Swiggy Instamart.",
    badge: "QC Agent",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
  {
    icon: BarChart3,
    title: "Peer Benchmarks",
    desc: "See how your CM%, RTO rate, ROAS, and repeat purchase rate compare to 28 anonymized brands in your category and revenue band.",
    badge: "Insights",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
  {
    icon: Globe,
    title: "Geography-Agnostic",
    desc: "Built for Indian D2C brands today — but every connector (Shopify, Meta, Google, Amazon) is global. Expand to US, UK, UAE, Singapore without switching tools.",
    badge: "Future-Ready",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
]

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Connect in 5 minutes",
    desc: "OAuth with Shopify, Meta, Google Ads, Razorpay, Shiprocket, and Tally. No spreadsheets. No manual uploads.",
    color: "text-blue-400",
  },
  {
    step: "02",
    title: "First Margin Audit in 24 hours",
    desc: "Sarthi's Margin Analyst agent processes your last 90 days of orders, ad spend, and logistics data — and surfaces your 5 biggest margin leaks, ranked by rupee impact.",
    color: "text-emerald-400",
  },
  {
    step: "03",
    title: "Approve actions (you stay in control)",
    desc: "Every agent recommendation shows the reasoning, the confidence score, and the expected monthly impact. You approve, decline, or snooze. Sarthi never acts without you.",
    color: "text-amber-400",
  },
  {
    step: "04",
    title: "Track improvement weekly",
    desc: "Every Monday, your Orchestrator agent delivers a weekly brief: what changed, what improved, what needs your attention this week.",
    color: "text-purple-400",
  },
]

const TESTIMONIALS = [
  {
    name: "Aditi Rao",
    business: "Founder, Velvet Skin Co. — Skincare D2C, Mumbai",
    revenue: "₹8L/month",
    quote: "Sarthi found that my Vitamin C Serum on Blinkit had a negative contribution margin — the 18% quick commerce fee plus ₹45 freight wiped the profit. I would never have caught that with a spreadsheet. Fixed it in 2 days.",
    stars: 5,
  },
  {
    name: "Rahul Mahajan",
    business: "Founder, PureForm Nutrition — Supplements D2C, Delhi",
    revenue: "₹12L/month",
    quote: "The Meta CMPR dashboard is the first thing I open every morning. ROAS was showing 3.8x and I thought I was doing great — but CMPR was 0.19 after GST, channel fee, and freight. One campaign was bleeding ₹38,000/month.",
    stars: 5,
  },
  {
    name: "Neha Gupta",
    business: "Founder, Morning Ritual — Wellness D2C, Bangalore",
    revenue: "₹6L/month",
    quote: "I was about to hire a performance marketing manager at ₹80,000/month. Sarthi's Acquisition Agent does it better — and shows its reasoning. ₹1,499/month for an AI that watches every campaign 24/7.",
    stars: 5,
  },
]

const AGENTS = [
  {
    name: "Orchestrator",
    role: "Coordinates all agents. Delivers daily briefs and weekly P&L summaries.",
    color: "bg-purple-500/10 border-purple-500/20 text-purple-400",
    dot: "bg-purple-400",
  },
  {
    name: "Margin Analyst",
    role: "Finds margin leaks. Flags underpriced SKUs, high-discount channels, RTO hotspots.",
    color: "bg-blue-500/10 border-blue-500/20 text-blue-400",
    dot: "bg-blue-400",
  },
  {
    name: "Acquisition Agent",
    role: "Optimizes ad spend by CMPR. Pauses negative-margin campaigns. Scales winners.",
    color: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
    dot: "bg-emerald-400",
  },
  {
    name: "Quick Commerce Agent",
    role: "Tracks dark store inventory. Triggers replenishment. Prevents stockouts.",
    color: "bg-amber-500/10 border-amber-500/20 text-amber-400",
    dot: "bg-amber-400",
  },
]

const PRICING = [
  {
    name: "Free Demo",
    price: "₹0",
    period: "forever",
    desc: "Explore Sarthi with a realistic demo brand",
    features: [
      "Full dashboard with demo data",
      "Margin Audit walkthrough",
      "Ad Intelligence preview",
      "All 4 agents in demo mode",
      "Benchmark comparison",
    ],
    cta: "Start Free Demo",
    href: "/sign-up",
    highlight: false,
  },
  {
    name: "Sarthi Pro",
    price: "₹999",
    period: "per month",
    desc: "For brands up to ₹5Cr ARR",
    features: [
      "Everything connected (Shopify, Meta, Google, Razorpay, Shiprocket)",
      "All 4 AI agents active",
      "Real-time Margin Truth Ledger",
      "RTO Shield + COD verification",
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
    period: "per month",
    desc: "For brands ₹5-50Cr ARR",
    features: [
      "Everything in Pro",
      "Tally + ERP integration",
      "Custom agent rules & thresholds",
      "Team access (up to 5 seats)",
      "API access for custom dashboards",
      "Priority WhatsApp support + onboarding",
    ],
    cta: "Talk to us",
    href: "/sign-up",
    highlight: false,
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex h-14 items-center justify-between px-6 border-b border-white/8 bg-zinc-950/90 backdrop-blur">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-500">
            <Layers className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-base">Sarthi</span>
          <span className="text-xs text-zinc-500 ml-1 hidden sm:inline">— AI growth operator for D2C brands</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/sign-in" className="text-sm text-zinc-400 hover:text-white transition-colors px-3 py-1.5">
            Sign in
          </Link>
          <Link
            href="/sign-up"
            className="text-sm font-medium bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-md transition-colors"
          >
            Free Margin Audit
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs text-blue-400 mb-8">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
          India&apos;s first margin-first multi-agent platform for D2C founders
        </div>

        <h1 className="mx-auto max-w-4xl text-4xl sm:text-5xl font-bold leading-tight tracking-tight">
          Stop leaving money on the table.{" "}
          <span className="text-blue-400">Know your real margin</span>{" "}
          — by SKU, by channel, by hour.
        </h1>

        <p className="mt-6 mx-auto max-w-2xl text-base text-zinc-400 leading-relaxed">
          Sarthi connects your Shopify, Meta Ads, Google Ads, Blinkit, and Amazon — then runs 4 AI agents 24/7 to find margin leaks, cut RTO losses, and scale only the campaigns that actually make money.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/sign-up"
            className="flex items-center gap-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 text-sm transition-colors"
          >
            Start your free Margin Audit
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 rounded-md border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white font-medium px-6 py-3 text-sm transition-colors"
          >
            <Activity className="h-4 w-4" />
            See live demo dashboard
          </Link>
        </div>
        <p className="mt-3 text-xs text-zinc-500">No credit card · No spreadsheets · Connect in 5 minutes</p>
      </section>

      {/* Stats */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((s) => (
            <div key={s.value} className="rounded-lg border border-white/8 bg-white/3 p-5 text-center">
              <p className="text-xl font-bold text-blue-400">{s.value}</p>
              <p className="mt-1 text-xs text-zinc-400">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4 Agents showcase */}
      <section className="px-6 pb-20 border-t border-white/8 pt-16">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-3">4 AI agents. One platform.</h2>
            <p className="text-sm text-zinc-400 max-w-xl mx-auto">
              Unlike a dashboard that just shows data, Sarthi&apos;s agents watch your business in real time, propose specific actions, and show their reasoning. You approve. They execute.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {AGENTS.map((agent) => (
              <div
                key={agent.name}
                className={`rounded-xl border p-5 ${agent.color.split(" ").slice(0, 2).join(" ")}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className={`h-2 w-2 rounded-full ${agent.dot} animate-pulse`} />
                  <span className={`text-sm font-semibold ${agent.color.split(" ")[2]}`}>{agent.name}</span>
                  <span className="ml-auto text-[10px] text-zinc-500 bg-zinc-800 px-1.5 py-0.5 rounded">ACTIVE</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">{agent.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 pb-24 border-t border-white/8 pt-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-2xl font-bold mb-3">
            Every metric that matters to a D2C founder
          </h2>
          <p className="text-center text-sm text-zinc-400 mb-12">
            Not vanity metrics. Real contribution margin, tracked automatically.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-xl border border-white/8 bg-white/3 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${f.bg}`}>
                    <f.icon className={`h-5 w-5 ${f.color}`} />
                  </div>
                  <span className={`text-xs font-medium ${f.color} bg-white/5 px-2 py-0.5 rounded-full`}>
                    {f.badge}
                  </span>
                </div>
                <h3 className="font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 pb-24 border-t border-white/8 pt-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-2xl font-bold mb-3">How Sarthi works</h2>
          <p className="text-center text-sm text-zinc-400 mb-12">
            From zero to first insight in under 24 hours.
          </p>
          <div className="grid md:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={step.step} className="relative">
                {i < HOW_IT_WORKS.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-full w-full h-px bg-white/10 -translate-x-4" />
                )}
                <div className={`text-3xl font-black ${step.color} mb-3`}>{step.step}</div>
                <h3 className="font-semibold text-sm mb-2">{step.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 pb-24 border-t border-white/8 pt-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-2xl font-bold mb-3">
            Built for founders who run lean
          </h2>
          <p className="text-center text-sm text-zinc-400 mb-12">
            Solo founders, 2-person teams — getting enterprise-grade intelligence without the enterprise cost.
          </p>
          <div className="grid md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="rounded-xl border border-white/8 bg-white/3 p-6 flex flex-col">
                <div className="flex mb-3">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed italic flex-1 mb-4">&quot;{t.quote}&quot;</p>
                <div className="border-t border-white/8 pt-4">
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-zinc-500">{t.business}</p>
                  <p className="text-xs text-blue-400 mt-0.5">{t.revenue} GMV</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Margin formula callout */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-4xl rounded-2xl border border-white/10 bg-white/3 p-8">
          <h3 className="text-center text-sm font-medium text-zinc-400 uppercase tracking-wider mb-4">
            The Sarthi Contribution Margin Formula
          </h3>
          <div className="font-mono text-xs sm:text-sm text-center leading-loose text-zinc-300">
            <span className="text-emerald-400 font-bold">CM</span>
            {" = Gross Revenue"}
            <span className="text-red-400"> − Discount − GST − Channel Fee − PG Fee</span>
            <br />
            <span className="text-red-400"> − Freight Forward − Freight Reverse − Ad Attribution</span>
            <br />
            <span className="text-red-400"> − COGS − Packaging Cost − RTO Provision</span>
          </div>
          <p className="text-center text-xs text-zinc-500 mt-4">
            This is the number that actually tells you if your brand is healthy. Not revenue. Not ROAS. CM.
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-6 pb-24 border-t border-white/8 pt-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-2xl font-bold mb-3">Simple pricing. No surprises.</h2>
          <p className="text-center text-sm text-zinc-400 mb-12">
            Start with the free demo — upgrade when you see real value.
          </p>
          <div className="grid md:grid-cols-3 gap-5">
            {PRICING.map((p) => (
              <div
                key={p.name}
                className={`rounded-xl border p-6 flex flex-col ${
                  p.highlight ? "border-blue-500/50 bg-blue-500/5" : "border-white/8 bg-white/3"
                }`}
              >
                {p.highlight && (
                  <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full self-start mb-3">
                    Most Popular
                  </span>
                )}
                <h3 className="font-bold text-lg">{p.name}</h3>
                <div className="mt-2 mb-1">
                  <span className="text-3xl font-bold">{p.price}</span>
                  <span className="text-sm text-zinc-400 ml-1">/{p.period}</span>
                </div>
                <p className="text-xs text-zinc-500 mb-5">{p.desc}</p>
                <ul className="space-y-2 flex-1 mb-6">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-zinc-300">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={p.href}
                  className={`flex items-center justify-center gap-2 rounded-md font-semibold px-4 py-2.5 text-sm transition-colors ${
                    p.highlight
                      ? "bg-blue-500 hover:bg-blue-600 text-white"
                      : "border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white"
                  }`}
                >
                  {p.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 pb-20 text-center">
        <div className="mx-auto max-w-2xl rounded-2xl border border-blue-500/20 bg-blue-500/5 p-12">
          <h2 className="text-2xl font-bold mb-3">
            Your first Margin Audit is free.
          </h2>
          <p className="text-sm text-zinc-400 mb-8 max-w-md mx-auto">
            Connect Shopify + Meta + Google in 5 minutes. Get your 5 biggest margin leaks ranked by rupee impact — in 24 hours.
          </p>
          <div className="flex flex-col gap-3 items-center mb-8">
            {[
              "No spreadsheets or manual exports",
              "Works with your existing Shopify + Meta + Google",
              "India-first, globally ready",
            ].map((point) => (
              <div key={point} className="flex items-center gap-2 text-sm text-zinc-300">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                {point}
              </div>
            ))}
          </div>
          <Link
            href="/sign-up"
            className="inline-flex items-center gap-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-3 text-sm transition-colors"
          >
            Start free Margin Audit
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/8 px-6 py-8 text-center text-xs text-zinc-500">
        <p>© 2026 Sarthi Technologies Pvt. Ltd. · India-first, geography-agnostic · AWS Mumbai + Singapore · Made for D2C founders 🚀</p>
      </footer>
    </div>
  )
}
