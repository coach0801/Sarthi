import Link from "next/link"
import { ArrowRight, TrendingUp, Users, AlertTriangle, Package, FileText, CheckCircle2, Star, Layers } from "lucide-react"

const STATS = [
  { value: "6.3 Cr+", label: "Small businesses in India" },
  { value: "₹83,000", label: "Average dues recovered per year with Sarthi" },
  { value: "41%", label: "Small business owners don't know their real profit" },
  { value: "19 days", label: "Average cash runway for most small businesses" },
]

const FEATURES = [
  {
    icon: TrendingUp,
    title: "Real Profit, Per Product",
    desc: "See exactly how much money you actually make on each item you sell — after cost. No guessing. No spreadsheets.",
    badge: "Munaafa",
  },
  {
    icon: Users,
    title: "Udhaar Recovery",
    desc: "See who owes you money, for how long, and send WhatsApp reminders in one tap. Recover dues before they become bad debt.",
    badge: "Udhaar",
  },
  {
    icon: AlertTriangle,
    title: "Cash Warning",
    desc: "Know exactly how many days your cash will last. Get warned 10 days before you run out — before it becomes a crisis.",
    badge: "Cash Flow",
  },
  {
    icon: Package,
    title: "Stock Alerts",
    desc: "Know what's running out, what's sitting unsold, and when to order — so you never lose a sale or lock up cash in dead stock.",
    badge: "Stok",
  },
  {
    icon: FileText,
    title: "Loan Ready Documents",
    desc: "Auto-generate P&L statements, balance sheets, and cash flow reports accepted by SBI, HDFC, Axis, and SIDBI — in one click.",
    badge: "Loan Ready",
  },
]

const TESTIMONIALS = [
  {
    name: "Suresh Patel",
    business: "Suresh Hardware & Paints, Surat",
    revenue: "₹4.2L/month",
    quote: "Pehle mujhe pata hi nahi tha ki kaun sa maal kamaata hai aur kaun sa nahi. Ab seedha dikha deta hai. Engine oil mein sirf 8% profit tha — maine supplier se baat ki aur ab 18% ho gaya.",
    stars: 5,
  },
  {
    name: "Anita Sharma",
    business: "Anita Ladies Tailoring, Jaipur",
    revenue: "₹1.8L/month",
    quote: "Mera ₹34,000 udhaar tha alag-alag customers ka. Sarthi ne WhatsApp reminder bheja toh 3 logo ne same week mein de diye. App bahut asaan hai, main phone pe hi use karti hoon.",
    stars: 5,
  },
  {
    name: "Mohammed Rizwan",
    business: "Rizwan Electricals & Wiring, Hyderabad",
    revenue: "₹2.9L/month",
    quote: "Bank loan ke liye gaya tha toh documents maangey. Sarthi se P&L statement nikali, balance sheet nikali — sab ready. HDFC ne 3 din mein approve kar diya ₹6 lakh ka loan.",
    stars: 5,
  },
]

const PRICING = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    desc: "For businesses just getting started",
    features: [
      "Up to 50 transactions/month",
      "Basic profit tracking",
      "Udhaar (dues) tracker",
      "Cash runway calculator",
    ],
    cta: "Start free",
    href: "/sign-up",
    highlight: false,
  },
  {
    name: "Sarthi Pro",
    price: "₹299",
    period: "per month",
    desc: "For growing businesses",
    features: [
      "Unlimited transactions",
      "Full profit analytics per product",
      "WhatsApp reminder campaigns",
      "30-day cash flow forecast",
      "Stock alerts & dead stock alerts",
      "Business Health Score",
    ],
    cta: "Start 14-day free trial",
    href: "/sign-up",
    highlight: true,
  },
  {
    name: "Sarthi Business",
    price: "₹799",
    period: "per month",
    desc: "For loan applications & GST filing",
    features: [
      "Everything in Pro",
      "Loan-ready P&L & Balance Sheet",
      "GST filing prep",
      "Business Income Certificate",
      "CA-verified documents (₹1,999 add-on)",
      "Priority WhatsApp support",
    ],
    cta: "Get started",
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
          <span className="text-xs text-zinc-500 ml-1">— साथी आपके बिज़नेस का</span>
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
            Try free
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs text-blue-400 mb-8">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
          For kirana, auto parts, tailors, electricians & all small businesses
        </div>

        <h1 className="mx-auto max-w-3xl text-4xl sm:text-5xl font-bold leading-tight tracking-tight">
          Finally know if your{" "}
          <span className="text-blue-400">business is actually</span>
          <br />making money.
        </h1>

        <p className="mt-6 mx-auto max-w-xl text-base text-zinc-400 leading-relaxed">
          Sarthi automatically tracks your profit, collects your dues, and tells you exactly what to do next — in plain Hindi and English.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/sign-up"
            className="flex items-center gap-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 text-sm transition-colors"
          >
            Start free — no credit card needed
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 rounded-md border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white font-medium px-6 py-3 text-sm transition-colors"
          >
            See demo dashboard
          </Link>
        </div>
        <p className="mt-3 text-xs text-zinc-500">Setup in 5 minutes · Works on phone · Hindi & English</p>
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
      <section className="px-6 pb-24 border-t border-white/8 pt-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-2xl font-bold mb-3">
            5 things Sarthi does for you automatically
          </h2>
          <p className="text-center text-sm text-zinc-400 mb-12">No accountant needed. No spreadsheets. Just clear answers.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-xl border border-white/8 bg-white/3 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                    <f.icon className="h-5 w-5 text-blue-400" />
                  </div>
                  <span className="text-xs font-medium text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full">
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

      {/* Testimonials */}
      <section className="px-6 pb-24 border-t border-white/8 pt-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-2xl font-bold mb-3">
            Real business owners. Real results.
          </h2>
          <p className="text-center text-sm text-zinc-400 mb-12">Unke apne shabdon mein</p>
          <div className="grid md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="rounded-xl border border-white/8 bg-white/3 p-6 flex flex-col">
                <div className="flex mb-3">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed italic flex-1 mb-4">"{t.quote}"</p>
                <div className="border-t border-white/8 pt-4">
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-zinc-500">{t.business}</p>
                  <p className="text-xs text-blue-400 mt-0.5">{t.revenue} revenue</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-6 pb-24 border-t border-white/8 pt-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-2xl font-bold mb-3">Simple, honest pricing</h2>
          <p className="text-center text-sm text-zinc-400 mb-12">No hidden charges. Cancel anytime.</p>
          <div className="grid md:grid-cols-3 gap-5">
            {PRICING.map((p) => (
              <div
                key={p.name}
                className={`rounded-xl border p-6 flex flex-col ${
                  p.highlight
                    ? "border-blue-500/50 bg-blue-500/5"
                    : "border-white/8 bg-white/3"
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
            Aaj hi jaanein apna asli profit
          </h2>
          <p className="text-sm text-zinc-400 mb-8 max-w-md mx-auto">
            5 minute mein setup karein. Koi accountant nahi chahiye. Koi spreadsheet nahi chahiye. Sirf clear answers.
          </p>
          <div className="flex flex-col gap-3 items-center mb-8">
            {[
              "No credit card required",
              "Works on any phone",
              "Hindi + English support",
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
            Start for free
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/8 px-6 py-8 text-center text-xs text-zinc-500">
        <p>© 2026 Sarthi Technologies Pvt. Ltd. · Built for Indian small business owners · Made with ❤️ in India · Data stored in AWS Mumbai</p>
      </footer>
    </div>
  )
}
