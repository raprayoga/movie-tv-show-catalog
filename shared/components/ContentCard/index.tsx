"use client"

import * as React from "react"
import Image from "next/image"
import { Star } from "lucide-react"

import { cn } from "@utils/cn"
import { getImageUrl, formatYear } from "@/shared/interface/tmdb"

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
}: ContentCardProps) {
	const displayTitle = title || name || ""
	const year = formatYear(release_date || first_air_date)
	const imageUrl = getImageUrl(poster_path, "poster")

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
