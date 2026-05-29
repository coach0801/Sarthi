"use client"

import { UserButton } from "@clerk/nextjs"
import { Bell, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/contexts/sidebar-context"

type HeaderProps = {
  title: string
  subtitle?: string
  actions?: React.ReactNode
}

export function Header({ title, subtitle, actions }: HeaderProps) {
  const { toggle } = useSidebar()

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border/60 bg-background/95 backdrop-blur px-4 lg:px-6">
      {/* Hamburger — mobile only */}
      <button
        onClick={toggle}
        className="lg:hidden flex-shrink-0 p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="flex-1 min-w-0">
        <h1 className="text-sm font-semibold truncate">{title}</h1>
        {subtitle && <p className="text-xs text-muted-foreground truncate hidden sm:block">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        {actions && <div className="hidden sm:flex">{actions}</div>}
        <Button variant="ghost" size="icon" className="relative h-8 w-8">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-destructive" />
        </Button>
        <UserButton />
      </div>
    </header>
  )
}
