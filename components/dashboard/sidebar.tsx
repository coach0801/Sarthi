"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  TrendingUp,
  Megaphone,
  Globe,
  LineChart,
  BarChart3,
  Bot,
  ClipboardList,
  ScrollText,
  Settings,
  ChevronRight,
  Layers,
  Zap,
} from "lucide-react"

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/margin-audit", label: "Margin Audit", icon: Zap, accent: "emerald" },
  { href: "/dashboard/margin", label: "Margin Waterfall", icon: TrendingUp },
  { href: "/dashboard/actions", label: "Action Center", icon: ClipboardList },
  { href: "/dashboard/ads", label: "Ad Intelligence", icon: Megaphone },
  { href: "/dashboard/channels", label: "Channels", icon: Globe },
  { href: "/dashboard/benchmarks", label: "Benchmarks", icon: BarChart3 },
  { href: "/dashboard/forecast", label: "Forecast", icon: LineChart },
  { href: "/dashboard/agents", label: "AI Agents", icon: Bot },
  { href: "/dashboard/audit-log", label: "Audit Log", icon: ScrollText },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-56 flex-col border-r border-border/60 bg-background flex">
      {/* Logo */}
      <div className="flex h-14 items-center gap-2 px-4 border-b border-border/60">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
          <Layers className="h-4 w-4 text-primary-foreground" />
        </div>
        <div>
          <span className="font-bold text-base tracking-tight">Sarthi</span>
          <p className="text-[9px] text-muted-foreground leading-none">D2C growth operator</p>
        </div>
        <span className="ml-auto text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded font-medium">BETA</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        <ul className="space-y-0.5">
          {NAV_ITEMS.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname === item.href || pathname.startsWith(item.href + "/")
            const isAccent = item.accent === "emerald"

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive && isAccent
                      ? "bg-emerald-500/15 text-emerald-300"
                      : isActive
                      ? "bg-primary/10 text-primary"
                      : isAccent
                      ? "text-emerald-500 hover:bg-emerald-500/10"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4 flex-shrink-0" />
                  <span className="flex-1">{item.label}</span>
                  {isActive && <ChevronRight className="h-3 w-3" />}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Brand indicator */}
      <div className="px-3 pb-2">
        <div className="rounded-md border border-border/60 bg-white/2 px-3 py-2">
          <p className="text-[10px] text-muted-foreground">Demo brand</p>
          <p className="text-xs font-semibold">Glow &amp; Beyond</p>
          <p className="text-[10px] text-muted-foreground">Skincare · Shopify + 3 channels</p>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border/60 p-2">
        <Link
          href="/dashboard/settings"
          className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <Settings className="h-4 w-4" />
          Settings
        </Link>
      </div>
    </aside>
  )
}
