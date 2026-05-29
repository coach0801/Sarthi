"use client"

import { useState } from "react"
import { Header } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Package, AlertTriangle, CheckCircle2, Lightbulb, TrendingDown, ShoppingCart } from "lucide-react"

const STOCKOUT_ITEMS = [
  {
    id: 1,
    name: "Bosch Brake Pads",
    sku: "GNX-10",
    remaining: 8,
    dailySales: 4,
    daysLeft: 2,
    reorderQty: 50,
    costPerUnit: 395,
    urgency: "critical",
  },
  {
    id: 2,
    name: "NGK Spark Plugs 4-pack",
    sku: "NGK-SP4",
    remaining: 12,
    dailySales: 3,
    daysLeft: 4,
    reorderQty: 40,
    costPerUnit: 185,
    urgency: "critical",
  },
]

const LOW_STOCK_ITEMS = [
  {
    id: 3,
    name: "Dunlop Wiper Blades",
    sku: "DUN-WB",
    remaining: 22,
    dailySales: 2,
    daysLeft: 11,
    reorderQty: 30,
    costPerUnit: 160,
  },
  {
    id: 4,
    name: "MRF Battery DIN44",
    sku: "MRF-DIN44",
    remaining: 3,
    dailySales: 0.25,
    daysLeft: 12,
    reorderQty: 10,
    costPerUnit: 4200,
  },
]

const DEAD_STOCK = [
  {
    id: 5,
    name: "Mahindra Thar Floor Mats",
    sku: "MAH-TM",
    units: 47,
    costPerUnit: 890,
    sellingPrice: 1200,
    totalValue: 41830,
    daysSinceLastSale: 94,
    suggestion: "Sell at 20% discount (₹960 instead of ₹1,200). Better to free up ₹41,830 in cash than hold dead stock. Or bundle with other Mahindra accessories.",
    discountPrice: 960,
  },
  {
    id: 6,
    name: "Old AC Cabin Filters",
    sku: "AC-FLT-OLD",
    units: 23,
    costPerUnit: 540,
    sellingPrice: 680,
    totalValue: 12420,
    daysSinceLastSale: 72,
    suggestion: "These are for older car models (2012-2016 Maruti). List on OLX Auto Parts or give your distributor to take back. Free up ₹12,420 in cash.",
    discountPrice: 440,
  },
]

const HEALTHY_ITEMS = [
  { name: "Castrol Engine Oil 1L", sku: "CAS-EO-1L", remaining: 54, daysLeft: 18 },
  { name: "Bosch Spark Plugs W7DC", sku: "BSC-W7DC", remaining: 32, daysLeft: 21 },
  { name: "3M Polish Kit", sku: "3M-PLK", remaining: 18, daysLeft: 28 },
]

export default function StockPage() {
  const [ordered, setOrdered] = useState<number[]>([])
  const [cleared, setCleared] = useState<number[]>([])

  const totalStockValue = 280000
  const deadStockValue = DEAD_STOCK.filter((d) => !cleared.includes(d.id)).reduce((s, d) => s + d.totalValue, 0)

  return (
    <div className="flex flex-col flex-1">
      <Header
        title="Stock Alerts"
        subtitle="Ramesh Auto Parts · What to order, what to sell, what's costing you money"
      />

      <main className="flex-1 p-6 space-y-6">
        {/* Summary */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="border-border/60">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground mb-1">Total Stock Value</p>
              <p className="text-3xl font-bold">₹{totalStockValue.toLocaleString("en-IN")}</p>
              <p className="text-xs text-muted-foreground mt-1">across all products</p>
            </CardContent>
          </Card>
          <Card className="border-red-500/20 bg-red-500/3">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground mb-1">Dead Stock (60+ days)</p>
              <p className="text-3xl font-bold text-red-400">₹{deadStockValue.toLocaleString("en-IN")}</p>
              <p className="text-xs text-muted-foreground mt-1">cash locked in unsold items</p>
            </CardContent>
          </Card>
          <Card className="border-orange-500/20 bg-orange-500/3">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground mb-1">Stockout Risk</p>
              <p className="text-3xl font-bold text-orange-400">{STOCKOUT_ITEMS.length + LOW_STOCK_ITEMS.length} items</p>
              <p className="text-xs text-muted-foreground mt-1">{STOCKOUT_ITEMS.length} critical, {LOW_STOCK_ITEMS.length} running low</p>
            </CardContent>
          </Card>
        </div>

        {/* Section 1: Order Now */}
        <div>
          <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            🔴 Order Now — Stockout Risk
          </h2>
          <div className="space-y-3">
            {STOCKOUT_ITEMS.map((item) => (
              <Card key={item.id} className="border-red-500/20 bg-red-500/3">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/20 flex-shrink-0">
                      <Package className="h-5 w-5 text-red-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <p className="text-sm font-semibold">{item.name}</p>
                        <Badge variant="destructive" className="text-[10px]">
                          {item.daysLeft} days left!
                        </Badge>
                      </div>
                      <p className="text-xs text-zinc-500 mb-2">{item.sku}</p>
                      <div className="grid grid-cols-3 gap-3 text-xs">
                        <div>
                          <p className="text-muted-foreground">In stock</p>
                          <p className="font-semibold text-red-400">{item.remaining} units</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Sells per day</p>
                          <p className="font-semibold">{item.dailySales} units</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Recommended order</p>
                          <p className="font-semibold text-emerald-400">{item.reorderQty} units</p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="w-full bg-white/5 rounded-full h-1.5">
                          <div
                            className="h-1.5 rounded-full bg-red-500"
                            style={{ width: `${Math.min((item.remaining / (item.dailySales * 30)) * 100, 100)}%` }}
                          />
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-1">
                          Cost to reorder: ₹{(item.reorderQty * item.costPerUnit).toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 flex-shrink-0">
                      {ordered.includes(item.id) ? (
                        <div className="flex items-center gap-1 text-xs text-emerald-400 font-medium">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Ordered
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          className="h-8 text-xs bg-red-500 hover:bg-red-600 text-white"
                          onClick={() => setOrdered((o) => [...o, item.id])}
                        >
                          <ShoppingCart className="h-3.5 w-3.5 mr-1" />
                          Mark as Ordered
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Section 2: Running Low */}
        <div>
          <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            ⚠️ Running Low — Order This Week
          </h2>
          <div className="space-y-3">
            {LOW_STOCK_ITEMS.map((item) => (
              <Card key={item.id} className="border-amber-500/15 bg-amber-500/3">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/20 flex-shrink-0">
                    <Package className="h-5 w-5 text-amber-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.sku}</p>
                    <div className="flex gap-4 mt-1.5 text-xs">
                      <span className="text-amber-400 font-medium">{item.remaining} left</span>
                      <span className="text-muted-foreground">{item.dailySales}/day sales → {item.daysLeft} days left</span>
                      <span className="text-muted-foreground">Reorder {item.reorderQty} units (₹{(item.reorderQty * item.costPerUnit).toLocaleString("en-IN")})</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="h-8 text-xs flex-shrink-0">
                    Add to Order
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Section 3: Dead Stock */}
        <div>
          <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <TrendingDown className="h-4 w-4 text-red-400" />
            🔴 Dead Stock — Cash Locked Up
          </h2>
          <div className="space-y-3">
            {DEAD_STOCK.filter((d) => !cleared.includes(d.id)).map((item) => (
              <Card key={item.id} className="border-orange-500/15">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/20 flex-shrink-0">
                      <AlertTriangle className="h-5 w-5 text-orange-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <p className="text-sm font-semibold">{item.name}</p>
                        <Badge variant="outline" className="text-[10px] text-orange-400 border-orange-500/30">
                          {item.daysSinceLastSale} days no sale
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{item.sku} · {item.units} units · ₹{item.totalValue.toLocaleString("en-IN")} locked</p>

                      <div className="rounded-md bg-orange-500/5 border border-orange-500/20 p-3 mb-3">
                        <div className="flex items-start gap-2">
                          <Lightbulb className="h-3.5 w-3.5 text-orange-400 flex-shrink-0 mt-0.5" />
                          <p className="text-xs text-zinc-300 leading-relaxed">{item.suggestion}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-xs">
                        <div>
                          <span className="text-muted-foreground">Current price: </span>
                          <span className="line-through text-muted-foreground">₹{item.sellingPrice}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Suggested discount: </span>
                          <span className="font-semibold text-orange-400">₹{item.discountPrice}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Free up: </span>
                          <span className="font-semibold text-emerald-400">₹{item.totalValue.toLocaleString("en-IN")}</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 text-xs flex-shrink-0"
                      onClick={() => setCleared((c) => [...c, item.id])}
                    >
                      Mark as Cleared
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            {DEAD_STOCK.every((d) => cleared.includes(d.id)) && (
              <Card className="border-border/60">
                <CardContent className="p-6 text-center text-sm text-muted-foreground">
                  <CheckCircle2 className="h-8 w-8 text-emerald-400 mx-auto mb-2" />
                  All dead stock cleared! Good job freeing up cash.
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Healthy stock */}
        <div>
          <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            ✅ Healthy Stock — No Action Needed
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {HEALTHY_ITEMS.map((item) => (
              <Card key={item.sku} className="border-emerald-500/10">
                <CardContent className="p-3 flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium">{item.name}</p>
                    <p className="text-[10px] text-muted-foreground">{item.remaining} units · ~{item.daysLeft} days</p>
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
