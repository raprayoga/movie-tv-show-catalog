"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import useSWR from "swr"
import { Plus, Check } from "lucide-react"

import { Button } from "@/shared/components/Button"
import ContentSection from "@/shared/components/ContentSection"
import { useCurrentUser } from "@/shared/hooks/use-current-user"
import {
	type TMDBMovieDetail,
	type TMDbMovieCredits,
	type TMDbMovieImages,
	type TMDbMovieRecommendations,
	type TMDbAccountState,
	type TMDBMediaItem,
} from "@/shared/interface/tmdb"
import {
	MovieHero,
	CastSection,
	PhotosSection,
	DetailsSection,
	MovieDetailSkeleton,
} from "./components"

const fetcher = async (url: string) => {
	const res = await fetch(url)
	if (!res.ok) throw new Error("Failed to fetch")
	return res.json()
}

interface MovieDetailPageProps {
	params: Promise<{ id: string }>
}

export default function MovieDetailPage({ params }: MovieDetailPageProps) {
	const router = useRouter()
	const resolvedParams = React.use(params)
	const movieId = resolvedParams.id

	const { isAuthenticated, login } = useCurrentUser()

	const handleItemClick = (item: TMDBMediaItem) => {
		const route = item.media_type === "tv" ? "/tv" : "/movies"
		router.push(`${route}/${item.id}`)
	}

	const { data: movie, isLoading: isLoadingMovie } = useSWR<TMDBMovieDetail>(
		`/api/movies/${movieId}/detail`,
		fetcher
	)

	const { data: credits, isLoading: isLoadingCredits } = useSWR<TMDbMovieCredits>(
		`/api/movies/${movieId}/credits`,
		fetcher
	)

	const { data: images, isLoading: isLoadingImages } = useSWR<TMDbMovieImages>(
		`/api/movies/${movieId}/images`,
		fetcher
	)

	const { data: recommendations, isLoading: isLoadingRecommendations } = useSWR<TMDbMovieRecommendations>(
		`/api/movies/${movieId}/recommendations`,
		fetcher
	)

	const { data: accountState, isLoading: isLoadingAccountState } = useSWR<TMDbAccountState>(
		isAuthenticated ? `/api/movies/${movieId}/account-state` : null,
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
			const res = await fetch(`/api/movies/${movieId}/watchlist`, {
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

	if (isLoadingMovie) {
		return <MovieDetailSkeleton />
	}

	if (!movie) {
		return (
			<div className="min-h-screen bg-bg-primary flex items-center justify-center">
				<p className="text-text-secondary">Movie not found</p>
			</div>
		)
	}

	const recommendationItems: TMDBMediaItem[] = (recommendations?.results || [])
		.slice(0, 10)
		.map((item) => ({
			...item,
			media_type: "movie" as const,
		}))

	return (
		<article className="min-h-screen bg-bg-primary">
			{isAuthenticated ? (
				<MovieHero movie={movie}>
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
				</MovieHero>
			) : (
				<MovieHero movie={movie} />
			)}

			<div className="max-w-7xl mx-auto px-4">
				{credits?.cast && credits.cast.length > 0 && (
					<CastSection cast={credits.cast} isLoading={isLoadingCredits} />
				)}

				{images?.backdrops && images.backdrops.length > 0 && (
					<PhotosSection images={images.backdrops} isLoading={isLoadingImages} />
				)}

				<DetailsSection movie={movie} />

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
