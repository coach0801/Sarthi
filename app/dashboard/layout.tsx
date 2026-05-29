import { SidebarProvider } from "@/contexts/sidebar-context"
import { Sidebar } from "@/components/dashboard/sidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        {/* Main content — full width on mobile, offset on desktop */}
        <div className="flex-1 lg:ml-56 flex flex-col min-h-screen w-full min-w-0">
          {children}
        </div>
      </div>
    </SidebarProvider>
  )
}
