"use client"

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  Line,
  LineChart,
} from "recharts"
import { formatCurrency } from "@/lib/utils"
import { format } from "date-fns"

type DayData = {
  date: string
  revenue: number
  contributionMargin: number
  orders: number
}

type MarginTrendChartProps = {
  data: DayData[]
  height?: number
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-border bg-card p-3 shadow-lg text-xs">
      <p className="font-medium mb-2">{label}</p>
      {payload.map((entry: any) => (
        <div key={entry.name} className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-muted-foreground">{entry.name}:</span>
          <span className="font-medium">{formatCurrency(entry.value, true)}</span>
        </div>
      ))}
    </div>
  )
}

export function MarginTrendChart({ data, height = 220 }: MarginTrendChartProps) {
  const formatted = data.map((d) => ({
    ...d,
    date: format(new Date(d.date), "dd MMM"),
  }))

  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={formatted} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="cmGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 10, fill: "#6b7280" }}
          tickLine={false}
          axisLine={false}
          interval="preserveStartEnd"
        />
        <YAxis
          tickFormatter={(v) => formatCurrency(v, true)}
          tick={{ fontSize: 10, fill: "#6b7280" }}
          tickLine={false}
          axisLine={false}
          width={55}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: 11, paddingTop: 8 }}
        />
        <Area
          type="monotone"
          dataKey="revenue"
          name="Revenue"
          stroke="#3b82f6"
          strokeWidth={1.5}
          fill="url(#revGrad)"
          dot={false}
        />
        <Area
          type="monotone"
          dataKey="contributionMargin"
          name="Contribution Margin"
          stroke="#10b981"
          strokeWidth={2}
          fill="url(#cmGrad)"
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

type ChannelBreakdownProps = {
  data: Array<{ channel: string; revenue: number; contributionMarginPct: number }>
  height?: number
}

export function ChannelMarginChart({ data, height = 200 }: ChannelBreakdownProps) {
  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ef4444", "#06b6d4"]

  const formatted = data.map((d, i) => ({
    name: d.channel.charAt(0).toUpperCase() + d.channel.slice(1),
    Revenue: d.revenue,
    "CM%": d.contributionMarginPct,
    fill: COLORS[i % COLORS.length],
  }))

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={formatted} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
        <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#6b7280" }} tickLine={false} axisLine={false} />
        <YAxis
          yAxisId="left"
          tickFormatter={(v) => formatCurrency(v, true)}
          tick={{ fontSize: 10, fill: "#6b7280" }}
          tickLine={false}
          axisLine={false}
          width={55}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          tickFormatter={(v) => `${v}%`}
          tick={{ fontSize: 10, fill: "#6b7280" }}
          tickLine={false}
          axisLine={false}
          width={35}
        />
        <Tooltip
          formatter={(value, name) =>
            name === "CM%"
              ? [`${Number(value).toFixed(1)}%`, "CM%"]
              : [formatCurrency(Number(value), true), name]
          }
          contentStyle={{ fontSize: 11, backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}
        />
        <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
        <Bar yAxisId="left" dataKey="Revenue" fill="#3b82f6" radius={[3, 3, 0, 0]} />
        <Line yAxisId="right" type="monotone" dataKey="CM%" stroke="#10b981" strokeWidth={2} dot={{ fill: "#10b981", r: 4 }} />
      </BarChart>
    </ResponsiveContainer>
  )
}
