import { Header } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { generateDemoData, computeSummaryMetrics } from "@/lib/demo-data/generator"
import { formatCurrency } from "@/lib/utils"
import { MarginTrendChart } from "@/components/charts/margin-trend"

export const dynamic = "force-dynamic"

export default function ForecastPage() {
  const dataset = generateDemoData("skincare", 90)
  const metrics = computeSummaryMetrics(dataset)

  const currentMonthlyRevenue = metrics.summary.totalRevenue30d
  const currentMonthlyCM = metrics.summary.totalCM30d

  const scenarios = [
    {
      name: "Current Trajectory",
      color: "text-zinc-400",
      badgeVariant: "secondary" as const,
      revenue30: currentMonthlyRevenue * 1.08,
      revenue60: currentMonthlyRevenue * 1.16,
      revenue90: currentMonthlyRevenue * 1.25,
      cm30: currentMonthlyCM * 1.06,
      cm60: currentMonthlyCM * 1.12,
      cm90: currentMonthlyCM * 1.2,
      cmPct30: metrics.summary.avgCMPct + 0.2,
      description: "No changes — current growth rate and margin profile maintained.",
    },
    {
      name: "Recommended Actions",
      color: "text-emerald-400",
      badgeVariant: "success" as const,
      revenue30: currentMonthlyRevenue * 1.1,
      revenue60: currentMonthlyRevenue * 1.22,
      revenue90: currentMonthlyRevenue * 1.35,
      cm30: currentMonthlyCM * 1.22,
      cm60: currentMonthlyCM * 1.38,
      cm90: currentMonthlyCM * 1.52,
      cmPct30: metrics.summary.avgCMPct + 4.2,
      description: "All 5 Margin Audit recommendations implemented in the next 2 weeks.",
    },
    {
      name: "Aggressive Growth",
      color: "text-amber-400",
      badgeVariant: "warning" as const,
      revenue30: currentMonthlyRevenue * 1.18,
      revenue60: currentMonthlyRevenue * 1.38,
      revenue90: currentMonthlyRevenue * 1.6,
      cm30: currentMonthlyCM * 1.08,
      cm60: currentMonthlyCM * 1.15,
      cm90: currentMonthlyCM * 1.25,
      cmPct30: metrics.summary.avgCMPct - 1.8,
      description: "Revenue-first: 40% increase in ad spend. Margin compression expected.",
    },
  ]

  const forecastTrend = Array.from({ length: 90 }, (_, i) => {
    const base = metrics.dailyTrend[metrics.dailyTrend.length - 1]?.revenue ?? 0
    const growth = 1 + (i / 90) * 0.35
    const seasonality = 1 + Math.sin(i / 14) * 0.08
    return {
      date: new Date(Date.now() + i * 86400000).toISOString().slice(0, 10),
      revenue: base * growth * seasonality,
      contributionMargin: base * growth * seasonality * (metrics.summary.avgCMPct / 100 + 0.042),
      orders: Math.round(metrics.summary.totalOrders30d / 30 * growth),
    }
  })

  return (
    <div className="flex flex-col flex-1">
      <Header title="Forecast" subtitle="Revenue and contribution margin projections — 30/60/90 days" />

      <main className="flex-1 p-4 lg:p-6 space-y-4 lg:space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {scenarios.map((s) => (
            <Card key={s.name} className="border-border/60">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className={s.color}>{s.name}</CardTitle>
                  <Badge variant={s.badgeVariant}>Scenario</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{s.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { label: "30 days", rev: s.revenue30, cm: s.cm30, cmPct: s.cmPct30 },
                    { label: "60 days", rev: s.revenue60, cm: s.cm60, cmPct: s.cmPct30 + 0.3 },
                    { label: "90 days", rev: s.revenue90, cm: s.cm90, cmPct: s.cmPct30 + 0.6 },
                  ].map((period) => (
                    <div key={period.label} className="border border-border/40 rounded-md p-2.5">
                      <p className="text-xs text-muted-foreground mb-1.5">{period.label}</p>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Revenue</span>
                        <span className="font-medium">{formatCurrency(period.rev, true)}</span>
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <span className="text-muted-foreground">CM</span>
                        <span className="font-medium text-emerald-400">{formatCurrency(period.cm, true)}</span>
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <span className="text-muted-foreground">CM%</span>
                        <span className={`font-medium ${period.cmPct >= metrics.summary.avgCMPct ? "text-emerald-400" : "text-red-400"}`}>
                          {period.cmPct.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-border/60">
          <CardHeader className="pb-2">
            <CardTitle>90-Day Forward Projection — Recommended Actions Scenario</CardTitle>
            <p className="text-xs text-muted-foreground">Confidence interval: ±12% (based on 90-day historical MAPE)</p>
          </CardHeader>
          <CardContent>
            <MarginTrendChart data={forecastTrend} height={260} />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="border-border/60">
            <CardHeader className="pb-2">
              <CardTitle>Key Assumptions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                {[
                  { assumption: "Festive season uplift (Sep-Oct)", impact: "+25-35% revenue" },
                  { assumption: "Meta auction costs stay flat", impact: "±0% ROAS" },
                  { assumption: "No new competitor entry on Blinkit", impact: "DRR stable" },
                  { assumption: "Shiprocket rate card unchanged", impact: "Freight ±5%" },
                  { assumption: "GST rates unchanged", impact: "Net margin ±0%" },
                ].map((a) => (
                  <div key={a.assumption} className="flex justify-between text-xs border-b border-border/40 pb-2 last:border-0">
                    <span className="text-muted-foreground">{a.assumption}</span>
                    <span className="font-medium">{a.impact}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/60">
            <CardHeader className="pb-2">
              <CardTitle>Model Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">30-Day Revenue MAPE</span>
                    <span className="font-medium text-emerald-400">8.3%</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-1.5">
                    <div className="h-1.5 rounded-full bg-emerald-500" style={{ width: "91.7%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">30-Day CM MAPE</span>
                    <span className="font-medium text-emerald-400">11.2%</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-1.5">
                    <div className="h-1.5 rounded-full bg-emerald-500" style={{ width: "88.8%" }} />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Model trained on 90 days of cross-channel data. Backtested on 30-day holdout period. Confidence intervals shown at ±1σ.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
