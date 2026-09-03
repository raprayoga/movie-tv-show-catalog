"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import useSWR from "swr"

import Hero from "@/shared/components/Hero"
import ContentSection from "@/shared/components/ContentSection"
import {
	TMDBMediaItem,
	TMDbMovieListResponse,
} from "@/shared/interface/tmdb"

type MovieCategory = "now-playing" | "top-rated" | "upcoming" | "popular"

const fetcher = async (key: MovieCategory): Promise<TMDbMovieListResponse> => {
	const res = await fetch(`/api/movies/list/${key}`)
	if (!res.ok) {
		throw new Error(`Failed to fetch ${key}`)
	}
	return res.json()
}

export default function MoviesPage() {
	const router = useRouter()

	const handleItemClick = (item: TMDBMediaItem) => {
		router.push(`/movies/${item.id}`)
	}

	const { data: nowPlaying, isLoading: isLoadingNowPlaying } = useSWR<TMDbMovieListResponse>(
		"now-playing",
		() => fetcher("now-playing")
	)

	const { data: topRated, isLoading: isLoadingTopRated } = useSWR<TMDbMovieListResponse>(
		"top-rated",
		() => fetcher("top-rated")
	)

	const { data: upcoming, isLoading: isLoadingUpcoming } = useSWR<TMDbMovieListResponse>(
		"upcoming",
		() => fetcher("upcoming")
	)

	const { data: popular, isLoading: isLoadingPopular } = useSWR<TMDbMovieListResponse>(
		"popular",
		() => fetcher("popular")
	)

	const nowPlayingItems: TMDBMediaItem[] = (nowPlaying?.results || []).map((item) => ({
		...item,
		media_type: "movie" as const,
	}))

	const topRatedItems: TMDBMediaItem[] = (topRated?.results || []).map((item) => ({
		...item,
		media_type: "movie" as const,
	}))

	const upcomingItems: TMDBMediaItem[] = (upcoming?.results || []).map((item) => ({
		...item,
		media_type: "movie" as const,
	}))

	const popularItems: TMDBMediaItem[] = (popular?.results || []).map((item) => ({
		...item,
		media_type: "movie" as const,
	}))

	return (
		<div className="min-h-screen bg-bg-primary">
			<Hero items={nowPlayingItems} isLoading={isLoadingNowPlaying} onItemClick={handleItemClick} />

			<div className="mt-6">
				<ContentSection
					title="Top Rated"
					items={topRatedItems}
					isLoading={isLoadingTopRated}
					onItemClick={handleItemClick}
				/>

				<ContentSection
					title="Upcoming"
					items={upcomingItems}
					isLoading={isLoadingUpcoming}
					onItemClick={handleItemClick}
				/>

				<ContentSection
					title="Popular"
					items={popularItems}
					isLoading={isLoadingPopular}
					onItemClick={handleItemClick}
				/>

				<ContentSection
					title="Now Playing"
					items={nowPlayingItems}
					isLoading={isLoadingNowPlaying}
					onItemClick={handleItemClick}
				/>
			</div>
		</div>
	)
}
