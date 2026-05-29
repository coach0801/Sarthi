import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, compact = false): string {
  if (compact) {
    if (Math.abs(amount) >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`
    if (Math.abs(amount) >= 100000) return `₹${(amount / 100000).toFixed(1)}L`
    if (Math.abs(amount) >= 1000) return `₹${(amount / 1000).toFixed(1)}K`
  }
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatPct(value: number, decimals = 1): string {
  return `${value >= 0 ? "+" : ""}${value.toFixed(decimals)}%`
}

export function formatNumber(n: number, compact = false): string {
  if (compact) {
    if (n >= 10000000) return `${(n / 10000000).toFixed(1)}Cr`
    if (n >= 100000) return `${(n / 100000).toFixed(1)}L`
    if (n >= 1000) return `${(n / 1000).toFixed(1)}K`
  }
  return new Intl.NumberFormat("en-IN").format(Math.round(n))
}

export function channelLabel(channel: string): string {
  const labels: Record<string, string> = {
    shopify: "Shopify",
    amazon: "Amazon",
    flipkart: "Flipkart",
    blinkit: "Blinkit",
    zepto: "Zepto",
    instamart: "Instamart",
    meta_ads: "Meta Ads",
    google_ads: "Google Ads",
  }
  return labels[channel] ?? channel
}

export function channelColor(channel: string): string {
  const colors: Record<string, string> = {
    shopify: "#96BF48",
    amazon: "#FF9900",
    flipkart: "#2874F0",
    blinkit: "#F8C200",
    zepto: "#8A2BE2",
    instamart: "#FC8019",
    meta_ads: "#1877F2",
    google_ads: "#4285F4",
  }
  return colors[channel] ?? "#6B7280"
}

export function agentLabel(agent: string): string {
  const labels: Record<string, string> = {
    orchestrator: "Orchestrator",
    margin_analyst: "Margin Analyst",
    acquisition: "Acquisition",
    quick_commerce: "Quick Commerce",
    retention: "Retention",
  }
  return labels[agent] ?? agent
}

export function agentColor(agent: string): string {
  const colors: Record<string, string> = {
    orchestrator: "purple",
    margin_analyst: "blue",
    acquisition: "green",
    quick_commerce: "orange",
    retention: "pink",
  }
  return colors[agent] ?? "gray"
}
