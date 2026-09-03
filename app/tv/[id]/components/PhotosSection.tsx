import * as React from "react"
import Image from "next/image"
import { X } from "lucide-react"

import { getImageUrl, type TMDbTVImages } from "@/shared/interface/tmdb"
import { Skeleton } from "@/shared/components/Skeleton"

interface PhotosSectionProps {
	images: TMDbTVImages["backdrops"]
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

			{isDialogOpen && (
				<div
					className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
					onClick={() => setIsDialogOpen(false)}
				>
					<div
						className="relative max-w-5xl w-full"
						onClick={(e) => e.stopPropagation()}
					>
						<button
							className="absolute -top-12 right-0 text-white/70 hover:text-white flex items-center gap-2"
							onClick={() => setIsDialogOpen(false)}
						>
							<X className="w-5 h-5" />
							Close
						</button>

						<div className="flex gap-2 overflow-x-auto pb-4">
							{displayImages.map((image, index) => {
								const imageUrl = getImageUrl(image.file_path, "original")
								if (!imageUrl) return null

								return (
									<button
										key={index}
										className={`flex-shrink-0 rounded-lg overflow-hidden border-2 transition-colors ${
											index === selectedIndex
												? "border-white"
												: "border-transparent hover:border-white/50"
										}`}
										onClick={() => setSelectedIndex(index)}
									>
										<Image
											src={imageUrl}
											alt={`Backdrop ${index + 1}`}
											width={240}
											height={135}
											className="object-cover"
										/>
									</button>
								)
							})}
						</div>

						<div className="relative aspect-video bg-black rounded-lg overflow-hidden mt-4">
							{displayImages[selectedIndex] && (
								<Image
									src={getImageUrl(displayImages[selectedIndex].file_path, "original") || ""}
									alt={`Backdrop ${selectedIndex + 1}`}
									fill
									className="object-contain"
								/>
							)}
						</div>
					</div>
				</div>
			)}
		</section>
	)
}
