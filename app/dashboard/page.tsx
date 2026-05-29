import { Header } from "@/components/dashboard/header"
import { MetricCard } from "@/components/dashboard/metric-card"
import { ActionCard } from "@/components/dashboard/action-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MarginTrendChart } from "@/components/charts/margin-trend"
import { generateDemoData, computeSummaryMetrics } from "@/lib/demo-data/generator"
import { DEMO_ACTIONS } from "@/lib/demo-data/actions"
import { formatCurrency } from "@/lib/utils"
import { TrendingUp, AlertTriangle, MessageSquare, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const dynamic = "force-dynamic"

export default function DashboardPage() {
  const dataset = generateDemoData("skincare", 90)
  const metrics = computeSummaryMetrics(dataset)
  const today = new Date()

  const todayCM = metrics.dailyTrend[metrics.dailyTrend.length - 1]?.contributionMargin ?? 0
  const yesterdayCM = metrics.dailyTrend[metrics.dailyTrend.length - 2]?.contributionMargin ?? 0
  const cmChange = yesterdayCM > 0 ? ((todayCM - yesterdayCM) / yesterdayCM) * 100 : 0
  const targetDailyCM = 125000

  const OBSERVATIONS = [
    `Blinkit is generating ${metrics.channelBreakdown.find(c=>c.channel==="blinkit")?.contributionMarginPct.toFixed(1) ?? "18"}% CM — your lowest channel by margin. Consider reviewing dark store inventory mix.`,
    `COD rate is ${(metrics.summary.codRate * 100).toFixed(1)}% — above the 12% benchmark for urban-focused brands. Each COD order adds ₹${Math.round(metrics.summary.avgOrderValue * 0.025).toLocaleString("en-IN")} in net risk.`,
    `Your Meta prospecting campaign has a 7-day CMPR of 0.18 — below the 0.22 target. Creative fatigue likely; CTR has dropped 31% over 14 days.`,
    `Vitamin C Serum 30ml is your highest-margin SKU at ${metrics.skuBreakdown[0]?.contributionMarginPct.toFixed(1) ?? "28"}% CM, but only ${metrics.skuBreakdown[0]?.orders ?? 0} orders in 30 days on Shopify. Underindexed in acquisition campaigns.`,
    `Zepto's average ROAS has improved to 2.8x this week vs 2.1x last week — the inventory rebalance is working.`,
  ]

  return (
    <div className="flex flex-col flex-1">
      <Header
        title="Daily Brief"
        subtitle={`${today.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })} · Glow & Beyond`}
        actions={
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/margin-audit">
              <TrendingUp className="h-3.5 w-3.5" />
              Margin Audit
            </Link>
          </Button>
        }
      />

      <main className="flex-1 p-6 space-y-6">
        {/* Key metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <MetricCard
            label="Today's CM"
            value={todayCM}
            format="currency"
            compact
            change={cmChange}
            changeLabel="vs yesterday"
            highlight={todayCM >= targetDailyCM ? "green" : "red"}
          />
          <MetricCard
            label="30-Day Revenue"
            value={metrics.summary.totalRevenue30d}
            format="currency"
            compact
            change={8.3}
            changeLabel="vs prior 30d"
          />
          <MetricCard
            label="Avg CM%"
            value={metrics.summary.avgCMPct}
            format="percent"
            change={1.4}
            changeLabel="vs prior 30d"
            highlight={metrics.summary.avgCMPct >= 20 ? "green" : "amber"}
          />
          <MetricCard
            label="Blended ROAS"
            value={metrics.summary.blendedRoas}
            format="raw"
            subtitle={`${formatCurrency(metrics.summary.totalAdSpend30d, true)} spend / 30d`}
            change={-5.2}
            changeLabel="vs prior 30d"
            highlight={metrics.summary.blendedRoas >= 2.5 ? "green" : "red"}
          />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <MetricCard label="RTO Rate" value={`${(metrics.summary.rtoRate * 100).toFixed(1)}%`} subtitle="Industry avg 12%" highlight={metrics.summary.rtoRate < 0.12 ? "green" : "amber"} />
          <MetricCard label="COD Rate" value={`${(metrics.summary.codRate * 100).toFixed(1)}%`} subtitle="Target <12%" highlight={metrics.summary.codRate < 0.12 ? "green" : "amber"} />
          <MetricCard label="Avg Order Value" value={metrics.summary.avgOrderValue} format="currency" compact />
        </div>

        {/* Chart + Actions */}
        <div className="grid grid-cols-5 gap-5">
          <div className="col-span-3">
            <Card className="border-border/60">
              <CardHeader className="pb-2">
                <CardTitle>Revenue vs Contribution Margin — Last 30 Days</CardTitle>
              </CardHeader>
              <CardContent>
                <MarginTrendChart data={metrics.dailyTrend} height={220} />
              </CardContent>
            </Card>
          </div>

          <div className="col-span-2 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold">Top Actions</h2>
              <Link href="/dashboard/actions" className="text-xs text-blue-400 hover:text-blue-300">
                View all {DEMO_ACTIONS.length} →
              </Link>
            </div>
            {DEMO_ACTIONS.slice(0, 2).map((action) => (
              <ActionCard key={action.id} action={action} />
            ))}
          </div>
        </div>

        {/* Observations + Strategic Question */}
        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-2">
            <Card className="border-border/60">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-400" />
                  5 Observations for Today
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3">
                  {OBSERVATIONS.map((obs, i) => (
                    <li key={i} className="flex gap-3 text-sm">
                      <span className="flex-shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold">
                        {i + 1}
                      </span>
                      <span className="text-zinc-300 leading-relaxed">{obs}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card className="border-blue-500/20 bg-blue-500/5">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-blue-400">
                  <MessageSquare className="h-4 w-4" />
                  Strategic Question
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-300 leading-relaxed italic">
                  "You're growing revenue at 8% MoM but contribution margin only improved 1.4%. What's the one cost lever — COD mix, ad spend allocation, or channel fee negotiation — you'll attack this week to close that gap?"
                </p>
                <Button variant="outline" size="sm" className="mt-4 w-full text-xs">
                  <MessageSquare className="h-3.5 w-3.5" />
                  Discuss with Sarthi
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border/60">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  This Week's Plan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    { day: "Mon", task: "Review Meta creative performance", done: true },
                    { day: "Wed", task: "Blinkit inventory replenishment", done: false },
                    { day: "Thu", task: "COD verification rule rollout", done: false },
                    { day: "Fri", task: "Margin Audit report review", done: false },
                  ].map((item) => (
                    <div key={item.day} className="flex items-start gap-2 text-xs">
                      <span className={`font-medium w-7 flex-shrink-0 ${item.done ? "text-emerald-400" : "text-muted-foreground"}`}>
                        {item.day}
                      </span>
                      <span className={item.done ? "line-through text-muted-foreground" : "text-zinc-300"}>
                        {item.task}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
