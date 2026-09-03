import Image from "next/image"
import { Star, Calendar, Globe, Tv } from "lucide-react"

import { getImageUrl, type TMDBTVDetail, type TMDBGenre } from "@/shared/interface/tmdb"

interface TVHeroProps {
	tv: TMDBTVDetail
	children?: React.ReactNode
}

export default function TVHero({ tv, children }: TVHeroProps) {
	const backdropUrl = getImageUrl(tv.backdrop_path, "backdrop")
	const posterUrl = getImageUrl(tv.poster_path, "poster")

	return (
		<header className="relative">
			<div className="relative h-[60vh] min-h-[400px]">
				{backdropUrl ? (
					<Image
						src={backdropUrl}
						alt={`Backdrop for ${tv.name}`}
						fill
						priority
						className="object-cover object-top"
						sizes="100vw"
					/>
				) : (
					<div className="absolute inset-0 bg-neutral-800" />
				)}

				<div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

				<div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />

				<div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
					<div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 items-end">
						{posterUrl && (
							<div className="hidden md:block flex-shrink-0">
								<div className="w-64 rounded-lg overflow-hidden shadow-xl">
									<Image
										src={posterUrl}
										alt={`Poster for ${tv.name}`}
										width={256}
										height={384}
										className="object-cover"
									/>
								</div>
							</div>
						)}

						<div className="flex-1">
							<p className="text-primary-lightest text-sm font-medium mb-2 uppercase tracking-wider flex items-center gap-2">
								<Tv className="w-4 h-4" />
								TV Series
							</p>

							<h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
								{tv.name}
							</h1>

							{tv.tagline && (
								<p className="text-white/70 italic mb-4">{tv.tagline}</p>
							)}

							<div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-white/80">
								{tv.vote_average > 0 && (
									<div className="flex items-center gap-1">
										<Star className="w-4 h-4 fill-warning-base text-warning-base" />
										<span className="font-medium text-white">
											{tv.vote_average.toFixed(1)}
										</span>
										<span>({tv.vote_count.toLocaleString()} votes)</span>
									</div>
								)}

								{tv.first_air_date && (
									<div className="flex items-center gap-1">
										<Calendar className="w-4 h-4" />
										<span>
											{new Date(tv.first_air_date).toLocaleDateString("en-US", {
												year: "numeric",
												month: "long",
												day: "numeric",
											})}
										</span>
									</div>
								)}

								{tv.number_of_seasons > 0 && (
									<span className="text-white/70">
										{tv.number_of_seasons} {tv.number_of_seasons === 1 ? "Season" : "Seasons"}
									</span>
								)}

								{tv.number_of_episodes > 0 && (
									<span className="text-white/70">
										{tv.number_of_episodes} Episodes
									</span>
								)}

								{tv.original_language && (
									<div className="flex items-center gap-1">
										<Globe className="w-4 h-4" />
										<span className="uppercase">{tv.original_language}</span>
									</div>
								)}
							</div>

							{tv.genres && tv.genres.length > 0 && (
								<div className="flex flex-wrap gap-2 mb-4">
									{tv.genres.map((genre: TMDBGenre) => (
										<span
											key={genre.id}
											className="px-3 py-1 text-xs font-medium bg-white/20 text-white rounded-full"
										>
											{genre.name}
										</span>
									))}
								</div>
							)}

							{tv.overview && (
								<p className="text-white/80 text-sm md:text-base max-w-2xl mb-6 line-clamp-3">
									{tv.overview}
								</p>
							)}

							{children}
						</div>
					</div>
				</div>
			</div>
		</header>
	)
}
