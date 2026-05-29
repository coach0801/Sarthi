import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Sarthi — Autonomous Growth Operator for Indian D2C Brands",
  description:
    "Sarthi unifies every sales channel, computes real contribution margin, and runs AI agents that optimize your brand 24×7.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full`}>
        <body className="min-h-full antialiased bg-background text-foreground">
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
