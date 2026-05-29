export type Brand = {
  id: string
  name: string
  category: string
  monthlyRevenueBand: string
  channels: string[]
  onboardedAt: Date
  userId: string
}

export type Channel =
  | "shopify"
  | "amazon"
  | "flipkart"
  | "blinkit"
  | "zepto"
  | "instamart"
  | "meta_ads"
  | "google_ads"

export type ConnectorStatus = "connected" | "disconnected" | "error" | "syncing"

export type Connector = {
  id: string
  channel: Channel
  status: ConnectorStatus
  lastSyncAt: Date | null
  brandId: string
}

export type SKU = {
  id: string
  name: string
  sku: string
  category: string
  cogs: number
  mrp: number
  weight: number
  brandId: string
}

export type Order = {
  id: string
  orderId: string
  channel: Channel
  placedAt: Date
  grossRevenue: number
  discount: number
  gst: number
  channelFee: number
  paymentGatewayFee: number
  freightForward: number
  freightReverse: number
  adAttribution: number
  cogs: number
  packagingCost: number
  rtoProvision: number
  paymentMethod: "UPI" | "Card" | "NetBanking" | "Wallet" | "COD"
  isRTO: boolean
  pincode: string
  customerId: string
  skuId: string
  quantity: number
  brandId: string
}

export type ContributionMargin = {
  grossRevenue: number
  discount: number
  gst: number
  channelFee: number
  paymentGatewayFee: number
  freightForward: number
  freightReverse: number
  adAttribution: number
  cogs: number
  packagingCost: number
  rtoProvision: number
  contributionMargin: number
  contributionMarginPct: number
}

export type AdSpend = {
  id: string
  platform: "meta" | "google" | "blinkit" | "zepto"
  campaignId: string
  campaignName: string
  adSetName: string
  date: Date
  spend: number
  impressions: number
  clicks: number
  conversions: number
  revenue: number
  cpm: number
  cpc: number
  ctr: number
  roas: number
  brandId: string
}

export type AgentAction = {
  id: string
  agent: "orchestrator" | "margin_analyst" | "acquisition" | "quick_commerce" | "retention"
  type: string
  title: string
  description: string
  expectedImpact: number
  expectedImpactPct: number
  confidence: number
  status: "pending" | "approved" | "declined" | "executed" | "rolled_back"
  permissionLevel: "auto" | "propose" | "notify"
  reasoning: string
  data: Record<string, unknown>
  createdAt: Date
  executedAt: Date | null
  brandId: string
}

export type AuditFinding = {
  rank: number
  category: "pricing" | "channel_mix" | "sku_mix" | "discount" | "rto" | "freight" | "ad_spend"
  title: string
  description: string
  impact: number
  impactPct: number
  recommendation: string
  actions: string[]
  priority: "high" | "medium" | "low"
}

export type MarginAuditReport = {
  brandId: string
  generatedAt: Date
  summary: string
  totalOpportunity: number
  findings: AuditFinding[]
  keyMetrics: {
    avgContributionMarginPct: number
    rtoRate: number
    codRate: number
    topChannelByMargin: string
    topSkuByRevenue: string
  }
}

export type DailyBrief = {
  date: Date
  contributionMargin: number
  contributionMarginVsTarget: number
  contributionMarginVsYesterday: number
  topActions: AgentAction[]
  observations: string[]
  strategicQuestion: string
  generatedAt: Date
}

export type ChannelMetrics = {
  channel: Channel
  revenue: number
  orders: number
  contributionMargin: number
  contributionMarginPct: number
  roas: number
  rtoRate: number
  adSpend: number
}
