import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getWatchlistMovies } from "@/shared/service/tmdb/watchlist"

export async function GET(): Promise<Response> {
	const cookieStore = await cookies()
	const sessionId = cookieStore.get("tmdb_session_id")?.value
	const accountId = cookieStore.get("tmdb_account")?.value

	if (!sessionId || !accountId) {
		return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
	}

	let accountIdObj: { id: number }
	try {
		accountIdObj = JSON.parse(accountId)
	} catch {
		return NextResponse.json({ error: "Invalid account data" }, { status: 400 })
	}

	const page = 1

	try {
		const data = await getWatchlistMovies(String(accountIdObj.id), sessionId, page)
		return NextResponse.json(data)
	} catch (error) {
		const message = error instanceof Error ? error.message : "Unknown error"
		return NextResponse.json({ error: message }, { status: 500 })
	}
}
