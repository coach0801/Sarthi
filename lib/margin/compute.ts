import type { ContributionMargin } from "@/types"

export type OrderInput = {
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
}

export function computeContributionMargin(order: OrderInput): ContributionMargin {
  const cm =
    order.grossRevenue -
    order.discount -
    order.gst -
    order.channelFee -
    order.paymentGatewayFee -
    order.freightForward -
    order.freightReverse -
    order.adAttribution -
    order.cogs -
    order.packagingCost -
    order.rtoProvision

  return {
    ...order,
    contributionMargin: cm,
    contributionMarginPct: order.grossRevenue > 0 ? (cm / order.grossRevenue) * 100 : 0,
  }
}

export const CHANNEL_FEES: Record<string, number> = {
  shopify: 0.02,       // 2% payment processing
  amazon: 0.17,        // 17% commission
  flipkart: 0.15,      // 15% commission
  blinkit: 0.18,       // 18% commission + platform fee
  zepto: 0.18,
  instamart: 0.16,
}

export const PAYMENT_GATEWAY_FEES: Record<string, number> = {
  UPI: 0.009,          // 0.9%
  Card: 0.018,         // 1.8%
  NetBanking: 0.015,   // 1.5%
  Wallet: 0.012,       // 1.2%
  COD: 0.02,           // ₹20 flat handled as % for simplicity
}

export const RTO_RATES_BY_PINCODE_TYPE: Record<string, number> = {
  metro: 0.08,
  tier1: 0.12,
  tier2: 0.18,
  tier3: 0.25,
  rural: 0.32,
}

export function getChannelFee(channel: string, revenue: number): number {
  return revenue * (CHANNEL_FEES[channel] ?? 0.02)
}

export function getPaymentGatewayFee(method: string, revenue: number): number {
  return revenue * (PAYMENT_GATEWAY_FEES[method] ?? 0.015)
}

export function computeRTOProvision(
  revenue: number,
  paymentMethod: string,
  pincodeType: string,
  baseFreight: number
): number {
  const baseRTORate = RTO_RATES_BY_PINCODE_TYPE[pincodeType] ?? 0.12
  const codMultiplier = paymentMethod === "COD" ? 1.8 : 1
  const rtoProbability = baseRTORate * codMultiplier
  // RTO loss = freight cost (forward + reverse) for p(RTO) orders
  return rtoProbability * baseFreight * 2
}

export function aggregateMargin(orders: ContributionMargin[]): {
  totalRevenue: number
  totalContributionMargin: number
  avgContributionMarginPct: number
  totalAdSpend: number
  totalCOGS: number
  totalFreight: number
  totalRTOLoss: number
  totalChannelFees: number
} {
  const totals = orders.reduce(
    (acc, o) => ({
      totalRevenue: acc.totalRevenue + o.grossRevenue,
      totalContributionMargin: acc.totalContributionMargin + o.contributionMargin,
      totalAdSpend: acc.totalAdSpend + o.adAttribution,
      totalCOGS: acc.totalCOGS + o.cogs,
      totalFreight: acc.totalFreight + o.freightForward + o.freightReverse,
      totalRTOLoss: acc.totalRTOLoss + o.rtoProvision,
      totalChannelFees: acc.totalChannelFees + o.channelFee,
    }),
    {
      totalRevenue: 0,
      totalContributionMargin: 0,
      totalAdSpend: 0,
      totalCOGS: 0,
      totalFreight: 0,
      totalRTOLoss: 0,
      totalChannelFees: 0,
    }
  )

  return {
    ...totals,
    avgContributionMarginPct:
      totals.totalRevenue > 0
        ? (totals.totalContributionMargin / totals.totalRevenue) * 100
        : 0,
  }
}
