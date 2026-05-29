import { Header } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle, Clock, RotateCcw, Zap } from "lucide-react"
import { agentLabel } from "@/lib/utils"
import { formatCurrency } from "@/lib/utils"

const AUDIT_ENTRIES = [
  {
    id: "log-001",
    timestamp: new Date(Date.now() - 300000),
    agent: "acquisition",
    action: "PROPOSE_CAMPAIGN_PAUSE",
    title: "Proposed: Pause Prospecting Lookalike 1% Mumbai",
    status: "pending",
    impact: 38400,
    permissionLevel: "propose",
    executedBy: null,
  },
  {
    id: "log-002",
    timestamp: new Date(Date.now() - 3600000),
    agent: "quick_commerce",
    action: "PROPOSE_REPLENISHMENT",
    title: "Proposed: Replenish Vitamin C Serum — Blinkit Koramangala-07",
    status: "pending",
    impact: 91000,
    permissionLevel: "propose",
    executedBy: null,
  },
  {
    id: "log-003",
    timestamp: new Date(Date.now() - 14400000),
    agent: "margin_analyst",
    action: "NOTIFY_MARGIN_ALERT",
    title: "Alert: Niacinamide Toner CM% below 12% threshold",
    status: "acknowledged",
    impact: 0,
    permissionLevel: "notify",
    executedBy: "system",
  },
  {
    id: "log-004",
    timestamp: new Date(Date.now() - 86400000),
    agent: "acquisition",
    action: "AUTO_PAUSE_CAMPAIGN",
    title: "Auto-paused: Meta Interest-Beauty expired creative (Day 12 negative CMPR)",
    status: "executed",
    impact: 22000,
    permissionLevel: "auto",
    executedBy: "system",
    rollbackAvailable: false,
  },
  {
    id: "log-005",
    timestamp: new Date(Date.now() - 86400000 * 1.5),
    agent: "acquisition",
    action: "APPROVED_BUDGET_INCREASE",
    title: "Approved: Google Brand Search budget +20%",
    status: "executed",
    impact: 52800,
    permissionLevel: "propose",
    executedBy: "Founder",
    rollbackAvailable: false,
  },
  {
    id: "log-006",
    timestamp: new Date(Date.now() - 86400000 * 2),
    agent: "quick_commerce",
    action: "DECLINED_BID_CHANGE",
    title: "Declined: Blinkit Vitamin C Serum bid increase +15%",
    status: "declined",
    impact: 0,
    permissionLevel: "propose",
    executedBy: "Founder",
    declineReason: "Waiting for inventory replenishment first",
  },
  {
    id: "log-007",
    timestamp: new Date(Date.now() - 86400000 * 3),
    agent: "orchestrator",
    action: "DAILY_BRIEF",
    title: "Daily Brief generated and delivered",
    status: "executed",
    impact: 0,
    permissionLevel: "auto",
    executedBy: "system",
  },
]

const STATUS_CONFIG: Record<string, { icon: React.ElementType; label: string; color: string }> = {
  pending: { icon: Clock, label: "Pending", color: "text-amber-400" },
  executed: { icon: CheckCircle2, label: "Executed", color: "text-emerald-400" },
  acknowledged: { icon: CheckCircle2, label: "Acknowledged", color: "text-blue-400" },
  declined: { icon: XCircle, label: "Declined", color: "text-zinc-500" },
}

export default function AuditLogPage() {
  return (
    <div className="flex flex-col flex-1">
      <Header title="Audit Log" subtitle="Every agent action — immutable, searchable, reversible" />

      <main className="flex-1 p-6 space-y-5">
        <div className="grid grid-cols-3 gap-4 text-center">
          {[
            { label: "Total Actions (30d)", value: "47", desc: "across all agents" },
            { label: "Approval Rate", value: "71%", desc: "of proposed actions" },
            { label: "Avg Impact / Action", value: "₹38K", desc: "estimated monthly CM" },
          ].map((s) => (
            <div key={s.label} className="rounded-lg border border-border/60 p-4">
              <p className="text-2xl font-bold">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              <p className="text-xs text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>

        <Card className="border-border/60">
          <CardHeader className="pb-3">
            <CardTitle>Recent Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-0">
              {AUDIT_ENTRIES.map((entry, i) => {
                const statusCfg = STATUS_CONFIG[entry.status] ?? STATUS_CONFIG.pending
                const Icon = statusCfg.icon
                return (
                  <div
                    key={entry.id}
                    className="flex items-start gap-3 py-3.5 border-b border-border/40 last:border-0"
                  >
                    <Icon className={`h-4 w-4 mt-0.5 flex-shrink-0 ${statusCfg.color}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-medium">{entry.title}</span>
                        {entry.impact > 0 && (
                          <span className="text-xs text-emerald-400">{formatCurrency(entry.impact, true)}/mo</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-[10px] py-0">{agentLabel(entry.agent)}</Badge>
                        <Badge
                          variant={entry.permissionLevel === "auto" ? "info" : entry.permissionLevel === "notify" ? "secondary" : "outline"}
                          className="text-[10px] py-0"
                        >
                          {entry.permissionLevel.toUpperCase()}
                        </Badge>
                        <span className="text-[10px] text-muted-foreground">
                          {entry.timestamp.toLocaleDateString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                        </span>
                        {entry.executedBy && (
                          <span className="text-[10px] text-muted-foreground">
                            · by {entry.executedBy}
                          </span>
                        )}
                        {entry.declineReason && (
                          <span className="text-[10px] text-muted-foreground italic">
                            · "{entry.declineReason}"
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <span className={`text-xs font-medium ${statusCfg.color}`}>{statusCfg.label}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
