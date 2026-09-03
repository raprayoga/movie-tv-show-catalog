import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getTvAccountStates } from "@/shared/service/tmdb/tv"

export async function GET(
	_req: Request,
	{ params }: { params: Promise<{ id: string }> }
): Promise<Response> {
	const { id } = await params
	const seriesId = parseInt(id, 10)

	if (isNaN(seriesId)) {
		return NextResponse.json({ error: "Invalid series ID" }, { status: 400 })
	}

	const cookieStore = await cookies()
	const sessionId = cookieStore.get("session_id")?.value

	if (!sessionId) {
		return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
	}

	try {
		const data = await getTvAccountStates(seriesId, sessionId)
		return NextResponse.json(data)
	} catch (error) {
		const message = error instanceof Error ? error.message : "Unknown error"
		return NextResponse.json({ error: message }, { status: 500 })
	}
}
