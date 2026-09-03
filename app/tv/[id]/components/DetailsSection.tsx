import { type TMDBTVDetail } from "@/shared/interface/tmdb"

interface DetailsSectionProps {
	tv: TMDBTVDetail
}

export default function DetailsSection({ tv }: DetailsSectionProps) {
	const details = [
		{
			label: "First Air Date",
			value: tv.first_air_date
				? new Date(tv.first_air_date).toLocaleDateString("en-US", {
						year: "numeric",
						month: "long",
						day: "numeric",
				  })
				: null,
		},
		{
			label: "Last Air Date",
			value: tv.last_air_date
				? new Date(tv.last_air_date).toLocaleDateString("en-US", {
						year: "numeric",
						month: "long",
						day: "numeric",
				  })
				: null,
		},
		{ label: "Status", value: tv.status },
		{ label: "Type", value: tv.type },
		{
			label: "Seasons",
			value: tv.number_of_seasons > 0 ? tv.number_of_seasons.toString() : null,
		},
		{
			label: "Episodes",
			value: tv.number_of_episodes > 0 ? tv.number_of_episodes.toString() : null,
		},
		{
			label: "Original Language",
			value: tv.spoken_languages?.[0]?.english_name || tv.original_language,
		},
		{
			label: "Origin Country",
			value: tv.origin_country?.join(", ") || null,
		},
	].filter((d) => d.value)

	if (details.length === 0) return null

	return (
		<section className="py-8">
			<h2 className="text-xl font-semibold text-text-primary mb-4">Series Details</h2>

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
