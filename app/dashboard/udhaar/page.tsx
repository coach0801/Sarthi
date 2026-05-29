"use client"

import { useState } from "react"
import { Header } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  Users,
  MessageCircle,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Plus,
} from "lucide-react"

const CUSTOMERS = [
  {
    id: 1,
    name: "Mehta Workshop",
    amount: 12800,
    days: 67,
    phone: "9876543210",
    status: "urgent",
    lastContact: "Never contacted",
  },
  {
    id: 2,
    name: "Sharma Garage",
    amount: 24500,
    days: 45,
    phone: "9765432109",
    status: "urgent",
    lastContact: "2 weeks ago",
  },
  {
    id: 3,
    name: "Kumar Brothers",
    amount: 4100,
    days: 55,
    phone: "9654321098",
    status: "urgent",
    lastContact: "1 week ago",
  },
  {
    id: 4,
    name: "Patel & Sons",
    amount: 8400,
    days: 38,
    phone: "9543210987",
    status: "overdue",
    lastContact: "3 days ago",
  },
  {
    id: 5,
    name: "Kapoor Motors",
    amount: 18200,
    days: 22,
    phone: "9432109876",
    status: "due",
    lastContact: "Last week",
  },
  {
    id: 6,
    name: "Rajan Service Center",
    amount: 6200,
    days: 18,
    phone: "9321098765",
    status: "due",
    lastContact: "3 days ago",
  },
  {
    id: 7,
    name: "Singh Auto",
    amount: 9600,
    days: 15,
    phone: "9210987654",
    status: "recent",
    lastContact: "Yesterday",
  },
  {
    id: 8,
    name: "Verma Tyres",
    amount: 1200,
    days: 8,
    phone: "9109876543",
    status: "recent",
    lastContact: "2 days ago",
  },
  {
    id: 9,
    name: "Gupta Workshop",
    amount: 980,
    days: 5,
    phone: "9098765432",
    status: "recent",
    lastContact: "Yesterday",
  },
  {
    id: 10,
    name: "Rao Motors",
    amount: 740,
    days: 3,
    phone: "9987654321",
    status: "recent",
    lastContact: "Today",
  },
  {
    id: 11,
    name: "Nair Auto Parts",
    amount: 600,
    days: 2,
    phone: "9876543211",
    status: "recent",
    lastContact: "Today",
  },
]

type TabType = "all" | "urgent" | "recent"

function getStatusConfig(status: string) {
  switch (status) {
    case "urgent":
      return { label: "🔴 Urgent", color: "text-red-400", bg: "bg-red-500/10 border-red-500/20" }
    case "overdue":
      return { label: "⚠️ Overdue", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" }
    case "due":
      return { label: "🟡 Due", color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20" }
    case "recent":
      return { label: "🟢 Recent", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" }
    default:
      return { label: status, color: "text-muted-foreground", bg: "" }
  }
}

function whatsappLink(phone: string, name: string, amount: number) {
  const msg = encodeURIComponent(
    `Namaste ${name} bhai, aapka ₹${amount.toLocaleString("en-IN")} pending hai Ramesh Auto Parts mein. Kripya jaldi settle kar dein. Shukriya 🙏\n\n- Ramesh Kumar Gupta\nRamesh Auto Parts, Pune\n📞 9112233445`
  )
  return `https://wa.me/91${phone}?text=${msg}`
}

export default function UdhaarPage() {
  const [activeTab, setActiveTab] = useState<TabType>("all")
  const [reminderSent, setReminderSent] = useState<number[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [newName, setNewName] = useState("")
  const [newAmount, setNewAmount] = useState("")

  const totalDues = CUSTOMERS.reduce((s, c) => s + c.amount, 0)
  const atRisk = CUSTOMERS.filter((c) => c.days > 45).reduce((s, c) => s + c.amount, 0)

  const filteredCustomers =
    activeTab === "urgent"
      ? CUSTOMERS.filter((c) => c.days > 45)
      : activeTab === "recent"
      ? CUSTOMERS.filter((c) => c.days < 15)
      : CUSTOMERS

  const overdue45Plus = CUSTOMERS.filter((c) => c.days > 45)

  function markSent(id: number) {
    setReminderSent((prev) => [...prev, id])
  }

  const tabs: { key: TabType; label: string; count: number }[] = [
    { key: "all", label: "All", count: CUSTOMERS.length },
    { key: "urgent", label: "Urgent (>45 days)", count: CUSTOMERS.filter((c) => c.days > 45).length },
    { key: "recent", label: "Recent (<15 days)", count: CUSTOMERS.filter((c) => c.days < 15).length },
  ]

  return (
    <div className="flex flex-col flex-1">
      <Header
        title="Udhaar — Dues Tracker"
        subtitle="Ramesh Auto Parts · Who owes you money and for how long?"
      />

      <main className="flex-1 p-6 space-y-6">
        {/* Summary */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="border-amber-500/20 bg-amber-500/3">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground mb-1">Total Outstanding Udhaar</p>
              <p className="text-3xl font-bold text-amber-400">₹{totalDues.toLocaleString("en-IN")}</p>
              <p className="text-xs text-muted-foreground mt-1">from {CUSTOMERS.length} customers</p>
            </CardContent>
          </Card>
          <Card className="border-red-500/20 bg-red-500/3">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground mb-1">At Risk (older than 45 days)</p>
              <p className="text-3xl font-bold text-red-400">₹{atRisk.toLocaleString("en-IN")}</p>
              <p className="text-xs text-muted-foreground mt-1">{overdue45Plus.length} customers — may become bad debt</p>
            </CardContent>
          </Card>
          <Card className="border-emerald-500/20 bg-emerald-500/3">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground mb-1">Recovered This Month</p>
              <p className="text-3xl font-bold text-emerald-400">₹52,400</p>
              <p className="text-xs text-emerald-500 mt-1 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                38% better than before using reminders
              </p>
            </CardContent>
          </Card>
        </div>

        {/* WhatsApp template */}
        <Card className="border-emerald-500/20 bg-emerald-500/3">
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <MessageCircle className="h-4 w-4 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-300">WhatsApp Reminder Template</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-xs text-zinc-300 leading-relaxed font-mono">
                  Namaste [Name] bhai, aapka ₹[Amount] pending hai Ramesh Auto Parts mein. Kripya jaldi settle kar dein. Shukriya 🙏<br />
                  <br />
                  - Ramesh Kumar Gupta<br />
                  Ramesh Auto Parts, Pune<br />
                  📞 9112233445
                </div>
              </div>
              <div className="flex-shrink-0">
                <p className="text-xs text-muted-foreground mb-2">Send to all urgent ({overdue45Plus.length})</p>
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white w-full text-xs">
                  <MessageCircle className="h-3.5 w-3.5 mr-1" />
                  Send All Reminders
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-border/60">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors -mb-px",
                activeTab === tab.key
                  ? "border-blue-500 text-blue-400"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
              <span className="bg-muted text-muted-foreground rounded-full px-1.5 py-0.5 text-[10px] font-medium">
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Customer list */}
        <div className="space-y-2">
          {filteredCustomers.map((customer) => {
            const statusConfig = getStatusConfig(customer.status)
            const sent = reminderSent.includes(customer.id)
            return (
              <Card
                key={customer.id}
                className={`border-border/60 ${customer.status === "urgent" ? "border-red-500/15" : ""}`}
              >
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 flex-shrink-0">
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-semibold">{customer.name}</p>
                      <span className={`text-xs ${statusConfig.color}`}>{statusConfig.label}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Last contact: {customer.lastContact} · Ph: {customer.phone}
                    </p>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <p className="text-lg font-bold">₹{customer.amount.toLocaleString("en-IN")}</p>
                    <p className={`text-xs ${customer.days > 45 ? "text-red-400" : customer.days > 30 ? "text-amber-400" : "text-muted-foreground"}`}>
                      {customer.days} days ago
                    </p>
                  </div>

                  <div className="flex gap-2 flex-shrink-0">
                    {sent ? (
                      <span className="flex items-center gap-1 text-xs text-emerald-400 font-medium">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Sent
                      </span>
                    ) : (
                      <a
                        href={whatsappLink(customer.phone, customer.name, customer.amount)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => markSent(customer.id)}
                      >
                        <Button size="sm" variant="outline" className="h-8 text-xs bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20">
                          <MessageCircle className="h-3.5 w-3.5 mr-1" />
                          WhatsApp
                        </Button>
                      </a>
                    )}
                    <Button size="sm" variant="outline" className="h-8 text-xs">
                      Mark Paid
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Add new udhaar */}
        <Card className="border-border/60 border-dashed">
          <CardContent className="p-4">
            {!showAddForm ? (
              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-full"
              >
                <Plus className="h-4 w-4" />
                Add new customer dues (udhaar)
              </button>
            ) : (
              <div className="space-y-3">
                <p className="text-sm font-medium">Add New Udhaar</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Customer Name</label>
                    <Input
                      placeholder="e.g. Sharma Garage"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="bg-white/5 border-white/10 h-8 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Amount (₹)</label>
                    <Input
                      placeholder="e.g. 5000"
                      value={newAmount}
                      onChange={(e) => setNewAmount(e.target.value)}
                      type="number"
                      className="bg-white/5 border-white/10 h-8 text-sm"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" disabled={!newName || !newAmount} className="h-8 text-xs">
                    Add Udhaar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 text-xs"
                    onClick={() => setShowAddForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tip */}
        <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-zinc-400 leading-relaxed">
              <span className="text-blue-300 font-medium">Tip:</span> Customers who owe money for more than 60 days have only 40% chance of paying voluntarily.
              Send a friendly WhatsApp reminder this week — businesses using Sarthi recover <strong className="text-white">38% more dues</strong> compared to those who don't send reminders.
              Mehta Workshop (67 days, ₹12,800) needs your attention today.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
