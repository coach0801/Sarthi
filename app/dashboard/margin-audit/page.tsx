"use client"

import { useState } from "react"
import { Header } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Activity,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  ArrowRight,
  Users,
  Package,
  Clock,
  MessageCircle,
} from "lucide-react"
import Link from "next/link"

const FINDINGS = [
  {
    rank: 1,
    priority: "high",
    icon: Users,
    iconColor: "text-red-400 bg-red-500/10",
    title: "₹41,420 of your dues are overdue more than 45 days",
    desc: "Mehta Workshop (₹12,800, 67 days), Sharma Garage (₹24,500, 45 days), and Kumar Brothers (₹4,100, 55 days) are high risk of becoming bad debt. After 90 days, chances of recovery drop to less than 30%. You need to contact them this week — not next week.",
    opportunity: "+₹12,000/month",
    opportunityNum: 12000,
    actions: [
      "Send WhatsApp reminder to Mehta Workshop today (67 days is too long)",
      "Call Sharma Garage personally — ₹24,500 is your largest single due",
      "For Kumar Brothers: offer a ₹100 discount if they pay by this Friday",
      "Set up automatic monthly reminders for all dues from now on",
    ],
    href: "/dashboard/udhaar",
    cta: "Go to Udhaar tracker",
  },
  {
    rank: 2,
    priority: "high",
    icon: TrendingUp,
    iconColor: "text-red-400 bg-red-500/10",
    title: "Engine oil margin at 12.5% is dragging your profit down",
    desc: "Castrol 1L is your #2 revenue product (₹42,720/month in sales) but it earns you only ₹5,340 in profit — that's only 12.5% margin when everything else in your shop earns 27-43%. If you can get even ₹30 better price from your distributor or switch to a better margin brand, you add real money every month.",
    opportunity: "+₹8,200/month",
    opportunityNum: 8200,
    actions: [
      "Call your Castrol distributor and ask for ₹30/litre better rate on 10L+ orders",
      "If they say no, request samples of Motul 5W-30 or Veedol engine oils",
      "Compare distributor margins from 2-3 brands before next restock",
      "Target: get engine oil margin to at least 18%",
    ],
    href: "/dashboard/profit",
    cta: "See profit details",
  },
  {
    rank: 3,
    priority: "medium",
    icon: Package,
    iconColor: "text-amber-400 bg-amber-500/10",
    title: "₹54,250 of dead stock sitting unsold for 60+ days",
    desc: "Mahindra Thar Mats (47 units, ₹41,830) and Old AC Filters (23 units, ₹12,420) have not sold in 2-3 months. This money is sitting on your shelf doing nothing. If you had this cash free, you could restock your fast-selling Bosch Brake Pads (which runs out every 2 days).",
    opportunity: "+₹8,000/month freed",
    opportunityNum: 8000,
    actions: [
      "Discount Thar mats to ₹960 (from ₹1,200) — 20% off. Even 5 sold/week frees ₹4,800",
      "List both items on OLX Auto Parts or CarTrade spare parts section",
      "Talk to your Mahindra distributor about returning slow-moving items",
      "Use the freed cash to restock Bosch Brake Pads — 187 units/month profit driver",
    ],
    href: "/dashboard/stock",
    cta: "View stock alerts",
  },
  {
    rank: 4,
    priority: "medium",
    icon: Clock,
    iconColor: "text-amber-400 bg-amber-500/10",
    title: "Cash runway of 19 days — one bad month puts you in trouble",
    desc: "Your ₹42,800 in bank only lasts 19 days at current spending. While your monthly income far exceeds expenses (₹3,18,450 revenue vs ~₹2,45,000 cost), delays in sales collection or one unexpected expense can cause a cash crunch. This is more about timing than profitability.",
    opportunity: "+₹7,200/month if improved",
    opportunityNum: 7200,
    actions: [
      "Collect dues from Sharma Garage (₹24,500) before Jun 8 Bosch payment",
      "Ask top 3 regular customers to pay within 15 days instead of 30",
      "Keep a minimum ₹50,000 float in bank (target: 30-day runway)",
      "Consider a small overdraft limit (₹25,000) at your bank as emergency buffer",
    ],
    href: "/dashboard/cashflow",
    cta: "View cash flow",
  },
  {
    rank: 5,
    priority: "low",
    icon: MessageCircle,
    iconColor: "text-blue-400 bg-blue-500/10",
    title: "No WhatsApp payment policy — 38% of dues take longer than needed",
    desc: "Businesses that send WhatsApp reminders on day 15, day 30, and day 45 of unpaid dues recover 38% more per month than those who rely on in-person reminders. You currently have no systematic reminder system — you wait until you see the customer. This delays collection by an average of 22 days.",
    opportunity: "+₹5,400/month",
    opportunityNum: 5400,
    actions: [
      "Set a rule: every due older than 15 days gets a WhatsApp message every week",
      "Use the Sarthi message template (friendly, not harsh)",
      "Create a simple WhatsApp group 'Ramesh Auto Parts Payments' for bulk reminders",
      "Offer small incentive: 'Pay within 7 days, get ₹50 discount on next purchase'",
    ],
    href: "/dashboard/udhaar",
    cta: "Send reminders now",
  },
]

export default function MarginAuditPage() {
  const [completedFindings, setCompletedFindings] = useState<number[]>([])

  const totalOpportunity = FINDINGS.filter((f) => !completedFindings.includes(f.rank)).reduce(
    (s, f) => s + f.opportunityNum,
    0
  )
  const healthScore = 67
  const healthColor = "text-amber-400"
  const circumference = 2 * Math.PI * 44
  const dashOffset = circumference - (healthScore / 100) * circumference

  return (
    <div className="flex flex-col flex-1">
      <Header
        title="Business Health Check"
        subtitle="Ramesh Auto Parts · Your complete business analysis — updated weekly"
      />

      <main className="flex-1 p-6 space-y-5">
        {/* Hero */}
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-6">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <Badge variant="warning" className="mb-3">Business Health Check</Badge>
              <h2 className="text-xl font-bold mb-2">
                We found <span className="text-amber-400">{FINDINGS.length} things to fix</span> in your business
              </h2>
              <p className="text-sm text-zinc-400 max-w-xl">
                If you fix all 5, your business could generate{" "}
                <span className="text-emerald-400 font-bold">+₹{totalOpportunity.toLocaleString("en-IN")}/month</span> more profit.
                Start with the high priority items first.
              </p>
            </div>

            <div className="flex items-center gap-5">
              <div className="relative flex items-center justify-center">
                <svg width="90" height="90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="44" fill="none" stroke="#27272a" strokeWidth="8" />
                  <circle
                    cx="50" cy="50" r="44"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute text-center">
                  <p className={`text-2xl font-bold ${healthColor}`}>{healthScore}</p>
                  <p className="text-[10px] text-muted-foreground">/100</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Current score</p>
                <p className="text-2xl font-bold text-amber-400">Needs Work</p>
                <p className="text-xs text-muted-foreground mt-1">Target: 80+ (Healthy)</p>
              </div>
            </div>
          </div>

          {/* Priority summary */}
          <div className="mt-5 grid grid-cols-3 gap-3">
            <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-center">
              <p className="text-lg font-bold text-red-400">{FINDINGS.filter(f => f.priority === "high").length}</p>
              <p className="text-xs text-muted-foreground">High Priority</p>
            </div>
            <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-3 text-center">
              <p className="text-lg font-bold text-amber-400">{FINDINGS.filter(f => f.priority === "medium").length}</p>
              <p className="text-xs text-muted-foreground">Medium Priority</p>
            </div>
            <div className="rounded-lg bg-blue-500/10 border border-blue-500/20 p-3 text-center">
              <p className="text-lg font-bold text-blue-400">{FINDINGS.filter(f => f.priority === "low").length}</p>
              <p className="text-xs text-muted-foreground">Quick Win</p>
            </div>
          </div>
        </div>

        {/* Findings */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            {FINDINGS.length} Findings — Ranked by Impact
          </h3>

          {FINDINGS.map((finding) => {
            const isCompleted = completedFindings.includes(finding.rank)
            const Icon = finding.icon

            return (
              <Card
                key={finding.rank}
                className={`border-border/60 transition-opacity ${isCompleted ? "opacity-50" : ""}`}
              >
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 h-10 w-10 rounded-lg flex items-center justify-center ${finding.iconColor}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="text-xs text-muted-foreground font-medium">#{finding.rank}</span>
                        <Badge variant={finding.priority === "high" ? "destructive" : finding.priority === "medium" ? "warning" : "outline"}>
                          {finding.priority === "high" ? "HIGH PRIORITY" : finding.priority === "medium" ? "MEDIUM" : "QUICK WIN"}
                        </Badge>
                        <span className="ml-auto text-emerald-400 font-bold text-sm">
                          {finding.opportunity}
                        </span>
                      </div>
                      <h4 className="font-semibold text-sm mb-2">{finding.title}</h4>
                      <p className="text-xs text-zinc-400 leading-relaxed mb-3">{finding.desc}</p>

                      <div className="rounded-md bg-muted/40 border border-border/40 p-3 mb-3">
                        <p className="text-xs font-medium text-foreground mb-2">What to do:</p>
                        <ol className="space-y-1">
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

        {/* Bottom CTA */}
        <Card className="border-blue-500/20 bg-blue-500/5">
          <CardContent className="p-5 flex items-center justify-between gap-4 flex-wrap">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Activity className="h-5 w-5 text-blue-400" />
                <h3 className="font-semibold">Want Sarthi to remind you every week?</h3>
              </div>
              <p className="text-sm text-zinc-400">
                This health check updates every Monday morning. We'll WhatsApp you if anything gets worse.
              </p>
            </div>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white flex-shrink-0">
              <MessageCircle className="h-4 w-4 mr-2" />
              Enable Weekly WhatsApp Report
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
