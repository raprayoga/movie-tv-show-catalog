export interface TMDbImage {
	base_url: string
	secure_base_url: string
	backdrop_sizes: string[]
	logo_sizes: string[]
	poster_sizes: string[]
	profile_sizes: string[]
	still_sizes: string[]
}

export interface TMDBGenre {
	id: number
	name: string
}

export interface TMDBMovieResult {
	id: number
	title: string
	original_title: string
	overview: string
	poster_path: string | null
	backdrop_path: string | null
	release_date: string
	vote_average: number
	vote_count: number
	popularity: number
	adult: boolean
	video: boolean
	genre_ids: number[]
	original_language: string
}

export interface TMDbMovieListResponse {
	page: number
	results: TMDBMovieResult[]
	total_pages: number
	total_results: number
	dates?: {
		maximum: string
		minimum: string
	}
}

export interface TMDBMovieDetail extends TMDBMovieResult {
	belongs_to_collection: null | {
		id: number
		name: string
		poster_path: string | null
		backdrop_path: string | null
	}
	budget: number
	genres: TMDBGenre[]
	homepage: string | null
	imdb_id: string | null
	production_companies: {
		id: number
		logo_path: string | null
		name: string
		origin_country: string
	}[]
	production_countries: {
		iso_3166_1: string
		name: string
	}[]
	revenue: number
	runtime: number | null
	spoken_languages: {
		iso_639_1: string
		name: string
	}[]
	status: string
	tagline: string | null
}

export interface TMDbTVResult {
	id: number
	name: string
	original_name: string
	overview: string
	poster_path: string | null
	backdrop_path: string | null
	first_air_date: string
	vote_average: number
	vote_count: number
	popularity: number
	genre_ids: number[]
	original_language: string
}

export interface TMDbTVListResponse {
	page: number
	results: TMDbTVResult[]
	total_pages: number
	total_results: number
}

export interface TMDbMovieCredits {
	id: number
	cast: TMDbCastMember[]
	crew: TMDbCrewMember[]
}

export interface TMDbCastMember {
	id: number
	name: string
	original_name: string
	profile_path: string | null
	character: string
	credit_id: string
	order: number
}

export interface TMDbCrewMember {
	id: number
	name: string
	original_name: string
	profile_path: string | null
	credit_id: string
	department: string
	job: string
}

export interface TMDbMovieImages {
	id: number
	backdrops: TMDbImageData[]
	posters: TMDbImageData[]
}

export interface TMDbImageData {
	aspect_ratio: number
	height: number
	iso_639_1: string | null
	file_path: string
	vote_average: number
	vote_count: number
	width: number
}

export interface TMDbMovieRecommendations {
	page: number
	results: TMDBMovieResult[]
	total_pages: number
	total_results: number
}

export interface TMDbAccountState {
	id: number
	favorite: boolean
	rated: boolean | { value: number }
	watchlist: boolean
}

export type TMDBMediaType = "movie" | "tv"

export interface TMDBMediaItem {
	id: number
	title?: string
	name?: string
	overview: string
	poster_path: string | null
	backdrop_path: string | null
	release_date?: string
	first_air_date?: string
	vote_average: number
	vote_count: number
	genre_ids: number[]
	media_type?: TMDBMediaType
}

export function getImageUrl(
	path: string | null,
	size: "poster" | "backdrop" | "original" = "poster"
): string | null {
	if (!path) return null
	const baseUrl = "https://image.tmdb.org/t/p"
	const sizes = {
		poster: ["w92", "w154", "w185", "w342", "w500", "w780", "original"],
		backdrop: ["w300", "w780", "w1280", "original"],
		original: ["original"],
	}
	const targetSize = sizes[size][sizes[size].length - 2] || sizes[size][0]
	return `${baseUrl}/${targetSize}${path}`
}

export function formatYear(date: string | undefined): string {
	if (!date) return ""
	return date.split("-")[0] || ""
}
