"use client"

import { Header } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, AlertTriangle, Lightbulb } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts"

const PRODUCTS = [
  {
    name: "Bosch Brake Pads",
    sku: "GNX-10",
    cost: 395,
    price: 680,
    profit: 285,
    margin: 41.9,
    monthlyUnits: 187,
    monthlyProfit: 53295,
    health: "good",
    daysStock: 12,
  },
  {
    name: "Castrol Engine Oil 1L",
    sku: "CAS-EO-1L",
    cost: 420,
    price: 480,
    profit: 60,
    margin: 12.5,
    monthlyUnits: 89,
    monthlyProfit: 5340,
    health: "low",
    daysStock: 18,
  },
  {
    name: "MRF Battery DIN44",
    sku: "MRF-DIN44",
    cost: 4200,
    price: 5800,
    profit: 1600,
    margin: 27.6,
    monthlyUnits: 12,
    monthlyProfit: 19200,
    health: "good",
    daysStock: 45,
  },
  {
    name: "NGK Spark Plugs 4-pack",
    sku: "NGK-SP4",
    cost: 185,
    price: 320,
    profit: 135,
    margin: 42.2,
    monthlyUnits: 45,
    monthlyProfit: 6075,
    health: "good",
    daysStock: 8,
  },
  {
    name: "Dunlop Wiper Blades",
    sku: "DUN-WB",
    cost: 160,
    price: 280,
    profit: 120,
    margin: 42.9,
    monthlyUnits: 38,
    monthlyProfit: 4560,
    health: "good",
    daysStock: 14,
  },
  {
    name: "Mahindra Thar Mats",
    sku: "MAH-TM",
    cost: 890,
    price: 1200,
    profit: 310,
    margin: 25.8,
    monthlyUnits: 2,
    monthlyProfit: 620,
    health: "slow",
    daysStock: 94,
  },
]

const CHART_DATA = PRODUCTS.map((p) => ({
  name: p.name.length > 14 ? p.name.slice(0, 14) + "…" : p.name,
  profit: p.monthlyProfit,
  margin: p.margin,
}))

function HealthBadge({ health }: { health: string }) {
  if (health === "good") {
    return (
      <span className="flex items-center gap-1 text-xs text-emerald-400 font-medium">
        ✅ Healthy
      </span>
    )
  }
  if (health === "low") {
    return (
      <span className="flex items-center gap-1 text-xs text-red-400 font-medium">
        🔴 Low Margin
      </span>
    )
  }
  return (
    <span className="flex items-center gap-1 text-xs text-orange-400 font-medium">
      🔴 Dead Stock
    </span>
  )
}

const CHART_COLORS = PRODUCTS.map((p) =>
  p.health === "good" ? "#10b981" : p.health === "low" ? "#ef4444" : "#f59e0b"
)

export default function ProfitPage() {
  const totalProfit = PRODUCTS.reduce((s, p) => s + p.monthlyProfit, 0)
  const totalRevenue = 318450

  return (
    <div className="flex flex-col flex-1">
      <Header
        title="Munaafa — Profit Details"
        subtitle="Ramesh Auto Parts · Which products are actually making you money?"
      />

      <main className="flex-1 p-6 space-y-6">
        {/* Summary */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="border-emerald-500/20 bg-emerald-500/3">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground mb-1">This Month's Profit</p>
              <p className="text-3xl font-bold text-emerald-400">₹{totalProfit.toLocaleString("en-IN")}</p>
              <p className="text-xs text-muted-foreground mt-1">after buying cost</p>
            </CardContent>
          </Card>
          <Card className="border-border/60">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground mb-1">Total Revenue</p>
              <p className="text-3xl font-bold">₹{totalRevenue.toLocaleString("en-IN")}</p>
              <p className="text-xs text-muted-foreground mt-1">total sales this month</p>
            </CardContent>
          </Card>
          <Card className="border-blue-500/20">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground mb-1">Overall Profit Margin</p>
              <p className="text-3xl font-bold text-blue-400">{((totalProfit / totalRevenue) * 100).toFixed(1)}%</p>
              <p className="text-xs text-muted-foreground mt-1">of every ₹100 sold, ₹23 is yours</p>
            </CardContent>
          </Card>
        </div>

        {/* AI Insight */}
        <Card className="border-blue-500/20 bg-blue-500/5">
          <CardContent className="p-4 flex items-start gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/20 flex-shrink-0">
              <Lightbulb className="h-4 w-4 text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-blue-300 mb-1">Sarthi Insight</p>
              <p className="text-sm text-zinc-300 leading-relaxed">
                Engine oil (Castrol 1L) is your <strong>#2 revenue product</strong> but only <strong>12.5% profit</strong> — the worst margin in your shop.
                Try switching to Motul 5W-30 (similar price, better margin from distributor) or negotiate ₹30 better price from your Castrol dealer.
                That alone adds <strong>₹2,670/month</strong> in extra profit with zero extra work.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Chart + Table */}
        <div className="grid grid-cols-5 gap-5">
          {/* Bar Chart */}
          <div className="col-span-2">
            <Card className="border-border/60">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Monthly Profit by Product</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={CHART_DATA} layout="vertical" barSize={14}>
                    <XAxis
                      type="number"
                      tick={{ fill: "#71717a", fontSize: 10 }}
                      tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      type="category"
                      dataKey="name"
                      tick={{ fill: "#a1a1aa", fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                      width={90}
                    />
                    <Tooltip
                      contentStyle={{
                        background: "#111113",
                        border: "1px solid #27272a",
                        borderRadius: 6,
                        fontSize: 11,
                      }}
                      formatter={(v: unknown) => [`₹${Number(v).toLocaleString("en-IN")}`, "Monthly Profit"]}
                    />
                    <Bar dataKey="profit" radius={[0, 4, 4, 0]}>
                      {CHART_DATA.map((_, i) => (
                        <Cell key={i} fill={CHART_COLORS[i]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Product Table */}
          <div className="col-span-3">
            <Card className="border-border/60">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  Product Profitability
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border/60">
                        <th className="text-left p-3 text-xs text-muted-foreground font-medium">Product</th>
                        <th className="text-right p-3 text-xs text-muted-foreground font-medium">Cost</th>
                        <th className="text-right p-3 text-xs text-muted-foreground font-medium">Price</th>
                        <th className="text-right p-3 text-xs text-muted-foreground font-medium">Profit/unit</th>
                        <th className="text-right p-3 text-xs text-muted-foreground font-medium">Margin%</th>
                        <th className="text-right p-3 text-xs text-muted-foreground font-medium">Monthly</th>
                        <th className="text-left p-3 text-xs text-muted-foreground font-medium">Health</th>
                      </tr>
                    </thead>
                    <tbody>
                      {PRODUCTS.map((p, i) => (
                        <tr
                          key={p.sku}
                          className={`border-b border-border/40 hover:bg-white/2 transition-colors ${
                            p.health === "low" ? "bg-red-500/3" : p.health === "slow" ? "bg-orange-500/3" : ""
                          }`}
                        >
                          <td className="p-3">
                            <p className="font-medium text-xs">{p.name}</p>
                            <p className="text-[10px] text-muted-foreground">{p.sku}</p>
                          </td>
                          <td className="p-3 text-right text-xs text-muted-foreground">₹{p.cost.toLocaleString("en-IN")}</td>
                          <td className="p-3 text-right text-xs font-medium">₹{p.price.toLocaleString("en-IN")}</td>
                          <td className="p-3 text-right text-xs text-emerald-400 font-medium">
                            +₹{p.profit.toLocaleString("en-IN")}
                          </td>
                          <td className={`p-3 text-right text-xs font-bold ${p.margin < 20 ? "text-red-400" : "text-emerald-400"}`}>
                            {p.margin}%
                          </td>
                          <td className="p-3 text-right text-xs font-semibold">
                            ₹{p.monthlyProfit.toLocaleString("en-IN")}
                          </td>
                          <td className="p-3">
                            <HealthBadge health={p.health} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-white/3">
                        <td colSpan={5} className="p-3 text-xs font-semibold text-muted-foreground">
                          Total Monthly Profit
                        </td>
                        <td className="p-3 text-right text-sm font-bold text-emerald-400">
                          ₹{totalProfit.toLocaleString("en-IN")}
                        </td>
                        <td />
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action card for low margin item */}
        <Card className="border-red-500/20 bg-red-500/3">
          <CardContent className="p-4 flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-red-300 mb-1">Low Margin Warning: Castrol Engine Oil</p>
              <p className="text-xs text-zinc-400 leading-relaxed">
                At 12.5% margin, this product barely pays for itself after your time and storage. Industry average for lubricants is 18-22%.
                Options: (1) Negotiate with Castrol distributor for ₹30/litre better rate → margin goes to 18.75%,
                (2) Switch to Motul 5W-30 at ₹440 cost / ₹520 price → 15.4% margin + better brand positioning,
                (3) Add a premium synthetic option at higher margin alongside regular engine oil.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
