"use client"

import { useState } from "react"
import { CheckCircle2, XCircle, Clock, ChevronDown, ChevronUp, TrendingUp, AlertCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn, formatCurrency, agentLabel, agentColor } from "@/lib/utils"
import type { AgentAction } from "@/types"

type ActionCardProps = {
  action: AgentAction
  onApprove?: (id: string) => void
  onDecline?: (id: string) => void
  onSnooze?: (id: string) => void
}

const AGENT_COLORS: Record<string, string> = {
  orchestrator: "purple",
  margin_analyst: "info",
  acquisition: "success",
  quick_commerce: "warning",
  retention: "purple",
}

export function ActionCard({ action, onApprove, onDecline, onSnooze }: ActionCardProps) {
  const [expanded, setExpanded] = useState(false)
  const [status, setStatus] = useState(action.status)

  const agentBadgeVariant = (AGENT_COLORS[action.agent] ?? "secondary") as "purple" | "info" | "success" | "warning" | "secondary"

  function handleApprove() {
    setStatus("approved")
    onApprove?.(action.id)
  }

  function handleDecline() {
    setStatus("declined")
    onDecline?.(action.id)
  }

  const isPending = status === "pending"
  const confidenceColor =
    action.confidence >= 0.8 ? "text-emerald-400" :
    action.confidence >= 0.6 ? "text-amber-400" : "text-red-400"

  return (
    <Card className={cn(
      "border-border/60 transition-all",
      status === "approved" && "border-emerald-500/30 bg-emerald-500/5",
      status === "declined" && "border-border/30 opacity-60",
    )}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex-shrink-0">
            {status === "approved" ? (
              <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            ) : status === "declined" ? (
              <XCircle className="h-5 w-5 text-muted-foreground" />
            ) : (
              <div className="h-5 w-5 rounded-full border-2 border-primary/40 flex items-center justify-center">
                <div className="h-2 w-2 rounded-full bg-primary" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant={agentBadgeVariant}>{agentLabel(action.agent)}</Badge>
              {action.permissionLevel === "auto" && (
                <Badge variant="info" className="text-[10px]">AUTO</Badge>
              )}
              <span className={cn("text-xs ml-auto", confidenceColor)}>
                {Math.round(action.confidence * 100)}% confidence
              </span>
            </div>

            <h3 className="mt-1.5 text-sm font-semibold">{action.title}</h3>
            <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">{action.description}</p>

            <div className="mt-2 flex items-center gap-3">
              <div className="flex items-center gap-1 text-emerald-400">
                <TrendingUp className="h-3.5 w-3.5" />
                <span className="text-sm font-bold">{formatCurrency(action.expectedImpact, true)}</span>
                <span className="text-xs text-muted-foreground">expected impact/mo</span>
              </div>
            </div>

            {expanded && (
              <div className="mt-3 rounded-md bg-muted/50 p-3 text-xs text-muted-foreground border border-border/40">
                <p className="font-medium text-foreground mb-1">Agent Reasoning</p>
                <p>{action.reasoning}</p>
              </div>
            )}

            <div className="mt-3 flex items-center gap-2">
              {isPending && (
                <>
                  <Button size="sm" variant="success" className="h-7 text-xs" onClick={handleApprove}>
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Approve
                  </Button>
                  <Button size="sm" variant="outline" className="h-7 text-xs" onClick={handleDecline}>
                    Decline
                  </Button>
                  <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => onSnooze?.(action.id)}>
                    <Clock className="h-3.5 w-3.5" />
                    Snooze 24h
                  </Button>
                </>
              )}
              {status === "approved" && (
                <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Action approved
                </span>
              )}
              {status === "declined" && (
                <span className="text-xs text-muted-foreground">Declined</span>
              )}
              <button
                onClick={() => setExpanded(!expanded)}
                className="ml-auto text-xs text-muted-foreground hover:text-foreground flex items-center gap-0.5"
              >
                {expanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                {expanded ? "Less" : "Why?"}
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
