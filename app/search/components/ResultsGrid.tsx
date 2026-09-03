import ContentCard from "@/shared/components/ContentCard"
import type { TMDBMediaType } from "@/shared/interface/tmdb"
import type { SearchResult } from "@/shared/service/tmdb/search"

interface ResultsGridProps {
	results: SearchResult[]
	query: string
	onCardClick: (id: number, mediaType: TMDBMediaType) => void
}

export default function ResultsGrid({
	results,
	query,
	onCardClick,
}: ResultsGridProps) {
	return (
		<>
			<p className="text-text-secondary mb-4">Search results for &quot;{query}&quot;</p>
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
				{results.map((result) => (
					<ContentCard
						key={`${result.mediaType}-${result.id}`}
						id={result.id}
						title={result.mediaType === "movie" ? result.title : undefined}
						name={result.mediaType === "tv" ? result.title : undefined}
						poster_path={result.posterPath}
						release_date={result.mediaType === "movie" ? result.releaseDate || undefined : undefined}
						first_air_date={result.mediaType === "tv" ? result.releaseDate || undefined : undefined}
						vote_average={result.voteAverage}
						mediaType={result.mediaType}
						onClick={() => onCardClick(result.id, result.mediaType)}
					/>
				))}
			</div>
		</>
	)
}
