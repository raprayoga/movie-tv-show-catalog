import type {
	TMDBTVDetail,
	TMDbSeasonDetails,
	TMDbTVAggregateCredits,
	TMDbTVImages,
	TMDbTVRecommendations,
	TMDbAccountState,
} from "@/shared/interface/tmdb"

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

export async function getTvDetails(seriesId: number): Promise<TMDBTVDetail> {
	return tmdbRequest<TMDBTVDetail>(`/tv/${seriesId}`)
}

export async function getTvSeasonDetails(
	seriesId: number,
	seasonNumber: number
): Promise<TMDbSeasonDetails> {
	return tmdbRequest<TMDbSeasonDetails>(`/tv/${seriesId}/season/${seasonNumber}`)
}

export async function getTvAggregateCredits(seriesId: number): Promise<TMDbTVAggregateCredits> {
	return tmdbRequest<TMDbTVAggregateCredits>(`/tv/${seriesId}/aggregate_credits`)
}

export async function getTvImages(seriesId: number): Promise<TMDbTVImages> {
	return tmdbRequest<TMDbTVImages>(`/tv/${seriesId}/images`)
}

export async function getTvRecommendations(seriesId: number): Promise<TMDbTVRecommendations> {
	return tmdbRequest<TMDbTVRecommendations>(`/tv/${seriesId}/recommendations`)
}

export async function getTvAccountStates(
	seriesId: number,
	sessionId: string
): Promise<TMDbAccountState> {
	return tmdbRequest<TMDbAccountState>(
		`/tv/${seriesId}/account_states?session_id=${sessionId}`
	)
}

export async function addToWatchlist(
	accountId: string,
	sessionId: string,
	mediaType: "movie" | "tv",
	mediaId: number,
	watchlist: boolean
): Promise<{ success: boolean; status_code: number }> {
	return tmdbRequest<{ success: boolean; status_code: number }>(
		`/account/${accountId}/watchlist`,
		{
			method: "POST",
			body: JSON.stringify({
				media_type: mediaType,
				media_id: mediaId,
				watchlist,
			}),
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${getAccessToken()}`,
				"Session-Id": sessionId,
			},
		}
	)
}
