"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import useSWR from "swr"
import { Plus, Check } from "lucide-react"

import { Button } from "@/shared/components/Button"
import ContentSection from "@/shared/components/ContentSection"
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

	const { isAuthenticated, login } = useCurrentUser()

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

	const { data: accountState, isLoading: isLoadingAccountState } = useSWR<TMDbAccountState>(
		isAuthenticated ? `/api/tv/${seriesId}/account-state` : null,
		fetcher
	)

	const [watchlistLoading, setWatchlistLoading] = React.useState(false)

	const isInWatchlist = accountState?.watchlist ?? false

	const handleWatchlistToggle = async () => {
		if (!isAuthenticated) {
			login()
			return
		}

		setWatchlistLoading(true)
		try {
			const res = await fetch(`/api/tv/${seriesId}/watchlist`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ watchlist: !isInWatchlist }),
			})
			if (res.ok) {
				// Revalidate account state
			}
		} finally {
			setWatchlistLoading(false)
		}
	}

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
			{isAuthenticated ? (
				<TVHero tv={tv}>
					<div className="flex items-center gap-3">
						<Button
							variant="solid"
							btnType="primary"
							onClick={handleWatchlistToggle}
							loading={watchlistLoading || isLoadingAccountState}
							leftIcon={
								isInWatchlist ? (
									<Check className="w-4 h-4" />
								) : (
									<Plus className="w-4 h-4" />
								)
							}
						>
							{isInWatchlist ? "In Watchlist" : "Add to Watchlist"}
						</Button>
					</div>
				</TVHero>
			) : (
				<TVHero tv={tv} />
			)}

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
