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
  IndianRupee,
  Smartphone,
  Users,
  TrendingUp,
  Package,
  Banknote,
} from "lucide-react"
import { cn } from "@/lib/utils"

const STEPS = ["Your Business", "Payments", "Biggest Challenge", "Setting Up"]

const BUSINESS_TYPES = [
  { id: "general_store", label: "Kirana / General Store", emoji: "🏪" },
  { id: "auto_parts", label: "Auto Parts & Workshop", emoji: "🔧" },
  { id: "clothing", label: "Clothing & Tailoring", emoji: "👗" },
  { id: "food", label: "Food & Restaurant", emoji: "🍽️" },
  { id: "service", label: "Service Business (Electrician, Plumber, etc.)", emoji: "⚡" },
  { id: "other", label: "Other", emoji: "📦" },
]

const REVENUE_BANDS = [
  { id: "under1l", label: "Under ₹1 Lakh/month" },
  { id: "1to5l", label: "₹1 – ₹5 Lakh/month" },
  { id: "5to15l", label: "₹5 – ₹15 Lakh/month" },
  { id: "15to50l", label: "₹15 – ₹50 Lakh/month" },
  { id: "above50l", label: "Above ₹50 Lakh/month" },
]

const PAYMENT_METHODS = [
  {
    id: "cash",
    label: "Cash payments",
    desc: "Customers pay in cash at the shop",
    icon: Banknote,
    always: true,
  },
  {
    id: "upi",
    label: "UPI (PhonePe / GPay / Paytm)",
    desc: "Customers scan QR and pay digitally",
    icon: Smartphone,
    connectButton: true,
  },
  {
    id: "bank",
    label: "Bank transfer / NEFT",
    desc: "Direct bank transfer for large orders",
    icon: IndianRupee,
  },
  {
    id: "udhaar",
    label: "Customer credit (Udhaar)",
    desc: "Customers pay later — you keep track of who owes what",
    icon: Users,
  },
]

const CHALLENGES = [
  {
    id: "dues",
    label: "Customers not paying on time",
    desc: "People take goods on credit and delay payment",
    icon: Users,
    color: "border-red-500/30 text-red-300",
  },
  {
    id: "profit",
    label: "Not knowing my real profit",
    desc: "Revenue looks good but I don't know what I actually keep",
    icon: TrendingUp,
    color: "border-blue-500/30 text-blue-300",
  },
  {
    id: "cash",
    label: "Cash running out suddenly",
    desc: "Money in bank runs low even though business is 'good'",
    icon: IndianRupee,
    color: "border-orange-500/30 text-orange-300",
  },
  {
    id: "stock",
    label: "Too much stock / wrong stock",
    desc: "Some items sell fast, others sit for months",
    icon: Package,
    color: "border-amber-500/30 text-amber-300",
  },
  {
    id: "loan",
    label: "Getting a business loan",
    desc: "Bank asks for documents I don't have ready",
    icon: IndianRupee,
    color: "border-emerald-500/30 text-emerald-300",
  },
]

const SETUP_STAGES = [
  { msg: "Creating your business profile...", target: 20 },
  { msg: "Setting up your dashboard...", target: 40 },
  { msg: "Loading sample data for your business type...", target: 60 },
  { msg: "Running your first Business Health Check...", target: 80 },
  { msg: "Your Sarthi is ready!", target: 100 },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [businessName, setBusinessName] = useState("")
  const [businessType, setBusinessType] = useState("")
  const [revenueBand, setRevenueBand] = useState("")
  const [selectedPayments, setSelectedPayments] = useState<string[]>(["cash"])
  const [selectedChallenge, setSelectedChallenge] = useState("")
  const [setupProgress, setSetupProgress] = useState(0)
  const [setupStageMsg, setSetupStageMsg] = useState("")

  function togglePayment(id: string) {
    if (id === "cash") return // always selected
    setSelectedPayments((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    )
  }

  function handleLaunchSetup() {
    setStep(3)
    let i = 0
    const interval = setInterval(() => {
      if (i < SETUP_STAGES.length) {
        setSetupProgress(SETUP_STAGES[i].target)
        setSetupStageMsg(SETUP_STAGES[i].msg)
        i++
      } else {
        clearInterval(interval)
        setTimeout(() => router.push("/dashboard/margin-audit"), 1000)
      }
    }, 800)
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex flex-col">
      {/* Top bar */}
      <div className="flex h-14 items-center justify-between px-6 border-b border-white/8">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-500">
            <Layers className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold">Sarthi</span>
          <span className="text-xs text-zinc-500 ml-1 hidden sm:block">— साथी आपके बिज़नेस का</span>
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

      <div className="flex-1 flex items-center justify-center p-6">
        {/* Step 0: Business Info */}
        {step === 0 && (
          <div className="w-full max-w-md space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Tell us about your business</h2>
              <p className="text-sm text-zinc-400 mt-1">
                We'll set up Sarthi for your exact type of business. Sirf 2 minute lagenge.
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="text-xs text-zinc-400 mb-1.5 block">Business Name</label>
                <Input
                  placeholder="e.g. Ramesh Auto Parts"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="bg-white/5 border-white/10"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-400 mb-2 block">What kind of business do you run?</label>
                <div className="grid grid-cols-2 gap-2">
                  {BUSINESS_TYPES.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setBusinessType(type.id)}
                      className={cn(
                        "flex items-start gap-2 text-left px-3 py-3 rounded-lg border text-xs transition-colors",
                        businessType === type.id
                          ? "border-blue-500 bg-blue-500/10 text-blue-200"
                          : "border-white/10 bg-white/3 text-zinc-400 hover:border-white/20 hover:bg-white/5"
                      )}
                    >
                      <span className="text-base leading-none flex-shrink-0">{type.emoji}</span>
                      <span className="leading-tight">{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-zinc-400 mb-2 block">Monthly Revenue (approximate)</label>
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
              className="w-full"
              disabled={!businessName.trim() || !businessType || !revenueBand}
              onClick={() => setStep(1)}
            >
              Continue
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}

        {/* Step 1: Payments */}
        {step === 1 && (
          <div className="w-full max-w-md space-y-6">
            <div>
              <h2 className="text-2xl font-bold">How do customers pay you?</h2>
              <p className="text-sm text-zinc-400 mt-1">
                Select all that apply. Sarthi will track money from all these sources.
              </p>
            </div>

            <div className="space-y-2">
              {PAYMENT_METHODS.map((method) => {
                const isSelected = selectedPayments.includes(method.id)
                const Icon = method.icon
                return (
                  <button
                    key={method.id}
                    onClick={() => togglePayment(method.id)}
                    className={cn(
                      "w-full flex items-center gap-3 p-3.5 rounded-lg border text-left transition-colors",
                      isSelected
                        ? "border-emerald-500/40 bg-emerald-500/5"
                        : "border-white/10 bg-white/3 hover:border-white/20"
                    )}
                  >
                    <div className={cn(
                      "h-9 w-9 rounded-lg flex items-center justify-center flex-shrink-0",
                      isSelected ? "bg-emerald-500/20" : "bg-white/5"
                    )}>
                      <Icon className={cn("h-4 w-4", isSelected ? "text-emerald-400" : "text-muted-foreground")} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{method.label}</p>
                      <p className="text-xs text-zinc-500">{method.desc}</p>
                    </div>
                    <div className="flex-shrink-0">
                      {method.always ? (
                        <Badge variant="outline" className="text-[10px] text-emerald-400 border-emerald-500/30">Always</Badge>
                      ) : isSelected ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                      ) : (
                        <div className="h-5 w-5 rounded-full border border-white/20" />
                      )}
                    </div>
                  </button>
                )
              })}
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep(0)} className="flex-1">Back</Button>
              <Button className="flex-1" onClick={() => setStep(2)}>
                Continue
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Biggest Challenge */}
        {step === 2 && (
          <div className="w-full max-w-md space-y-6">
            <div>
              <h2 className="text-2xl font-bold">What's your biggest headache?</h2>
              <p className="text-sm text-zinc-400 mt-1">
                We'll make this your Sarthi's top priority. Sirf ek option choose karein.
              </p>
            </div>

            <div className="space-y-2">
              {CHALLENGES.map((challenge) => {
                const isSelected = selectedChallenge === challenge.id
                const Icon = challenge.icon
                return (
                  <button
                    key={challenge.id}
                    onClick={() => setSelectedChallenge(challenge.id)}
                    className={cn(
                      "w-full flex items-start gap-3 p-4 rounded-lg border text-left transition-colors",
                      isSelected
                        ? `border-blue-500 bg-blue-500/10`
                        : "border-white/10 bg-white/3 hover:border-white/20"
                    )}
                  >
                    <div className={cn(
                      "h-9 w-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5",
                      isSelected ? "bg-blue-500/20" : "bg-white/5"
                    )}>
                      <Icon className={cn("h-4 w-4", isSelected ? "text-blue-400" : "text-muted-foreground")} />
                    </div>
                    <div className="flex-1">
                      <p className={cn("text-sm font-medium", isSelected ? "text-blue-200" : "text-zinc-200")}>
                        {challenge.label}
                      </p>
                      <p className="text-xs text-zinc-500 mt-0.5">{challenge.desc}</p>
                    </div>
                    {isSelected && <CheckCircle2 className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />}
                  </button>
                )
              })}
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">Back</Button>
              <Button
                className="flex-1"
                disabled={!selectedChallenge}
                onClick={handleLaunchSetup}
              >
                Set Up My Sarthi
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Setting up */}
        {step === 3 && (
          <div className="w-full max-w-md space-y-8 text-center">
            <div>
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/10 border border-blue-500/20 mx-auto mb-5">
                {setupProgress < 100 ? (
                  <Loader2 className="h-8 w-8 text-blue-400 animate-spin" />
                ) : (
                  <CheckCircle2 className="h-8 w-8 text-emerald-400" />
                )}
              </div>
              <h2 className="text-2xl font-bold">
                {setupProgress < 100 ? "Setting up your Sarthi..." : "Sarthi is ready!"}
              </h2>
              <p className="text-sm text-zinc-400 mt-2">
                {setupProgress < 100
                  ? setupStageMsg
                  : "Redirecting to your Business Health Check..."}
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-xs text-zinc-400">
                <span>Progress</span>
                <span>{setupProgress}%</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-2.5">
                <div
                  className="h-2.5 rounded-full bg-blue-500 transition-all duration-700"
                  style={{ width: `${setupProgress}%` }}
                />
              </div>
            </div>

            <div className="space-y-2 text-left">
              {SETUP_STAGES.map((stage) => (
                <div key={stage.msg} className="flex items-center gap-2 text-xs">
                  {setupProgress >= stage.target ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
                  ) : (
                    <div className="h-3.5 w-3.5 rounded-full border border-zinc-700 flex-shrink-0" />
                  )}
                  <span className={setupProgress >= stage.target ? "text-zinc-300" : "text-zinc-600"}>
                    {stage.msg}
                  </span>
                </div>
              ))}
            </div>

            {setupProgress >= 100 && (
              <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4 text-center">
                <p className="text-sm text-emerald-300 font-medium">
                  ✅ Your Business Health Check is ready. We found 5 things that can improve your profit by ₹42,800/month.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
