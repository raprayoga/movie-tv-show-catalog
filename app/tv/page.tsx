"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import useSWR from "swr"

import Hero from "@/shared/components/Hero"
import ContentSection from "@/shared/components/ContentSection"
import {
	TMDBMediaItem,
	TMDbTVListResponse,
} from "@/shared/interface/tmdb"
import { useWatchlist, toggleWatchlist } from "@/shared/hooks/use-watchlist"
import { useCurrentUser } from "@/shared/hooks/use-current-user"

type TVCategory = "airing-today" | "top-rated" | "on-the-air" | "popular"

const fetcher = async (key: TVCategory): Promise<TMDbTVListResponse> => {
	const res = await fetch(`/api/tv/list/${key}`)
	if (!res.ok) {
		throw new Error(`Failed to fetch ${key}`)
	}
	return res.json()
}

export default function TVPage() {
	const router = useRouter()
	const { isAuthenticated } = useCurrentUser()
	const { allItems: watchlistItems, isLoading: isLoadingWatchlist } = useWatchlist()

	const [isWatchlistMutating, setIsWatchlistMutating] = React.useState(false)

	const watchlistIds = React.useMemo(() => {
		return new Set(watchlistItems.map((item) => item.id))
	}, [watchlistItems])

	const handleItemClick = (item: TMDBMediaItem) => {
		router.push(`/tv/${item.id}`)
	}

	const handleWatchlistToggle = async (item: TMDBMediaItem, newState: boolean) => {
		if (!isAuthenticated) return
		setIsWatchlistMutating(true)
		await toggleWatchlist(item.media_type || "tv", item.id, newState)
		setIsWatchlistMutating(false)
	}

	const handleContentWatchlistToggle = async (mediaType: "movie" | "tv", mediaId: number, newState: boolean) => {
		if (!isAuthenticated) return
		await toggleWatchlist(mediaType, mediaId, newState)
	}

	const { data: airingToday, isLoading: isLoadingAiringToday } = useSWR<TMDbTVListResponse>(
		"airing-today",
		() => fetcher("airing-today")
	)

	const { data: topRated, isLoading: isLoadingTopRated } = useSWR<TMDbTVListResponse>(
		"top-rated",
		() => fetcher("top-rated")
	)

	const { data: onTheAir, isLoading: isLoadingOnTheAir } = useSWR<TMDbTVListResponse>(
		"on-the-air",
		() => fetcher("on-the-air")
	)

	const { data: popular, isLoading: isLoadingPopular } = useSWR<TMDbTVListResponse>(
		"popular",
		() => fetcher("popular")
	)

	const airingTodayItems: TMDBMediaItem[] = (airingToday?.results || []).map((item) => ({
		...item,
		name: item.name,
		media_type: "tv" as const,
	}))

	const topRatedItems: TMDBMediaItem[] = (topRated?.results || []).map((item) => ({
		...item,
		name: item.name,
		media_type: "tv" as const,
	}))

	const onTheAirItems: TMDBMediaItem[] = (onTheAir?.results || []).map((item) => ({
		...item,
		name: item.name,
		media_type: "tv" as const,
	}))

	const popularItems: TMDBMediaItem[] = (popular?.results || []).map((item) => ({
		...item,
		name: item.name,
		media_type: "tv" as const,
	}))

	const heroItems = airingTodayItems.slice(0, 3)
	const heroWatchlistId = heroItems[0]?.id
	const heroIsInWatchlist = heroItems[0] ? watchlistIds.has(heroItems[0].id) : false

	return (
		<div className="min-h-screen bg-bg-primary">
			<Hero
				items={heroItems}
				isLoading={isLoadingAiringToday}
				onItemClick={handleItemClick}
				onWatchlistToggle={isAuthenticated ? handleWatchlistToggle : undefined}
				watchlistItemId={heroWatchlistId}
				watchlistItemType="tv"
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
					title="Airing Today"
					items={airingTodayItems}
					isLoading={isLoadingAiringToday}
					onItemClick={handleItemClick}
					showWatchlistButton={isAuthenticated && !isLoadingWatchlist}
					watchlistIds={watchlistIds}
					onWatchlistToggle={handleContentWatchlistToggle}
					isWatchlistLoading={isWatchlistMutating}
				/>

				<ContentSection
					title="On The Air"
					items={onTheAirItems}
					isLoading={isLoadingOnTheAir}
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
			</div>
		</div>
	)
}
