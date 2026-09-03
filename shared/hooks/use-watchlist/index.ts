"use client"

import useSWR, { mutate } from "swr"
import type { TMDBMovieResult, TMDbTVResult, TMDBMediaType } from "@/shared/interface/tmdb"
import type { TMDbMovieListResponse, TMDbTVListResponse } from "@/shared/interface/tmdb"

const fetcher = async (url: string) => {
	const res = await fetch(url)
	if (!res.ok) throw new Error("Failed to fetch")
	return res.json()
}

export interface WatchlistItem {
	id: number
	mediaType: TMDBMediaType
	title?: string
	name?: string
	poster_path: string | null
	backdrop_path: string | null
	overview: string
	release_date?: string
	first_air_date?: string
	vote_average: number
	vote_count: number
}

export function useWatchlistMovies() {
	const { data, error, isLoading, mutate: mutateMovies } = useSWR<TMDbMovieListResponse, Error>(
		"/api/watchlist/movies",
		fetcher,
		{
			revalidateOnFocus: false,
		}
	)

	const movies: WatchlistItem[] = (data?.results || []).map((item) => ({
		...item,
		mediaType: "movie" as const,
	}))

	return {
		movies,
		totalPages: data?.total_pages || 0,
		totalResults: data?.total_results || 0,
		isLoading,
		isError: !!error,
		mutate: mutateMovies,
	}
}

export function useWatchlistTV() {
	const { data, error, isLoading, mutate: mutateTV } = useSWR<TMDbTVListResponse, Error>(
		"/api/watchlist/tv",
		fetcher,
		{
			revalidateOnFocus: false,
		}
	)

	const tvShows: WatchlistItem[] = (data?.results || []).map((item) => ({
		...item,
		mediaType: "tv" as const,
	}))

	return {
		tvShows,
		totalPages: data?.total_pages || 0,
		totalResults: data?.total_results || 0,
		isLoading,
		isError: !!error,
		mutate: mutateTV,
	}
}

export function useWatchlist() {
	const { movies, mutate: mutateMovies, ...moviesRest } = useWatchlistMovies()
	const { tvShows, mutate: mutateTV, ...tvRest } = useWatchlistTV()

	const allItems: WatchlistItem[] = [...movies, ...tvShows]

	const mutate = () => {
		mutateMovies()
		mutateTV()
	}

	return {
		allItems,
		movies,
		tvShows,
		isLoading: moviesRest.isLoading || tvRest.isLoading,
		isError: moviesRest.isError || tvRest.isError,
		mutate,
	}
}

export async function removeFromWatchlist(
	mediaType: TMDBMediaType,
	mediaId: number
): Promise<boolean> {
	const endpoint = mediaType === "movie" ? `/api/movies/${mediaId}/watchlist` : `/api/tv/${mediaId}/watchlist`

	try {
		const res = await fetch(endpoint, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ watchlist: false }),
		})

		if (res.ok) {
			mutate("/api/watchlist/movies")
			mutate("/api/watchlist/tv")
			return true
		}
		return false
	} catch {
		return false
	}
}

export async function toggleWatchlist(
	mediaType: TMDBMediaType,
	mediaId: number,
	add: boolean
): Promise<boolean> {
	const endpoint = mediaType === "movie" ? `/api/movies/${mediaId}/watchlist` : `/api/tv/${mediaId}/watchlist`

	try {
		const res = await fetch(endpoint, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ watchlist: add }),
		})

		if (res.ok) {
			mutate("/api/watchlist/movies")
			mutate("/api/watchlist/tv")
			return true
		}
		return false
	} catch {
		return false
	}
}
