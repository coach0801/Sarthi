import { Header } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle2, AlertCircle, Link as LinkIcon, Bell, Shield, Users } from "lucide-react"

const PERMISSION_SETTINGS = [
  { action: "Pause Meta/Google campaign (≤₹50K/day)", current: "propose", options: ["notify", "propose", "auto"] },
  { action: "Pause Meta/Google campaign (>₹50K/day)", current: "propose", options: ["notify", "propose"] },
  { action: "Increase ad budget (≤20%)", current: "propose", options: ["notify", "propose", "auto"] },
  { action: "Blinkit/Zepto bid adjustment (≤15%)", current: "propose", options: ["notify", "propose", "auto"] },
  { action: "WhatsApp message to opted-in customers", current: "auto", options: ["notify", "propose", "auto"] },
  { action: "Replenishment request to dark store", current: "propose", options: ["notify", "propose"] },
  { action: "COD OTP verification trigger", current: "auto", options: ["notify", "propose", "auto"] },
  { action: "Tag customer in Shopify", current: "auto", options: ["notify", "propose", "auto"] },
]

const NOTIFICATION_CHANNELS = [
  { label: "WhatsApp (Daily Brief)", phone: "+91 9820XXXXXX", enabled: true },
  { label: "Email (Weekly Recap)", email: "founder@glowandbeyond.com", enabled: true },
  { label: "Slack (P1 Alerts)", workspace: "Not connected", enabled: false },
]

export default function SettingsPage() {
  return (
    <div className="flex flex-col flex-1">
      <Header title="Settings" subtitle="Connectors, permissions, notifications, team" />

      <main className="flex-1 p-6 space-y-5">
        {/* Brand profile */}
        <Card className="border-border/60">
          <CardHeader className="pb-3">
            <CardTitle>Brand Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">Brand Name</label>
                <Input defaultValue="Glow & Beyond" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">Category</label>
                <Input defaultValue="Skincare & Beauty" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">Target CM% (minimum acceptable)</label>
                <Input defaultValue="20" type="number" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">Packaging Cost per Order (₹)</label>
                <Input defaultValue="25" type="number" />
              </div>
            </div>
            <Button size="sm" className="mt-4">Save Changes</Button>
          </CardContent>
        </Card>

        {/* Agent Permissions */}
        <Card className="border-border/60">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-muted-foreground" />
              <CardTitle>Agent Execution Permissions</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground mb-4">
              Control how each type of action is executed. <strong>Notify</strong>: dashboard only. <strong>Propose</strong>: requires your approval. <strong>Auto</strong>: executes immediately (always reversible within 24h).
            </p>
            <div className="space-y-2">
              {PERMISSION_SETTINGS.map((p) => (
                <div key={p.action} className="flex items-center justify-between py-2 border-b border-border/40 last:border-0">
                  <span className="text-xs text-zinc-300">{p.action}</span>
                  <div className="flex gap-1">
                    {p.options.map((opt) => (
                      <button
                        key={opt}
                        className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                          p.current === opt
                            ? opt === "auto"
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                              : opt === "propose"
                              ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                              : "bg-zinc-500/20 text-zinc-400 border border-zinc-500/30"
                            : "text-zinc-600 hover:text-zinc-400"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="border-border/60">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-muted-foreground" />
              <CardTitle>Notification Channels</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {NOTIFICATION_CHANNELS.map((n) => (
                <div key={n.label} className="flex items-center justify-between py-2 border-b border-border/40 last:border-0">
                  <div>
                    <p className="text-sm font-medium">{n.label}</p>
                    <p className="text-xs text-muted-foreground">
                      {n.phone ?? n.email ?? n.workspace}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {n.enabled ? (
                      <Badge variant="success">Active</Badge>
                    ) : (
                      <Button size="sm" variant="outline" className="text-xs h-7">Connect</Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Team */}
        <Card className="border-border/60">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <CardTitle>Team</CardTitle>
              </div>
              <Button size="sm" variant="outline" className="text-xs h-7">Invite Member</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                { name: "Aarav Mehta", email: "aarav@glowandbeyond.com", role: "Owner", initials: "AM" },
                { name: "Priya Sharma", email: "priya@glowandbeyond.com", role: "Growth Manager", initials: "PS" },
              ].map((m) => (
                <div key={m.email} className="flex items-center gap-3 py-2 border-b border-border/40 last:border-0">
                  <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-xs font-semibold">
                    {m.initials}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{m.name}</p>
                    <p className="text-xs text-muted-foreground">{m.email}</p>
                  </div>
                  <Badge variant="secondary" className="ml-auto">{m.role}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
