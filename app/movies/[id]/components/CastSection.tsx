import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import { ChevronLeft, ChevronRight } from "lucide-react"
import "swiper/css"
import "swiper/css/navigation"

import { getImageUrl, type TMDbMovieCredits } from "@/shared/interface/tmdb"
import { Skeleton } from "@/shared/components/Skeleton"

interface CastSectionProps {
	cast: TMDbMovieCredits["cast"]
	isLoading: boolean
}

export default function CastSection({ cast, isLoading }: CastSectionProps) {
	if (isLoading) {
		return (
			<section className="py-8">
				<h2 className="text-xl font-semibold text-text-primary mb-4">Cast & Crew</h2>
				<div className="flex gap-4 overflow-hidden">
					{[...Array(6)].map((_, i) => (
						<div key={i} className="flex-shrink-0 w-28">
							<Skeleton className="aspect-[2/3] w-full rounded-lg" />
							<Skeleton className="h-4 w-full mt-2 rounded" />
							<Skeleton className="h-3 w-2/3 mt-1 rounded" />
						</div>
					))}
				</div>
			</section>
		)
	}

	const displayCast = cast.slice(0, 12)

	return (
		<section className="py-8">
			<h2 className="text-xl font-semibold text-text-primary mb-4">Cast & Crew</h2>

			<div className="relative group/cast">
				<Swiper
					modules={[Navigation]}
					spaceBetween={16}
					navigation={{
						prevEl: ".cast-prev",
						nextEl: ".cast-next",
					}}
					breakpoints={{
						320: { slidesPerView: 3 },
						640: { slidesPerView: 5 },
						768: { slidesPerView: 6 },
						1024: { slidesPerView: 8 },
					}}
					className="-ml-4 pl-4"
				>
					{displayCast.map((member) => {
						const profileUrl = getImageUrl(member.profile_path, "poster")
						return (
							<SwiperSlide key={member.id} className="!flex-shrink-0">
								<div className="w-28">
									<div className="aspect-[2/3] rounded-lg overflow-hidden bg-bg-secondary">
										{profileUrl ? (
											<Image
												src={profileUrl}
												alt={member.name}
												width={112}
												height={168}
												className="object-cover w-full h-full"
											/>
										) : (
											<div className="w-full h-full flex items-center justify-center text-neutral-400">
												<span className="text-2xl">{member.name[0]}</span>
											</div>
										)}
									</div>
									<p className="text-sm font-medium text-text-primary mt-2 line-clamp-1">
										{member.name}
									</p>
									<p className="text-xs text-text-secondary line-clamp-1">
										{member.character}
									</p>
								</div>
							</SwiperSlide>
						)
					})}
				</Swiper>

				<button
					className="cast-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-black/50 hover:bg-black/70 text-white rounded-full opacity-0 group-hover/cast:opacity-100 transition-opacity"
					aria-label="Previous cast"
				>
					<ChevronLeft className="w-5 h-5" />
				</button>

				<button
					className="cast-next absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-black/50 hover:bg-black/70 text-white rounded-full opacity-0 group-hover/cast:opacity-100 transition-opacity"
					aria-label="Next cast"
				>
					<ChevronRight className="w-5 h-5" />
				</button>
			</div>
		</section>
	)
}
