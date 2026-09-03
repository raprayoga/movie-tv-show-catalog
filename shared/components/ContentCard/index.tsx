"use client"

import * as React from "react"
import Image from "next/image"
import { Star } from "lucide-react"

import { cn } from "@utils/cn"
import { getImageUrl, formatYear, type TMDBMediaType } from "@/shared/interface/tmdb"
import WatchlistButton from "@/shared/components/WatchlistButton"

interface ContentCardProps {
	id: number
	title?: string
	name?: string
	poster_path: string | null
	release_date?: string
	first_air_date?: string
	vote_average: number
	className?: string
	onClick?: () => void
	mediaType?: TMDBMediaType
	showWatchlistButton?: boolean
	isInWatchlist?: boolean
	onWatchlistToggle?: (newState: boolean) => void
	isWatchlistLoading?: boolean
}

export default function ContentCard({
	id,
	title,
	name,
	poster_path,
	release_date,
	first_air_date,
	vote_average,
	className,
	onClick,
	mediaType,
	showWatchlistButton = false,
	isInWatchlist = false,
	onWatchlistToggle,
	isWatchlistLoading = false,
}: ContentCardProps) {
	const displayTitle = title || name || ""
	const year = formatYear(release_date || first_air_date)
	const imageUrl = getImageUrl(poster_path, "poster")

	const handleWatchlistClick = (e: React.MouseEvent) => {
		e.stopPropagation()
		onWatchlistToggle?.(!isInWatchlist)
	}

	return (
		<div
			className={cn(
				"group relative overflow-hidden rounded-lg cursor-pointer",
				className,
			)}
			onClick={onClick}
		>
			<div className="aspect-[2/3] relative bg-bg-secondary overflow-hidden">
				{imageUrl ? (
					<Image
						src={imageUrl}
						alt={displayTitle}
						fill
						className="object-cover transition-transform duration-300 group-hover:scale-105"
						sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
					/>
				) : (
					<div className="absolute inset-0 flex items-center justify-center bg-neutral-300 text-neutral-500">
						<span className="text-sm">No Image</span>
					</div>
				)}

				<div className="absolute top-2 right-2 flex items-center gap-1 bg-black/70 px-2 py-1 rounded-md">
					<Star className="w-3 h-3 fill-warning-base text-warning-base" />
					<span className="text-xs font-medium text-white">
						{vote_average.toFixed(1)}
					</span>
				</div>

				{showWatchlistButton && mediaType && (
					<div
						className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity"
						onClick={handleWatchlistClick}
					>
						<WatchlistButton
							mediaType={mediaType}
							mediaId={id}
							isInWatchlist={isInWatchlist}
							isLoading={isWatchlistLoading}
							onToggle={onWatchlistToggle}
							iconOnly
							className="w-8 h-8 flex items-center justify-center bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
						/>
					</div>
				)}
			</div>

			<div className="p-2 bg-white">
				<h3 className="text-sm font-medium text-text-primary line-clamp-2 leading-tight">
					{displayTitle}
				</h3>
				{year && (
					<p className="text-xs text-text-secondary mt-1">{year}</p>
				)}
			</div>
		</div>
	)
}

export { ContentCard }
