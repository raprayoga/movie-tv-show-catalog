import type { TMDBMovieResult, TMDbTVResult, TMDBMediaType } from "@/shared/interface/tmdb"

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

export interface SearchResult {
	id: number
	mediaType: TMDBMediaType
	title: string
	posterPath: string | null
	backdropPath: string | null
	overview: string
	releaseDate: string | null
	voteAverage: number
}

interface TMDbSearchMovieResponse {
	page: number
	results: TMDBMovieResult[]
	total_pages: number
	total_results: number
}

interface TMDbSearchTVResponse {
	page: number
	results: TMDbTVResult[]
	total_pages: number
	total_results: number
}

function normalizeMovieResult(movie: TMDBMovieResult): SearchResult {
	return {
		id: movie.id,
		mediaType: "movie",
		title: movie.title,
		posterPath: movie.poster_path,
		backdropPath: movie.backdrop_path,
		overview: movie.overview,
		releaseDate: movie.release_date || null,
		voteAverage: movie.vote_average,
	}
}

function normalizeTVResult(tv: TMDbTVResult): SearchResult {
	return {
		id: tv.id,
		mediaType: "tv",
		title: tv.name,
		posterPath: tv.poster_path,
		backdropPath: tv.backdrop_path,
		overview: tv.overview,
		releaseDate: tv.first_air_date || null,
		voteAverage: tv.vote_average,
	}
}

export async function searchMovies(query: string): Promise<SearchResult[]> {
	const searchParams = new URLSearchParams({ query, include_adult: "false" })
	const data = await tmdbRequest<TMDbSearchMovieResponse>(
		`/search/movie?${searchParams.toString()}`
	)
	return data.results.map(normalizeMovieResult)
}

export async function searchTV(query: string): Promise<SearchResult[]> {
	const searchParams = new URLSearchParams({ query })
	const data = await tmdbRequest<TMDbSearchTVResponse>(`/search/tv?${searchParams.toString()}`)
	return data.results.map(normalizeTVResult)
}

export interface SearchResponse {
	results: SearchResult[]
}

export async function searchAll(query: string, limit: number = 20): Promise<SearchResponse> {
	const [movies, tvShows] = await Promise.all([searchMovies(query), searchTV(query)])

	const combined: SearchResult[] = []
	const movieResults = [...movies]
	const tvResults = [...tvShows]

	while (combined.length < limit) {
		if (movieResults.length === 0 && tvResults.length === 0) {
			break
		}

		if (movieResults.length > 0) {
			combined.push(movieResults.shift()!)
		}

		if (combined.length >= limit) {
			break
		}

		if (tvResults.length > 0) {
			combined.push(tvResults.shift()!)
		}
	}

	return { results: combined }
}
