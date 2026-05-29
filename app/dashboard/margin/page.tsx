import { Header } from "@/components/dashboard/header"
import { MetricCard } from "@/components/dashboard/metric-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MarginTrendChart, ChannelMarginChart } from "@/components/charts/margin-trend"
import { generateDemoData, computeSummaryMetrics } from "@/lib/demo-data/generator"
import { formatCurrency, channelLabel } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export const dynamic = "force-dynamic"

export default function MarginPage() {
  const dataset = generateDemoData("skincare", 90)
  const metrics = computeSummaryMetrics(dataset)

  const costBreakdown = [
    { label: "COGS", value: metrics.summary.totalRevenue30d * 0.28, pct: 28 },
    { label: "Ad Spend", value: metrics.summary.totalAdSpend30d, pct: (metrics.summary.totalAdSpend30d / metrics.summary.totalRevenue30d) * 100 },
    { label: "Channel Fees", value: metrics.summary.totalRevenue30d * 0.09, pct: 9 },
    { label: "Freight", value: metrics.summary.totalRevenue30d * 0.06, pct: 6 },
    { label: "GST (net)", value: metrics.summary.totalRevenue30d * 0.04, pct: 4 },
    { label: "Discounts", value: metrics.summary.totalRevenue30d * 0.09, pct: 9 },
    { label: "RTO Provision", value: metrics.summary.totalRevenue30d * 0.03, pct: 3 },
    { label: "Packaging", value: metrics.summary.totalRevenue30d * 0.01, pct: 1 },
  ]

  return (
    <div className="flex flex-col flex-1">
      <Header title="Margin" subtitle="Contribution margin truth — SKU × channel × day" />

      <main className="flex-1 p-6 space-y-5">
        {/* Top metrics */}
        <div className="grid grid-cols-4 gap-3">
          <MetricCard
            label="30-Day CM"
            value={metrics.summary.totalCM30d}
            format="currency"
            compact
            change={1.4}
            changeLabel="vs prior period"
            highlight="green"
          />
          <MetricCard
            label="CM%"
            value={metrics.summary.avgCMPct}
            format="percent"
            subtitle="Target: 22%"
            change={1.4}
            highlight={metrics.summary.avgCMPct >= 22 ? "green" : "amber"}
          />
          <MetricCard
            label="Revenue"
            value={metrics.summary.totalRevenue30d}
            format="currency"
            compact
            change={8.3}
          />
          <MetricCard
            label="Orders"
            value={metrics.summary.totalOrders30d}
            format="number"
            compact
            change={6.1}
          />
        </div>

        {/* Trend chart */}
        <Card className="border-border/60">
          <CardHeader className="pb-2">
            <CardTitle>Daily Revenue vs Contribution Margin — 30 Days</CardTitle>
          </CardHeader>
          <CardContent>
            <MarginTrendChart data={metrics.dailyTrend} height={240} />
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-5">
          {/* Channel breakdown */}
          <Card className="border-border/60">
            <CardHeader className="pb-2">
              <CardTitle>Channel Margin Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <ChannelMarginChart data={metrics.channelBreakdown} height={200} />
            </CardContent>
          </Card>

          {/* Cost waterfall */}
          <Card className="border-border/60">
            <CardHeader className="pb-2">
              <CardTitle>Where Revenue Goes — 30-Day Waterfall</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-sm font-semibold">
                  <span>Gross Revenue</span>
                  <span>{formatCurrency(metrics.summary.totalRevenue30d, true)}</span>
                </div>
                {costBreakdown.map((item) => (
                  <div key={item.label}>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                      <span>− {item.label}</span>
                      <span className="text-red-400">−{formatCurrency(item.value, true)} ({item.pct.toFixed(1)}%)</span>
                    </div>
                    <Progress value={item.pct} className="h-1.5" />
                  </div>
                ))}
                <div className="flex items-center justify-between text-sm font-semibold border-t border-border/60 pt-2 mt-2">
                  <span className="text-emerald-400">= Contribution Margin</span>
                  <span className="text-emerald-400">
                    {formatCurrency(metrics.summary.totalCM30d, true)} ({metrics.summary.avgCMPct.toFixed(1)}%)
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* SKU breakdown */}
        <Card className="border-border/60">
          <CardHeader className="pb-2">
            <CardTitle>SKU Margin Breakdown — 30 Days</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/60">
                    <th className="text-left py-2 text-xs text-muted-foreground font-medium">SKU</th>
                    <th className="text-right py-2 text-xs text-muted-foreground font-medium">Revenue</th>
                    <th className="text-right py-2 text-xs text-muted-foreground font-medium">Orders</th>
                    <th className="text-right py-2 text-xs text-muted-foreground font-medium">CM</th>
                    <th className="text-right py-2 text-xs text-muted-foreground font-medium">CM%</th>
                    <th className="text-left py-2 text-xs text-muted-foreground font-medium w-32">Health</th>
                  </tr>
                </thead>
                <tbody>
                  {metrics.skuBreakdown.map((sku, i) => (
                    <tr key={sku.sku} className="border-b border-border/40 hover:bg-white/2">
                      <td className="py-2.5 font-medium text-xs">{sku.name}</td>
                      <td className="py-2.5 text-right text-xs">{formatCurrency(sku.revenue, true)}</td>
                      <td className="py-2.5 text-right text-xs">{sku.orders}</td>
                      <td className="py-2.5 text-right text-xs">{formatCurrency(sku.contributionMargin, true)}</td>
                      <td className={`py-2.5 text-right text-xs font-semibold ${sku.contributionMarginPct >= 20 ? "text-emerald-400" : sku.contributionMarginPct >= 12 ? "text-amber-400" : "text-red-400"}`}>
                        {sku.contributionMarginPct.toFixed(1)}%
                      </td>
                      <td className="py-2.5">
                        <div className="w-full bg-white/5 rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full ${sku.contributionMarginPct >= 20 ? "bg-emerald-500" : sku.contributionMarginPct >= 12 ? "bg-amber-500" : "bg-red-500"}`}
                            style={{ width: `${Math.min(sku.contributionMarginPct * 2, 100)}%` }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
