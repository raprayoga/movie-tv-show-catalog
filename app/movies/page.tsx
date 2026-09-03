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
import { useWatchlist, toggleWatchlist } from "@/shared/hooks/use-watchlist"
import { useCurrentUser } from "@/shared/hooks/use-current-user"

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
	const { isAuthenticated } = useCurrentUser()
	const { allItems: watchlistItems, isLoading: isLoadingWatchlist } = useWatchlist()

	const [isWatchlistMutating, setIsWatchlistMutating] = React.useState(false)

	const watchlistIds = React.useMemo(() => {
		return new Set(watchlistItems.map((item) => item.id))
	}, [watchlistItems])

	const handleItemClick = (item: TMDBMediaItem) => {
		router.push(`/movies/${item.id}`)
	}

	const handleWatchlistToggle = async (item: TMDBMediaItem, newState: boolean) => {
		if (!isAuthenticated) return
		setIsWatchlistMutating(true)
		await toggleWatchlist(item.media_type || "movie", item.id, newState)
		setIsWatchlistMutating(false)
	}

	const handleContentWatchlistToggle = async (mediaType: "movie" | "tv", mediaId: number, newState: boolean) => {
		if (!isAuthenticated) return
		await toggleWatchlist(mediaType, mediaId, newState)
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

	const heroItems = nowPlayingItems.slice(0, 3)
	const heroWatchlistId = heroItems[0]?.id
	const heroIsInWatchlist = heroItems[0] ? watchlistIds.has(heroItems[0].id) : false

	return (
		<div className="min-h-screen bg-bg-primary">
			<Hero
				items={heroItems}
				isLoading={isLoadingNowPlaying}
				onItemClick={handleItemClick}
				onWatchlistToggle={isAuthenticated ? handleWatchlistToggle : undefined}
				watchlistItemId={heroWatchlistId}
				watchlistItemType="movie"
				isInWatchlist={heroIsInWatchlist}
				isWatchlistLoading={isWatchlistMutating}
			/>

			<div className="mt-6">
				<ContentSection
					title="Top Rated"
					items={topRatedItems}
					isLoading={isLoadingTopRated}
					onItemClick={handleItemClick}
					showWatchlistButton={isAuthenticated && !isLoadingWatchlist}
					watchlistIds={watchlistIds}
					onWatchlistToggle={handleContentWatchlistToggle}
					isWatchlistLoading={isWatchlistMutating}
				/>

				<ContentSection
					title="Upcoming"
					items={upcomingItems}
					isLoading={isLoadingUpcoming}
					onItemClick={handleItemClick}
					showWatchlistButton={isAuthenticated && !isLoadingWatchlist}
					watchlistIds={watchlistIds}
					onWatchlistToggle={handleContentWatchlistToggle}
					isWatchlistLoading={isWatchlistMutating}
				/>

				<ContentSection
					title="Popular"
					items={popularItems}
					isLoading={isLoadingPopular}
					onItemClick={handleItemClick}
					showWatchlistButton={isAuthenticated && !isLoadingWatchlist}
					watchlistIds={watchlistIds}
					onWatchlistToggle={handleContentWatchlistToggle}
					isWatchlistLoading={isWatchlistMutating}
				/>

				<ContentSection
					title="Now Playing"
					items={nowPlayingItems}
					isLoading={isLoadingNowPlaying}
					onItemClick={handleItemClick}
					showWatchlistButton={isAuthenticated && !isLoadingWatchlist}
					watchlistIds={watchlistIds}
					onWatchlistToggle={handleContentWatchlistToggle}
					isWatchlistLoading={isWatchlistMutating}
				/>
			</div>
		</div>
	)
}
