import * as React from "react"
import { ChevronDown } from "lucide-react"

import { type TMDbSeason, type TMDbSeasonDetails } from "@/shared/interface/tmdb"
import { Skeleton } from "@/shared/components/Skeleton"
import EpisodeCard from "./EpisodeCard"

interface SeasonsSectionProps {
	seasons: TMDbSeason[]
	seriesId: number
	initialSeasonNumber?: number
}

export default function SeasonsSection({
	seasons,
	seriesId,
	initialSeasonNumber,
}: SeasonsSectionProps) {
	const [selectedSeason, setSelectedSeason] = React.useState<number>(
		initialSeasonNumber || seasons[0]?.season_number || 1
	)
	const [seasonData, setSeasonData] = React.useState<TMDbSeasonDetails | null>(null)
	const [isLoading, setIsLoading] = React.useState(false)
	const [error, setError] = React.useState<string | null>(null)

	const displaySeasons = seasons.filter((s) => s.season_number > 0)

	React.useEffect(() => {
		let cancelled = false
		const loadSeason = async () => {
			if (cancelled) return
			setIsLoading(true)
			setError(null)
			try {
				const res = await fetch(`/api/tv/${seriesId}/season/${selectedSeason}`)
				if (!res.ok) {
					throw new Error("Failed to fetch season data")
				}
				const data = await res.json()
				if (!cancelled) {
					setSeasonData(data)
				}
			} catch (err) {
				if (!cancelled) {
					setError(err instanceof Error ? err.message : "Unknown error")
				}
			} finally {
				if (!cancelled) {
					setIsLoading(false)
				}
			}
		}
		loadSeason()
		return () => {
			cancelled = true
		}
	}, [selectedSeason, seriesId])

	if (displaySeasons.length === 0) {
		return null
	}

	return (
		<section className="py-8">
			<div className="flex items-center justify-between mb-6">
				<h2 className="text-xl font-semibold text-text-primary">Episodes</h2>

				<div className="relative">
					<select
						value={selectedSeason}
						onChange={(e) => setSelectedSeason(Number(e.target.value))}
						className="appearance-none bg-bg-secondary text-text-primary px-4 py-2 pr-10 rounded-lg border border-stroke-primary focus:outline-none focus:ring-2 focus:ring-primary-base cursor-pointer"
						aria-label="Select season"
					>
						{displaySeasons.map((season) => (
							<option key={season.season_number} value={season.season_number}>
								{season.name}
							</option>
						))}
					</select>
					<ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
				</div>
			</div>

			{isLoading && (
				<div className="space-y-4">
					{[...Array(3)].map((_, i) => (
						<div key={i} className="flex gap-4">
							<Skeleton className="w-40 h-24 flex-shrink-0 rounded-lg" />
							<div className="flex-1 space-y-2">
								<Skeleton className="h-5 w-48" />
								<Skeleton className="h-4 w-full" />
								<Skeleton className="h-4 w-3/4" />
							</div>
						</div>
					))}
				</div>
			)}

			{error && (
				<div className="text-center py-8">
					<p className="text-text-secondary">Failed to load episodes</p>
				</div>
			)}

			{!isLoading && !error && seasonData && (
				<div className="space-y-4">
					{seasonData.episodes.map((episode) => (
						<EpisodeCard key={episode.id} episode={episode} />
					))}
				</div>
			)}
		</section>
	)
}
