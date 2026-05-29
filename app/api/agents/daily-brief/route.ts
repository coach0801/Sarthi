import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { generateDailyBriefNarrative } from "@/lib/ai/agents/margin-analyst"
import { generateDemoData, computeSummaryMetrics } from "@/lib/demo-data/generator"
import { DEMO_ACTIONS } from "@/lib/demo-data/actions"

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const dataset = generateDemoData("skincare", 90)
    const metrics = computeSummaryMetrics(dataset)

    const todayCM = metrics.dailyTrend[metrics.dailyTrend.length - 1]?.contributionMargin ?? 0
    const yesterdayCM = metrics.dailyTrend[metrics.dailyTrend.length - 2]?.contributionMargin ?? 0
    const targetDailyCM = 125000

    const narrative = await generateDailyBriefNarrative({
      brandName: dataset.brand.name,
      todayCM,
      todayCMVsTarget: ((todayCM - targetDailyCM) / targetDailyCM) * 100,
      todayCMVsYesterday: yesterdayCM > 0 ? ((todayCM - yesterdayCM) / yesterdayCM) * 100 : 0,
      topActions: DEMO_ACTIONS.slice(0, 3).map((a) => ({
        title: a.title,
        expectedImpact: a.expectedImpact,
        agent: a.agent,
      })),
    })

    return NextResponse.json({
      date: new Date(),
      contributionMargin: todayCM,
      ...narrative,
      topActions: DEMO_ACTIONS.slice(0, 3),
    })
  } catch (err) {
    console.error("Daily brief error:", err)
    return NextResponse.json({ error: "Brief generation failed" }, { status: 500 })
  }
}
