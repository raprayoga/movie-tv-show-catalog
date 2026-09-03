"use client"

import * as React from "react"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination } from "swiper/modules"
import { Star, Info } from "lucide-react"
import "swiper/css"
import "swiper/css/pagination"

import { cn } from "@utils/cn"
import { TMDBMediaItem, getImageUrl } from "@/shared/interface/tmdb"
import Skeleton from "@/shared/components/Skeleton"
import { Button } from "@/shared/components/Button"

interface HeroProps {
	items: TMDBMediaItem[]
	isLoading?: boolean
	maxItems?: number
	showMediaType?: boolean
	onItemClick?: (item: TMDBMediaItem) => void
}

export default function Hero({
	items,
	isLoading,
	maxItems = 5,
	showMediaType = false,
	onItemClick,
}: HeroProps) {
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

	const displayItems = items.slice(0, maxItems)

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
				{displayItems.map((item) => {
					const imageUrl = getImageUrl(item.backdrop_path, "backdrop")

					return (
						<SwiperSlide key={`${item.id}-${item.media_type || "item"}`}>
							<div className="relative w-full h-full">
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
											{showMediaType && item.media_type && (
												<span className="text-white/50 text-sm capitalize">
													{item.media_type}
												</span>
											)}
										</div>

										<p className="text-white/80 text-sm md:text-base line-clamp-2 md:line-clamp-3 max-w-2xl mb-6">
											{item.overview}
										</p>

										<div className="flex items-center gap-3">
											<Button
												variant="solid"
												btnType="primary"
												size='xl'
												leftIcon={<Info className="w-4 h-4" />}
												onClick={() => onItemClick?.(item)}
											>
												More Info
											</Button>
										</div>
									</div>
								</div>
							</div>
						</SwiperSlide>
					)
				})}
			</Swiper>

			<div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
				{displayItems.map((_, index) => (
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
