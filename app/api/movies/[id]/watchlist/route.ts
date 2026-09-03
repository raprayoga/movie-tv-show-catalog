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
	const sessionId = cookieStore.get("tmdb_session_id")?.value
	const accountCookie = cookieStore.get("tmdb_account")?.value

	if (!sessionId || !accountCookie) {
		return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
	}

	let accountObj: { id: number }
	try {
		accountObj = JSON.parse(accountCookie)
	} catch {
		return NextResponse.json({ error: "Invalid account data" }, { status: 400 })
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
		const data = await addToWatchlist(String(accountObj.id), sessionId, "movie", movieId, body.watchlist)
		return NextResponse.json(data)
	} catch (error) {
		const message = error instanceof Error ? error.message : "Unknown error"
		return NextResponse.json({ error: message }, { status: 500 })
	}
}
