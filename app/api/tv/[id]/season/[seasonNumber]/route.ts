import { NextResponse } from "next/server"
import { getTvSeasonDetails } from "@/shared/service/tmdb/tv"

export async function GET(
	_req: Request,
	{ params }: { params: Promise<{ id: string; seasonNumber: string }> }
): Promise<Response> {
	const { id, seasonNumber } = await params
	const seriesId = parseInt(id, 10)
	const season = parseInt(seasonNumber, 10)

	if (isNaN(seriesId)) {
		return NextResponse.json({ error: "Invalid series ID" }, { status: 400 })
	}

	if (isNaN(season)) {
		return NextResponse.json({ error: "Invalid season number" }, { status: 400 })
	}

	try {
		const data = await getTvSeasonDetails(seriesId, season)
		return NextResponse.json(data)
	} catch (error) {
		const message = error instanceof Error ? error.message : "Unknown error"
		return NextResponse.json({ error: message }, { status: 500 })
	}
}
