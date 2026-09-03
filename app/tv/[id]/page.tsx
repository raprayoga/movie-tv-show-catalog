"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import useSWR from "swr"

import ContentSection from "@/shared/components/ContentSection"
import WatchlistButton from "@/shared/components/WatchlistButton"
import { useCurrentUser } from "@/shared/hooks/use-current-user"
import {
	type TMDBTVDetail,
	type TMDbTVAggregateCredits,
	type TMDbTVImages,
	type TMDbTVRecommendations,
	type TMDbAccountState,
	type TMDBMediaItem,
} from "@/shared/interface/tmdb"
import {
	TVHero,
	CastSection,
	PhotosSection,
	DetailsSection,
	SeasonsSection,
	TVDetailSkeleton,
} from "./components"

const fetcher = async (url: string) => {
	const res = await fetch(url)
	if (!res.ok) throw new Error("Failed to fetch")
	return res.json()
}

interface TVDetailPageProps {
	params: Promise<{ id: string }>
}

export default function TVDetailPage({ params }: TVDetailPageProps) {
	const router = useRouter()
	const resolvedParams = React.use(params)
	const seriesId = resolvedParams.id

	const { isAuthenticated } = useCurrentUser()

	const handleItemClick = (item: TMDBMediaItem) => {
		const route = item.media_type === "tv" ? "/tv" : "/movies"
		router.push(`${route}/${item.id}`)
	}

	const { data: tv, isLoading: isLoadingTV } = useSWR<TMDBTVDetail>(
		`/api/tv/${seriesId}`,
		fetcher
	)

	const { data: credits, isLoading: isLoadingCredits } = useSWR<TMDbTVAggregateCredits>(
		`/api/tv/${seriesId}/credits`,
		fetcher
	)

	const { data: images, isLoading: isLoadingImages } = useSWR<TMDbTVImages>(
		`/api/tv/${seriesId}/images`,
		fetcher
	)

	const { data: recommendations, isLoading: isLoadingRecommendations } = useSWR<TMDbTVRecommendations>(
		`/api/tv/${seriesId}/recommendations`,
		fetcher
	)

	const { data: accountState, isLoading: isLoadingAccountState, mutate: mutateAccountState } = useSWR<TMDbAccountState>(
		isAuthenticated ? `/api/tv/${seriesId}/account-state` : null,
		fetcher
	)

	const isInWatchlist = accountState?.watchlist ?? false

	if (isLoadingTV) {
		return <TVDetailSkeleton />
	}

	if (!tv) {
		return (
			<div className="min-h-screen bg-bg-primary flex items-center justify-center">
				<p className="text-text-secondary">TV series not found</p>
			</div>
		)
	}

	const recommendationItems: TMDBMediaItem[] = (recommendations?.results || [])
		.slice(0, 10)
		.map((item) => ({
			...item,
			media_type: "tv" as const,
		}))

	return (
		<article className="min-h-screen bg-bg-primary">
			<TVHero tv={tv}>
				<WatchlistButton
					mediaType="tv"
					mediaId={tv.id}
					isInWatchlist={isInWatchlist}
					isLoading={isLoadingAccountState}
					size="lg"
					onSuccess={() => mutateAccountState()}
				/>
			</TVHero>

			<div className="max-w-7xl mx-auto px-4">
				{tv.seasons && tv.seasons.length > 0 && (
					<SeasonsSection
						seasons={tv.seasons}
						seriesId={tv.id}
						initialSeasonNumber={1}
					/>
				)}

				{credits?.cast && credits.cast.length > 0 && (
					<CastSection cast={credits.cast} isLoading={isLoadingCredits} />
				)}

				{images?.backdrops && images.backdrops.length > 0 && (
					<PhotosSection images={images.backdrops} isLoading={isLoadingImages} />
				)}

				<DetailsSection tv={tv} />

				{recommendationItems.length > 0 && (
					<ContentSection
						title="You May Also Like"
						items={recommendationItems}
						isLoading={isLoadingRecommendations}
						onItemClick={handleItemClick}
					/>
				)}
			</div>
		</article>
	)
}
