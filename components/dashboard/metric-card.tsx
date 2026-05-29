import { cn, formatCurrency, formatNumber } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingDown, TrendingUp } from "lucide-react"

type MetricCardProps = {
  label: string
  value: string | number
  format?: "currency" | "percent" | "number" | "raw"
  change?: number
  changeLabel?: string
  compact?: boolean
  className?: string
  highlight?: "green" | "red" | "amber" | "blue"
  subtitle?: string
}

export function MetricCard({
  label,
  value,
  format = "raw",
  change,
  changeLabel,
  compact = false,
  className,
  highlight,
  subtitle,
}: MetricCardProps) {
  const formatted =
    format === "currency"
      ? formatCurrency(Number(value), compact)
      : format === "percent"
      ? `${Number(value).toFixed(1)}%`
      : format === "number"
      ? formatNumber(Number(value), compact)
      : String(value)

  const isPositive = change !== undefined && change > 0
  const isNegative = change !== undefined && change < 0

  const highlightClass =
    highlight === "green"
      ? "border-emerald-500/30"
      : highlight === "red"
      ? "border-red-500/30"
      : highlight === "amber"
      ? "border-amber-500/30"
      : highlight === "blue"
      ? "border-blue-500/30"
      : ""

  return (
    <Card className={cn("border-border/60", highlightClass, className)}>
      <CardContent className="p-4">
        <p className="text-xs text-muted-foreground mb-1">{label}</p>
        <p className="text-2xl font-bold tracking-tight">{formatted}</p>
        {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
        {change !== undefined && (
          <div className={cn("flex items-center gap-1 mt-1.5 text-xs font-medium",
            isPositive ? "text-emerald-400" : isNegative ? "text-red-400" : "text-muted-foreground"
          )}>
            {isPositive ? (
              <TrendingUp className="h-3 w-3" />
            ) : isNegative ? (
              <TrendingDown className="h-3 w-3" />
            ) : null}
            <span>
              {change > 0 ? "+" : ""}{change.toFixed(1)}%{changeLabel ? ` ${changeLabel}` : ""}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
