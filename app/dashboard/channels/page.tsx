import { Header } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { generateDemoData, computeSummaryMetrics } from "@/lib/demo-data/generator"
import { formatCurrency, channelLabel, channelColor } from "@/lib/utils"
import { CheckCircle2, AlertTriangle, XCircle, RefreshCw } from "lucide-react"

export const dynamic = "force-dynamic"

const CONNECTORS = [
  { channel: "shopify", label: "Shopify", status: "connected", lastSync: "2 min ago", dataPoints: "Orders, Products, Customers, Inventory" },
  { channel: "amazon", label: "Amazon India", status: "connected", lastSync: "45 min ago", dataPoints: "Orders, SP-API, FBA Inventory" },
  { channel: "blinkit", label: "Blinkit", status: "connected", lastSync: "1h ago", dataPoints: "Orders, Dark Store Inventory, Ad Performance" },
  { channel: "zepto", label: "Zepto Atom", status: "connected", lastSync: "58 min ago", dataPoints: "Orders, Atom Ads, Inventory" },
  { channel: "meta_ads", label: "Meta Ads", status: "connected", lastSync: "12 min ago", dataPoints: "Campaigns, Ad Sets, Creative Performance" },
  { channel: "google_ads", label: "Google Ads", status: "connected", lastSync: "18 min ago", dataPoints: "Campaigns, P-Max, Search Terms" },
  { channel: "razorpay", label: "Razorpay", status: "connected", lastSync: "Real-time", dataPoints: "Payments, Refunds, Settlement" },
  { channel: "shiprocket", label: "Shiprocket", status: "syncing", lastSync: "In progress", dataPoints: "Shipments, RTO Events, Courier Data" },
  { channel: "tally", label: "Tally Prime", status: "connected", lastSync: "4h ago", dataPoints: "COGS, Chart of Accounts, Purchase Ledger" },
  { channel: "flipkart", label: "Flipkart", status: "disconnected", lastSync: "Never", dataPoints: "Orders, Seller Performance" },
  { channel: "instamart", label: "Swiggy Instamart", status: "disconnected", lastSync: "Never", dataPoints: "Orders, Dark Store Inventory" },
]

export default function ChannelsPage() {
  const dataset = generateDemoData("skincare", 90)
  const metrics = computeSummaryMetrics(dataset)

  return (
    <div className="flex flex-col flex-1">
      <Header title="Channels" subtitle="Data connectors and per-channel performance" />

      <main className="flex-1 p-4 lg:p-6 space-y-4 lg:space-y-5">
        {/* Connector grid */}
        <Card className="border-border/60">
          <CardHeader className="pb-3">
            <CardTitle>Connected Data Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-2">
              {CONNECTORS.map((conn) => (
                <div key={conn.channel} className="flex items-center gap-3 py-2.5 border-b border-border/40 last:border-0">
                  <div
                    className="h-2 w-2 rounded-full flex-shrink-0"
                    style={{
                      backgroundColor:
                        conn.status === "connected"
                          ? "#10b981"
                          : conn.status === "syncing"
                          ? "#f59e0b"
                          : "#6b7280",
                    }}
                  />
                  <div className="w-24 sm:w-32 font-medium text-xs sm:text-sm flex-shrink-0">{conn.label}</div>
                  <div className="flex-1 text-xs text-muted-foreground hidden md:block truncate">{conn.dataPoints}</div>
                  <div className="text-xs text-muted-foreground flex-shrink-0 sm:w-28 text-right ml-auto">
                    {conn.status === "syncing" ? (
                      <span className="flex items-center gap-1 text-amber-400 justify-end">
                        <RefreshCw className="h-3 w-3 animate-spin" />
                        <span className="hidden sm:inline">Syncing...</span>
                      </span>
                    ) : conn.status === "connected" ? (
                      <span className="text-emerald-400 text-[10px] sm:text-xs">↻ {conn.lastSync}</span>
                    ) : (
                      <button className="text-blue-400 hover:text-blue-300 text-[10px] sm:text-xs">Connect →</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Per-channel performance */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {metrics.channelBreakdown.map((ch) => (
            <Card key={ch.channel} className="border-border/60">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: channelColor(ch.channel) }}
                    />
                    {channelLabel(ch.channel)}
                  </CardTitle>
                  <Badge
                    variant={ch.contributionMarginPct >= 20 ? "success" : ch.contributionMarginPct >= 12 ? "warning" : "destructive"}
                  >
                    {ch.contributionMarginPct.toFixed(1)}% CM
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Revenue (30d)</span>
                    <span className="font-medium">{formatCurrency(ch.revenue, true)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Orders</span>
                    <span className="font-medium">{ch.orders.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Avg Order</span>
                    <span className="font-medium">{formatCurrency(ch.revenue / ch.orders, false)}</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-1.5 mt-2">
                    <div
                      className={`h-1.5 rounded-full ${ch.contributionMarginPct >= 20 ? "bg-emerald-500" : ch.contributionMarginPct >= 12 ? "bg-amber-500" : "bg-red-500"}`}
                      style={{ width: `${Math.min(ch.contributionMarginPct * 2, 100)}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
