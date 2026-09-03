import type { TMDbMovieListResponse, TMDbTVListResponse } from "@/shared/interface/tmdb"

const TMDB_API_BASE = process.env.TMDB_API_BASE_URL || "https://api.themoviedb.org/3"

function getAccessToken(): string {
	const token = process.env.TMDB_API_READ_ACCESS_TOKEN
	if (!token) {
		throw new Error("TMDB API access token is not configured")
	}
	return token
}

async function tmdbRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
	const url = `${TMDB_API_BASE}${endpoint}`
	const response = await fetch(url, {
		...options,
		headers: {
			Authorization: `Bearer ${getAccessToken()}`,
			"Content-Type": "application/json",
			...options.headers,
		},
	})

	if (!response.ok) {
		const errorData = await response.json().catch(() => ({}))
		throw new Error(errorData.status_message || `TMDB API error: ${response.status}`)
	}

	return response.json()
}

export async function getWatchlistMovies(
	accountId: string,
	sessionId: string,
	page: number = 1
): Promise<TMDbMovieListResponse> {
	return tmdbRequest<TMDbMovieListResponse>(
		`/account/${accountId}/watchlist/movies?session_id=${sessionId}&page=${page}`
	)
}

export async function getWatchlistTV(
	accountId: string,
	sessionId: string,
	page: number = 1
): Promise<TMDbTVListResponse> {
	return tmdbRequest<TMDbTVListResponse>(
		`/account/${accountId}/watchlist/tv?session_id=${sessionId}&page=${page}`
	)
}
