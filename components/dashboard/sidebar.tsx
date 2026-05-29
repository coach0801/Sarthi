"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  TrendingUp,
  Users,
  LineChart,
  Package,
  BadgeIndianRupee,
  Settings,
  ChevronRight,
  Layers,
  Activity,
} from "lucide-react"

const NAV_ITEMS = [
  { href: "/dashboard", label: "Home", icon: LayoutDashboard },
  { href: "/dashboard/profit", label: "Munaafa", icon: TrendingUp, labelHindi: "मुनाफ़ा" },
  { href: "/dashboard/udhaar", label: "Udhaar", icon: Users, labelHindi: "उधार" },
  { href: "/dashboard/cashflow", label: "Cash Flow", icon: LineChart },
  { href: "/dashboard/stock", label: "Stock Alerts", icon: Package },
  { href: "/dashboard/loan", label: "Loan Ready", icon: BadgeIndianRupee },
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
          <p className="text-[9px] text-muted-foreground leading-none">साथी आपके बिज़नेस का</p>
        </div>
        <span className="ml-auto text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded font-medium">BETA</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2">
        <ul className="space-y-0.5">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4 flex-shrink-0" />
                  <span className="flex-1">{item.label}</span>
                  {"labelHindi" in item && item.labelHindi && (
                    <span className="text-[10px] text-muted-foreground">{item.labelHindi}</span>
                  )}
                  {isActive && <ChevronRight className="h-3 w-3" />}
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="mt-4 pt-4 border-t border-border/60">
          <Link
            href="/dashboard/margin-audit"
            className={cn(
              "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              pathname.startsWith("/dashboard/margin-audit")
                ? "bg-emerald-500/20 text-emerald-300"
                : "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
            )}
          >
            <Activity className="h-4 w-4" />
            Business Health Check
          </Link>
        </div>
      </nav>

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
