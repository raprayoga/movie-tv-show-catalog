import { NextResponse } from "next/server"
import {
	getAiringTodayTV,
	getTopRatedTV,
	getOnTheAirTV,
	getPopularTV,
} from "@/shared/service/tmdb/movie"
import type { TMDbTVListResponse } from "@/shared/interface/tmdb"

type TVCategory = "airing-today" | "top-rated" | "on-the-air" | "popular"

const handlers: Record<TVCategory, () => Promise<TMDbTVListResponse>> = {
	"airing-today": getAiringTodayTV,
	"top-rated": getTopRatedTV,
	"on-the-air": getOnTheAirTV,
	popular: getPopularTV,
}

export async function GET(
	_req: Request,
	{ params }: { params: Promise<{ category: string }> }
): Promise<Response> {
	const { category } = await params
	const handler = handlers[category as TVCategory]

	if (!handler) {
		return NextResponse.json(
			{ error: `Unknown category: ${category}` },
			{ status: 400 }
		)
	}

	try {
		const data = await handler()
		return NextResponse.json(data)
	} catch (error) {
		const message = error instanceof Error ? error.message : "Unknown error"
		return NextResponse.json({ error: message }, { status: 500 })
	}
}
