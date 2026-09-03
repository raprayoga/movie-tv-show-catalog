"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { TMDBMediaItem } from "@/shared/interface/tmdb"
import Hero from "@/shared/components/Hero"
import ContentSection from "@/shared/components/ContentSection"
import { useWatchlist, toggleWatchlist } from "@/shared/hooks/use-watchlist"
import { useCurrentUser } from "@/shared/hooks/use-current-user"

interface HomeContentProps {
	heroItems: TMDBMediaItem[]
	popularMovieItems: TMDBMediaItem[]
	topRatedMovieItems: TMDBMediaItem[]
	upcomingMovieItems: TMDBMediaItem[]
	popularTVItems: TMDBMediaItem[]
	topRatedTVItems: TMDBMediaItem[]
	airingTodayItems: TMDBMediaItem[]
	nowPlayingItems: TMDBMediaItem[]
	onTheAirItems: TMDBMediaItem[]
}

export default function HomeContent({
	heroItems,
	popularMovieItems,
	topRatedMovieItems,
	upcomingMovieItems,
	popularTVItems,
	topRatedTVItems,
	airingTodayItems,
	nowPlayingItems,
	onTheAirItems,
}: HomeContentProps) {
	const router = useRouter()
	const { isAuthenticated } = useCurrentUser()
	const { allItems: watchlistItems, isLoading: isLoadingWatchlist } = useWatchlist()

	const [isWatchlistMutating, setIsWatchlistMutating] = React.useState(false)

	const watchlistIds = React.useMemo(() => {
		return new Set(watchlistItems.map((item) => item.id))
	}, [watchlistItems])

	const handleItemClick = (item: TMDBMediaItem) => {
		const route = item.media_type === "tv" ? "/tv" : "/movies"
		router.push(`${route}/${item.id}`)
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

	const currentHeroItem = heroItems[0]
	const heroWatchlistId = currentHeroItem?.id
	const heroWatchlistType = (currentHeroItem?.media_type || "movie") as "movie" | "tv"
	const heroIsInWatchlist = currentHeroItem ? watchlistIds.has(currentHeroItem.id) : false

	return (
		<div className="min-h-screen bg-bg-primary">
			<Hero
				items={heroItems}
				isLoading={false}
				maxItems={6}
				showMediaType
				onItemClick={handleItemClick}
				onWatchlistToggle={isAuthenticated ? handleWatchlistToggle : undefined}
				watchlistItemId={heroWatchlistId}
				watchlistItemType={heroWatchlistType}
				isInWatchlist={heroIsInWatchlist}
				isWatchlistLoading={isWatchlistMutating}
			/>

			<div className="mt-6">
				<ContentSection
					title="Popular Movies"
					items={popularMovieItems}
					isLoading={false}
					onItemClick={handleItemClick}
					showWatchlistButton={isAuthenticated && !isLoadingWatchlist}
					watchlistIds={watchlistIds}
					onWatchlistToggle={handleContentWatchlistToggle}
					isWatchlistLoading={isWatchlistMutating}
				/>

				<ContentSection
					title="Top Rated TV Shows"
					items={topRatedTVItems}
					isLoading={false}
					onItemClick={handleItemClick}
					showWatchlistButton={isAuthenticated && !isLoadingWatchlist}
					watchlistIds={watchlistIds}
					onWatchlistToggle={handleContentWatchlistToggle}
					isWatchlistLoading={isWatchlistMutating}
				/>

				<ContentSection
					title="Upcoming Movies"
					items={upcomingMovieItems}
					isLoading={false}
					onItemClick={handleItemClick}
					showWatchlistButton={isAuthenticated && !isLoadingWatchlist}
					watchlistIds={watchlistIds}
					onWatchlistToggle={handleContentWatchlistToggle}
					isWatchlistLoading={isWatchlistMutating}
				/>

				<ContentSection
					title="Popular TV Shows"
					items={popularTVItems}
					isLoading={false}
					onItemClick={handleItemClick}
					showWatchlistButton={isAuthenticated && !isLoadingWatchlist}
					watchlistIds={watchlistIds}
					onWatchlistToggle={handleContentWatchlistToggle}
					isWatchlistLoading={isWatchlistMutating}
				/>

				<ContentSection
					title="Top Rated Movies"
					items={topRatedMovieItems}
					isLoading={false}
					onItemClick={handleItemClick}
					showWatchlistButton={isAuthenticated && !isLoadingWatchlist}
					watchlistIds={watchlistIds}
					onWatchlistToggle={handleContentWatchlistToggle}
					isWatchlistLoading={isWatchlistMutating}
				/>

				<ContentSection
					title="Airing Today"
					items={airingTodayItems}
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

				<ContentSection
					title="On The Air"
					items={onTheAirItems}
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
