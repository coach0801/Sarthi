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
  Link as LinkIcon,
  Loader2,
  Package,
  BarChart3,
  ShoppingCart,
  Truck,
} from "lucide-react"
import { cn } from "@/lib/utils"

const STEPS = ["Brand Profile", "Connect Channels", "Operations", "Running Audit"]

const CHANNELS = [
  { id: "shopify", label: "Shopify", icon: ShoppingCart, desc: "Your D2C store", required: true, color: "#96BF48" },
  { id: "meta_ads", label: "Meta Ads", icon: BarChart3, desc: "Facebook & Instagram Ads", required: false, color: "#1877F2" },
  { id: "google_ads", label: "Google Ads", icon: BarChart3, desc: "Search & Performance Max", required: false, color: "#4285F4" },
  { id: "amazon", label: "Amazon India", icon: ShoppingCart, desc: "Seller Central via SP-API", required: false, color: "#FF9900" },
  { id: "blinkit", label: "Blinkit", icon: Package, desc: "Brand Portal", required: false, color: "#F8C200" },
  { id: "zepto", label: "Zepto Atom", icon: Package, desc: "Atom Seller Portal", required: false, color: "#8A2BE2" },
]

const OPERATIONS = [
  { id: "razorpay", label: "Razorpay", desc: "Payment data & settlement", color: "#02BBD6" },
  { id: "shiprocket", label: "Shiprocket", desc: "Logistics, RTO, freight cost", color: "#E84D1C" },
  { id: "tally", label: "Tally Prime", desc: "COGS & chart of accounts", color: "#2196F3" },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [brandName, setBrandName] = useState("")
  const [category, setCategory] = useState("")
  const [revBand, setRevBand] = useState("")
  const [connectedChannels, setConnectedChannels] = useState<string[]>([])
  const [connectedOps, setConnectedOps] = useState<string[]>([])
  const [connecting, setConnecting] = useState<string | null>(null)
  const [running, setRunning] = useState(false)
  const [auditProgress, setAuditProgress] = useState(0)

  function toggleChannel(id: string) {
    setConnectedChannels((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    )
  }

  function toggleOp(id: string) {
    setConnectedOps((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    )
  }

  function simulateConnect(id: string) {
    setConnecting(id)
    setTimeout(() => {
      setConnecting(null)
      if (CHANNELS.find((c) => c.id === id)) toggleChannel(id)
      else toggleOp(id)
    }, 1500)
  }

  function handleLaunchAudit() {
    setStep(3)
    setRunning(true)
    const stages = [
      { msg: "Ingesting Shopify orders (last 12 months)...", target: 15 },
      { msg: "Pulling Meta Ads campaign performance...", target: 30 },
      { msg: "Fetching Google Ads data...", target: 42 },
      { msg: "Syncing Razorpay payment methods...", target: 55 },
      { msg: "Computing contribution margin per order...", target: 68 },
      { msg: "Running Margin Analyst Agent...", target: 80 },
      { msg: "Generating audit findings (Gemini Pro)...", target: 92 },
      { msg: "Audit complete. Preparing report...", target: 100 },
    ]
    let i = 0
    const interval = setInterval(() => {
      if (i < stages.length) {
        setAuditProgress(stages[i].target)
        i++
      } else {
        clearInterval(interval)
        setTimeout(() => router.push("/dashboard/margin-audit"), 1000)
      }
    }, 900)
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-[#fafafa] flex flex-col">
      {/* Top bar */}
      <div className="flex h-14 items-center justify-between px-6 border-b border-white/8">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-500">
            <Layers className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold">Sarthi</span>
        </div>
        <div className="flex items-center gap-2">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={cn(
                "flex items-center gap-1.5 text-xs",
                i === step ? "text-white" : i < step ? "text-emerald-400" : "text-zinc-600"
              )}>
                {i < step ? <CheckCircle2 className="h-3.5 w-3.5" /> : <span className="h-3.5 w-3.5 rounded-full border flex items-center justify-center text-[9px]">{i + 1}</span>}
                <span className="hidden sm:block">{s}</span>
              </div>
              {i < STEPS.length - 1 && <span className="text-zinc-700 text-xs">›</span>}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        {/* Step 0: Brand Profile */}
        {step === 0 && (
          <div className="w-full max-w-md space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Tell us about your brand</h2>
              <p className="text-sm text-zinc-400 mt-1">We'll personalize your Margin Audit around your category and scale.</p>
            </div>
            <div className="space-y-4">
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
                <label className="text-xs text-zinc-400 mb-1.5 block">Category</label>
                <div className="grid grid-cols-2 gap-2">
                  {["Skincare & Beauty", "Fashion & Apparel", "Food & Beverages", "Health & Wellness", "Home & Living", "Electronics & Accessories"].map((c) => (
                    <button
                      key={c}
                      onClick={() => setCategory(c)}
                      className={cn(
                        "text-left px-3 py-2 rounded-md border text-xs transition-colors",
                        category === c
                          ? "border-blue-500 bg-blue-500/10 text-blue-300"
                          : "border-white/10 bg-white/3 text-zinc-400 hover:border-white/20"
                      )}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs text-zinc-400 mb-1.5 block">Monthly Revenue Band</label>
                <div className="grid grid-cols-2 gap-2">
                  {["₹1-5 Cr", "₹5-10 Cr", "₹10-25 Cr", "₹25-50 Cr", "₹50+ Cr"].map((r) => (
                    <button
                      key={r}
                      onClick={() => setRevBand(r)}
                      className={cn(
                        "text-left px-3 py-2 rounded-md border text-xs transition-colors",
                        revBand === r
                          ? "border-blue-500 bg-blue-500/10 text-blue-300"
                          : "border-white/10 bg-white/3 text-zinc-400 hover:border-white/20"
                      )}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <Button
              className="w-full"
              disabled={!brandName || !category || !revBand}
              onClick={() => setStep(1)}
            >
              Continue <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Step 1: Connect Channels */}
        {step === 1 && (
          <div className="w-full max-w-md space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Connect your sales channels</h2>
              <p className="text-sm text-zinc-400 mt-1">Connect at least Shopify + 2 more for a complete Margin Audit. All connections are read-only by default.</p>
            </div>
            <div className="space-y-2">
              {CHANNELS.map((ch) => (
                <div
                  key={ch.id}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg border transition-colors",
                    connectedChannels.includes(ch.id)
                      ? "border-emerald-500/30 bg-emerald-500/5"
                      : "border-white/10 bg-white/3"
                  )}
                >
                  <div className="h-8 w-8 rounded-md flex items-center justify-center" style={{ backgroundColor: ch.color + "20" }}>
                    <ch.icon className="h-4 w-4" style={{ color: ch.color }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{ch.label}</p>
                    <p className="text-xs text-zinc-500">{ch.desc}</p>
                  </div>
                  {connectedChannels.includes(ch.id) ? (
                    <Badge variant="success">Connected</Badge>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 text-xs"
                      onClick={() => simulateConnect(ch.id)}
                      disabled={connecting === ch.id}
                    >
                      {connecting === ch.id ? (
                        <><Loader2 className="h-3 w-3 animate-spin" /> Connecting...</>
                      ) : (
                        <><LinkIcon className="h-3 w-3" /> Connect</>
                      )}
                    </Button>
                  )}
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep(0)} className="flex-1">Back</Button>
              <Button
                className="flex-2"
                disabled={connectedChannels.length < 3 || !connectedChannels.includes("shopify")}
                onClick={() => setStep(2)}
              >
                {connectedChannels.length < 3
                  ? `Connect ${3 - connectedChannels.length} more`
                  : `Continue (${connectedChannels.length} connected)`}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Operations */}
        {step === 2 && (
          <div className="w-full max-w-md space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Connect operations data</h2>
              <p className="text-sm text-zinc-400 mt-1">Razorpay + Shiprocket unlock payment-method and RTO analysis. Tally unlocks true COGS. The audit is significantly more accurate with all three.</p>
            </div>
            <div className="space-y-2">
              {OPERATIONS.map((op) => (
                <div
                  key={op.id}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg border transition-colors",
                    connectedOps.includes(op.id)
                      ? "border-emerald-500/30 bg-emerald-500/5"
                      : "border-white/10 bg-white/3"
                  )}
                >
                  <div
                    className="h-8 w-8 rounded-md flex items-center justify-center"
                    style={{ backgroundColor: op.color + "20" }}
                  >
                    <Truck className="h-4 w-4" style={{ color: op.color }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{op.label}</p>
                    <p className="text-xs text-zinc-500">{op.desc}</p>
                  </div>
                  {connectedOps.includes(op.id) ? (
                    <Badge variant="success">Connected</Badge>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 text-xs"
                      onClick={() => simulateConnect(op.id)}
                      disabled={connecting === op.id}
                    >
                      {connecting === op.id ? (
                        <><Loader2 className="h-3 w-3 animate-spin" /> Connecting...</>
                      ) : (
                        <><LinkIcon className="h-3 w-3" /> Connect</>
                      )}
                    </Button>
                  )}
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">Back</Button>
              <Button className="flex-2" onClick={handleLaunchAudit}>
                Launch Margin Audit
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Running Audit */}
        {step === 3 && (
          <div className="w-full max-w-md space-y-8 text-center">
            <div>
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/10 border border-blue-500/20 mx-auto mb-4">
                {auditProgress < 100 ? (
                  <Loader2 className="h-8 w-8 text-blue-400 animate-spin" />
                ) : (
                  <CheckCircle2 className="h-8 w-8 text-emerald-400" />
                )}
              </div>
              <h2 className="text-2xl font-bold">
                {auditProgress < 100 ? "Running your Margin Audit..." : "Audit Complete!"}
              </h2>
              <p className="text-sm text-zinc-400 mt-2">
                {auditProgress < 100
                  ? "Our Margin Analyst Agent is processing 12 months of data across all your channels."
                  : "Redirecting to your Margin Audit report..."}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs text-zinc-400">
                <span>Progress</span>
                <span>{auditProgress}%</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-blue-500 transition-all duration-700"
                  style={{ width: `${auditProgress}%` }}
                />
              </div>
            </div>

            <div className="space-y-2 text-left">
              {[
                { label: "Shopify orders ingested", done: auditProgress >= 15 },
                { label: "Meta Ads data pulled", done: auditProgress >= 30 },
                { label: "Google Ads fetched", done: auditProgress >= 42 },
                { label: "Razorpay synced", done: auditProgress >= 55 },
                { label: "Contribution margin computed", done: auditProgress >= 68 },
                { label: "Margin Analyst running", done: auditProgress >= 80 },
                { label: "AI audit generated", done: auditProgress >= 92 },
                { label: "Report ready", done: auditProgress >= 100 },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-xs">
                  {item.done ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
                  ) : (
                    <div className="h-3.5 w-3.5 rounded-full border border-zinc-700 flex-shrink-0" />
                  )}
                  <span className={item.done ? "text-zinc-300" : "text-zinc-600"}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
