import { NextResponse } from "next/server"
import { getTvDetails } from "@/shared/service/tmdb/tv"

export async function GET(
	_req: Request,
	{ params }: { params: Promise<{ id: string }> }
): Promise<Response> {
	const { id } = await params
	const seriesId = parseInt(id, 10)

	if (isNaN(seriesId)) {
		return NextResponse.json({ error: "Invalid series ID" }, { status: 400 })
	}

	try {
		const data = await getTvDetails(seriesId)
		return NextResponse.json(data)
	} catch (error) {
		const message = error instanceof Error ? error.message : "Unknown error"
		return NextResponse.json({ error: message }, { status: 500 })
	}
}
