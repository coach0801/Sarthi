"use client"

import { Header } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, TrendingUp, TrendingDown, Lightbulb, CalendarClock } from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts"

// 30-day cash flow projection
function generateCashData() {
  const data = []
  let cashWithDues = 42800
  let cashWithoutDues = 42800
  const dailySales = 340000 / 30
  const dailyExpenses = (285000 + 18000 + 12000 + 8000) / 30
  const dueCollectedDay = 15

  for (let day = 1; day <= 30; day++) {
    cashWithDues += dailySales - dailyExpenses
    cashWithoutDues += dailySales - dailyExpenses

    if (day === dueCollectedDay) {
      cashWithDues += 52000
    }

    // Bosch payment due Jun 8 (day 9 from today)
    if (day === 9) {
      cashWithDues -= 45000
      cashWithoutDues -= 45000
    }

    data.push({
      day: `Day ${day}`,
      withDues: Math.round(cashWithDues),
      withoutDues: Math.round(cashWithoutDues),
    })
  }
  return data
}

const cashData = generateCashData()

const INCOMING = [
  { label: "Expected sales (month)", amount: 340000 },
  { label: "Expected from dues", amount: 52000 },
]

const OUTGOING = [
  { label: "Stock purchase", amount: 285000 },
  { label: "Rent (shop)", amount: 18000 },
  { label: "Salaries (2 staff)", amount: 12000 },
  { label: "Other (electricity, misc)", amount: 8000 },
]

const TOP_ACTIONS = [
  {
    icon: "🟢",
    title: "Collect from Sharma Garage first",
    desc: "₹24,500 due 45 days. Bosch payment is ₹45,000 on Jun 8 — collect from Sharma first and you'll have enough buffer.",
  },
  {
    icon: "💡",
    title: "Ask Bosch distributor for 7-day extension",
    desc: "Your Jun 8 payment of ₹45,000 can be delayed by 7 days if you call your distributor now. This gives you more buffer.",
  },
  {
    icon: "⚠️",
    title: "Don't buy new stock on credit before Jun 15",
    desc: "Cash runway is tight. Hold off on new credit purchases until Mehta Workshop and Kapoor Motors pay their dues.",
  },
]

export default function CashFlowPage() {
  const totalIncoming = INCOMING.reduce((s, i) => s + i.amount, 0)
  const totalOutgoing = OUTGOING.reduce((s, i) => s + i.amount, 0)
  const netCashFlow = totalIncoming - totalOutgoing

  const runwayDays = 19
  const runwayColor = runwayDays < 10 ? "text-red-400" : runwayDays < 20 ? "text-orange-400" : "text-emerald-400"
  const runwayBorder = runwayDays < 10 ? "border-red-500/30" : runwayDays < 20 ? "border-orange-500/30" : "border-emerald-500/30"

  return (
    <div className="flex flex-col flex-1">
      <Header
        title="Cash Flow"
        subtitle="Ramesh Auto Parts · How much money do you have and how long will it last?"
      />

      <main className="flex-1 p-6 space-y-6">
        {/* Big runway display */}
        <div className={`rounded-xl border ${runwayBorder} bg-orange-500/5 p-6`}>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <AlertTriangle className="h-6 w-6 text-orange-400" />
                <h2 className="text-2xl font-bold">
                  Cash Runway: <span className={runwayColor}>{runwayDays} Days</span>
                </h2>
              </div>
              <p className="text-sm text-zinc-400">
                At current spending, your ₹42,800 bank balance lasts {runwayDays} more days without new income.
                Collect your dues to extend this significantly.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="text-center p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-xs text-muted-foreground mb-1">Cash in Bank</p>
                <p className="text-xl font-bold">₹42,800</p>
                <p className="text-xs text-muted-foreground">right now</p>
              </div>
            </div>
          </div>
        </div>

        {/* Two scenarios */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-emerald-500/20 bg-emerald-500/3">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="h-5 w-5 text-emerald-400" />
                <h3 className="font-semibold text-emerald-300">If You Collect Dues</h3>
              </div>
              <p className="text-3xl font-bold text-emerald-400 mb-1">₹1,24,600</p>
              <p className="text-xs text-muted-foreground mb-3">estimated month-end balance</p>
              <ul className="space-y-1.5 text-xs text-zinc-400">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                  Collect ₹52,000 from overdue customers
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                  Normal ₹3,40,000 in sales
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                  Pay all expenses: ₹3,23,000
                </li>
                <li className="flex items-center gap-2 text-emerald-400 font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                  Healthy buffer for July
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-red-500/20 bg-red-500/3">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <TrendingDown className="h-5 w-5 text-red-400" />
                <h3 className="font-semibold text-red-300">If Dues Stay Stuck</h3>
              </div>
              <p className="text-3xl font-bold text-red-400 mb-1">₹34,200</p>
              <p className="text-xs text-muted-foreground mb-3">estimated month-end balance</p>
              <ul className="space-y-1.5 text-xs text-zinc-400">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-400 flex-shrink-0" />
                  No dues collected this month
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-400 flex-shrink-0" />
                  Normal ₹3,40,000 in sales
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-400 flex-shrink-0" />
                  Pay all expenses: ₹3,23,000
                </li>
                <li className="flex items-center gap-2 text-red-400 font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-400 flex-shrink-0" />
                  Tight — any surprise expense = problem
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* 30-day chart */}
        <Card className="border-border/60">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              30-Day Cash Balance Forecast
              <Badge variant="outline" className="text-xs">Warning threshold: ₹20,000</Badge>
            </CardTitle>
            <div className="flex gap-4 text-xs mt-1">
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block" />
                With dues collected
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-red-500 inline-block" />
                Without collecting dues
              </span>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={cashData}>
                <defs>
                  <linearGradient id="withDues" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="withoutDues" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="day"
                  tick={{ fill: "#71717a", fontSize: 9 }}
                  axisLine={false}
                  tickLine={false}
                  interval={4}
                />
                <YAxis
                  tick={{ fill: "#71717a", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`}
                />
                <Tooltip
                  contentStyle={{
                    background: "#111113",
                    border: "1px solid #27272a",
                    borderRadius: 6,
                    fontSize: 11,
                  }}
                  formatter={(v: unknown, name: unknown) => [
                    `₹${Number(v).toLocaleString("en-IN")}`,
                    name === "withDues" ? "With dues collected" : "Without dues",
                  ]}
                />
                <ReferenceLine y={20000} stroke="#ef4444" strokeDasharray="4 4" label={{ value: "⚠️ ₹20K warning", fill: "#ef4444", fontSize: 10 }} />
                <Area
                  type="monotone"
                  dataKey="withDues"
                  stroke="#10b981"
                  strokeWidth={2}
                  fill="url(#withDues)"
                />
                <Area
                  type="monotone"
                  dataKey="withoutDues"
                  stroke="#ef4444"
                  strokeWidth={1.5}
                  strokeDasharray="4 4"
                  fill="url(#withoutDues)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Income vs Expenses */}
        <div className="grid grid-cols-2 gap-5">
          <Card className="border-border/60">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-emerald-400">Incoming This Month</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-2">
              {INCOMING.map((item) => (
                <div key={item.label} className="flex justify-between items-center text-sm">
                  <span className="text-zinc-400">{item.label}</span>
                  <span className="font-medium text-emerald-400">+₹{item.amount.toLocaleString("en-IN")}</span>
                </div>
              ))}
              <div className="border-t border-border/60 pt-2 flex justify-between items-center">
                <span className="text-sm font-semibold">Total Incoming</span>
                <span className="font-bold text-emerald-400">+₹{totalIncoming.toLocaleString("en-IN")}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/60">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-red-400">Outgoing This Month</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-2">
              {OUTGOING.map((item) => (
                <div key={item.label} className="flex justify-between items-center text-sm">
                  <span className="text-zinc-400">{item.label}</span>
                  <span className="font-medium text-red-400">-₹{item.amount.toLocaleString("en-IN")}</span>
                </div>
              ))}
              <div className="border-t border-border/60 pt-2 flex justify-between items-center">
                <span className="text-sm font-semibold">Total Outgoing</span>
                <span className="font-bold text-red-400">-₹{totalOutgoing.toLocaleString("en-IN")}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Net cash flow */}
        <Card className={`border-border/60 ${netCashFlow > 0 ? "border-emerald-500/20" : "border-red-500/20"}`}>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">Net Cash Flow This Month</p>
              <p className="text-xs text-muted-foreground">(if all dues collected)</p>
            </div>
            <p className={`text-3xl font-bold ${netCashFlow >= 0 ? "text-emerald-400" : "text-red-400"}`}>
              {netCashFlow >= 0 ? "+" : ""}₹{netCashFlow.toLocaleString("en-IN")}
            </p>
          </CardContent>
        </Card>

        {/* Important payment warning */}
        <Card className="border-amber-500/20 bg-amber-500/3">
          <CardContent className="p-4 flex items-start gap-3">
            <CalendarClock className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-300 mb-1">Upcoming Payment Alert</p>
              <p className="text-sm text-zinc-300 leading-relaxed">
                Stock payment to <strong>Bosch distributor due on Jun 8 (₹45,000)</strong>.
                Your current balance of ₹42,800 is slightly short. Collect from <strong>Sharma Garage (₹24,500)</strong> this week
                and you will have enough buffer. Do not delay — Bosch gives only 3 days grace period.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Top 3 actions */}
        <div>
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-blue-400" />
            Top 3 Actions to Improve Cash Flow
          </h3>
          <div className="space-y-3">
            {TOP_ACTIONS.map((action, i) => (
              <Card key={i} className="border-border/60">
                <CardContent className="p-4 flex items-start gap-3">
                  <span className="text-lg flex-shrink-0">{action.icon}</span>
                  <div>
                    <p className="text-sm font-medium mb-1">{action.title}</p>
                    <p className="text-xs text-zinc-400 leading-relaxed">{action.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
