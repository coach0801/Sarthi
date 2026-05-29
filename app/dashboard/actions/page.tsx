"use client"

import { useState } from "react"
import { Header } from "@/components/dashboard/header"
import { ActionCard } from "@/components/dashboard/action-card"
import { Badge } from "@/components/ui/badge"
import { DEMO_ACTIONS } from "@/lib/demo-data/actions"
import { formatCurrency } from "@/lib/utils"
import { TrendingUp, Clock, CheckCircle2 } from "lucide-react"
import type { AgentAction } from "@/types"

const AGENTS = ["all", "acquisition", "margin_analyst", "quick_commerce", "orchestrator"]

export default function ActionsPage() {
  const [filter, setFilter] = useState<string>("all")
  const [actions, setActions] = useState<AgentAction[]>(DEMO_ACTIONS)

  const filtered = filter === "all" ? actions : actions.filter((a) => a.agent === filter)
  const pending = actions.filter((a) => a.status === "pending")
  const totalPendingImpact = pending.reduce((s, a) => s + a.expectedImpact, 0)

  function handleApprove(id: string) {
    setActions((prev) => prev.map((a) => a.id === id ? { ...a, status: "approved" as const } : a))
  }
  function handleDecline(id: string) {
    setActions((prev) => prev.map((a) => a.id === id ? { ...a, status: "declined" as const } : a))
  }

  return (
    <div className="flex flex-col flex-1">
      <Header
        title="Action Center"
        subtitle="AI-generated recommendations — approve, decline, or snooze"
      />

      <main className="flex-1 p-4 lg:p-6 space-y-4 lg:space-y-5">
        {/* Summary */}
        <div className="grid grid-cols-3 gap-3 lg:gap-4">
          <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3 lg:p-4">
            <p className="text-[10px] sm:text-xs text-amber-400 mb-1">Pending</p>
            <p className="text-xl sm:text-2xl font-bold">{pending.length}</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground mt-1 hidden sm:block">Awaiting your review</p>
          </div>
          <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3 lg:p-4">
            <p className="text-[10px] sm:text-xs text-emerald-400 mb-1">Impact</p>
            <p className="text-lg sm:text-2xl font-bold truncate">{formatCurrency(totalPendingImpact, true)}/mo</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground mt-1 hidden sm:block">If all actions approved</p>
          </div>
          <div className="rounded-lg border border-border/60 p-3 lg:p-4">
            <p className="text-[10px] sm:text-xs text-muted-foreground mb-1">Approved</p>
            <p className="text-xl sm:text-2xl font-bold">{actions.filter((a) => a.status === "approved").length}</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground mt-1 hidden sm:block">This week</p>
          </div>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-1 px-1">
          {AGENTS.map((agent) => (
            <button
              key={agent}
              onClick={() => setFilter(agent)}
              className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                filter === agent
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {agent === "all"
                ? "All"
                : agent === "margin_analyst"
                ? "Margin Analyst"
                : agent.charAt(0).toUpperCase() + agent.slice(1).replace("_", " ")}
            </button>
          ))}
        </div>

        {/* Actions list */}
        <div className="space-y-3">
          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground text-sm">
              No actions in this category
            </div>
          )}
          {filtered.map((action) => (
            <ActionCard
              key={action.id}
              action={action}
              onApprove={handleApprove}
              onDecline={handleDecline}
            />
          ))}
        </div>
      </main>
    </div>
  )
}
