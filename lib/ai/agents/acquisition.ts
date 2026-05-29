import { generateJSON } from "@/lib/ai/gemini"
import type { AgentAction } from "@/types"

export type CampaignMetrics = {
  campaignId: string
  campaignName: string
  platform: string
  spend7d: number
  revenue7d: number
  roas7d: number
  cmpr7d: number // contribution margin per rupee of spend
  ctrTrend: number // % change in CTR over 14d
  targetCMPR: number
}

export async function analyzeAcquisition(
  brandName: string,
  campaigns: CampaignMetrics[],
  targetMarginPct: number
): Promise<AgentAction[]> {
  const prompt = `You are Sarthi's Acquisition Agent analyzing paid media performance for ${brandName}.

Target CM%: ${targetMarginPct}%
Target CMPR (contribution margin per ₹ of ad spend): ${(targetMarginPct / 100).toFixed(2)}

CAMPAIGN PERFORMANCE (Last 7 days):
${campaigns
  .map(
    (c) =>
      `- [${c.platform.toUpperCase()}] ${c.campaignName}: Spend ₹${Math.round(c.spend7d).toLocaleString("en-IN")}, ROAS ${c.roas7d.toFixed(2)}x, CMPR ${c.cmpr7d.toFixed(2)}, CTR trend ${c.ctrTrend > 0 ? "+" : ""}${(c.ctrTrend * 100).toFixed(1)}%`
  )
  .join("\n")}

Generate 3-5 specific action recommendations based on the data. Each action must be:
- Specific to a named campaign
- Have a clear ₹ impact estimate
- Be actionable (pause / increase budget / refresh creative / adjust audience)

Return this JSON array:
[
  {
    "agent": "acquisition",
    "type": "pause_campaign|increase_budget|decrease_budget|refresh_creative|consolidate_audience",
    "title": "Short action title",
    "description": "Why this action is recommended — specific to the campaign data",
    "expectedImpact": <estimated monthly ₹ impact>,
    "expectedImpactPct": <as % of current monthly revenue>,
    "confidence": <0.0-1.0>,
    "permissionLevel": "propose|auto|notify",
    "reasoning": "Full reasoning chain with specific data references",
    "data": {
      "campaignId": "<id>",
      "campaignName": "<name>",
      "platform": "<platform>",
      "currentSpend": <daily spend>,
      "proposedChange": "<description>"
    }
  }
]`

  return generateJSON<AgentAction[]>(prompt, "flash")
}
