"use client"

import { useState } from "react"
import { Header } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  X,
  Zap,
  Bot,
  ShieldCheck,
  BarChart3,
} from "lucide-react"
import Link from "next/link"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const KPI_CARDS = [
  {
    label: "Revenue (30d)",
    value: "₹18.5L",
    sub: "2,180 orders · ₹849 AOV",
    change: "+8.3%",
    positive: true,
    color: "text-blue-400",
    border: "border-blue-500/20",
    icon: TrendingUp,
  },
  {
    label: "Contribution Margin",
    value: "₹3.29L",
    sub: "17.8% CM · target 22%",
    change: "+1.4%",
    positive: true,
    color: "text-emerald-400",
    border: "border-emerald-500/20",
    icon: TrendingUp,
  },
  {
    label: "Blended ROAS",
    value: "2.34x",
    sub: "Meta 2.18x · Google 4.2x",
    change: "−0.3x",
    positive: false,
    color: "text-amber-400",
    border: "border-amber-500/20",
    icon: TrendingDown,
  },
  {
    label: "RTO Rate",
    value: "13.2%",
    sub: "⚠️ median 7.4%",
    change: "+1.1%",
    positive: false,
    color: "text-red-400",
    border: "border-red-500/20",
    icon: AlertTriangle,
  },
]

const DAILY_TREND = Array.from({ length: 30 }, (_, i) => {
  const base = 52000
  const growth = 1 + (i / 29) * 0.18
  const weekendBoost = (i % 7 === 5 || i % 7 === 6) ? 1.22 : 1
  const noise = 0.88 + (((i * 17 + 7) % 100) / 100) * 0.24
  const rev = Math.round(base * growth * weekendBoost * noise)
  const cm = Math.round(rev * (0.152 + (i / 29) * 0.026))
  return { date: `May ${i + 1}`, revenue: rev, cm }
})

const AGENT_ACTIONS = [
  {
    id: 1,
    agent: "Acquisition",
    agentBg: "bg-emerald-500/10 text-emerald-400",
    urgency: "urgent",
    title: "Meta Prospecting — negative CM for 9 days",
    desc: "CMPR = −0.04 after all deductions. ₹38,400/month being destroyed.",
    action: "Review",
    href: "/dashboard/actions",
    impact: "−₹38,400/mo",
    impactColor: "text-red-400",
  },
  {
    id: 2,
    agent: "Quick Commerce",
    agentBg: "bg-amber-500/10 text-amber-400",
    urgency: "warning",
    title: "Vitamin C Serum: 48h to stockout — Blinkit",
    desc: "23 units · 10.8 DRR · ₹91,000 at risk.",
    action: "Replenish",
    href: "/dashboard/actions",
    impact: "₹91K risk",
    impactColor: "text-amber-400",
  },
  {
    id: 3,
    agent: "Margin Analyst",
    agentBg: "bg-blue-500/10 text-blue-400",
    urgency: "insight",
    title: "5 pincodes driving 23% of all RTOs",
    desc: "WhatsApp COD verification → save ₹67,200/month.",
    action: "View",
    href: "/dashboard/actions",
    impact: "+₹67,200/mo",
    impactColor: "text-emerald-400",
  },
]

const QUICK_LINKS = [
  { label: "Margin Audit", sub: "₹2.93L opportunity", href: "/dashboard/margin-audit", icon: Zap, color: "text-emerald-400", border: "border-emerald-500/20" },
  { label: "Ad Intelligence", sub: "3 campaigns flagged", href: "/dashboard/ads", icon: BarChart3, color: "text-blue-400", border: "border-blue-500/20" },
  { label: "Benchmarks", sub: "6/10 below median", href: "/dashboard/benchmarks", icon: TrendingUp, color: "text-purple-400", border: "border-purple-500/20" },
  { label: "AI Agents", sub: "4 active · 5 pending", href: "/dashboard/agents", icon: Bot, color: "text-amber-400", border: "border-amber-500/20" },
]

export default function DashboardPage() {
  const [dismissed, setDismissed] = useState<number[]>([])
  const visibleActions = AGENT_ACTIONS.filter((a) => !dismissed.includes(a.id))
  const totalRev = DAILY_TREND.reduce((s, d) => s + d.revenue, 0)
  const totalCM = DAILY_TREND.reduce((s, d) => s + d.cm, 0)

  return (
    <div className="flex flex-col flex-1">
      <Header
        title="Glow & Beyond"
        subtitle="Skincare D2C · Shopify + Amazon + Blinkit + Zepto · 4 agents active"
        actions={
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/margin-audit">
              <Zap className="h-3.5 w-3.5 mr-1" />
              Margin Audit
            </Link>
          </Button>
        }
      />

      <main className="flex-1 p-4 lg:p-6 space-y-4 lg:space-y-6">

        {/* KPI Grid — 2 cols on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {KPI_CARDS.map((card) => (
            <Card key={card.label} className={`border-border/60 ${card.border}`}>
              <CardContent className="p-3 lg:p-4">
                <div className="flex items-start justify-between mb-1.5">
                  <p className="text-xs text-muted-foreground leading-tight">{card.label}</p>
                  <card.icon className={`h-3.5 w-3.5 ${card.color} opacity-60 flex-shrink-0`} />
                </div>
                <p className={`text-lg sm:text-2xl font-bold ${card.color}`}>{card.value}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5 leading-tight">{card.sub}</p>
                <div className={`flex items-center gap-1 mt-1.5 text-[10px] font-medium ${card.positive ? "text-emerald-400" : "text-red-400"}`}>
                  {card.positive ? <TrendingUp className="h-2.5 w-2.5" /> : <TrendingDown className="h-2.5 w-2.5" />}
                  {card.change} vs last 30d
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* RTO Warning */}
        <Card className="border-red-500/20 bg-red-500/5">
          <CardContent className="p-3 lg:p-4">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2 min-w-0">
                <ShieldCheck className="h-4 w-4 text-red-400 flex-shrink-0" />
                <p className="text-xs sm:text-sm font-medium truncate">
                  RTO 13.2% is <span className="text-red-400">5.8pp above median (7.4%)</span>
                </p>
              </div>
              <Link href="/dashboard/margin-audit" className="text-xs text-primary hover:underline flex-shrink-0">
                Fix →
              </Link>
            </div>
            <div className="mt-2.5 w-full bg-white/5 rounded-full h-2">
              <div className="h-2 rounded-full bg-red-500" style={{ width: "66%" }} />
            </div>
            <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
              <span>Your: 13.2%</span>
              <span>Median: 7.4%</span>
              <span className="hidden sm:inline">Top 25%: 5.8%</span>
            </div>
          </CardContent>
        </Card>

        {/* Chart + Agent Actions — stacked on mobile, side by side on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Trend Chart */}
          <Card className="lg:col-span-3 border-border/60">
            <CardHeader className="pb-2 p-3 lg:p-4 lg:pb-2">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <CardTitle className="text-sm">30-Day Revenue vs CM</CardTitle>
                <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-blue-500" />
                    Rev ₹{(totalRev / 100000).toFixed(1)}L
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    CM ₹{(totalCM / 100000).toFixed(1)}L
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-3 pt-0 lg:p-4 lg:pt-0">
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={DAILY_TREND} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="cmGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" tick={{ fill: "#78716c", fontSize: 9 }} axisLine={false} tickLine={false} interval={6} />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{ background: "#111110", border: "1px solid #292524", borderRadius: 6, fontSize: 11 }}
                    formatter={(v: unknown) => [`₹${Number(v).toLocaleString("en-IN")}`, ""]}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={1.5} fill="url(#revGrad)" name="Revenue" />
                  <Area type="monotone" dataKey="cm" stroke="#10b981" strokeWidth={1.5} fill="url(#cmGrad)" name="CM" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Agent Actions */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold flex items-center gap-2">
                <Bot className="h-4 w-4 text-primary" />
                Agent Actions
              </h2>
              <Badge variant="outline" className="text-xs">{visibleActions.length} pending</Badge>
            </div>

            {visibleActions.length === 0 ? (
              <Card className="border-border/60">
                <CardContent className="p-6 text-center text-sm text-muted-foreground">
                  <CheckCircle2 className="h-7 w-7 text-emerald-400 mx-auto mb-2" />
                  All clear!
                </CardContent>
              </Card>
            ) : (
              visibleActions.map((action) => (
                <Card
                  key={action.id}
                  className={`border-border/60 ${
                    action.urgency === "urgent" ? "border-red-500/20" : action.urgency === "warning" ? "border-amber-500/20" : "border-blue-500/20"
                  }`}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${action.agentBg}`}>
                        {action.agent}
                      </span>
                      <span className={`ml-auto text-[10px] font-medium ${action.impactColor}`}>{action.impact}</span>
                    </div>
                    <p className="text-xs font-medium leading-snug mb-0.5">{action.title}</p>
                    <p className="text-[10px] text-muted-foreground leading-relaxed mb-2">{action.desc}</p>
                    <div className="flex items-center gap-2">
                      <Button size="sm" className="h-6 text-[10px] px-2 bg-primary hover:bg-primary/90" asChild>
                        <Link href={action.href}>{action.action}</Link>
                      </Button>
                      <button
                        onClick={() => setDismissed((d) => [...d, action.id])}
                        className="h-6 px-1.5 text-[10px] text-muted-foreground hover:text-foreground border border-border/60 rounded flex items-center gap-0.5 transition-colors"
                      >
                        <X className="h-2.5 w-2.5" /> Dismiss
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}

            <Link href="/dashboard/actions" className="block text-xs text-center text-primary hover:underline pt-1">
              View all 5 actions →
            </Link>
          </div>
        </div>

        {/* Quick Links — 2 cols mobile, 4 desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {QUICK_LINKS.map((link) => (
            <Link key={link.href} href={link.href}>
              <Card className={`border-border/60 ${link.border} hover:bg-card/80 transition-colors cursor-pointer h-full`}>
                <CardContent className="p-3 lg:p-4 flex items-center gap-3">
                  <link.icon className={`h-4 w-4 lg:h-5 lg:w-5 ${link.color} flex-shrink-0`} />
                  <div className="min-w-0">
                    <p className="text-xs lg:text-sm font-medium truncate">{link.label}</p>
                    <p className="text-[10px] text-muted-foreground truncate">{link.sub}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
