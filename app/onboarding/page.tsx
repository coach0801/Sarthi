"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle2,
  ArrowRight,
  Layers,
  Loader2,
  ShoppingBag,
  BarChart2,
  Search,
  CreditCard,
  Truck,
  BookOpen,
  Zap,
} from "lucide-react"
import { cn } from "@/lib/utils"

const STEPS = ["Brand Profile", "Connect Sources", "First Audit"]

const CATEGORIES = [
  { id: "skincare", label: "Skincare & Beauty", emoji: "✨" },
  { id: "supplements", label: "Supplements & Nutrition", emoji: "💊" },
  { id: "fashion", label: "Fashion & Apparel", emoji: "👗" },
  { id: "food", label: "Food & Beverages", emoji: "🍵" },
  { id: "homecare", label: "Home & Personal Care", emoji: "🏠" },
  { id: "other", label: "Other D2C", emoji: "📦" },
]

const REVENUE_BANDS = [
  { id: "under1cr", label: "Under ₹1L/month" },
  { id: "1to5l", label: "₹1L – ₹5L/month" },
  { id: "5to15l", label: "₹5L – ₹15L/month" },
  { id: "15to50l", label: "₹15L – ₹50L/month" },
  { id: "above50l", label: "Above ₹50L/month" },
]

const CONNECTORS = [
  {
    id: "shopify",
    label: "Shopify",
    desc: "Orders, products, customers, inventory, abandoned carts",
    icon: ShoppingBag,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    priority: "P0",
    required: true,
  },
  {
    id: "meta",
    label: "Meta Ads",
    desc: "Campaigns, ad sets, creative performance, ROAS by campaign",
    icon: BarChart2,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    priority: "P0",
    required: true,
  },
  {
    id: "google",
    label: "Google Ads",
    desc: "Search, Performance Max, Shopping, Brand campaigns",
    icon: Search,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    priority: "P0",
    required: true,
  },
  {
    id: "razorpay",
    label: "Razorpay",
    desc: "Payments, refunds, settlements, PG fee calculation",
    icon: CreditCard,
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
    priority: "P1",
    required: false,
  },
  {
    id: "shiprocket",
    label: "Shiprocket",
    desc: "Shipments, courier data, RTO events, freight costs",
    icon: Truck,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    priority: "P1",
    required: false,
  },
  {
    id: "tally",
    label: "Tally Prime",
    desc: "COGS, chart of accounts, purchase ledger, inventory valuation",
    icon: BookOpen,
    color: "text-zinc-400",
    bg: "bg-zinc-500/10",
    border: "border-zinc-500/20",
    priority: "P2",
    required: false,
  },
]

const AUDIT_STAGES = [
  { msg: "Creating your brand profile...", target: 15 },
  { msg: "Connecting data sources...", target: 30 },
  { msg: "Pulling last 90 days of orders...", target: 50 },
  { msg: "Ingesting Meta + Google ad spend data...", target: 65 },
  { msg: "Computing per-SKU contribution margins...", target: 80 },
  { msg: "Running Margin Analyst agent...", target: 92 },
  { msg: "Audit complete — 5 findings ready!", target: 100 },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [brandName, setBrandName] = useState("")
  const [category, setCategory] = useState("")
  const [revenueBand, setRevenueBand] = useState("")
  const [connectedSources, setConnectedSources] = useState<string[]>([])
  const [connectingId, setConnectingId] = useState<string | null>(null)
  const [auditProgress, setAuditProgress] = useState(0)
  const [auditStageMsg, setAuditStageMsg] = useState("")

  function handleConnect(id: string) {
    setConnectingId(id)
    setTimeout(() => {
      setConnectedSources((prev) => [...prev, id])
      setConnectingId(null)
    }, 1200)
  }

  function handleStartAudit() {
    setStep(2)
    let i = 0
    const interval = setInterval(() => {
      if (i < AUDIT_STAGES.length) {
        setAuditProgress(AUDIT_STAGES[i].target)
        setAuditStageMsg(AUDIT_STAGES[i].msg)
        i++
      } else {
        clearInterval(interval)
        setTimeout(() => router.push("/dashboard/margin-audit"), 1200)
      }
    }, 700)
  }

  const requiredConnected = ["shopify", "meta", "google"].every((id) =>
    connectedSources.includes(id)
  )

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex flex-col">
      {/* Top bar */}
      <div className="flex h-14 items-center justify-between px-4 sm:px-6 border-b border-white/8">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
            <Layers className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold">Sarthi</span>
          <span className="text-[10px] text-zinc-500 hidden sm:inline">🇮🇳 D2C Growth Operator</span>
        </div>

        {/* Step progress */}
        <div className="flex items-center gap-2">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={cn(
                  "flex items-center gap-1.5 text-xs",
                  i === step ? "text-white" : i < step ? "text-emerald-400" : "text-zinc-600"
                )}
              >
                {i < step ? (
                  <CheckCircle2 className="h-3.5 w-3.5" />
                ) : (
                  <span className="h-5 w-5 rounded-full border border-current flex items-center justify-center text-[10px] font-bold">
                    {i + 1}
                  </span>
                )}
                <span className="hidden sm:block font-medium">{s}</span>
              </div>
              {i < STEPS.length - 1 && <span className="text-zinc-700 text-xs">›</span>}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex items-start sm:items-center justify-center p-4 sm:p-6 pt-6">
        {/* Step 0: Brand Profile */}
        {step === 0 && (
          <div className="w-full max-w-md space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Tell us about your brand</h2>
              <p className="text-sm text-zinc-400 mt-1">
                Sarthi will configure your agents and benchmarks for your exact category.
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="text-xs text-zinc-400 mb-1.5 block">Brand Name</label>
                <Input
                  placeholder="e.g. Glow & Beyond"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className="bg-white/5 border-white/10"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-400 mb-2 block">Product Category</label>
                <div className="grid grid-cols-2 gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setCategory(cat.id)}
                      className={cn(
                        "flex items-start gap-2 text-left px-3 py-3 rounded-lg border text-xs transition-colors",
                        category === cat.id
                          ? "border-blue-500 bg-blue-500/10 text-blue-200"
                          : "border-white/10 bg-white/3 text-zinc-400 hover:border-white/20"
                      )}
                    >
                      <span className="text-base leading-none flex-shrink-0">{cat.emoji}</span>
                      <span className="leading-tight">{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-zinc-400 mb-2 block">Monthly GMV (approximate)</label>
                <div className="space-y-1.5">
                  {REVENUE_BANDS.map((band) => (
                    <button
                      key={band.id}
                      onClick={() => setRevenueBand(band.id)}
                      className={cn(
                        "w-full text-left px-4 py-2.5 rounded-lg border text-sm transition-colors",
                        revenueBand === band.id
                          ? "border-blue-500 bg-blue-500/10 text-blue-200"
                          : "border-white/10 bg-white/3 text-zinc-400 hover:border-white/20"
                      )}
                    >
                      {band.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <Button
              className="w-full bg-primary hover:bg-primary/90"
              disabled={!brandName.trim() || !category || !revenueBand}
              onClick={() => setStep(1)}
            >
              Continue करें
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}

        {/* Step 1: Connect Data Sources */}
        {step === 1 && (
          <div className="w-full max-w-lg space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Connect your data sources</h2>
              <p className="text-sm text-zinc-400 mt-1">
                Sarthi needs these to compute your real contribution margin. Shopify + Meta + Google are required for the first audit.
              </p>
            </div>

            <div className="space-y-2.5">
              {CONNECTORS.map((connector) => {
                const isConnected = connectedSources.includes(connector.id)
                const isConnecting = connectingId === connector.id
                const Icon = connector.icon
                return (
                  <div
                    key={connector.id}
                    className={cn(
                      "flex items-center gap-3 p-4 rounded-xl border transition-colors",
                      isConnected
                        ? "border-emerald-500/30 bg-emerald-500/5"
                        : "border-white/10 bg-white/3"
                    )}
                  >
                    <div className={`h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0 ${connector.bg}`}>
                      <Icon className={`h-5 w-5 ${connector.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">{connector.label}</p>
                        <Badge
                          variant={connector.priority === "P0" ? "destructive" : connector.priority === "P1" ? "warning" : "secondary"}
                          className="text-[10px] h-4"
                        >
                          {connector.priority}
                        </Badge>
                        {connector.required && (
                          <span className="text-[10px] text-zinc-500">Required</span>
                        )}
                      </div>
                      <p className="text-xs text-zinc-500 mt-0.5 truncate">{connector.desc}</p>
                    </div>
                    <div className="flex-shrink-0">
                      {isConnected ? (
                        <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                          <CheckCircle2 className="h-4 w-4" />
                          Connected
                        </div>
                      ) : isConnecting ? (
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          Connecting...
                        </div>
                      ) : (
                        <button
                          onClick={() => handleConnect(connector.id)}
                          className="text-xs text-blue-400 hover:text-blue-300 font-medium border border-blue-500/30 rounded px-3 py-1 transition-colors hover:bg-blue-500/10"
                        >
                          Connect
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {!requiredConnected && (
              <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3 text-xs text-amber-300">
                Connect Shopify, Meta Ads, and Google Ads to start your first Margin Audit.
              </div>
            )}

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep(0)} className="flex-1">
                Back
              </Button>
              <Button
                className="flex-1 bg-primary hover:bg-primary/90"
                disabled={!requiredConnected}
                onClick={handleStartAudit}
              >
                <Zap className="h-4 w-4 mr-2" />
                Run First Margin Audit
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Running Audit */}
        {step === 2 && (
          <div className="w-full max-w-md space-y-8 text-center">
            <div>
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/10 border border-blue-500/20 mx-auto mb-5">
                {auditProgress < 100 ? (
                  <Loader2 className="h-8 w-8 text-blue-400 animate-spin" />
                ) : (
                  <CheckCircle2 className="h-8 w-8 text-emerald-400" />
                )}
              </div>
              <h2 className="text-2xl font-bold">
                {auditProgress < 100 ? "Running your first Margin Audit..." : "Audit complete!"}
              </h2>
              <p className="text-sm text-zinc-400 mt-2">
                {auditProgress < 100 ? auditStageMsg : "Redirecting to your 5 findings..."}
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-xs text-zinc-400">
                <span>Processing</span>
                <span>{auditProgress}%</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-2.5">
                <div
                  className="h-2.5 rounded-full bg-blue-500 transition-all duration-700"
                  style={{ width: `${auditProgress}%` }}
                />
              </div>
            </div>

            <div className="space-y-2 text-left">
              {AUDIT_STAGES.map((stage) => (
                <div key={stage.msg} className="flex items-center gap-2 text-xs">
                  {auditProgress >= stage.target ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
                  ) : (
                    <div className="h-3.5 w-3.5 rounded-full border border-zinc-700 flex-shrink-0" />
                  )}
                  <span className={auditProgress >= stage.target ? "text-zinc-300" : "text-zinc-600"}>
                    {stage.msg}
                  </span>
                </div>
              ))}
            </div>

            {auditProgress >= 100 && (
              <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4 text-center">
                <p className="text-sm text-emerald-300 font-medium">
                  ✅ Margin Analyst found <strong>5 findings</strong> worth{" "}
                  <strong>₹2.93L/month</strong> in combined opportunity
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
