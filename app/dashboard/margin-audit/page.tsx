"use client"

import { useState } from "react"
import { Header } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { generateDemoData, computeSummaryMetrics } from "@/lib/demo-data/generator"
import { formatCurrency } from "@/lib/utils"
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Zap,
  Package,
  ShoppingCart,
  ArrowRight,
  Loader2,
} from "lucide-react"

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  rto: AlertTriangle,
  discount: ShoppingCart,
  ad_spend: Zap,
  channel_mix: TrendingUp,
  sku_mix: Package,
  pricing: TrendingDown,
  freight: Package,
}

const CATEGORY_COLORS: Record<string, string> = {
  rto: "text-red-400 bg-red-400/10",
  discount: "text-amber-400 bg-amber-400/10",
  ad_spend: "text-blue-400 bg-blue-400/10",
  channel_mix: "text-purple-400 bg-purple-400/10",
  sku_mix: "text-cyan-400 bg-cyan-400/10",
  pricing: "text-orange-400 bg-orange-400/10",
  freight: "text-pink-400 bg-pink-400/10",
}

const AUDIT_FINDINGS = [
  {
    rank: 1,
    category: "ad_spend",
    title: "Pause 3 underperforming Meta campaigns destroying ₹1.2L/month in contribution margin",
    description:
      "Your Prospecting — Lookalike 1% Mumbai, Broad 25-35F, and Interest-Skincare campaigns have combined 7-day CMPR of -0.06. They're spending ₹4.1L/month collectively but generating negative CM after accounting for channel fees, shipping, COGS, and discounts. The audience overlap between these three is 41% — significant budget cannibalization.",
    impact: 120000,
    impactPct: 3.4,
    recommendation: "Pause all three campaigns immediately. Reallocate ₹2L to your retargeting campaigns (CMPR 3.8x) and ₹2.1L to Brand Search (CMPR 8.5x).",
    actions: [
      "Pause Prospecting Lookalike 1% Mumbai (CMPR -0.09, 9 days negative)",
      "Pause Broad 25-35F campaign (CMPR -0.04, 7 days negative)",
      "Pause Interest-Skincare (audience overlap 41% with above)",
      "Reallocate daily budget to Retargeting and Brand Search",
    ],
    priority: "high",
  },
  {
    rank: 2,
    category: "rto",
    title: "COD/RTO loss — 5 pincodes account for 28% of your total RTO cost",
    description:
      "Pincodes 482001 (Jabalpur), 831001 (Jamshedpur), 263001 (Haldwani), 226003 (Lucknow), and 400097 (Dharavi, Mumbai) collectively have a 38.4% RTO rate on COD orders — 3.2× your brand average. These 5 pincodes are costing ₹2.1L/month in net freight losses (forward + reverse) and inventory damage. The problem is concentrated, not spread.",
    impact: 84000,
    impactPct: 2.4,
    recommendation: "Enable mandatory WhatsApp pre-dispatch confirmation for COD orders from these 5 pincodes. Industry data: this reduces RTO by 40-55% in high-RTO zones.",
    actions: [
      "Configure WhatsApp OTP verification for these 5 pincodes via Shiprocket webhook",
      "Set up auto-retry message if no response within 4 hours (dispatch window)",
      "Track weekly — if RTO drops <20%, expand to Tier-2/3 COD broadly",
      "Consider prepaid nudge offer (₹50 cashback) for these pincodes only",
    ],
    priority: "high",
  },
  {
    rank: 3,
    category: "discount",
    title: "Amazon discounting strategy is destroying margin on 3 SKUs",
    description:
      "Niacinamide Toner, Hyaluronic Acid Moisturizer, and SPF Sunscreen are running at 20-24% discounts on Amazon driven by automated repricing (you're competing on price against Minimalist and Dot & Key). Combined, these 3 SKUs account for ₹8.7L in 30-day Amazon revenue but only 9.2% CM — vs 26% CM on the same SKUs on your Shopify store. The ₹4.2L revenue difference isn't worth the 16.8% margin compression.",
    impact: 62000,
    impactPct: 1.8,
    recommendation: "Cap maximum Amazon discount at 12% across these 3 SKUs. Raise MRP for Niacinamide Toner from ₹449 to ₹549 (in line with Minimalist and Dot & Key positioning).",
    actions: [
      "Update Amazon repricing rules: max discount 12% for SKUs GNB-NAT-100, GNB-HAM-50, GNB-SPF-100",
      "Raise MRP on Niacinamide Toner to ₹549 on Amazon (competitive with Minimalist 10% Niacinamide)",
      "Monitor BSR rank for 14 days to ensure no significant velocity loss",
      "If BSR drops >30%, revert Sunscreen only and keep Toner/Moisturizer at new pricing",
    ],
    priority: "high",
  },
  {
    rank: 4,
    category: "channel_mix",
    title: "Blinkit margin is 14.2% vs 26% on Shopify — shift Vitamin C Serum mix toward D2C",
    description:
      "Your Vitamin C Serum 30ml generates 26.1% CM on Shopify but only 14.2% on Blinkit (due to 18% platform commission + Q-commerce ad spend). You're currently splitting inventory roughly 60/40 between Blinkit/Zepto and Shopify. Given that Shopify has 40% more capacity through your existing audience, shifting 15% of Vitamin C Serum volume from Q-commerce to Shopify improves blended CM% by 1.8 percentage points.",
    impact: 54000,
    impactPct: 1.5,
    recommendation: "Shift 15% of Vitamin C Serum allocation from Blinkit/Zepto to Shopify D2C through increased investment in bottom-funnel retargeting (existing cart visitors showing high intent for this specific SKU).",
    actions: [
      "Increase Shopify-specific retargeting budget for Vitamin C Serum by ₹25,000/month",
      "Reduce Blinkit ad bids for Vitamin C Serum by 15% (reduce new customer acquisition there)",
      "Use WhatsApp broadcast to existing customers: 'Vitamin C Serum restock — free shipping on sarthi.store'",
      "Redirect Zepto Vitamin C Serum ad spend to Retinol Night Cream (higher margin on Q-commerce)",
    ],
    priority: "medium",
  },
  {
    rank: 5,
    category: "freight",
    title: "Unoptimized courier assignment is adding ₹12/order in avoidable freight cost",
    description:
      "Shiprocket audit: for 23% of your orders from metro pincodes, you're using Delhivery Express (avg ₹78/shipment) when the order weight qualifies for Delhivery Surface (avg ₹54/shipment). Surface delivery in metro areas takes only 1 day longer. 847 of your 3,680 orders in the last 30 days were miscategorized — costing ₹20,328 in excess freight.",
    impact: 28000,
    impactPct: 0.8,
    recommendation: "Update Shiprocket courier assignment rules: orders ≤500g to metro pincodes → default Delhivery Surface. Expected savings: ₹22-28K/month.",
    actions: [
      "Log into Shiprocket → Rules Engine → Add weight/pincode-based courier rule",
      "Rule: Weight ≤500g AND pincode ∈ metro_list → Delhivery Surface OR Ekart Surface",
      "Run 14-day A/B on 50% of orders to validate no customer experience degradation",
      "Monitor NPS and repeat purchase rate for metro cohort during test",
    ],
    priority: "medium",
  },
]

export default function MarginAuditPage() {
  const [generating, setGenerating] = useState(false)
  const [generated, setGenerated] = useState(false)

  const dataset = generateDemoData("skincare", 90)
  const metrics = computeSummaryMetrics(dataset)

  const totalOpportunity = AUDIT_FINDINGS.reduce((s, f) => s + f.impact, 0)

  function handleGenerate() {
    setGenerating(true)
    setTimeout(() => {
      setGenerating(false)
      setGenerated(true)
    }, 2500)
  }

  return (
    <div className="flex flex-col flex-1">
      <Header
        title="Margin Audit"
        subtitle="AI-generated contribution margin deep-dive — Glow & Beyond"
      />

      <main className="flex-1 p-6 space-y-5">
        {/* Hero section */}
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6">
          <div className="flex items-start justify-between">
            <div>
              <Badge variant="success" className="mb-3">Margin Audit — Glow & Beyond</Badge>
              <h2 className="text-xl font-bold mb-2">
                We found {AUDIT_FINDINGS.length} margin improvement opportunities
              </h2>
              <p className="text-sm text-zinc-400 max-w-xl">
                Based on 90 days of cross-channel data from Shopify, Amazon, Blinkit, Zepto, Meta Ads, Google Ads, Razorpay, and Shiprocket.
                Total identified opportunity: <span className="text-emerald-400 font-bold">{formatCurrency(totalOpportunity, true)}/month</span> in recoverable contribution margin.
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Current CM%</p>
              <p className="text-3xl font-bold text-amber-400">{metrics.summary.avgCMPct.toFixed(1)}%</p>
              <p className="text-xs text-muted-foreground mt-1">
                Target after actions: <span className="text-emerald-400">{(metrics.summary.avgCMPct + 4.2).toFixed(1)}%</span>
              </p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-4 gap-3">
            {[
              { label: "30-Day Revenue", value: formatCurrency(metrics.summary.totalRevenue30d, true) },
              { label: "Current CM", value: formatCurrency(metrics.summary.totalCM30d, true) },
              { label: "RTO Rate", value: `${(metrics.summary.rtoRate * 100).toFixed(1)}%` },
              { label: "Blended ROAS", value: `${metrics.summary.blendedRoas.toFixed(2)}x` },
            ].map((m) => (
              <div key={m.label} className="rounded-lg bg-white/4 border border-white/8 p-3 text-center">
                <p className="text-xs text-muted-foreground">{m.label}</p>
                <p className="text-lg font-bold mt-1">{m.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Findings */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            5 Findings — Ranked by Impact
          </h3>
          {AUDIT_FINDINGS.map((finding) => {
            const Icon = CATEGORY_ICONS[finding.category] ?? TrendingUp
            const colorClass = CATEGORY_COLORS[finding.category] ?? "text-blue-400 bg-blue-400/10"
            return (
              <Card key={finding.rank} className="border-border/60">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 h-10 w-10 rounded-lg flex items-center justify-center ${colorClass}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-muted-foreground font-medium">#{finding.rank}</span>
                        <Badge variant={finding.priority === "high" ? "destructive" : "warning"}>
                          {finding.priority.toUpperCase()}
                        </Badge>
                        <span className="ml-auto text-emerald-400 font-bold text-sm">
                          +{formatCurrency(finding.impact, true)}/mo
                        </span>
                        <span className="text-xs text-muted-foreground">({finding.impactPct}% of revenue)</span>
                      </div>
                      <h4 className="font-semibold text-sm mb-2">{finding.title}</h4>
                      <p className="text-xs text-zinc-400 leading-relaxed mb-3">{finding.description}</p>

                      <div className="rounded-md bg-muted/40 border border-border/40 p-3">
                        <p className="text-xs font-medium text-foreground mb-2">Recommended Actions:</p>
                        <ol className="space-y-1">
                          {finding.actions.map((action, i) => (
                            <li key={i} className="flex gap-2 text-xs text-zinc-400">
                              <span className="flex-shrink-0 text-emerald-400 font-medium">{i + 1}.</span>
                              {action}
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* CTA */}
        <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-6 text-center">
          <h3 className="font-semibold mb-2">Want Sarthi to execute these automatically?</h3>
          <p className="text-sm text-zinc-400 mb-4">
            Enable auto-execution for safe actions (campaign pauses under ₹2L, COD verification rules) and proposal-mode for everything else. Every action is reversible within 24 hours.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Button>
              <Zap className="h-4 w-4" />
              Enable Agent Execution
            </Button>
            <Button variant="outline">
              Schedule onboarding call
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
