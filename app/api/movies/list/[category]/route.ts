import { NextResponse } from "next/server"
import {
	getNowPlayingMovies,
	getTopRatedMovies,
	getUpcomingMovies,
	getPopularMovies,
} from "@/shared/service/tmdb/movie"
import type {
	TMDbMovieListResponse,
} from "@/shared/interface/tmdb"

type MovieCategory = "now-playing" | "top-rated" | "upcoming" | "popular"

const categoryHandlers: Record<MovieCategory, () => Promise<TMDbMovieListResponse>> = {
	"now-playing": getNowPlayingMovies,
	"top-rated": getTopRatedMovies,
	upcoming: getUpcomingMovies,
	popular: getPopularMovies,
}

export async function GET(
	_req: Request,
	{ params }: { params: Promise<{ category: string }> }
): Promise<Response> {
	const { category } = await params

	const categoryHandler = categoryHandlers[category as MovieCategory]
	if (!categoryHandler) {
		return NextResponse.json({ error: "Invalid category" }, { status: 400 })
	}

	try {
		const data = await categoryHandler()
		return NextResponse.json(data)
	} catch (error) {
		const message = error instanceof Error ? error.message : "Unknown error"
		return NextResponse.json({ error: message }, { status: 500 })
	}
}
