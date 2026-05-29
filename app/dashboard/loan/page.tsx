"use client"

import { useState } from "react"
import { Header } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  BadgeIndianRupee,
  FileText,
  CheckCircle2,
  Download,
  Building2,
  ArrowRight,
  Shield,
  Star,
} from "lucide-react"

const FINANCIALS = [
  { label: "Monthly Net Income", value: "₹73,250", note: "Average of last 3 months" },
  { label: "Annual Net Income", value: "₹8,79,000", note: "12-month projection" },
  { label: "Total Assets", value: "₹6,45,000", note: "Stock + Receivables + Equipment" },
  { label: "Total Liabilities", value: "₹1,24,000", note: "Supplier payables" },
  { label: "Net Worth", value: "₹5,21,000", note: "Assets minus liabilities" },
]

const ASSET_BREAKDOWN = [
  { label: "Stock (inventory)", value: 280000 },
  { label: "Receivables (udhaar)", value: 87320 },
  { label: "Equipment & fixtures", value: 277680 },
]

const DOCUMENTS = [
  {
    id: "pl",
    label: "Profit & Loss Statement",
    period: "Last 12 months",
    status: "ready",
    icon: FileText,
  },
  {
    id: "bs",
    label: "Balance Sheet",
    period: "As of today",
    status: "ready",
    icon: FileText,
  },
  {
    id: "cf",
    label: "Cash Flow Statement",
    period: "Last 6 months",
    status: "ready",
    icon: FileText,
  },
  {
    id: "bic",
    label: "Business Income Certificate",
    period: "Self-certified",
    status: "ready",
    icon: FileText,
  },
]

const BANKS = [
  { name: "SBI", scheme: "PM SVANidhi / SME Loan", logo: "🏛️", rate: "10.75% p.a." },
  { name: "HDFC Bank", scheme: "Business Loan", logo: "🏦", rate: "14% p.a." },
  { name: "Axis Bank", scheme: "Business Edge Loan", logo: "🏦", rate: "14.25% p.a." },
  { name: "SIDBI", scheme: "SMILE Loan (MSME)", logo: "🏗️", rate: "9.5% p.a." },
]

const STEPS = [
  { num: 1, label: "Review your numbers", desc: "Check that the financial summary below looks correct. Update your transactions if needed.", done: true },
  { num: 2, label: "Generate PDF documents", desc: "Click 'Download' on each document below. These are auto-generated from your Sarthi data.", done: false },
  { num: 3, label: "Visit bank branch", desc: "Take printed documents to SBI or HDFC branch. Or apply online using PDF uploads.", done: false },
  { num: 4, label: "Get your loan approved", desc: "SBI typically takes 5-7 business days. HDFC takes 3-4 days for SME loans.", done: false },
]

export default function LoanPage() {
  const [downloaded, setDownloaded] = useState<string[]>([])
  const [caRequested, setCaRequested] = useState(false)

  const totalAssets = ASSET_BREAKDOWN.reduce((s, a) => s + a.value, 0)

  function handleDownload(id: string) {
    setDownloaded((prev) => [...prev, id])
    // In production: trigger PDF generation and download
    alert(`Downloading ${id.toUpperCase()} PDF... (In production, this generates and downloads the actual document)`)
  }

  return (
    <div className="flex flex-col flex-1">
      <Header
        title="Loan Ready"
        subtitle="Ramesh Auto Parts · Get a business loan with your Sarthi financial documents"
      />

      <main className="flex-1 p-6 space-y-6">
        {/* Loan eligibility hero */}
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <Badge variant="success" className="mb-3">Loan Eligible</Badge>
              <h2 className="text-2xl font-bold mb-2">
                You qualify for{" "}
                <span className="text-emerald-400">₹8 Lakh – ₹12 Lakh</span>{" "}
                business loan
              </h2>
              <p className="text-sm text-zinc-400 max-w-lg">
                Based on your 12-month income of ₹8.79L and business net worth of ₹5.21L,
                you meet the eligibility criteria for MSME business loans from SBI, HDFC, Axis, and SIDBI.
                Your documents are ready to download below.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="text-center p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-xs text-muted-foreground mb-1">Min Eligible</p>
                <p className="text-2xl font-bold text-emerald-400">₹8L</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-xs text-muted-foreground mb-1">Max Eligible</p>
                <p className="text-2xl font-bold text-emerald-400">₹12L</p>
              </div>
            </div>
          </div>
        </div>

        {/* Steps */}
        <Card className="border-border/60">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">How to Get Your Loan — 4 Simple Steps</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="grid grid-cols-4 gap-4">
              {STEPS.map((step) => (
                <div key={step.num} className={`p-4 rounded-lg border ${step.done ? "border-emerald-500/20 bg-emerald-500/3" : "border-border/60 bg-white/2"}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`h-7 w-7 rounded-full flex items-center justify-center text-sm font-bold ${step.done ? "bg-emerald-500 text-white" : "bg-white/10 text-muted-foreground"}`}>
                      {step.done ? <CheckCircle2 className="h-4 w-4" /> : step.num}
                    </div>
                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                  </div>
                  <p className="text-sm font-semibold mb-1">{step.label}</p>
                  <p className="text-xs text-zinc-500 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-5 gap-5">
          {/* Financial Summary */}
          <div className="col-span-2 space-y-4">
            <Card className="border-border/60">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <BadgeIndianRupee className="h-4 w-4 text-muted-foreground" />
                  Financial Summary
                </CardTitle>
                <p className="text-xs text-muted-foreground">Auto-generated from your transactions</p>
              </CardHeader>
              <CardContent className="p-4 pt-0 space-y-3">
                {FINANCIALS.map((f) => (
                  <div key={f.label} className="flex justify-between items-start gap-2">
                    <div>
                      <p className="text-xs font-medium">{f.label}</p>
                      <p className="text-[10px] text-muted-foreground">{f.note}</p>
                    </div>
                    <p className="text-sm font-bold text-right flex-shrink-0">{f.value}</p>
                  </div>
                ))}

                <div className="border-t border-border/60 pt-3">
                  <p className="text-xs font-semibold text-muted-foreground mb-2">Asset Breakdown:</p>
                  {ASSET_BREAKDOWN.map((a) => (
                    <div key={a.label} className="flex justify-between text-xs mb-1">
                      <span className="text-zinc-400">{a.label}</span>
                      <span className="text-zinc-300">₹{a.value.toLocaleString("en-IN")}</span>
                    </div>
                  ))}
                  <div className="flex justify-between text-xs font-semibold mt-1 pt-1 border-t border-border/40">
                    <span>Total Assets</span>
                    <span className="text-emerald-400">₹{totalAssets.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Documents + Banks */}
          <div className="col-span-3 space-y-4">
            {/* Documents */}
            <Card className="border-border/60">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  Documents Ready to Download
                </CardTitle>
                <p className="text-xs text-muted-foreground">All accepted by SBI, HDFC, Axis, and SIDBI</p>
              </CardHeader>
              <CardContent className="p-4 pt-0 space-y-2">
                {DOCUMENTS.map((doc) => (
                  <div key={doc.id} className="flex items-center gap-3 p-3 rounded-lg border border-border/60 hover:border-white/20 transition-colors">
                    <div className="h-9 w-9 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                      <doc.icon className="h-4 w-4 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{doc.label}</p>
                      <p className="text-xs text-muted-foreground">{doc.period}</p>
                    </div>
                    <Badge variant="success" className="text-[10px]">✅ Ready</Badge>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 text-xs flex-shrink-0"
                      onClick={() => handleDownload(doc.id)}
                    >
                      <Download className="h-3.5 w-3.5 mr-1" />
                      {downloaded.includes(doc.id) ? "Downloaded" : "Download PDF"}
                    </Button>
                  </div>
                ))}

                {/* CA Verified upsell */}
                <div className="mt-3 p-3 rounded-lg border border-blue-500/20 bg-blue-500/5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Shield className="h-4 w-4 text-blue-400" />
                        <p className="text-sm font-medium text-blue-300">CA-Verified Documents</p>
                        <Badge variant="outline" className="text-[10px]">Add-on</Badge>
                      </div>
                      <p className="text-xs text-zinc-400">
                        Get all 4 documents certified by a registered CA. Increases loan approval chances by 60%.
                        Required for loans above ₹10L.
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-lg font-bold">₹1,999</p>
                      <p className="text-[10px] text-muted-foreground">one-time</p>
                    </div>
                  </div>
                  {caRequested ? (
                    <div className="flex items-center gap-2 mt-3 text-sm text-emerald-400">
                      <CheckCircle2 className="h-4 w-4" />
                      Request received! CA will contact you within 24 hours.
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      className="mt-3 bg-blue-500 hover:bg-blue-600 text-white h-8 text-xs"
                      onClick={() => setCaRequested(true)}
                    >
                      <Shield className="h-3.5 w-3.5 mr-1" />
                      Request CA Verification — ₹1,999
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Banks */}
            <Card className="border-border/60">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  Banks That Accept These Documents
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="grid grid-cols-2 gap-3">
                  {BANKS.map((bank) => (
                    <div key={bank.name} className="flex items-center gap-3 p-3 rounded-lg border border-border/60 bg-white/2">
                      <span className="text-2xl">{bank.logo}</span>
                      <div>
                        <p className="text-sm font-semibold">{bank.name}</p>
                        <p className="text-[10px] text-muted-foreground">{bank.scheme}</p>
                        <p className="text-xs text-blue-400 font-medium">{bank.rate}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-zinc-500 mt-3">
                  * Interest rates are indicative and may vary based on credit score and loan amount.
                  SIDBI SMILE loans are best for first-time MSME borrowers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Encouragement */}
        <Card className="border-emerald-500/20 bg-emerald-500/5">
          <CardContent className="p-5 flex items-center gap-4">
            <Star className="h-8 w-8 text-emerald-400 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-emerald-300 mb-1">You're loan-ready. Apply with confidence.</p>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Your business has been running profitably for 12+ months, you have a positive net worth of ₹5.21L, and your monthly income consistently covers all expenses.
                These are exactly the signals banks look for. Download your documents today and visit your nearest SBI branch — mention you're an MSME under PM Mudra Yojana scheme.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
