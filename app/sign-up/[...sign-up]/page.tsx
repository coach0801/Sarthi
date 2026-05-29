import { SignUp } from "@clerk/nextjs"
import { Layers } from "lucide-react"

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-[#09090b] flex flex-col items-center justify-center px-4">
      <div className="flex items-center gap-2 mb-8">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-500">
          <Layers className="h-5 w-5 text-white" />
        </div>
        <span className="font-bold text-xl text-white">Sarthi</span>
      </div>
      <p className="text-zinc-400 text-sm mb-6 text-center max-w-xs">
        Get your free Margin Audit in 24 hours — see exactly where your brand is losing contribution margin.
      </p>
      <SignUp
        appearance={{
          elements: {
            rootBox: "w-full max-w-sm",
            card: "bg-[#111113] border border-white/10 shadow-2xl rounded-xl",
            headerTitle: "text-white",
            headerSubtitle: "text-zinc-400",
            socialButtonsBlockButton: "bg-white/5 border-white/10 text-white hover:bg-white/10",
            dividerLine: "bg-white/10",
            dividerText: "text-zinc-500",
            formFieldLabel: "text-zinc-300",
            formFieldInput: "bg-white/5 border-white/10 text-white placeholder:text-zinc-500",
            formButtonPrimary: "bg-blue-500 hover:bg-blue-600",
            footerActionLink: "text-blue-400 hover:text-blue-300",
          },
        }}
        forceRedirectUrl="/onboarding"
      />
    </div>
  )
}
