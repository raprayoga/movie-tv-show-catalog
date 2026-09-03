import type {
	TMDbMovieListResponse,
	TMDbTVListResponse,
	TMDBMediaItem,
	TMDBMovieDetail,
	TMDbMovieCredits,
	TMDbMovieImages,
	TMDbMovieRecommendations,
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

export type ContentType = "movie" | "tv"

export interface ContentRow {
	title: string
	endpoint: string
	contentType: ContentType
}

export const CONTENT_ROWS: ContentRow[] = [
	{ title: "Top Rated", endpoint: "/trending/all/week", contentType: "movie" },
	{ title: "Upcoming", endpoint: "/movie/upcoming", contentType: "movie" },
	{ title: "Popular", endpoint: "/movie/popular", contentType: "movie" },
	{ title: "Now Playing", endpoint: "/movie/now_playing", contentType: "movie" },
]

export async function getMovieList(
	endpoint: string,
	params: Record<string, string> = {}
): Promise<TMDbMovieListResponse> {
	const searchParams = new URLSearchParams(params)
	const url = `${endpoint}?${searchParams.toString()}`
	return tmdbRequest<TMDbMovieListResponse>(url)
}

export async function getTVList(
	endpoint: string,
	params: Record<string, string> = {}
): Promise<TMDbTVListResponse> {
	const searchParams = new URLSearchParams(params)
	const url = `${endpoint}?${searchParams.toString()}`
	return tmdbRequest<TMDbTVListResponse>(url)
}

export async function getTrending(
	timezone: "day" | "week" = "week",
	params: Record<string, string> = {}
): Promise<{ page: number; results: TMDBMediaItem[]; total_pages: number; total_results: number }> {
	const searchParams = new URLSearchParams({ ...params })
	const url = `/trending/all/${timezone}?${searchParams.toString()}`
	return tmdbRequest(url)
}

export async function getNowPlayingMovies(): Promise<TMDbMovieListResponse> {
	return getMovieList("/movie/now_playing")
}

export async function getPopularMovies(): Promise<TMDbMovieListResponse> {
	return getMovieList("/movie/popular")
}

export async function getTopRatedMovies(): Promise<TMDbMovieListResponse> {
	return getMovieList("/movie/top_rated")
}

export async function getUpcomingMovies(): Promise<TMDbMovieListResponse> {
	return getMovieList("/movie/upcoming")
}

export async function getPopularTV(): Promise<TMDbTVListResponse> {
	return getTVList("/tv/popular")
}

export async function getTopRatedTV(): Promise<TMDbTVListResponse> {
	return getTVList("/tv/top_rated")
}

export async function getAiringTodayTV(): Promise<TMDbTVListResponse> {
	return getTVList("/tv/airing_today")
}

export async function getOnTheAirTV(): Promise<TMDbTVListResponse> {
	return getTVList("/tv/on_the_air")
}

export async function getMovieDetails(movieId: number): Promise<TMDBMovieDetail> {
	return tmdbRequest<TMDBMovieDetail>(`/movie/${movieId}`)
}

export async function getMovieCredits(movieId: number): Promise<TMDbMovieCredits> {
	return tmdbRequest<TMDbMovieCredits>(`/movie/${movieId}/credits`)
}

export async function getMovieImages(movieId: number): Promise<TMDbMovieImages> {
	return tmdbRequest<TMDbMovieImages>(`/movie/${movieId}/images`)
}

export async function getMovieRecommendations(movieId: number): Promise<TMDbMovieRecommendations> {
	return tmdbRequest<TMDbMovieRecommendations>(`/movie/${movieId}/recommendations`)
}

export async function getMovieAccountStates(
	movieId: number,
	sessionId: string
): Promise<TMDbAccountState> {
	return tmdbRequest<TMDbAccountState>(
		`/movie/${movieId}/account_states?session_id=${sessionId}`
	)
}

export async function addToWatchlist(
	accountId: string,
	sessionId: string,
	mediaType: string,
	mediaId: number,
	watchlist: boolean
): Promise<{ status_code: number; status_message: string }> {
	return tmdbRequest<{ status_code: number; status_message: string }>(
		`/account/${accountId}/watchlist`,
		{
			method: "POST",
			body: JSON.stringify({
				media_type: mediaType,
				media_id: mediaId,
				watchlist,
			}),
			headers: {
				Authorization: `Bearer ${getAccessToken()}`,
				"Content-Type": "application/json",
				session_id: sessionId,
			},
		}
	)
}
