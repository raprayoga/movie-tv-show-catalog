import { NextResponse } from "next/server"
import { getMovieRecommendations } from "@/shared/service/tmdb/movie"

export async function GET(
	_req: Request,
	{ params }: { params: Promise<{ id: string }> }
): Promise<Response> {
	const { id } = await params
	const movieId = parseInt(id, 10)

	if (isNaN(movieId)) {
		return NextResponse.json({ error: "Invalid movie ID" }, { status: 400 })
	}

	try {
		const data = await getMovieRecommendations(movieId)
		return NextResponse.json(data)
	} catch (error) {
		const message = error instanceof Error ? error.message : "Unknown error"
		return NextResponse.json({ error: message }, { status: 500 })
	}
}
