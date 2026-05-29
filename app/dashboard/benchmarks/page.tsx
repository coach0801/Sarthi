import { Header } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { generateDemoData, computeSummaryMetrics } from "@/lib/demo-data/generator"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

export const dynamic = "force-dynamic"

type BenchmarkRow = {
  metric: string
  yours: number
  median: number
  top25: number
  unit: string
  higherIsBetter: boolean
}

const BENCHMARKS: BenchmarkRow[] = [
  { metric: "Contribution Margin %", yours: 17.8, median: 19.2, top25: 24.1, unit: "%", higherIsBetter: true },
  { metric: "RTO Rate", yours: 13.2, median: 11.8, top25: 7.4, unit: "%", higherIsBetter: false },
  { metric: "COD Rate", yours: 14.1, median: 12.3, top25: 8.9, unit: "%", higherIsBetter: false },
  { metric: "Blended ROAS", yours: 2.34, median: 2.61, top25: 3.42, unit: "x", higherIsBetter: true },
  { metric: "Meta CMPR", yours: 0.19, median: 0.22, top25: 0.31, unit: "", higherIsBetter: true },
  { metric: "Google CMPR", yours: 0.48, median: 0.44, top25: 0.62, unit: "", higherIsBetter: true },
  { metric: "Avg Order Value", yours: 847, median: 782, top25: 1140, unit: "₹", higherIsBetter: true },
  { metric: "Repeat Purchase Rate (90d)", yours: 22.1, median: 24.8, top25: 34.2, unit: "%", higherIsBetter: true },
  { metric: "Blinkit CM%", yours: 14.2, median: 13.8, top25: 17.6, unit: "%", higherIsBetter: true },
  { metric: "Ad Spend % of Revenue", yours: 18.4, median: 16.8, top25: 12.1, unit: "%", higherIsBetter: false },
]

function getPercentile(yours: number, median: number, top25: number, higherIsBetter: boolean): number {
  if (higherIsBetter) {
    if (yours >= top25) return 90
    if (yours >= median) return 60 + ((yours - median) / (top25 - median)) * 30
    return 30 + ((yours - median * 0.7) / (median - median * 0.7)) * 30
  } else {
    if (yours <= top25) return 90
    if (yours <= median) return 60 + ((median - yours) / (median - top25)) * 30
    return Math.max(10, 60 - ((yours - median) / median) * 50)
  }
}

export default function BenchmarksPage() {
  const dataset = generateDemoData("skincare", 90)
  const metrics = computeSummaryMetrics(dataset)

  return (
    <div className="flex flex-col flex-1">
      <Header
        title="Benchmarks"
        subtitle="Anonymized cross-brand comparison — Skincare & Beauty, ₹10-25Cr ARR (n=28)"
      />

      <main className="flex-1 p-4 lg:p-6 space-y-4 lg:space-y-5">
        <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-4 text-sm text-zinc-300">
          <span className="font-medium text-blue-400">Benchmark cohort:</span> Skincare & Beauty brands with ₹10-25Cr annual revenue, operating Shopify + ≥1 marketplace + ≥1 Q-commerce channel. Data from 28 anonymized brands. All metrics computed from last 30 days. Minimum cohort size for any benchmark: 10 brands.
        </div>

        <Card className="border-border/60">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <CardTitle>Performance vs Peers</CardTitle>
              <div className="flex items-center gap-2 lg:gap-3 text-xs text-muted-foreground flex-wrap">
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-blue-400 inline-block" /> Your brand</span>
                <span className="flex items-center gap-1 hidden sm:flex"><span className="h-2 w-2 rounded-full bg-zinc-500 inline-block" /> Median</span>
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-400 inline-block" /> Top 25%</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {BENCHMARKS.map((b) => {
                const percentile = getPercentile(b.yours, b.median, b.top25, b.higherIsBetter)
                const isGood = percentile >= 60
                const isGreat = percentile >= 80

                const yoursFormatted = b.unit === "₹" ? `₹${b.yours.toLocaleString("en-IN")}` : `${b.yours}${b.unit}`
                const medianFormatted = b.unit === "₹" ? `₹${b.median.toLocaleString("en-IN")}` : `${b.median}${b.unit}`
                const top25Formatted = b.unit === "₹" ? `₹${b.top25.toLocaleString("en-IN")}` : `${b.top25}${b.unit}`

                return (
                  <div key={b.metric} className="border-b border-border/40 pb-4 last:border-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="min-w-0 flex-1">
                        <span className="text-xs sm:text-sm font-medium">{b.metric}</span>
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-3 mt-0.5 text-[10px] sm:text-xs text-muted-foreground">
                          <span>You: <span className={`font-medium ${isGreat ? "text-emerald-400" : isGood ? "text-blue-400" : "text-amber-400"}`}>{yoursFormatted}</span></span>
                          <span className="hidden sm:inline">Median: {medianFormatted}</span>
                          <span>Top 25%: <span className="text-emerald-400">{top25Formatted}</span></span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <Badge variant={isGreat ? "success" : isGood ? "info" : "warning"} className="text-[10px]">
                          {Math.round(percentile)}th
                        </Badge>
                        {!isGood && (
                          <TrendingDown className="h-3.5 w-3.5 text-amber-400" />
                        )}
                        {isGreat && (
                          <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
                        )}
                      </div>
                    </div>

                    {/* Bar visualization */}
                    <div className="relative h-3 bg-white/5 rounded-full overflow-hidden">
                      {/* Median marker */}
                      <div
                        className="absolute top-0 bottom-0 w-0.5 bg-zinc-500 z-10"
                        style={{ left: `${(b.median / (b.top25 * 1.3)) * 100}%` }}
                      />
                      {/* Your bar */}
                      <div
                        className={`absolute left-0 top-0 bottom-0 rounded-full transition-all ${isGreat ? "bg-emerald-500" : isGood ? "bg-blue-500" : "bg-amber-500"}`}
                        style={{ width: `${Math.min((b.yours / (b.top25 * 1.3)) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
          <p className="text-xs font-medium text-amber-400 mb-1">Your biggest gap vs top 25%:</p>
          <p className="text-sm text-zinc-300">
            <strong>RTO Rate (13.2% vs 7.4%)</strong> and <strong>Repeat Purchase Rate (22.1% vs 34.2%)</strong> are the two metrics where closing the gap would move the needle most on your annual P&L. The Margin Audit has recommended specific actions for both.
          </p>
        </div>
      </main>
    </div>
  )
}
