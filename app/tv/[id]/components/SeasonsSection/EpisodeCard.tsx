import Image from "next/image"
import { Calendar, Clock } from "lucide-react"

import { type TMDbEpisode } from "@/shared/interface/tmdb"

interface EpisodeCardProps {
	episode: TMDbEpisode
}

export default function EpisodeCard({ episode }: EpisodeCardProps) {
	const stillUrl = getImageUrl(episode.still_path, "backdrop")

	return (
		<div className="flex flex-row gap-4 p-4 bg-bg-secondary rounded-lg">
			{stillUrl ? (
				<div className="w-28 sm:w-40 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-neutral-800">
					<Image
						src={stillUrl}
						alt={`${episode.name} still`}
						width={160}
						height={90}
						className="object-cover w-full h-full"
					/>
				</div>
			) : (
				<div className="w-28 sm:w-40 h-24 flex-shrink-0 rounded-lg bg-neutral-800 flex items-center justify-center">
					<span className="text-neutral-500 text-sm">No Image</span>
				</div>
			)}

			<div className="flex-1 min-w-0">
				<div className="flex items-start justify-between gap-2 mb-1">
					<h3 className="text-sm sm:text-lg font-medium text-text-primary line-clamp-1">
						{episode.episode_number}. {episode.name}
					</h3>
				</div>

				<div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-text-secondary mb-1 sm:mb-2">
					{episode.air_date && (
						<span className="flex items-center gap-1">
							<Calendar className="w-3 h-3" />
							{new Date(episode.air_date).toLocaleDateString("en-US", {
								year: "numeric",
								month: "short",
								day: "numeric",
							})}
						</span>
					)}

					{episode.runtime && (
						<span className="flex items-center gap-1">
							<Clock className="w-3 h-3" />
							{episode.runtime}m
						</span>
					)}
				</div>

				{episode.overview && (
					<p className="text-xs sm:text-sm text-text-secondary line-clamp-2">
						{episode.overview}
					</p>
				)}
			</div>
		</div>
	)
}

function getImageUrl(
	path: string | null,
	size: "backdrop" | "original" = "backdrop"
): string | null {
	if (!path) return null
	const baseUrl = "https://image.tmdb.org/t/p"
	const sizes = {
		backdrop: ["w300", "w780", "w1280", "original"],
		original: ["original"],
	}
	const targetSize = sizes[size][sizes[size].length - 2] || sizes[size][0]
	return `${baseUrl}/${targetSize}${path}`
}
