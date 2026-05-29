import Link from "next/link"
import { ArrowRight, TrendingUp, Zap, BarChart3, Shield, CheckCircle2, Layers } from "lucide-react"

const FEATURES = [
  {
    icon: TrendingUp,
    title: "Contribution Margin Truth",
    desc: "Real-time CM at SKU × channel × pincode × day — computed from Shopify, Meta, Google, Blinkit, Zepto, Razorpay, and Tally simultaneously.",
  },
  {
    icon: Zap,
    title: "AI Agents That Act",
    desc: "Four specialist agents (Margin Analyst, Acquisition, Quick Commerce, Orchestrator) propose and execute coordinated actions across all your channels.",
  },
  {
    icon: BarChart3,
    title: "The Margin Audit",
    desc: "24-hour onboarding that delivers a report identifying ≥5 specific actions worth ≥3% contribution margin improvement. Or it's free.",
  },
  {
    icon: Shield,
    title: "Human-in-the-Loop Controls",
    desc: "Three permission tiers (Notify / Propose / Auto) per action class. Every agent action is reversible within 24 hours.",
  },
]

const CHANNELS = [
  "Shopify", "Amazon India", "Flipkart", "Blinkit", "Zepto", "Swiggy Instamart",
  "Meta Ads", "Google Ads", "Razorpay", "Shiprocket", "Tally Prime", "WhatsApp"
]

const STATS = [
  { value: "₹108B", label: "Indian D2C market in 2026" },
  { value: "18 hrs", label: "Average spent on data consolidation per week" },
  { value: "8–15%", label: "Revenue lost to COD/RTO" },
  { value: "32%", label: "YoY rise in CAC across D2C brands" },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#09090b] text-[#fafafa]">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex h-14 items-center justify-between px-6 border-b border-white/8 bg-[#09090b]/90 backdrop-blur">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-500">
            <Layers className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-base">Sarthi</span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/sign-in"
            className="text-sm text-zinc-400 hover:text-white transition-colors px-3 py-1.5"
          >
            Sign in
          </Link>
          <Link
            href="/sign-up"
            className="text-sm font-medium bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-md transition-colors"
          >
            Get started free
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs text-blue-400 mb-8">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
          India-native D2C growth operator · Currently in Beta
        </div>

        <h1 className="mx-auto max-w-3xl text-5xl font-bold leading-tight tracking-tight">
          Your brand's autonomous{" "}
          <span className="text-blue-400">growth operator</span>
          <br />runs while you sleep.
        </h1>

        <p className="mt-6 mx-auto max-w-xl text-base text-zinc-400 leading-relaxed">
          Sarthi connects every channel your brand runs on — Shopify, Amazon, Blinkit, Meta Ads, Razorpay, Shiprocket — computes real contribution margin, and deploys AI agents that take action.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/sign-up"
            className="flex items-center gap-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 text-sm transition-colors"
          >
            Start your Margin Audit free
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 rounded-md border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white font-medium px-6 py-3 text-sm transition-colors"
          >
            View demo dashboard
          </Link>
        </div>
        <p className="mt-3 text-xs text-zinc-500">No credit card required · Free Margin Audit in 24 hours</p>
      </section>

      {/* Stats */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((s) => (
            <div key={s.value} className="rounded-lg border border-white/8 bg-white/3 p-5 text-center">
              <p className="text-2xl font-bold text-blue-400">{s.value}</p>
              <p className="mt-1 text-xs text-zinc-400">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-2xl font-bold mb-12">
            One platform. Every channel. Real numbers.
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-xl border border-white/8 bg-white/3 p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 mb-4">
                  <f.icon className="h-5 w-5 text-blue-400" />
                </div>
                <h3 className="font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Channels */}
      <section className="px-6 pb-24 border-t border-white/8 pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs text-zinc-500 uppercase tracking-widest mb-6">Works with everything Indian D2C runs on</p>
          <div className="flex flex-wrap justify-center gap-2">
            {CHANNELS.map((ch) => (
              <span
                key={ch}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300"
              >
                {ch}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof / CTA */}
      <section className="px-6 pb-20 text-center">
        <div className="mx-auto max-w-2xl rounded-2xl border border-blue-500/20 bg-blue-500/5 p-12">
          <h2 className="text-2xl font-bold mb-3">
            Get your Margin Audit in 24 hours
          </h2>
          <p className="text-sm text-zinc-400 mb-8 max-w-md mx-auto">
            Connect Shopify + Meta Ads + one more channel. We'll show you 5 specific actions worth ≥3% contribution margin improvement — or we'll tell you honestly that you're already doing great.
          </p>
          <div className="flex flex-col gap-3 items-center">
            {["No credit card required", "Real data, not estimates", "Dedicated onboarding call included"].map((p) => (
              <div key={p} className="flex items-center gap-2 text-sm text-zinc-300">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                {p}
              </div>
            ))}
          </div>
          <Link
            href="/sign-up"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-3 text-sm transition-colors"
          >
            Start for free
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/8 px-6 py-8 text-center text-xs text-zinc-500">
        <p>© 2026 Sarthi Technologies Pvt. Ltd. · Built for Indian D2C brands · DPDPA Compliant · Data stored in AWS Mumbai</p>
      </footer>
    </div>
  )
}
