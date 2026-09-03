import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { addToWatchlist } from "@/shared/service/tmdb/movie"

export async function POST(
	req: Request,
	{ params }: { params: Promise<{ id: string }> }
): Promise<Response> {
	const { id } = await params
	const movieId = parseInt(id, 10)

	if (isNaN(movieId)) {
		return NextResponse.json({ error: "Invalid movie ID" }, { status: 400 })
	}

	const cookieStore = await cookies()
	const sessionId = cookieStore.get("session_id")?.value
	const accountId = cookieStore.get("account_id")?.value

	if (!sessionId || !accountId) {
		return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
	}

	let body: { watchlist?: boolean }
	try {
		body = await req.json()
	} catch {
		return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
	}

	if (typeof body.watchlist !== "boolean") {
		return NextResponse.json({ error: "Missing watchlist boolean" }, { status: 400 })
	}

	try {
		const data = await addToWatchlist(accountId, sessionId, "movie", movieId, body.watchlist)
		return NextResponse.json(data)
	} catch (error) {
		const message = error instanceof Error ? error.message : "Unknown error"
		return NextResponse.json({ error: message }, { status: 500 })
	}
}
