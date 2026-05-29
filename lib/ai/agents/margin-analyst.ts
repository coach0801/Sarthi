import { generateJSON, generateText } from "@/lib/ai/gemini"
import type { AuditFinding, MarginAuditReport } from "@/types"

export type MarginAuditInput = {
  brandName: string
  category: string
  totalRevenue30d: number
  totalCM30d: number
  avgCMPct: number
  rtoRate: number
  codRate: number
  totalAdSpend30d: number
  blendedRoas: number
  channelBreakdown: Array<{
    channel: string
    revenue: number
    contributionMarginPct: number
    orders: number
  }>
  skuBreakdown: Array<{
    name: string
    revenue: number
    contributionMarginPct: number
    orders: number
  }>
}

export async function runMarginAudit(input: MarginAuditInput): Promise<MarginAuditReport> {
  const prompt = `You are Sarthi's Margin Analyst Agent — India's most experienced D2C profitability advisor.

Analyze the following 30-day performance data for ${input.brandName} (${input.category}) and identify EXACTLY 5 specific, actionable margin improvement opportunities.

BRAND DATA:
- Total Revenue (30d): ₹${Math.round(input.totalRevenue30d).toLocaleString("en-IN")}
- Total Contribution Margin (30d): ₹${Math.round(input.totalCM30d).toLocaleString("en-IN")}
- Average CM%: ${input.avgCMPct.toFixed(1)}%
- RTO Rate: ${(input.rtoRate * 100).toFixed(1)}%
- COD Rate: ${(input.codRate * 100).toFixed(1)}%
- Total Ad Spend (30d): ₹${Math.round(input.totalAdSpend30d).toLocaleString("en-IN")}
- Blended ROAS: ${input.blendedRoas.toFixed(2)}x

CHANNEL BREAKDOWN:
${input.channelBreakdown.map((c) => `- ${c.channel}: Revenue ₹${Math.round(c.revenue).toLocaleString("en-IN")}, CM% ${c.contributionMarginPct.toFixed(1)}%, Orders ${c.orders}`).join("\n")}

SKU BREAKDOWN (top by revenue):
${input.skuBreakdown.slice(0, 5).map((s) => `- ${s.name}: Revenue ₹${Math.round(s.revenue).toLocaleString("en-IN")}, CM% ${s.contributionMarginPct.toFixed(1)}%, Orders ${s.orders}`).join("\n")}

INDIA D2C BENCHMARKS FOR ${input.category.toUpperCase()}:
- Healthy CM%: 22-28% for D2C channel, 14-18% for marketplace
- Healthy RTO rate: <10% prepaid, <18% COD
- Healthy blended ROAS: >2.5x for D2C brands at this scale
- COD rate best practice: <15% for urban-focused brands

Generate a JSON audit report with EXACTLY 5 findings. Each finding must be highly specific to this brand's data, with quantified ₹ impact. Focus on the biggest real opportunities.

Return this exact JSON structure:
{
  "summary": "2-3 sentence executive summary of the brand's margin health and biggest opportunities",
  "totalOpportunity": <total ₹ opportunity across all 5 findings>,
  "findings": [
    {
      "rank": 1,
      "category": "rto|discount|ad_spend|channel_mix|sku_mix|pricing|freight",
      "title": "Specific, punchy title",
      "description": "2-3 sentence description of the specific problem with this brand's data",
      "impact": <estimated monthly ₹ impact>,
      "impactPct": <as % of current revenue>,
      "recommendation": "Specific action to take",
      "actions": ["Step 1", "Step 2", "Step 3"],
      "priority": "high|medium|low"
    }
  ],
  "keyMetrics": {
    "avgContributionMarginPct": ${input.avgCMPct.toFixed(1)},
    "rtoRate": ${(input.rtoRate * 100).toFixed(1)},
    "codRate": ${(input.codRate * 100).toFixed(1)},
    "topChannelByMargin": "<channel name>",
    "topSkuByRevenue": "<sku name>"
  }
}`

  const result = await generateJSON<{
    summary: string
    totalOpportunity: number
    findings: AuditFinding[]
    keyMetrics: MarginAuditReport["keyMetrics"]
  }>(prompt, "pro")

  return {
    brandId: "",
    generatedAt: new Date(),
    ...result,
  }
}

export async function generateDailyBriefNarrative(input: {
  brandName: string
  todayCM: number
  todayCMVsTarget: number
  todayCMVsYesterday: number
  topActions: Array<{ title: string; expectedImpact: number; agent: string }>
}): Promise<{ observations: string[]; strategicQuestion: string }> {
  const prompt = `You are Sarthi's Orchestrator Agent giving a concise daily brief to the founder of ${input.brandName}.

TODAY'S NUMBERS:
- Contribution Margin: ₹${Math.round(input.todayCM).toLocaleString("en-IN")}
- vs Target: ${input.todayCMVsTarget > 0 ? "+" : ""}${input.todayCMVsTarget.toFixed(1)}%
- vs Yesterday: ${input.todayCMVsYesterday > 0 ? "+" : ""}${input.todayCMVsYesterday.toFixed(1)}%

TOP PENDING ACTIONS:
${input.topActions.map((a, i) => `${i + 1}. [${a.agent}] ${a.title} — ₹${Math.round(a.expectedImpact).toLocaleString("en-IN")} expected impact`).join("\n")}

Generate exactly 5 observations and 1 strategic question for the founder. Be specific, data-driven, and India D2C relevant. Avoid generic advice.

Return this JSON:
{
  "observations": ["obs1", "obs2", "obs3", "obs4", "obs5"],
  "strategicQuestion": "One sharp strategic question the founder should be thinking about today"
}`

  return generateJSON(prompt, "flash")
}
