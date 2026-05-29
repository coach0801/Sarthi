"use client"

import { useState } from "react"
import { Header } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  AlertTriangle,
  Users,
  Clock,
  CheckCircle2,
  X,
  IndianRupee,
  Zap,
  Package,
} from "lucide-react"
import Link from "next/link"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const KPI_CARDS = [
  {
    label: "Today's Profit",
    value: "₹2,840",
    sub: "from 23 sales today",
    color: "text-emerald-400",
    border: "border-emerald-500/20",
    icon: TrendingUp,
  },
  {
    label: "Udhaar Pending",
    value: "₹87,320",
    sub: "from 14 customers",
    color: "text-amber-400",
    border: "border-amber-500/20",
    icon: Users,
  },
  {
    label: "Cash Runway",
    value: "19 Days",
    sub: "⚠️ collect dues soon",
    color: "text-orange-400",
    border: "border-orange-500/20",
    icon: Clock,
  },
  {
    label: "This Month's Profit",
    value: "₹73,250",
    sub: "23% margin on ₹3,18,450",
    color: "text-blue-400",
    border: "border-blue-500/20",
    icon: IndianRupee,
  },
]

const SMART_ACTIONS = [
  {
    id: 1,
    urgency: "urgent",
    icon: "🔴",
    title: "Send reminder to Mehta Workshop",
    desc: "₹12,800 overdue by 67 days — high risk of bad debt. Send WhatsApp reminder now.",
    action: "Send WhatsApp",
    href: "/dashboard/udhaar",
  },
  {
    id: 2,
    urgency: "insight",
    icon: "💡",
    title: "Engine oil margin is only 12.5%",
    desc: "Castrol 1L barely makes ₹60 per bottle. Talk to your distributor or switch to Motul. Could add ₹2,670/month.",
    action: "See details",
    href: "/dashboard/profit",
  },
  {
    id: 3,
    urgency: "warning",
    icon: "⚠️",
    title: "Bosch Brake Pads running out",
    desc: "Only 8 left, selling 4/day. Will run out in 2 days. Order 50 units today from distributor.",
    action: "View stock",
    href: "/dashboard/stock",
  },
]

const WEEK_DATA = [
  { day: "Mon", collected: 12400, spent: 8200 },
  { day: "Tue", collected: 9800, spent: 11400 },
  { day: "Wed", collected: 18200, spent: 9600 },
  { day: "Thu", collected: 15600, spent: 12800 },
  { day: "Fri", collected: 22400, spent: 8400 },
  { day: "Sat", collected: 0, spent: 3800 },
  { day: "Sun", collected: 0, spent: 0 },
]

export default function DashboardPage() {
  const [dismissed, setDismissed] = useState<number[]>([])

  const visibleActions = SMART_ACTIONS.filter((a) => !dismissed.includes(a.id))

  const weekCollected = WEEK_DATA.reduce((s, d) => s + d.collected, 0)
  const weekSpent = WEEK_DATA.reduce((s, d) => s + d.spent, 0)

  const healthScore = 67
  const healthColor =
    healthScore >= 80 ? "text-emerald-400" : healthScore >= 60 ? "text-amber-400" : "text-red-400"
  const healthRingColor =
    healthScore >= 80 ? "#10b981" : healthScore >= 60 ? "#f59e0b" : "#ef4444"

  const circumference = 2 * Math.PI * 44
  const dashOffset = circumference - (healthScore / 100) * circumference

  return (
    <div className="flex flex-col flex-1">
      <Header
        title="Ramesh Auto Parts"
        subtitle="Pune, Maharashtra · Today is a good day to collect your dues"
        actions={
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/margin-audit">
              <Zap className="h-3.5 w-3.5" />
              Health Check
            </Link>
          </Button>
        }
      />

      <main className="flex-1 p-6 space-y-6">
        {/* Top row: Health Score + KPI cards */}
        <div className="grid grid-cols-5 gap-4">
          {/* Health Score */}
          <div className="col-span-1">
            <Card className="border-border/60 h-full">
              <CardContent className="p-4 flex flex-col items-center justify-center h-full gap-2">
                <p className="text-xs text-muted-foreground text-center">Business Health</p>
                <div className="relative flex items-center justify-center">
                  <svg width="100" height="100" viewBox="0 0 100 100">
                    <circle
                      cx="50" cy="50" r="44"
                      fill="none"
                      stroke="#27272a"
                      strokeWidth="8"
                    />
                    <circle
                      cx="50" cy="50" r="44"
                      fill="none"
                      stroke={healthRingColor}
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      strokeDashoffset={dashOffset}
                      transform="rotate(-90 50 50)"
                      style={{ transition: "stroke-dashoffset 1s ease" }}
                    />
                  </svg>
                  <div className="absolute text-center">
                    <p className={`text-2xl font-bold ${healthColor}`}>{healthScore}</p>
                    <p className="text-[10px] text-muted-foreground">/100</p>
                  </div>
                </div>
                <p className="text-xs text-amber-400 font-medium">Needs Work</p>
                <Link href="/dashboard/margin-audit" className="text-[10px] text-blue-400 hover:underline">
                  See 5 fixes →
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* KPI Cards */}
          <div className="col-span-4 grid grid-cols-2 lg:grid-cols-4 gap-3">
            {KPI_CARDS.map((card) => (
              <Card key={card.label} className={`border-border/60 ${card.border}`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-xs text-muted-foreground">{card.label}</p>
                    <card.icon className={`h-4 w-4 ${card.color} opacity-60`} />
                  </div>
                  <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{card.sub}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Cash Runway bar */}
        <Card className="border-orange-500/20 bg-orange-500/3">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-orange-400" />
                <p className="text-sm font-medium">Cash Runway: 19 of 30 days remaining</p>
              </div>
              <Link href="/dashboard/cashflow" className="text-xs text-blue-400 hover:underline">
                View cash flow →
              </Link>
            </div>
            <div className="w-full bg-white/5 rounded-full h-3">
              <div
                className="h-3 rounded-full bg-orange-500 transition-all"
                style={{ width: `${(19 / 30) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1.5">
              <span>₹42,800 in bank today</span>
              <span>⚠️ Collect dues to reach ₹1,24,600 by month end</span>
            </div>
          </CardContent>
        </Card>

        {/* Smart Actions + Week Money */}
        <div className="grid grid-cols-5 gap-5">
          {/* Smart Actions */}
          <div className="col-span-3 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold flex items-center gap-2">
                <Zap className="h-4 w-4 text-blue-400" />
                Today's Smart Actions
              </h2>
              <Badge variant="outline" className="text-xs">
                {visibleActions.length} pending
              </Badge>
            </div>

            {visibleActions.length === 0 ? (
              <Card className="border-border/60">
                <CardContent className="p-6 text-center text-sm text-muted-foreground">
                  <CheckCircle2 className="h-8 w-8 text-emerald-400 mx-auto mb-2" />
                  All actions done for today. Good job!
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
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <span className="text-lg flex-shrink-0">{action.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{action.title}</p>
                        <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">{action.desc}</p>
                        <div className="flex items-center gap-2 mt-3">
                          <Button size="sm" className="h-7 text-xs" asChild>
                            <Link href={action.href}>{action.action}</Link>
                          </Button>
                          <button
                            onClick={() => setDismissed((d) => [...d, action.id])}
                            className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground border border-border/60 rounded-md flex items-center gap-1 transition-colors"
                          >
                            <X className="h-3 w-3" /> Dismiss
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* This Week's Money */}
          <div className="col-span-2">
            <Card className="border-border/60 h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">This Week's Money</CardTitle>
                <div className="flex gap-4 text-xs">
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block" />
                    Collected ₹{weekCollected.toLocaleString("en-IN")}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-red-500 inline-block" />
                    Spent ₹{weekSpent.toLocaleString("en-IN")}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={WEEK_DATA} barGap={2} barSize={12}>
                    <XAxis
                      dataKey="day"
                      tick={{ fill: "#71717a", fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
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
                    <Bar dataKey="collected" fill="#10b981" radius={[3, 3, 0, 0]} name="Collected" />
                    <Bar dataKey="spent" fill="#ef4444" radius={[3, 3, 0, 0]} name="Spent" />
                  </BarChart>
                </ResponsiveContainer>

                <div className="mt-3 pt-3 border-t border-border/60">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Net this week</span>
                    <span className={weekCollected - weekSpent >= 0 ? "text-emerald-400 font-semibold" : "text-red-400 font-semibold"}>
                      {weekCollected - weekSpent >= 0 ? "+" : ""}₹{(weekCollected - weekSpent).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick links row */}
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: "Check Udhaar", sub: "₹87,320 pending", href: "/dashboard/udhaar", icon: Users, color: "text-amber-400" },
            { label: "See Profit Details", sub: "Per product breakdown", href: "/dashboard/profit", icon: TrendingUp, color: "text-emerald-400" },
            { label: "Stock Alerts", sub: "2 items running out", href: "/dashboard/stock", icon: Package, color: "text-red-400" },
            { label: "Get a Loan", sub: "Qualify for ₹8L-₹12L", href: "/dashboard/loan", icon: IndianRupee, color: "text-blue-400" },
          ].map((link) => (
            <Link key={link.href} href={link.href}>
              <Card className="border-border/60 hover:border-white/20 transition-colors cursor-pointer">
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
