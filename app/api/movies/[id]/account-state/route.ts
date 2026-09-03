import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getMovieAccountStates } from "@/shared/service/tmdb/movie"

export async function GET(
	_req: Request,
	{ params }: { params: Promise<{ id: string }> }
): Promise<Response> {
	const { id } = await params
	const movieId = parseInt(id, 10)

	if (isNaN(movieId)) {
		return NextResponse.json({ error: "Invalid movie ID" }, { status: 400 })
	}

	const cookieStore = await cookies()
	const sessionId = cookieStore.get("tmdb_session_id")?.value

	if (!sessionId) {
		return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
	}

	try {
		const data = await getMovieAccountStates(movieId, sessionId)
		return NextResponse.json(data)
	} catch (error) {
		const message = error instanceof Error ? error.message : "Unknown error"
		return NextResponse.json({ error: message }, { status: 500 })
	}
}
