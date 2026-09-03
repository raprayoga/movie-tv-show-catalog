"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, A11y } from "swiper/modules"
import { ChevronLeft, ChevronRight } from "lucide-react"
import "swiper/css"
import "swiper/css/navigation"

import { cn } from "@utils/cn"
import ContentCard from "@/shared/components/ContentCard"
import { TMDBMediaItem } from "@/shared/interface/tmdb"
import Skeleton from "@/shared/components/Skeleton"

interface ContentSectionProps {
	title: string
	items: TMDBMediaItem[]
	isLoading?: boolean
	slidesPerView?: {
		sm?: number
		md?: number
		lg?: number
		xl?: number
	}
	spaceBetween?: number
	onItemClick?: (item: TMDBMediaItem) => void
	showWatchlistButton?: boolean
	watchlistIds?: Set<number>
	onWatchlistToggle?: (mediaType: "movie" | "tv", mediaId: number, newState: boolean) => void
	isWatchlistLoading?: boolean
}

export default function ContentSection({
	title,
	items,
	isLoading = false,
	slidesPerView = { sm: 2, md: 3, lg: 4, xl: 5 },
	spaceBetween = 16,
	onItemClick,
	showWatchlistButton = false,
	watchlistIds,
	onWatchlistToggle,
	isWatchlistLoading = false,
}: ContentSectionProps) {
	if (isLoading) {
		return (
			<section className="py-6 px-4">
				<h2 className="text-xl font-semibold text-text-primary mb-4">{title}</h2>
				<div className="flex gap-4 overflow-hidden">
					{[...Array(5)].map((_, index) => (
						<div key={index} className="flex-shrink-0 w-[31%] sm:w-[23%] md:w-[24%] lg:w-[20%]">
							<Skeleton className="aspect-[2/3] w-full rounded-lg" />
							<div className="pt-2 space-y-1">
								<Skeleton className="h-4 w-full rounded" />
								<Skeleton className="h-3 w-2/3 rounded" />
							</div>
						</div>
					))}
				</div>
			</section>
		)
	}

	return (
		<section className="py-6 px-4">
			<div className="flex items-center justify-between mb-4">
				<h2 className="text-xl font-semibold text-text-primary">{title}</h2>
			</div>

			<div className="relative group/section">
				<Swiper
					modules={[Navigation, A11y]}
					spaceBetween={spaceBetween}
					navigation={{
						prevEl: `.swiper-button-prev-${title.replace(/\s+/g, "-").toLowerCase()}`,
						nextEl: `.swiper-button-next-${title.replace(/\s+/g, "-").toLowerCase()}`,
					}}
					breakpoints={{
						320: { slidesPerView: slidesPerView.sm || 2 },
						640: { slidesPerView: slidesPerView.md || 3 },
						768: { slidesPerView: slidesPerView.lg || 4 },
						1024: { slidesPerView: slidesPerView.xl || 5 },
					}}
					className="!-ml-4 !pl-4"
				>
					{items.map((item) => {
						const mediaType = item.media_type || "movie"
						const isInWatchlist = watchlistIds?.has(item.id) ?? false

						return (
							<SwiperSlide key={item.id} className="!flex-shrink-0">
								<ContentCard
									id={item.id}
									title={item.title}
									name={item.name}
									poster_path={item.poster_path}
									release_date={item.release_date}
									first_air_date={item.first_air_date}
									vote_average={item.vote_average}
									onClick={() => onItemClick?.(item)}
									mediaType={mediaType}
									showWatchlistButton={showWatchlistButton}
									isInWatchlist={isInWatchlist}
									onWatchlistToggle={(newState) => onWatchlistToggle?.(mediaType, item.id, newState)}
									isWatchlistLoading={isWatchlistLoading}
								/>
							</SwiperSlide>
						)
					})}
				</Swiper>

				<button
					className={cn(
						"swiper-button-prev swiper-button-disabled",
						`swiper-button-prev-${title.replace(/\s+/g, "-").toLowerCase()}`,
						"absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center",
						"bg-black/50 hover:bg-black/70 text-white rounded-full",
						"opacity-0 group-hover/section:opacity-100 transition-opacity",
						"disabled:opacity-0 disabled:cursor-not-allowed",
					)}
					aria-label="Previous slide"
				>
					<ChevronLeft className="w-6 h-6" />
				</button>

				<button
					className={cn(
						"swiper-button-next",
						`swiper-button-next-${title.replace(/\s+/g, "-").toLowerCase()}`,
						"absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center",
						"bg-black/50 hover:bg-black/70 text-white rounded-full",
						"opacity-0 group-hover/section:opacity-100 transition-opacity",
					)}
					aria-label="Next slide"
				>
					<ChevronRight className="w-6 h-6" />
				</button>
			</div>
		</section>
	)
}

export { ContentSection }
