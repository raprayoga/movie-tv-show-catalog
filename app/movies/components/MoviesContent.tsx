"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { TMDBMediaItem } from "@/shared/interface/tmdb"
import Hero from "@/shared/components/Hero"
import ContentSection from "@/shared/components/ContentSection"
import { useWatchlist, toggleWatchlist } from "@/shared/hooks/use-watchlist"
import { useCurrentUser } from "@/shared/hooks/use-current-user"

interface MoviesContentProps {
	heroItems: TMDBMediaItem[]
	topRatedItems: TMDBMediaItem[]
	upcomingItems: TMDBMediaItem[]
	popularItems: TMDBMediaItem[]
	nowPlayingItems: TMDBMediaItem[]
}

export default function MoviesContent({
	heroItems,
	topRatedItems,
	upcomingItems,
	popularItems,
	nowPlayingItems,
}: MoviesContentProps) {
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

	const heroWatchlistId = heroItems[0]?.id
	const heroIsInWatchlist = heroItems[0] ? watchlistIds.has(heroItems[0].id) : false

	return (
		<div className="min-h-screen bg-bg-primary">
			<Hero
				items={heroItems}
				isLoading={false}
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
					isLoading={false}
					onItemClick={handleItemClick}
					showWatchlistButton={isAuthenticated && !isLoadingWatchlist}
					watchlistIds={watchlistIds}
					onWatchlistToggle={handleContentWatchlistToggle}
					isWatchlistLoading={isWatchlistMutating}
				/>

				<ContentSection
					title="Upcoming"
					items={upcomingItems}
					isLoading={false}
					onItemClick={handleItemClick}
					showWatchlistButton={isAuthenticated && !isLoadingWatchlist}
					watchlistIds={watchlistIds}
					onWatchlistToggle={handleContentWatchlistToggle}
					isWatchlistLoading={isWatchlistMutating}
				/>

				<ContentSection
					title="Popular"
					items={popularItems}
					isLoading={false}
					onItemClick={handleItemClick}
					showWatchlistButton={isAuthenticated && !isLoadingWatchlist}
					watchlistIds={watchlistIds}
					onWatchlistToggle={handleContentWatchlistToggle}
					isWatchlistLoading={isWatchlistMutating}
				/>

				<ContentSection
					title="Now Playing"
					items={nowPlayingItems}
					isLoading={false}
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
