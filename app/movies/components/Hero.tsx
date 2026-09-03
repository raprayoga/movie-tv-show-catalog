"use client"

import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination } from "swiper/modules"
import { Star } from "lucide-react"
import "swiper/css"
import "swiper/css/pagination"

import { cn } from "@utils/cn"
import { TMDBMediaItem, getImageUrl } from "@/shared/interface/tmdb"
import Skeleton from "@/shared/components/Skeleton"

interface HomeHeroProps {
	items: TMDBMediaItem[]
	isLoading?: boolean
	onItemClick?: (item: TMDBMediaItem) => void
}

export default function HomeHero({ items, isLoading, onItemClick }: HomeHeroProps) {
	if (isLoading) {
		return (
			<div className="relative w-full h-[40vh] min-h-[350px] sm:h-[50vh] lg:h-[60vh] xl:h-[65vh] 2xl:h-[75vh]">
				<Skeleton className="w-full h-full rounded-none" />
			</div>
		)
	}

	if (items.length === 0) {
		return null
	}

	return (
		<div className="relative w-full h-[40vh] min-h-[350px] sm:h-[50vh] lg:h-[60vh] xl:h-[65vh] 2xl:h-[75vh]">
			<Swiper
				modules={[Autoplay, Pagination]}
				slidesPerView={1}
				spaceBetween={0}
				autoplay={{
					delay: 5000,
					disableOnInteraction: false,
					pauseOnMouseEnter: true,
				}}
				pagination={{
					clickable: true,
					bulletActiveClass: "bg-white",
					bulletClass: "bg-white/50",
				}}
				loop
				className="h-full"
			>
				{items.slice(0, 5).map((item) => {
					const imageUrl = getImageUrl(item.backdrop_path, "backdrop")

					return (
						<SwiperSlide key={item.id}>
							<div
								className="relative w-full h-full cursor-pointer"
								onClick={() => onItemClick?.(item)}
							>
								{imageUrl ? (
									<Image
										src={imageUrl}
										alt={item.title || item.name || ""}
										fill
										priority
										className="object-cover object-top"
										sizes="100vw"
									/>
								) : (
									<div className="absolute inset-0 bg-neutral-800" />
								)}

								<div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

								<div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
									<div className="max-w-4xl">
										<h1 className="text-3xl md:text-5xl font-bold text-white mb-4 line-clamp-2">
											{item.title || item.name}
										</h1>

										<div className="flex items-center gap-4 mb-4">
											<div className="flex items-center gap-1">
												<Star className="w-5 h-5 fill-warning-base text-warning-base" />
												<span className="text-white font-medium">
													{item.vote_average.toFixed(1)}
												</span>
											</div>
											<span className="text-white/70">
												{(item.release_date || item.first_air_date || "").split("-")[0]}
											</span>
										</div>

										<p className="text-white/80 text-sm md:text-base line-clamp-2 md:line-clamp-3 max-w-2xl">
											{item.overview}
										</p>
									</div>
								</div>
							</div>
						</SwiperSlide>
					)
				})}
			</Swiper>

			<div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
				{items.slice(0, 5).map((_, index) => (
					<div
						key={index}
						className={cn(
							"w-2 h-2 rounded-full transition-all",
							"bg-white/50 hover:bg-white",
						)}
					/>
				))}
			</div>
		</div>
	)
}
