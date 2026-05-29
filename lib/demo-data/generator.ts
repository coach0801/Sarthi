import {
  computeContributionMargin,
  getChannelFee,
  getPaymentGatewayFee,
  computeRTOProvision,
} from "@/lib/margin/compute"
import type { ContributionMargin } from "@/types"

const BRAND_PROFILES = {
  skincare: {
    name: "Glow & Beyond",
    category: "Skincare & Beauty",
    skus: [
      { name: "Vitamin C Serum 30ml", sku: "GNB-VCS-30", cogs: 180, mrp: 799, weight: 0.1 },
      { name: "Hyaluronic Acid Moisturizer", sku: "GNB-HAM-50", cogs: 220, mrp: 999, weight: 0.15 },
      { name: "SPF 50 Sunscreen 100ml", sku: "GNB-SPF-100", cogs: 120, mrp: 599, weight: 0.12 },
      { name: "Niacinamide Toner 100ml", sku: "GNB-NAT-100", cogs: 95, mrp: 449, weight: 0.12 },
      { name: "Retinol Night Cream 30g", sku: "GNB-RNC-30", cogs: 280, mrp: 1299, weight: 0.08 },
    ],
    channels: ["shopify", "amazon", "blinkit", "zepto"],
    monthlyRevenueBand: "₹10-25 Cr",
    avgOrderValue: 850,
    meta_daily_spend: 45000,
    google_daily_spend: 22000,
  },
  fashion: {
    name: "Urban Drip",
    category: "Fashion & Apparel",
    skus: [
      { name: "Slim Fit Chinos - Khaki", sku: "UD-CHN-KHK", cogs: 380, mrp: 1299, weight: 0.35 },
      { name: "Cotton Polo T-Shirt", sku: "UD-PLO-WHT", cogs: 180, mrp: 699, weight: 0.22 },
      { name: "Jogger Pants - Navy", sku: "UD-JGR-NVY", cogs: 320, mrp: 1099, weight: 0.4 },
      { name: "Hoodie - Charcoal XL", sku: "UD-HDI-CHL", cogs: 450, mrp: 1799, weight: 0.6 },
      { name: "Denim Shorts - Blue", sku: "UD-DNS-BLU", cogs: 280, mrp: 999, weight: 0.38 },
    ],
    channels: ["shopify", "amazon", "flipkart"],
    monthlyRevenueBand: "₹5-10 Cr",
    avgOrderValue: 1100,
    meta_daily_spend: 32000,
    google_daily_spend: 15000,
  },
}

const PINCODES = [
  { code: "110001", city: "Delhi", type: "metro" },
  { code: "400001", city: "Mumbai", type: "metro" },
  { code: "560001", city: "Bangalore", type: "metro" },
  { code: "600001", city: "Chennai", type: "metro" },
  { code: "700001", city: "Kolkata", type: "metro" },
  { code: "500001", city: "Hyderabad", type: "tier1" },
  { code: "411001", city: "Pune", type: "tier1" },
  { code: "302001", city: "Jaipur", type: "tier1" },
  { code: "380001", city: "Ahmedabad", type: "tier1" },
  { code: "226001", city: "Lucknow", type: "tier2" },
  { code: "482001", city: "Jabalpur", type: "tier2" },
  { code: "831001", city: "Jamshedpur", type: "tier3" },
  { code: "263001", city: "Haldwani", type: "rural" },
]

const PAYMENT_METHODS = ["UPI", "Card", "NetBanking", "Wallet", "COD"] as const
const PAYMENT_METHOD_WEIGHTS = [0.52, 0.22, 0.08, 0.06, 0.12]

function weightedRandom<T>(items: T[], weights: number[]): T {
  const total = weights.reduce((a, b) => a + b, 0)
  let rand = Math.random() * total
  for (let i = 0; i < items.length; i++) {
    rand -= weights[i]
    if (rand <= 0) return items[i]
  }
  return items[items.length - 1]
}

function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

function randomInt(min: number, max: number): number {
  return Math.floor(randomBetween(min, max + 1))
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

export type GeneratedOrder = {
  orderId: string
  channel: string
  skuName: string
  skuId: string
  quantity: number
  placedAt: Date
  grossRevenue: number
  paymentMethod: string
  pincode: string
  city: string
  isRTO: boolean
  margin: ContributionMargin
}

export type GeneratedAdSpend = {
  platform: string
  campaignId: string
  campaignName: string
  adSetName: string
  date: Date
  spend: number
  impressions: number
  clicks: number
  conversions: number
  revenue: number
}

export type DemoDataset = {
  brand: typeof BRAND_PROFILES.skincare
  orders: GeneratedOrder[]
  adSpend: GeneratedAdSpend[]
  skus: typeof BRAND_PROFILES.skincare.skus
}

export function generateDemoData(
  brandType: "skincare" | "fashion" = "skincare",
  daysBack: number = 90
): DemoDataset {
  const brand = BRAND_PROFILES[brandType]
  const orders: GeneratedOrder[] = []
  const adSpends: GeneratedAdSpend[] = []

  const now = new Date()
  const startDate = new Date(now.getTime() - daysBack * 24 * 60 * 60 * 1000)

  // Generate orders for each day
  for (let d = 0; d < daysBack; d++) {
    const date = new Date(startDate.getTime() + d * 24 * 60 * 60 * 1000)
    const isWeekend = date.getDay() === 0 || date.getDay() === 6
    const seasonMultiplier = d > 60 ? 1.2 : d > 30 ? 1.0 : 0.85 // growth trend

    // Shopify orders
    const shopifyOrders = randomInt(
      Math.floor(25 * seasonMultiplier * (isWeekend ? 1.3 : 1)),
      Math.floor(45 * seasonMultiplier * (isWeekend ? 1.4 : 1))
    )
    for (let i = 0; i < shopifyOrders; i++) {
      orders.push(generateOrder(brand, "shopify", date, i, daysBack - d))
    }

    // Amazon orders
    const amazonOrders = randomInt(
      Math.floor(15 * seasonMultiplier),
      Math.floor(30 * seasonMultiplier)
    )
    for (let i = 0; i < amazonOrders; i++) {
      orders.push(generateOrder(brand, "amazon", date, i + 100, daysBack - d))
    }

    // Blinkit orders (skincare only)
    if (brand.channels.includes("blinkit")) {
      const blinkitOrders = randomInt(8, 20)
      for (let i = 0; i < blinkitOrders; i++) {
        orders.push(generateOrder(brand, "blinkit", date, i + 200, daysBack - d))
      }
    }

    // Flipkart (fashion)
    if (brand.channels.includes("flipkart")) {
      const flipkartOrders = randomInt(10, 22)
      for (let i = 0; i < flipkartOrders; i++) {
        orders.push(generateOrder(brand, "flipkart", date, i + 300, daysBack - d))
      }
    }

    // Ad spend
    adSpends.push(...generateAdSpend(brand, date, d, seasonMultiplier))
  }

  return { brand, orders, adSpend: adSpends, skus: brand.skus }
}

function generateOrder(
  brand: typeof BRAND_PROFILES.skincare,
  channel: string,
  date: Date,
  seed: number,
  recency: number
): GeneratedOrder {
  const sku = brand.skus[randomInt(0, brand.skus.length - 1)]
  const pincodesForChannel =
    channel === "blinkit" || channel === "zepto"
      ? PINCODES.filter((p) => p.type === "metro" || p.type === "tier1")
      : PINCODES

  const pincode = pincodesForChannel[randomInt(0, pincodesForChannel.length - 1)]
  const paymentMethod = weightedRandom(
    PAYMENT_METHODS as unknown as string[],
    channel === "amazon" || channel === "flipkart"
      ? [0.45, 0.28, 0.1, 0.05, 0.12]
      : PAYMENT_METHOD_WEIGHTS
  ) as string

  const quantity = Math.random() < 0.15 ? 2 : 1
  const grossRevenue = sku.mrp * quantity * randomBetween(0.92, 1.0)
  const discount = grossRevenue * randomBetween(0.05, 0.18)
  const effectiveRevenue = grossRevenue - discount
  const gst = effectiveRevenue * 0.12
  const channelFee = getChannelFee(channel, effectiveRevenue)
  const pgFee = getPaymentGatewayFee(paymentMethod, effectiveRevenue)
  const freightForward = channel === "shopify" ? randomBetween(55, 90) : 0
  const rtoProvision = computeRTOProvision(effectiveRevenue, paymentMethod, pincode.type, freightForward || 60)
  const adAttribution = channel === "shopify"
    ? effectiveRevenue * randomBetween(0.08, 0.22)
    : effectiveRevenue * randomBetween(0.02, 0.06)

  const margin = computeContributionMargin({
    grossRevenue,
    discount,
    gst,
    channelFee,
    paymentGatewayFee: pgFee,
    freightForward,
    freightReverse: 0,
    adAttribution,
    cogs: sku.cogs * quantity,
    packagingCost: 25 * quantity,
    rtoProvision,
  })

  const isRTO =
    Math.random() <
    (paymentMethod === "COD"
      ? { metro: 0.12, tier1: 0.18, tier2: 0.24, tier3: 0.32, rural: 0.42 }[pincode.type] ?? 0.2
      : 0.04)

  const orderId = `ORD-${channel.toUpperCase().slice(0, 3)}-${date.toISOString().slice(0, 10).replace(/-/g, "")}-${seed.toString().padStart(4, "0")}`

  return {
    orderId,
    channel,
    skuName: sku.name,
    skuId: sku.sku,
    quantity,
    placedAt: new Date(date.getTime() + randomInt(8, 22) * 3600000),
    grossRevenue,
    paymentMethod,
    pincode: pincode.code,
    city: pincode.city,
    isRTO,
    margin,
  }
}

function generateAdSpend(
  brand: typeof BRAND_PROFILES.skincare,
  date: Date,
  dayIndex: number,
  multiplier: number
): GeneratedAdSpend[] {
  const campaigns = [
    {
      platform: "meta",
      campaignId: "MC-001",
      campaignName: "Prospecting - Top of Funnel",
      adSets: ["Lookalike 1% - Mumbai", "Interest - Skincare Enthusiasts", "Broad - Age 22-35 F"],
      spendShare: [0.4, 0.35, 0.25],
      roas: [2.1, 1.8, 1.5],
    },
    {
      platform: "meta",
      campaignId: "MC-002",
      campaignName: "Retargeting - Cart Abandoners",
      adSets: ["30d Website Visitors", "Add to Cart - No Purchase"],
      spendShare: [0.6, 0.4],
      roas: [4.2, 3.8],
    },
    {
      platform: "google",
      campaignId: "GC-001",
      campaignName: "Brand Search",
      adSets: ["Branded Keywords"],
      spendShare: [1.0],
      roas: [8.5],
    },
    {
      platform: "google",
      campaignId: "GC-002",
      campaignName: "Performance Max - PMAX",
      adSets: ["All Products Asset Group"],
      spendShare: [1.0],
      roas: [2.4],
    },
  ]

  const result: GeneratedAdSpend[] = []

  for (const campaign of campaigns) {
    const totalDailySpend =
      campaign.platform === "meta"
        ? brand.meta_daily_spend * multiplier * randomBetween(0.9, 1.1)
        : brand.google_daily_spend * multiplier * randomBetween(0.9, 1.1)

    campaign.adSets.forEach((adSet, idx) => {
      const spend = (totalDailySpend / campaigns.filter((c) => c.platform === campaign.platform).length) * campaign.spendShare[idx]
      const roas = campaign.roas[idx] * randomBetween(0.85, 1.15)
      const revenue = spend * roas
      const cpm = randomBetween(80, 220)
      const impressions = Math.floor((spend / cpm) * 1000)
      const ctr = randomBetween(0.008, 0.025)
      const clicks = Math.floor(impressions * ctr)
      const convRate = randomBetween(0.015, 0.04)
      const conversions = Math.floor(clicks * convRate)

      result.push({
        platform: campaign.platform,
        campaignId: campaign.campaignId,
        campaignName: campaign.campaignName,
        adSetName: adSet,
        date,
        spend,
        impressions,
        clicks,
        conversions,
        revenue,
      })
    })
  }

  return result
}

export function computeSummaryMetrics(dataset: DemoDataset) {
  const orders = dataset.orders
  const adSpend = dataset.adSpend

  const last30Orders = orders.filter(
    (o) => o.placedAt >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  )
  const last7Orders = orders.filter(
    (o) => o.placedAt >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  )
  const last30Spend = adSpend.filter(
    (s) => s.date >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  )

  const totalRevenue30d = last30Orders.reduce((s, o) => s + o.grossRevenue, 0)
  const totalCM30d = last30Orders.reduce((s, o) => s + o.margin.contributionMargin, 0)
  const totalSpend30d = last30Spend.reduce((s, a) => s + a.spend, 0)
  const totalOrders30d = last30Orders.length
  const rtoOrders = last30Orders.filter((o) => o.isRTO).length
  const codOrders = last30Orders.filter((o) => o.paymentMethod === "COD").length

  const channelBreakdown = ["shopify", "amazon", "blinkit", "zepto", "flipkart"].map((ch) => {
    const chOrders = last30Orders.filter((o) => o.channel === ch)
    const rev = chOrders.reduce((s, o) => s + o.grossRevenue, 0)
    const cm = chOrders.reduce((s, o) => s + o.margin.contributionMargin, 0)
    return {
      channel: ch,
      revenue: rev,
      orders: chOrders.length,
      contributionMargin: cm,
      contributionMarginPct: rev > 0 ? (cm / rev) * 100 : 0,
    }
  }).filter((c) => c.orders > 0)

  const skuBreakdown = dataset.skus.map((sku) => {
    const skuOrders = last30Orders.filter((o) => o.skuId === sku.sku)
    const rev = skuOrders.reduce((s, o) => s + o.grossRevenue, 0)
    const cm = skuOrders.reduce((s, o) => s + o.margin.contributionMargin, 0)
    return {
      sku: sku.sku,
      name: sku.name,
      revenue: rev,
      orders: skuOrders.length,
      contributionMargin: cm,
      contributionMarginPct: rev > 0 ? (cm / rev) * 100 : 0,
    }
  }).sort((a, b) => b.revenue - a.revenue)

  // Daily trend (last 30 days)
  const dailyTrend = Array.from({ length: 30 }, (_, i) => {
    const day = new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000)
    const dayStr = day.toISOString().slice(0, 10)
    const dayOrders = last30Orders.filter(
      (o) => o.placedAt.toISOString().slice(0, 10) === dayStr
    )
    const rev = dayOrders.reduce((s, o) => s + o.grossRevenue, 0)
    const cm = dayOrders.reduce((s, o) => s + o.margin.contributionMargin, 0)
    return {
      date: dayStr,
      revenue: rev,
      contributionMargin: cm,
      orders: dayOrders.length,
    }
  })

  return {
    summary: {
      totalRevenue30d,
      totalCM30d,
      avgCMPct: totalRevenue30d > 0 ? (totalCM30d / totalRevenue30d) * 100 : 0,
      totalOrders30d,
      avgOrderValue: totalOrders30d > 0 ? totalRevenue30d / totalOrders30d : 0,
      rtoRate: totalOrders30d > 0 ? rtoOrders / totalOrders30d : 0,
      codRate: totalOrders30d > 0 ? codOrders / totalOrders30d : 0,
      totalAdSpend30d: totalSpend30d,
      blendedRoas: totalSpend30d > 0 ? totalRevenue30d / totalSpend30d : 0,
    },
    channelBreakdown,
    skuBreakdown,
    dailyTrend,
    last7Revenue: last7Orders.reduce((s, o) => s + o.grossRevenue, 0),
    last7CM: last7Orders.reduce((s, o) => s + o.margin.contributionMargin, 0),
  }
}
