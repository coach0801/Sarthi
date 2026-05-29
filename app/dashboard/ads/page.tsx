"use client"

import { Header } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Info,
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from "recharts"

// Campaign-level data with full CM breakdown
const CAMPAIGNS = [
  {
    id: "MC-001",
    platform: "meta",
    platformColor: "#1877F2",
    name: "Prospecting — Top of Funnel",
    adSets: "3 ad sets",
    spend30d: 415800,
    revenue30d: 906444,
    roas: 2.18,
    cmpr: -0.04,
    cm30d: -16632,
    orders: 278,
    cpa: 1496,
    status: "pause_recommended",
    note: "CMPR is negative — every ₹1 spent destroys ₹0.04 in margin after all deductions",
    breakdown: {
      revenue: 906444,
      cogs: 253803,
      adSpend: 415800,
      channelFee: 18129,
      freight: 25028,
      gst: 96688,
      pgFee: 16316,
      rto: 27193,
      discount: 118037,
      packaging: 6945,
      packaging2: 6945,
    },
  },
  {
    id: "MC-002",
    platform: "meta",
    platformColor: "#1877F2",
    name: "Retargeting — Cart Abandoners",
    adSets: "2 ad sets",
    spend30d: 183600,
    revenue30d: 742860,
    roas: 4.04,
    cmpr: 0.31,
    cm30d: 56966,
    orders: 314,
    cpa: 584,
    status: "scale",
    note: "Strong CMPR — consider increasing budget by 20-30%",
    breakdown: {
      revenue: 742860,
      cogs: 207999,
      adSpend: 183600,
      channelFee: 14857,
      freight: 20500,
      gst: 79245,
      pgFee: 13372,
      rto: 22285,
      discount: 66857,
      packaging: 5685,
    },
  },
  {
    id: "GC-001",
    platform: "google",
    platformColor: "#34A853",
    name: "Brand Search",
    adSets: "1 ad group",
    spend30d: 66000,
    revenue30d: 561000,
    roas: 8.5,
    cmpr: 1.84,
    cm30d: 121440,
    orders: 195,
    cpa: 338,
    status: "budget_constrained",
    note: "Highest CMPR in portfolio at 1.84 — constrained by budget (73% IS). Increase budget 20%.",
    breakdown: {
      revenue: 561000,
      cogs: 157080,
      adSpend: 66000,
      channelFee: 11220,
      freight: 15488,
      gst: 59844,
      pgFee: 10098,
      rto: 16830,
      discount: 50490,
      packaging: 4290,
    },
  },
  {
    id: "GC-002",
    platform: "google",
    platformColor: "#34A853",
    name: "Performance Max (PMAX)",
    adSets: "1 asset group",
    spend30d: 126000,
    revenue30d: 302400,
    roas: 2.4,
    cmpr: 0.48,
    cm30d: 60480,
    orders: 189,
    cpa: 667,
    status: "monitor",
    note: "CMPR above minimum threshold but below target 0.7. Monitor and optimize asset group.",
    breakdown: {
      revenue: 302400,
      cogs: 84672,
      adSpend: 126000,
      channelFee: 6048,
      freight: 8355,
      gst: 32266,
      pgFee: 5443,
      rto: 9072,
      discount: 27216,
      packaging: 2315,
    },
  },
]

const CMPR_CHART_DATA = CAMPAIGNS.map((c) => ({
  name: c.name.split(" — ")[0].replace("Performance Max", "PMAX").substring(0, 20),
  cmpr: c.cmpr,
  platform: c.platform,
  platformColor: c.platformColor,
}))

const statusConfig = {
  pause_recommended: { label: "PAUSE RECOMMENDED", variant: "destructive" as const, icon: AlertTriangle, color: "text-red-400" },
  scale: { label: "SCALE", variant: "success" as const, icon: TrendingUp, color: "text-emerald-400" },
  budget_constrained: { label: "BUDGET CONSTRAINED", variant: "warning" as const, icon: AlertTriangle, color: "text-amber-400" },
  monitor: { label: "MONITOR", variant: "secondary" as const, icon: Info, color: "text-zinc-400" },
}

function formatCr(n: number): string {
  if (Math.abs(n) >= 100000) return `₹${(n / 100000).toFixed(2)}L`
  if (Math.abs(n) >= 1000) return `₹${(n / 1000).toFixed(1)}K`
  return `₹${Math.round(n).toLocaleString("en-IN")}`
}

export default function AdsPage() {
  const totalSpend = CAMPAIGNS.reduce((s, c) => s + c.spend30d, 0)
  const totalRevenue = CAMPAIGNS.reduce((s, c) => s + c.revenue30d, 0)
  const totalCM = CAMPAIGNS.reduce((s, c) => s + c.cm30d, 0)
  const blendedRoas = totalRevenue / totalSpend
  const blendedCMPR = totalCM / totalSpend

  return (
    <div className="flex flex-col flex-1">
      <Header
        title="Ad Intelligence"
        subtitle="Campaign-level contribution margin — CMPR replaces ROAS as your north star metric"
      />

      <main className="flex-1 p-4 lg:p-6 space-y-4 lg:space-y-6">
        {/* CMPR explainer */}
        <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-4">
          <p className="text-sm font-medium text-blue-400 mb-1">Why CMPR, not ROAS?</p>
          <p className="text-xs text-zinc-300 leading-relaxed">
            <strong>ROAS</strong> = Revenue ÷ Ad Spend. It ignores GST, channel fees, freight, COGS, RTO losses, and discounts. A 3x ROAS campaign can be deeply unprofitable.{" "}
            <strong className="text-emerald-400">CMPR</strong> = Contribution Margin ÷ Ad Spend, using all 11 deductions. A CMPR of 0.30 means every ₹1 of ad spend generates ₹0.30 in real margin. Target: ≥0.22.
          </p>
        </div>

        {/* Summary KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="rounded-lg border border-border/60 bg-white/3 p-4">
            <p className="text-xs text-muted-foreground mb-1">Total Ad Spend (30d)</p>
            <p className="text-xl font-bold">{formatCr(totalSpend)}</p>
          </div>
          <div className="rounded-lg border border-border/60 bg-white/3 p-4">
            <p className="text-xs text-muted-foreground mb-1">Attributed Revenue</p>
            <p className="text-xl font-bold">{formatCr(totalRevenue)}</p>
            <p className="text-xs text-muted-foreground">ROAS: {blendedRoas.toFixed(2)}x</p>
          </div>
          <div className={`rounded-lg border p-4 ${totalCM > 0 ? "border-emerald-500/20 bg-emerald-500/5" : "border-red-500/20 bg-red-500/5"}`}>
            <p className="text-xs text-muted-foreground mb-1">Total Ad CM (30d)</p>
            <p className={`text-xl font-bold ${totalCM > 0 ? "text-emerald-400" : "text-red-400"}`}>{formatCr(totalCM)}</p>
            <p className="text-xs text-muted-foreground">CMPR: {blendedCMPR.toFixed(2)}</p>
          </div>
          <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
            <p className="text-xs text-muted-foreground mb-1">Campaigns Needing Action</p>
            <p className="text-xl font-bold text-amber-400">
              {CAMPAIGNS.filter((c) => ["pause_recommended", "budget_constrained"].includes(c.status)).length}
            </p>
            <p className="text-xs text-muted-foreground">of {CAMPAIGNS.length} campaigns</p>
          </div>
        </div>

        {/* CMPR Bar Chart */}
        <Card className="border-border/60">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">CMPR by Campaign — 30 Days</CardTitle>
            <p className="text-xs text-muted-foreground">Target CMPR: ≥0.22. Negative CMPR = actively destroying margin.</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={CMPR_CHART_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#71717a", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#71717a", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `${v}`}
                />
                <Tooltip
                  contentStyle={{
                    background: "#111113",
                    border: "1px solid #27272a",
                    borderRadius: 6,
                    fontSize: 11,
                  }}
                  formatter={(v: unknown) => [`CMPR: ${Number(v).toFixed(2)}`, ""]}
                />
                <ReferenceLine y={0.22} stroke="#f59e0b" strokeDasharray="4 4" label={{ value: "Target 0.22", position: "insideTopRight", fill: "#f59e0b", fontSize: 10 }} />
                <ReferenceLine y={0} stroke="#ef4444" strokeDasharray="2 2" />
                <Bar dataKey="cmpr" radius={[4, 4, 0, 0]} maxBarSize={60}>
                  {CMPR_CHART_DATA.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        entry.cmpr < 0
                          ? "#ef4444"
                          : entry.cmpr >= 0.22
                          ? "#10b981"
                          : "#f59e0b"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Campaign detail table */}
        <Card className="border-border/60">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Campaign Breakdown — Real CM After All Deductions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 lg:space-y-4">
              {CAMPAIGNS.map((campaign) => {
                const status = statusConfig[campaign.status as keyof typeof statusConfig]
                const StatusIcon = status.icon
                const isNegative = campaign.cm30d < 0

                return (
                  <div
                    key={campaign.id}
                    className={`rounded-xl border p-3 lg:p-4 ${
                      isNegative
                        ? "border-red-500/20 bg-red-500/3"
                        : campaign.status === "scale"
                        ? "border-emerald-500/20 bg-emerald-500/3"
                        : campaign.status === "budget_constrained"
                        ? "border-amber-500/20 bg-amber-500/3"
                        : "border-border/60"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span
                            className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                            style={{
                              background: campaign.platformColor + "20",
                              color: campaign.platformColor,
                            }}
                          >
                            {campaign.platform.toUpperCase()}
                          </span>
                          <span className="text-sm font-semibold">{campaign.name}</span>
                          <span className="text-xs text-muted-foreground">({campaign.adSets})</span>
                          <Badge variant={status.variant} className="text-[10px] flex items-center gap-1">
                            <StatusIcon className="h-3 w-3" />
                            {status.label}
                          </Badge>
                        </div>
                        <p className={`text-xs mt-1 ${status.color}`}>{campaign.note}</p>
                      </div>
                    </div>

                    {/* Metrics grid */}
                    <div className="mt-3 grid grid-cols-3 lg:grid-cols-6 gap-3">
                      {[
                        { label: "Spend (30d)", value: formatCr(campaign.spend30d), normal: true },
                        { label: "Revenue", value: formatCr(campaign.revenue30d), normal: true },
                        { label: "ROAS", value: `${campaign.roas.toFixed(2)}x`, normal: true },
                        {
                          label: "CM (30d)",
                          value: formatCr(campaign.cm30d),
                          highlight: isNegative ? "red" : "green",
                        },
                        {
                          label: "CMPR",
                          value: campaign.cmpr.toFixed(2),
                          highlight: campaign.cmpr < 0 ? "red" : campaign.cmpr >= 0.22 ? "green" : "amber",
                        },
                        { label: "Orders", value: campaign.orders.toString(), normal: true },
                      ].map((metric) => (
                        <div key={metric.label} className="rounded-md bg-white/3 border border-border/40 p-2 text-center">
                          <p className="text-[10px] text-muted-foreground mb-0.5">{metric.label}</p>
                          <p
                            className={`text-sm font-bold ${
                              metric.highlight === "red"
                                ? "text-red-400"
                                : metric.highlight === "green"
                                ? "text-emerald-400"
                                : metric.highlight === "amber"
                                ? "text-amber-400"
                                : "text-foreground"
                            }`}
                          >
                            {metric.value}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* How CM is computed */}
                    <div className="mt-3 pt-3 border-t border-border/40">
                      <p className="text-[10px] text-muted-foreground mb-2">CM computation breakdown:</p>
                      <div className="flex flex-wrap gap-2 text-[10px]">
                        <span className="text-emerald-400">Revenue {formatCr(campaign.breakdown.revenue)}</span>
                        {[
                          ["COGS", campaign.breakdown.cogs],
                          ["Ad Spend", campaign.breakdown.adSpend],
                          ["GST", campaign.breakdown.gst],
                          ["Discount", campaign.breakdown.discount],
                          ["Freight", campaign.breakdown.freight],
                          ["Channel Fee", campaign.breakdown.channelFee],
                          ["PG Fee", campaign.breakdown.pgFee],
                          ["RTO", campaign.breakdown.rto],
                          ["Packaging", campaign.breakdown.packaging],
                        ].map(([label, value]) => (
                          <span key={String(label)} className="text-red-400">
                            − {label} {formatCr(Number(value))}
                          </span>
                        ))}
                        <span className={`font-semibold ${isNegative ? "text-red-400" : "text-emerald-400"}`}>
                          = CM {formatCr(campaign.cm30d)}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* ROAS vs CMPR summary */}
        <div className="rounded-lg border border-border/60 bg-white/2 p-4">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium mb-1">The ROAS vs CMPR gap in your portfolio</p>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Your blended ROAS across all campaigns is <strong className="text-zinc-200">3.28x</strong> — which looks healthy. But your blended CMPR is <strong className="text-amber-400">{blendedCMPR.toFixed(2)}</strong>. The Prospecting campaign shows ROAS of 2.18x but CMPR of −0.04 — because ROAS ignores the ₹80+ freight, 12% GST, 2% channel fee, 22% Amazon discount, and RTO losses. Sarthi computes the real number so you scale what actually makes money.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
