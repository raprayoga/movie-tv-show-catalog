import { NextResponse } from "next/server"
import { searchAll } from "@/shared/service/tmdb/search"

export async function GET(request: Request): Promise<Response> {
	const { searchParams } = new URL(request.url)
	const query = searchParams.get("q")

	if (!query || query.trim() === "") {
		return NextResponse.json({ results: [] })
	}

	const trimmedQuery = query.trim()
	if (trimmedQuery.length < 2) {
		return NextResponse.json({ results: [] })
	}

	try {
		const data = await searchAll(trimmedQuery, 20)
		return NextResponse.json(data)
	} catch (error) {
		const message = error instanceof Error ? error.message : "Unknown error"
		return NextResponse.json({ error: message }, { status: 500 })
	}
}
