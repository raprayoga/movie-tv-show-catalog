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

export interface TMDBTVDetail extends TMDbTVResult {
	homepage: string | null
	original_language: string
	origin_country: string[]
	production_companies: {
		id: number
		logo_path: string | null
		name: string
		origin_country: string
	}[]
	spoken_languages: {
		iso_639_1: string
		english_name: string
		name: string
	}[]
	status: string
	tagline: string | null
	type: string
	created_by: {
		id: number
		credit_id: string
		name: string
		original_name: string
		gender: number
		profile_path: string | null
	}[]
	networks: {
		id: number
		name: string
		logo_path: string | null
		origin_country: string
	}[]
	genres: TMDBGenre[]
	episode_run_time: number[]
	last_air_date: string
	in_production: boolean
	number_of_episodes: number
	number_of_seasons: number
	seasons: TMDbSeason[]
}

export interface TMDbSeason {
	id: number
	name: string
	overview: string | null
	poster_path: string | null
	season_number: number
	air_date: string | null
	episode_count: number
}

export interface TMDbEpisode {
	id: number
	name: string
	overview: string | null
	vote_average: number
	vote_count: number
	still_path: string | null
	season_number: number
	episode_number: number
	air_date: string | null
	runtime: number | null
	show_id: number
}

export interface TMDbSeasonDetails {
	_id: string
	id: number
	episodes: TMDbEpisode[]
	name: string
	overview: string | null
	poster_path: string | null
	season_number: number
	air_date: string | null
}

export interface TMDbTVAggregateCredits {
	id: number
	cast: TMDbTVCastMember[]
	crew: TMDbTVCrewMember[]
}

export interface TMDbTVCastMember {
	id: number
	name: string
	original_name: string
	profile_path: string | null
	character: string
	roles: {
		credit_id: string
		character: string
		episode_count: number
	}[]
	total_episode_count: number
	order: number
	adult: boolean
	gender: number | null
	known_for_department: string
	popularity: number
}

export interface TMDbTVCrewMember {
	id: number
	name: string
	original_name: string
	profile_path: string | null
	department: string
	jobs: {
		job: string
		episode_count: number
	}[]
	total_episode_count: number
	adult: boolean
	gender: number | null
	known_for_department: string
	popularity: number
}

export interface TMDbTVImages {
	backdrops: {
		aspect_ratio: number
		height: number
		iso_639_1: string | null
		file_path: string
		vote_average: number
		vote_count: number
		width: number
	}[]
	posters: {
		aspect_ratio: number
		height: number
		iso_639_1: string | null
		file_path: string
		vote_average: number
		vote_count: number
		width: number
	}[]
	logos: {
		aspect_ratio: number
		height: number
		iso_639_1: string | null
		file_path: string
		vote_average: number
		vote_count: number
		width: number
	}[]
}

export interface TMDbTVRecommendations {
	page: number
	results: TMDbTVResult[]
	total_pages: number
	total_results: number
}

export interface TMDbAccountState {
	id: number
	watchlist: boolean
	rated: boolean | {
		value: number
	}
	favorite: boolean
}
