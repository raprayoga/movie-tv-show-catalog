import { type TMDBMovieDetail } from "@/shared/interface/tmdb"

interface DetailsSectionProps {
	movie: TMDBMovieDetail
}

export default function DetailsSection({ movie }: DetailsSectionProps) {
	const details = [
		{
			label: "Release Date",
			value: movie.release_date
				? new Date(movie.release_date).toLocaleDateString("en-US", {
						year: "numeric",
						month: "long",
						day: "numeric",
				  })
				: null,
		},
		{
			label: "Runtime",
			value: movie.runtime
				? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
				: null,
		},
		{ label: "Status", value: movie.status },
		{
			label: "Original Language",
			value: movie.spoken_languages?.[0]?.name || movie.original_language,
		},
		{ label: "Original Title", value: movie.original_title },
		{
			label: "Production Countries",
			value:
				movie.production_countries?.map((c: { name: string }) => c.name).join(", ") ||
				null,
		},
	].filter((d) => d.value)

	if (details.length === 0) return null

	return (
		<section className="py-8">
			<h2 className="text-xl font-semibold text-text-primary mb-4">Details</h2>

			<dl className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4">
				{details.map((detail) => (
					<div key={detail.label}>
						<dt className="text-sm text-text-secondary">{detail.label}</dt>
						<dd className="text-sm font-medium text-text-primary">{detail.value}</dd>
					</div>
				))}
			</dl>
		</section>
	)
}
