"use client"

import { Header } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Bot,
  TrendingUp,
  Zap,
  ShoppingCart,
  Activity,
  CheckCircle2,
  Clock,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"

const AGENTS = [
  {
    id: "orchestrator",
    name: "Orchestrator",
    icon: Bot,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    dot: "bg-purple-400",
    role: "Master coordinator — routes signals, eliminates conflicts, delivers daily brief",
    status: "active",
    actionsThisWeek: 12,
    lastAction: {
      time: "2 min ago",
      text: "Resolved conflicting signals between Meta attribution and Shopify revenue. Meta over-counted ₹22,400 in revenue due to view-through attribution overlap. Corrected in Margin Truth Ledger.",
    },
    capabilities: [
      "Coordinates all other agents in real time",
      "Resolves conflicting signals across platforms",
      "Delivers daily brief every morning at 8 AM",
      "Routes high-confidence findings to Action Center",
      "Prevents double-counting across channels",
    ],
    recentActivity: [
      { icon: CheckCircle2, text: "Daily brief delivered — 5 actions for review", time: "8:02 AM" },
      { icon: Activity, text: "Attribution conflict resolved between Meta and Shopify", time: "2 min ago" },
      { icon: Clock, text: "Weekly P&L summary scheduled for Monday 8 AM", time: "Pending" },
    ],
  },
  {
    id: "margin_analyst",
    name: "Margin Analyst",
    icon: TrendingUp,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    dot: "bg-blue-400",
    role: "Monitors CM per SKU, per channel, per day — flags leaks before they become losses",
    status: "active",
    actionsThisWeek: 8,
    lastAction: {
      time: "14 min ago",
      text: "Niacinamide Toner Amazon discount cost ₹80,850 this month with no measurable repeat purchase benefit. Filed pricing review recommendation (Confidence: 79%).",
    },
    capabilities: [
      "Computes real CM using 11-factor formula every 5 minutes",
      "Flags SKUs below 20% CM threshold",
      "Pincode-level RTO risk scoring and segmentation",
      "COD rate analysis vs category benchmarks",
      "Monthly pricing review automation",
    ],
    recentActivity: [
      { icon: CheckCircle2, text: "Niacinamide Toner pricing review filed", time: "14 min ago" },
      { icon: Activity, text: "RTO Shield: 5 pincodes identified (23% of all RTOs)", time: "1h ago" },
      { icon: Activity, text: "SPF 50 Sunscreen CM dropped to 18.4% — monitoring", time: "3h ago" },
    ],
  },
  {
    id: "acquisition",
    name: "Acquisition Agent",
    icon: Zap,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    dot: "bg-emerald-400",
    role: "Watches every Meta and Google campaign — optimizes by CMPR, not ROAS",
    status: "active",
    actionsThisWeek: 15,
    lastAction: {
      time: "22 min ago",
      text: "Meta Prospecting Lookalike 1% Mumbai: CMPR dropped to −0.04 (9-day average). CTR declined 38%. Audience saturation confirmed. Pause recommendation filed to Action Center (Confidence: 91%).",
    },
    capabilities: [
      "Campaign-level CMPR computation (CM per ₹1 of ad spend)",
      "Creative fatigue detection via CTR trend analysis",
      "Impression share monitoring for brand keywords",
      "Audience overlap detection across campaigns",
      "Automated budget reallocation proposals",
    ],
    recentActivity: [
      { icon: CheckCircle2, text: "Meta Prospecting pause recommendation filed", time: "22 min ago" },
      { icon: Activity, text: "Google Brand Search IS at 73.2% — budget constraint detected", time: "1h ago" },
      { icon: CheckCircle2, text: "PMAX campaign CMPR: 0.48 — below threshold, flagged", time: "2h ago" },
    ],
  },
  {
    id: "quick_commerce",
    name: "Quick Commerce Agent",
    icon: ShoppingCart,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    dot: "bg-amber-400",
    role: "Tracks every dark store — prevents stockouts, triggers replenishment, monitors DRR",
    status: "active",
    actionsThisWeek: 6,
    lastAction: {
      time: "8 min ago",
      text: "Blinkit Koramangala-07: Vitamin C Serum 30ml has 2.1 days of stock remaining at current DRR of 10.8 units/day. Emergency replenishment of 200 units recommended. Mother warehouse: 847 units confirmed available.",
    },
    capabilities: [
      "Real-time dark store inventory tracking (Blinkit, Zepto, Instamart)",
      "Daily run rate (DRR) calculation per SKU per location",
      "Automated replenishment proposals with cost-benefit analysis",
      "In-app advertising spend optimization on Q-commerce platforms",
      "Perishable and near-expiry inventory alerts",
    ],
    recentActivity: [
      { icon: CheckCircle2, text: "Blinkit Koramangala-07 replenishment alert filed", time: "8 min ago" },
      { icon: Activity, text: "Zepto Atom ads: Vitamin C ROAS 4.8x — performing well", time: "45 min ago" },
      { icon: Clock, text: "Blinkit Indiranagar: 8.3 days remaining — order this week", time: "Scheduled" },
    ],
  },
]

const AGENT_SYSTEM = {
  description:
    "Sarthi uses a 6-layer multi-agent architecture. The Orchestrator coordinates all agents, resolves conflicts, and delivers briefs. Specialist agents (Margin Analyst, Acquisition, Quick Commerce) run domain-specific analysis continuously. Every recommendation goes through a human-in-the-loop approval step before execution.",
  layers: [
    { name: "Data Ingestion", desc: "Shopify, Meta, Google, Razorpay, Shiprocket, Tally — 5-min refresh" },
    { name: "Margin Computation", desc: "11-factor CM formula per order, SKU, channel, and day" },
    { name: "Agent Analysis", desc: "Specialist agents run domain-specific logic on normalized data" },
    { name: "Orchestration", desc: "Orchestrator aggregates signals, resolves conflicts, prioritizes" },
    { name: "Action Proposal", desc: "Human-readable recommendations with confidence scores + reasoning" },
    { name: "Execution Gateway", desc: "User approves → Sarthi executes via API. Full audit trail." },
  ],
}

export default function AgentsPage() {
  return (
    <div className="flex flex-col flex-1">
      <Header
        title="AI Agents"
        subtitle="4 agents active — monitoring 9 data sources in real time"
      />

      <main className="flex-1 p-4 lg:p-6 space-y-4 lg:space-y-6">
        {/* Status bar */}
        <div className="flex flex-wrap items-center gap-3 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3 lg:p-4">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm font-medium text-emerald-400">All 4 agents operational</span>
          </div>
          <span className="text-xs text-muted-foreground hidden sm:block">· Last refresh: 2 min ago</span>
          <span className="text-xs text-muted-foreground hidden sm:block">· 5 actions pending</span>
          <Link href="/dashboard/actions" className="ml-auto text-xs text-blue-400 hover:underline flex items-center gap-1">
            Review actions <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {/* Agent cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {AGENTS.map((agent) => {
            const Icon = agent.icon
            return (
              <Card key={agent.id} className={`border-border/60 ${agent.border}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${agent.bg}`}>
                      <Icon className={`h-5 w-5 ${agent.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <CardTitle className={`text-sm ${agent.color}`}>{agent.name}</CardTitle>
                        <span className={`h-1.5 w-1.5 rounded-full ${agent.dot} animate-pulse`} />
                        <Badge variant="success" className="text-[10px] h-4">ACTIVE</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-tight">{agent.role}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Last action */}
                  <div className="rounded-md bg-white/3 border border-border/40 p-3">
                    <p className="text-[10px] text-muted-foreground mb-1">Latest action · {agent.lastAction.time}</p>
                    <p className="text-xs text-zinc-300 leading-relaxed">{agent.lastAction.text}</p>
                  </div>

                  {/* Recent activity */}
                  <div className="space-y-1.5">
                    {agent.recentActivity.map((item, i) => {
                      const ItemIcon = item.icon
                      return (
                        <div key={i} className="flex items-start gap-2 text-xs text-zinc-500">
                          <ItemIcon className="h-3 w-3 mt-0.5 flex-shrink-0" />
                          <span className="flex-1 leading-tight">{item.text}</span>
                          <span className="flex-shrink-0 text-[10px]">{item.time}</span>
                        </div>
                      )
                    })}
                  </div>

                  {/* Capabilities */}
                  <div>
                    <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider mb-1.5">
                      What this agent does
                    </p>
                    <ul className="space-y-1">
                      {agent.capabilities.map((cap, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-xs text-zinc-400">
                          <CheckCircle2 className="h-3 w-3 mt-0.5 flex-shrink-0 text-emerald-500" />
                          {cap}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex justify-between text-xs text-muted-foreground border-t border-border/40 pt-3">
                    <span>{agent.actionsThisWeek} actions this week</span>
                    <span className="text-emerald-400">Human approval required ✓</span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Architecture explanation */}
        <Card className="border-border/60">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">6-Layer Agent Architecture</CardTitle>
            <p className="text-xs text-muted-foreground">{AGENT_SYSTEM.description}</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {AGENT_SYSTEM.layers.map((layer, i) => (
                <div key={layer.name} className="rounded-md border border-border/40 bg-white/2 p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-muted-foreground">{i + 1}</span>
                    <p className="text-xs font-semibold">{layer.name}</p>
                  </div>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">{layer.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-lg border border-blue-500/20 bg-blue-500/5 p-3">
              <p className="text-xs text-zinc-300">
                <span className="font-semibold text-blue-400">Human-in-the-loop guarantee:</span>{" "}
                Sarthi agents never execute autonomously. Every action proposed by an agent goes to the Action Center. You see the reasoning, the confidence score, and the expected impact. You approve or decline. Only then does Sarthi execute via API.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
