import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { runMarginAudit } from "@/lib/ai/agents/margin-analyst"
import { generateDemoData, computeSummaryMetrics } from "@/lib/demo-data/generator"

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const body = await req.json()
    const brandType = body.brandType ?? "skincare"

    // Use demo data for MVP (real connector data in production)
    const dataset = generateDemoData(brandType, 90)
    const metrics = computeSummaryMetrics(dataset)

    const auditInput = {
      brandName: dataset.brand.name,
      category: dataset.brand.category,
      totalRevenue30d: metrics.summary.totalRevenue30d,
      totalCM30d: metrics.summary.totalCM30d,
      avgCMPct: metrics.summary.avgCMPct,
      rtoRate: metrics.summary.rtoRate,
      codRate: metrics.summary.codRate,
      totalAdSpend30d: metrics.summary.totalAdSpend30d,
      blendedRoas: metrics.summary.blendedRoas,
      channelBreakdown: metrics.channelBreakdown,
      skuBreakdown: metrics.skuBreakdown,
    }

    const report = await runMarginAudit(auditInput)
    return NextResponse.json(report)
  } catch (err) {
    console.error("Margin audit error:", err)
    return NextResponse.json({ error: "Audit generation failed" }, { status: 500 })
  }
}
