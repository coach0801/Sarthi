"use client"

import { useState } from "react"
import { Header } from "@/components/dashboard/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  AlertTriangle,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ArrowRight,
  BarChart3,
  Package,
} from "lucide-react"
import Link from "next/link"

// D2C-specific margin audit findings — ranked by rupee impact
const FINDINGS = [
  {
    rank: 1,
    priority: "high",
    icon: Zap,
    iconColor: "text-red-400 bg-red-500/10",
    agent: "Acquisition Agent",
    agentColor: "text-emerald-400",
    title: "Meta Prospecting campaign destroying ₹38,400/month — CMPR is −0.04",
    desc: "Your Meta 'Prospecting — Lookalike 1% Mumbai' campaign has a 7-day ROAS of 2.18x. That sounds OK — until you subtract GST (12%), channel fee (2%), Razorpay fee (1.8%), freight (₹72 avg), and COGS. The actual contribution margin per rupee spent (CMPR) is −0.04. The campaign is spending ₹13,800/day to generate negative-margin orders. 9 days of confirmed data. This is not a trend — it's a structural problem with the audience.",
    opportunity: "+₹38,400/month",
    opportunityNum: 38400,
    confidence: 91,
    actions: [
      "Pause 'Lookalike 1% Mumbai' ad set immediately — save ₹13,800/day in negative-margin spend",
      "Do NOT pause the full Prospecting campaign — other ad sets (Skincare Interest, Broad) may be profitable",
      "Run CMPR analysis on remaining Prospecting ad sets before deciding (see Ad Intelligence page)",
      "Reallocate budget to Retargeting campaign which has 31% CM — the math is proven there",
    ],
    href: "/dashboard/actions",
    cta: "Review & approve in Action Center",
  },
  {
    rank: 2,
    priority: "high",
    icon: ShieldCheck,
    iconColor: "text-red-400 bg-red-500/10",
    agent: "Margin Analyst",
    agentColor: "text-blue-400",
    title: "RTO rate 13.2% vs median 7.4% — 5 pincodes causing ₹67,200/month in losses",
    desc: "Your overall RTO rate is 13.2% — 5.8 percentage points above the industry median. Deep analysis shows 5 pincodes (482001 Jabalpur, 831001 Jamshedpur, 263001 Haldwani, 226003 Lucknow East, 400097 Mumbai North) account for 23% of all your RTO events while only representing 11% of orders. Combined RTO loss (freight forward + freight reverse + inventory damage): ₹1.68L/month. WhatsApp pre-dispatch confirmation for COD orders in these pincodes can reduce RTO by 40-55%.",
    opportunity: "+₹67,200/month",
    opportunityNum: 67200,
    confidence: 83,
    actions: [
      "Enable WhatsApp pre-confirmation for COD orders from the 5 high-RTO pincodes",
      "Template: 'Hi [name], your order for [product] is ready to ship. Reply YES to confirm delivery.'",
      "Orders with no confirmation after 4 hours: auto-convert to prepaid or hold shipment",
      "Track RTO rate for these pincodes weekly — target: under 10% in 30 days",
    ],
    href: "/dashboard/actions",
    cta: "Enable RTO Shield",
  },
  {
    rank: 3,
    priority: "high",
    icon: Package,
    iconColor: "text-amber-400 bg-amber-500/10",
    agent: "Quick Commerce Agent",
    agentColor: "text-amber-400",
    title: "Vitamin C Serum stockout in 48h at Blinkit Koramangala — ₹91,000 at risk",
    desc: "Dark store Blinkit-Koramangala-07 has 23 units of Vitamin C Serum 30ml. At the current 14-day daily run rate of 10.8 units/day, the store will stock out in approximately 2.1 days. This is your #1 revenue SKU on Blinkit at 34% CM. Stockout means lost orders that don't reschedule — they go to Minimalist or Plum. Mother warehouse: 847 units confirmed. Logistics lead time to dark store: 18-24 hours.",
    opportunity: "₹91,000 at risk",
    opportunityNum: 91000,
    confidence: 97,
    actions: [
      "Raise emergency replenishment order: 200 units to Blinkit-Koramangala-07 today",
      "200 units = 18.5 days coverage at current DRR — prevents the next stockout for 2.5 weeks",
      "Cost: ~₹36,000 (200 × ₹180 COGS + logistics) → protects ₹91,000 revenue",
      "Also check Blinkit Indiranagar (62 units, 7.5 DRR) — 8.3 days remaining, order this week",
    ],
    href: "/dashboard/actions",
    cta: "Trigger replenishment",
  },
  {
    rank: 4,
    priority: "medium",
    icon: TrendingUp,
    iconColor: "text-amber-400 bg-amber-500/10",
    agent: "Margin Analyst",
    agentColor: "text-blue-400",
    title: "Niacinamide Toner CM at 11.4% — 8.6pp below category floor of 20%",
    desc: "Niacinamide Toner 100ml is your #2 volume SKU (by orders) but it earns only 11.4% contribution margin. The culprit: an average 22% discount on Amazon (running since January) has compressed margins below the sustainable threshold. Revenue looks healthy (₹3,67,500/30d) but actual CM is only ₹41,895. If you ran the same volume at 0% discount, CM% would be 21.6%. The ₹80,850 you're giving away in Amazon discounts this month is not converting to meaningful repeat purchase — repeat rate on this SKU is 18.1%, below your brand average of 22.1%.",
    opportunity: "+₹44,100/month",
    opportunityNum: 44100,
    confidence: 79,
    actions: [
      "Option A: Raise MRP to ₹549 (competitive with Minimalist, Dot & Key at ₹499-599). Cap Amazon discount at 10%.",
      "Option B: Keep MRP at ₹449 but remove coupon and limit Amazon Lightning Deals to 2/month max",
      "Recommendation: Option A — you're underpriced vs competitors and the brand can support the premium",
      "Do not discount on Shopify — your D2C channel has 24.1% CM on this SKU already",
    ],
    href: "/dashboard/margin",
    cta: "View SKU margin detail",
  },
  {
    rank: 5,
    priority: "medium",
    icon: BarChart3,
    iconColor: "text-blue-400 bg-blue-500/10",
    agent: "Acquisition Agent",
    agentColor: "text-emerald-400",
    title: "Google Brand Search budget constrained at 73% impression share — leaving ₹52,800/month on table",
    desc: "Your Google Brand Search campaign (GC-001) has a 7-day CMPR of 1.84 — the highest in your entire acquisition portfolio. But it's impression-share constrained: you're winning only 73.2% of available branded queries, losing 18.4% to budget limitations. Branded keywords convert at 8-12x the rate of generic terms. Every branded impression you lose is a competitor potentially intercepting your customer. Increasing daily budget by ₹4,400 (20%) should capture 15-18% more impression share at similar efficiency.",
    opportunity: "+₹52,800/month",
    opportunityNum: 52800,
    confidence: 87,
    actions: [
      "Increase Google Brand Search daily budget from ₹22,000 to ₹26,400 (+₹4,400/day)",
      "Monitor impression share daily for first week — target 85%+ IS",
      "If efficiency holds (CMPR stays above 1.5), consider another 10% increase in week 3",
      "Keep the PMAX campaign budget unchanged — its CMPR is only 0.48x, not worth scaling",
    ],
    href: "/dashboard/ads",
    cta: "View ad campaigns",
  },
]

export default function MarginAuditPage() {
  const [completedFindings, setCompletedFindings] = useState<number[]>([])

  const totalOpportunity = FINDINGS.filter((f) => !completedFindings.includes(f.rank))
    .reduce((s, f) => s + f.opportunityNum, 0)

  const cmPctNow = 17.8
  const cmPctTarget = cmPctNow + 4.2

  const circumference = 2 * Math.PI * 44
  const dashOffsetNow = circumference - (cmPctNow / 40) * circumference
  const dashOffsetTarget = circumference - (cmPctTarget / 40) * circumference

  return (
    <div className="flex flex-col flex-1">
      <Header
        title="Margin Audit"
        subtitle="Glow & Beyond · AI-generated findings — ranked by monthly rupee impact"
      />

      <main className="flex-1 p-4 lg:p-6 space-y-4 lg:space-y-5">
        {/* Hero */}
        <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4 lg:p-6">
          <div className="flex items-start justify-between flex-wrap gap-4 lg:gap-6">
            <div className="flex-1 min-w-0">
              <Badge variant="info" className="mb-3">Margin Audit — May 29, 2026</Badge>
              <h2 className="text-lg lg:text-xl font-bold mb-2">
                <span className="text-blue-400">{FINDINGS.length} findings</span> identified across your channels
              </h2>
              <p className="text-sm text-zinc-400 max-w-xl">
                Implementing all 5 recommendations will unlock{" "}
                <span className="text-emerald-400 font-bold">
                  +₹{totalOpportunity.toLocaleString("en-IN")}/month
                </span>{" "}
                in contribution margin — and lift CM% from{" "}
                <span className="text-amber-400 font-bold">17.8%</span> to{" "}
                <span className="text-emerald-400 font-bold">{cmPctTarget.toFixed(1)}%</span>.
              </p>

              <div className="mt-4 grid grid-cols-3 gap-2 lg:gap-3 max-w-sm">
                <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-center">
                  <p className="text-lg font-bold text-red-400">
                    {FINDINGS.filter((f) => f.priority === "high").length}
                  </p>
                  <p className="text-xs text-muted-foreground">High Priority</p>
                </div>
                <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-3 text-center">
                  <p className="text-lg font-bold text-amber-400">
                    {FINDINGS.filter((f) => f.priority === "medium").length}
                  </p>
                  <p className="text-xs text-muted-foreground">Medium</p>
                </div>
                <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-3 text-center">
                  <p className="text-lg font-bold text-emerald-400">91%</p>
                  <p className="text-xs text-muted-foreground">Top confidence</p>
                </div>
              </div>
            </div>

            {/* CM% gauge */}
            <div className="flex items-center gap-4 lg:gap-6 flex-shrink-0 w-full sm:w-auto justify-center sm:justify-start">
              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-2">Now</p>
                <div className="relative flex items-center justify-center">
                  <svg width="80" height="80" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="44" fill="none" stroke="#27272a" strokeWidth="8" />
                    <circle
                      cx="50" cy="50" r="44"
                      fill="none" stroke="#f59e0b" strokeWidth="8" strokeLinecap="round"
                      strokeDasharray={circumference} strokeDashoffset={dashOffsetNow}
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="absolute text-center">
                    <p className="text-lg font-bold text-amber-400">{cmPctNow}%</p>
                    <p className="text-[9px] text-muted-foreground">CM</p>
                  </div>
                </div>
              </div>
              <div className="text-2xl text-muted-foreground">→</div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-2">Target</p>
                <div className="relative flex items-center justify-center">
                  <svg width="80" height="80" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="44" fill="none" stroke="#27272a" strokeWidth="8" />
                    <circle
                      cx="50" cy="50" r="44"
                      fill="none" stroke="#10b981" strokeWidth="8" strokeLinecap="round"
                      strokeDasharray={circumference} strokeDashoffset={dashOffsetTarget}
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="absolute text-center">
                    <p className="text-lg font-bold text-emerald-400">{cmPctTarget.toFixed(1)}%</p>
                    <p className="text-[9px] text-muted-foreground">CM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Findings */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            {FINDINGS.length} Findings — Ranked by Monthly Impact
          </h3>

          {FINDINGS.map((finding) => {
            const isCompleted = completedFindings.includes(finding.rank)
            const Icon = finding.icon

            return (
              <Card
                key={finding.rank}
                className={`border-border/60 transition-opacity ${isCompleted ? "opacity-40" : ""}`}
              >
                <CardContent className="p-4 lg:p-5">
                  <div className="flex items-start gap-3 lg:gap-4">
                    <div className={`flex-shrink-0 h-9 w-9 lg:h-10 lg:w-10 rounded-lg flex items-center justify-center ${finding.iconColor}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="text-xs text-muted-foreground font-medium">#{finding.rank}</span>
                        <Badge
                          variant={finding.priority === "high" ? "destructive" : "warning"}
                        >
                          {finding.priority === "high" ? "HIGH PRIORITY" : "MEDIUM"}
                        </Badge>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full bg-white/5 ${finding.agentColor}`}>
                          {finding.agent}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {finding.confidence}% confidence
                        </span>
                        <span className="ml-auto text-emerald-400 font-bold text-xs sm:text-sm">
                          {finding.opportunity}
                        </span>
                      </div>
                      <h4 className="font-semibold text-sm mb-2 leading-snug">{finding.title}</h4>
                      <p className="text-xs text-zinc-400 leading-relaxed mb-3">{finding.desc}</p>

                      <div className="rounded-md bg-muted/40 border border-border/40 p-3 mb-3">
                        <p className="text-xs font-medium text-foreground mb-2 flex items-center gap-1.5">
                          <Zap className="h-3 w-3 text-blue-400" />
                          Recommended actions:
                        </p>
                        <ol className="space-y-1.5">
                          {finding.actions.map((action, i) => (
                            <li key={i} className="flex gap-2 text-xs text-zinc-400">
                              <span className="flex-shrink-0 text-emerald-400 font-medium">{i + 1}.</span>
                              {action}
                            </li>
                          ))}
                        </ol>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" className="h-7 text-xs" asChild>
                          <Link href={finding.href}>
                            {finding.cta}
                            <ArrowRight className="h-3 w-3 ml-1" />
                          </Link>
                        </Button>
                        {!isCompleted ? (
                          <button
                            onClick={() => setCompletedFindings((p) => [...p, finding.rank])}
                            className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            Mark as done
                          </button>
                        ) : (
                          <span className="text-xs text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            Completed
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Bottom summary */}
        <Card className="border-emerald-500/20 bg-emerald-500/5">
          <CardContent className="p-4 lg:p-5 flex items-center justify-between gap-4 flex-wrap">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="h-5 w-5 text-emerald-400" />
                <h3 className="font-semibold">
                  Total opportunity remaining:{" "}
                  <span className="text-emerald-400">
                    ₹{totalOpportunity.toLocaleString("en-IN")}/month
                  </span>
                </h3>
              </div>
              <p className="text-sm text-zinc-400">
                Approve findings in the Action Center — Sarthi agents track outcomes automatically.
              </p>
            </div>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white flex-shrink-0" asChild>
              <Link href="/dashboard/actions">
                Go to Action Center
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
