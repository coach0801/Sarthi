"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useSidebar } from "@/contexts/sidebar-context"
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
  X,
} from "lucide-react"

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/margin-audit", label: "Margin Audit", icon: Zap, accent: true },
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
  const { isOpen, close } = useSidebar()

  return (
    <>
      {/* Mobile backdrop overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={close}
          aria-hidden="true"
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-screen w-64 lg:w-56 flex-col border-r border-border/60 bg-background flex",
          "transition-transform duration-300 ease-in-out",
          // Mobile: slide in from left
          isOpen ? "translate-x-0" : "-translate-x-full",
          // Desktop: always visible
          "lg:translate-x-0"
        )}
      >
        {/* Logo row */}
        <div className="flex h-14 items-center gap-2.5 px-4 border-b border-border/60">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
            <Layers className="h-4 w-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="font-bold text-sm tracking-tight">Sarthi</span>
            <p className="text-[9px] text-muted-foreground leading-none truncate">D2C growth operator 🇮🇳</p>
          </div>
          <span className="text-[9px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded font-medium hidden lg:inline">BETA</span>
          {/* Mobile close button */}
          <button
            onClick={close}
            className="lg:hidden p-1 rounded-md text-muted-foreground hover:text-foreground"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-2">
          <ul className="space-y-0.5">
            {NAV_ITEMS.map((item) => {
              const isActive = item.exact
                ? pathname === item.href
                : pathname === item.href || pathname.startsWith(item.href + "/")

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={close}
                    className={cn(
                      "flex items-center gap-2.5 rounded-md px-3 py-2.5 lg:py-2 text-sm font-medium transition-colors",
                      isActive && item.accent
                        ? "bg-emerald-500/15 text-emerald-300"
                        : isActive
                        ? "bg-primary/10 text-primary"
                        : item.accent
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
          <div className="rounded-md border border-border/60 bg-white/2 px-3 py-2.5">
            <p className="text-[10px] text-muted-foreground">Demo brand</p>
            <p className="text-xs font-semibold">Glow &amp; Beyond</p>
            <p className="text-[10px] text-muted-foreground">Skincare · Shopify + 3 channels</p>
          </div>
        </div>

        {/* Settings */}
        <div className="border-t border-border/60 p-2">
          <Link
            href="/dashboard/settings"
            onClick={close}
            className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </div>
      </aside>
    </>
  )
}
