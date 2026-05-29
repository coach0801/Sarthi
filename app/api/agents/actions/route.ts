import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { DEMO_ACTIONS } from "@/lib/demo-data/actions"

export async function GET(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  return NextResponse.json(DEMO_ACTIONS)
}

export async function PATCH(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const { actionId, status } = body

  if (!actionId || !["approved", "declined"].includes(status)) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }

  // In production: update DB, trigger execution gateway if approved
  return NextResponse.json({
    id: actionId,
    status,
    executedAt: status === "approved" ? new Date() : null,
    message: status === "approved" ? "Action queued for execution" : "Action declined",
  })
}
