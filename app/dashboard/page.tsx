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
  Legend,
} from "recharts"

// Realistic D2C demo KPIs — consistent with benchmarks page
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
    sub: "17.8% CM% · target 22%",
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
    change: "-0.3x",
    positive: false,
    color: "text-amber-400",
    border: "border-amber-500/20",
    icon: TrendingDown,
  },
  {
    label: "RTO Rate",
    value: "13.2%",
    sub: "⚠️ industry median 7.4%",
    change: "+1.1%",
    positive: false,
    color: "text-red-400",
    border: "border-red-500/20",
    icon: AlertTriangle,
  },
]

// 30-day daily trend data (deterministic, realistic)
const DAILY_TREND = Array.from({ length: 30 }, (_, i) => {
  const base = 52000
  const growth = 1 + (i / 29) * 0.18
  const weekendBoost = (i % 7 === 5 || i % 7 === 6) ? 1.22 : 1
  const noise = 0.88 + (((i * 17 + 7) % 100) / 100) * 0.24
  const rev = Math.round(base * growth * weekendBoost * noise)
  const cm = Math.round(rev * (0.152 + (i / 29) * 0.026))
  const month = "May"
  const day = i + 1
  return {
    date: `${month} ${day}`,
    revenue: rev,
    cm,
  }
})

const AGENT_ACTIONS = [
  {
    id: 1,
    agent: "Acquisition",
    agentColor: "text-emerald-400",
    agentBg: "bg-emerald-500/10",
    icon: "📉",
    urgency: "urgent",
    title: "Meta Prospecting — negative CM for 9 days",
    desc: "Campaign spending ₹13,800/day with CMPR of −0.04 after all deductions. Estimated ₹38,400/month being destroyed.",
    action: "Review",
    href: "/dashboard/actions",
    impact: "−₹38,400/mo",
  },
  {
    id: 2,
    agent: "Quick Commerce",
    agentColor: "text-amber-400",
    agentBg: "bg-amber-500/10",
    icon: "⚡",
    urgency: "warning",
    title: "Vitamin C Serum: 48h to stockout at Blinkit Koramangala",
    desc: "23 units at 10.8 units/day DRR. Stockout in 2.1 days → ₹91,000/month in projected Q-commerce revenue at risk.",
    action: "Replenish",
    href: "/dashboard/actions",
    impact: "₹91K at risk",
  },
  {
    id: 3,
    agent: "Margin Analyst",
    agentColor: "text-blue-400",
    agentBg: "bg-blue-500/10",
    icon: "💡",
    title: "RTO rate above median — 5 pincodes driving 23% of returns",
    desc: "Enable WhatsApp COD verification on 5 high-RTO pincodes to save ₹67,200/month. Confidence: 83%.",
    action: "See pincodes",
    href: "/dashboard/actions",
    impact: "+₹67,200/mo",
  },
]

const QUICK_LINKS = [
  {
    label: "Margin Audit",
    sub: "₹2.93L opportunity identified",
    href: "/dashboard/margin-audit",
    icon: Zap,
    color: "text-emerald-400",
    border: "border-emerald-500/20",
  },
  {
    label: "Ad Intelligence",
    sub: "3 campaigns need attention",
    href: "/dashboard/ads",
    icon: BarChart3,
    color: "text-blue-400",
    border: "border-blue-500/20",
  },
  {
    label: "Benchmarks",
    sub: "6 of 10 metrics below median",
    href: "/dashboard/benchmarks",
    icon: TrendingUp,
    color: "text-purple-400",
    border: "border-purple-500/20",
  },
  {
    label: "AI Agents",
    sub: "4 agents active · 5 actions pending",
    href: "/dashboard/agents",
    icon: Bot,
    color: "text-amber-400",
    border: "border-amber-500/20",
  },
]

export default function DashboardPage() {
  const [dismissed, setDismissed] = useState<number[]>([])
  const visibleActions = AGENT_ACTIONS.filter((a) => !dismissed.includes(a.id))

  const totalRevenue = DAILY_TREND.reduce((s, d) => s + d.revenue, 0)
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
              Run Margin Audit
            </Link>
          </Button>
        }
      />

      <main className="flex-1 p-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {KPI_CARDS.map((card) => (
            <Card key={card.label} className={`border-border/60 ${card.border}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-xs text-muted-foreground">{card.label}</p>
                  <card.icon className={`h-4 w-4 ${card.color} opacity-60`} />
                </div>
                <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{card.sub}</p>
                <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${card.positive ? "text-emerald-400" : "text-red-400"}`}>
                  {card.positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {card.change} vs last 30d
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* RTO Warning */}
        <Card className="border-red-500/20 bg-red-500/3">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-red-400" />
                <p className="text-sm font-medium">
                  RTO Rate 13.2% is <span className="text-red-400">5.8pp above industry median (7.4%)</span>
                </p>
              </div>
              <Link href="/dashboard/margin-audit" className="text-xs text-blue-400 hover:underline">
                See RTO fix →
              </Link>
            </div>
            <div className="mt-3 w-full bg-white/5 rounded-full h-2.5">
              <div className="h-2.5 rounded-full bg-red-500" style={{ width: `${(13.2 / 20) * 100}%` }} />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1.5">
              <span>Your rate: 13.2%</span>
              <span>Median: 7.4%</span>
              <span>Top 25%: 5.8%</span>
            </div>
          </CardContent>
        </Card>

        {/* Trend Chart + Agent Actions */}
        <div className="grid grid-cols-5 gap-5">
          {/* Chart */}
          <Card className="col-span-3 border-border/60">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">30-Day Revenue vs Contribution Margin</CardTitle>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-blue-500" />
                    Revenue ₹{(totalRevenue / 100000).toFixed(1)}L
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    CM ₹{(totalCM / 100000).toFixed(1)}L
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <ResponsiveContainer width="100%" height={220}>
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
                  <XAxis
                    dataKey="date"
                    tick={{ fill: "#71717a", fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                    interval={4}
                  />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{
                      background: "#111113",
                      border: "1px solid #27272a",
                      borderRadius: 6,
                      fontSize: 11,
                    }}
                    formatter={(v: unknown) => [`₹${Number(v).toLocaleString("en-IN")}`, ""]}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#3b82f6"
                    strokeWidth={1.5}
                    fill="url(#revGrad)"
                    name="Revenue"
                  />
                  <Area
                    type="monotone"
                    dataKey="cm"
                    stroke="#10b981"
                    strokeWidth={1.5}
                    fill="url(#cmGrad)"
                    name="CM"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Agent Actions */}
          <div className="col-span-2 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold flex items-center gap-2">
                <Bot className="h-4 w-4 text-blue-400" />
                Agent Actions
              </h2>
              <Badge variant="outline" className="text-xs">
                {visibleActions.length} pending
              </Badge>
            </div>

            {visibleActions.length === 0 ? (
              <Card className="border-border/60">
                <CardContent className="p-6 text-center text-sm text-muted-foreground">
                  <CheckCircle2 className="h-8 w-8 text-emerald-400 mx-auto mb-2" />
                  All clear! No pending actions.
                </CardContent>
              </Card>
            ) : (
              visibleActions.map((action) => (
                <Card
                  key={action.id}
                  className={`border-border/60 ${
                    action.urgency === "urgent"
                      ? "border-red-500/20"
                      : action.urgency === "warning"
                      ? "border-amber-500/20"
                      : "border-blue-500/20"
                  }`}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${action.agentBg} ${action.agentColor}`}>
                        {action.agent}
                      </span>
                      <span className="ml-auto text-[10px] text-amber-400 font-medium">{action.impact}</span>
                    </div>
                    <p className="text-xs font-medium leading-snug mb-1">{action.title}</p>
                    <p className="text-[10px] text-zinc-500 leading-relaxed mb-2 line-clamp-2">{action.desc}</p>
                    <div className="flex items-center gap-2">
                      <Button size="sm" className="h-6 text-[10px] px-2" asChild>
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

            <Link href="/dashboard/actions" className="block text-xs text-center text-blue-400 hover:underline pt-1">
              View all 5 actions →
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {QUICK_LINKS.map((link) => (
            <Link key={link.href} href={link.href}>
              <Card className={`border-border/60 ${link.border} hover:border-opacity-50 transition-colors cursor-pointer h-full`}>
                <CardContent className="p-4 flex items-center gap-3">
                  <link.icon className={`h-5 w-5 ${link.color} flex-shrink-0`} />
                  <div>
                    <p className="text-sm font-medium">{link.label}</p>
                    <p className="text-xs text-muted-foreground">{link.sub}</p>
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
