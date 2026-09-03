import * as React from "react"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"

import { getImageUrl, type TMDbMovieImages } from "@/shared/interface/tmdb"
import { Skeleton } from "@/shared/components/Skeleton"
import {
	Dialog,
	DialogContent,
	DialogClose,
} from "@/shared/components/Dialog"

interface PhotosSectionProps {
	images: TMDbMovieImages["backdrops"]
	isLoading: boolean
}

export default function PhotosSection({ images, isLoading }: PhotosSectionProps) {
	const [selectedIndex, setSelectedIndex] = React.useState(0)
	const [isDialogOpen, setIsDialogOpen] = React.useState(false)

	if (isLoading) {
		return (
			<section className="py-8">
				<h2 className="text-xl font-semibold text-text-primary mb-4">Photos</h2>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-2">
					{[...Array(8)].map((_, i) => (
						<Skeleton key={i} className="aspect-video w-full rounded-lg" />
					))}
				</div>
			</section>
		)
	}

	const displayImages = images.slice(0, 8)

	return (
		<section className="py-8">
			<h2 className="text-xl font-semibold text-text-primary mb-4">Photos</h2>

			<div className="grid grid-cols-2 md:grid-cols-4 gap-2">
				{displayImages.map((image, index) => {
					const imageUrl = getImageUrl(image.file_path, "backdrop")
					if (!imageUrl) return null

					return (
						<button
							key={index}
							className="aspect-video rounded-lg overflow-hidden bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-primary-base"
							onClick={() => {
								setSelectedIndex(index)
								setIsDialogOpen(true)
							}}
						>
							<Image
								src={imageUrl}
								alt={`Backdrop ${index + 1}`}
								width={320}
								height={180}
								className="object-cover w-full h-full"
							/>
						</button>
					)
				})}
			</div>

			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent
					className="p-0 bg-transparent border-none w-[90vw] h-[90vh] max-w-none max-h-none flex items-center justify-center"
				>
					<button
						className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
						onClick={() => setIsDialogOpen(false)}
					>
						X
					</button>
					<Swiper
						modules={[Navigation]}
						initialSlide={selectedIndex}
						navigation
						className="w-full h-full"
						onSlideChange={(swiper) => setSelectedIndex(swiper.activeIndex)}
					>
						{displayImages.map((img, idx) => {
							const imgUrl = getImageUrl(img.file_path, "original")
							if (!imgUrl) return null

							return (
								<SwiperSlide key={idx} className="flex items-center justify-center">
									<div className="relative w-full h-full">
										<Image
											src={imgUrl}
											alt={`Backdrop ${idx + 1}`}
											fill
											className="object-contain"
											sizes="90vw"
										/>
									</div>
								</SwiperSlide>
							)
						})}
					</Swiper>
				</DialogContent>
			</Dialog>
		</section>
	)
}
