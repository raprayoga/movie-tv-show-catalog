"use client"

import * as React from "react"
import { Bookmark } from "lucide-react"
import { mutate } from "swr"

import { Button } from "@/shared/components/Button"
import { useCurrentUser } from "@/shared/hooks/use-current-user"
import { toast } from "@/shared/components/Sooner"
import type { TMDBMediaType } from "@/shared/interface/tmdb"

interface WatchlistButtonProps {
	mediaType: TMDBMediaType
	mediaId: number
	isInWatchlist: boolean
	isLoading?: boolean
	onToggle?: (newState: boolean) => void
	onSuccess?: () => void
	className?: string
	size?: "sm" | "m" | "lg" | "xl"
	iconOnly?: boolean
	variant?: "solid" | "outline" | "text"
	title?: string
}

export default function WatchlistButton({
	mediaType,
	mediaId,
	isInWatchlist,
	isLoading = false,
	onToggle,
	onSuccess,
	className,
	size = "m",
	iconOnly = false,
	variant = "solid",
}: WatchlistButtonProps) {
	const { isAuthenticated, login } = useCurrentUser()
	const [isMutating, setIsMutating] = React.useState(false)

		const handleToggle = async (e: React.MouseEvent) => {
		e.stopPropagation()

		if (!isAuthenticated) {
			login()
			return
		}

		if (isMutating || isLoading) return

		setIsMutating(true)
		const newState = !isInWatchlist
		const action = newState ? "Added to" : "Removed from"

		try {
			const endpoint = mediaType === "movie" ? `/api/movies/${mediaId}/watchlist` : `/api/tv/${mediaId}/watchlist`
			const res = await fetch(endpoint, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ watchlist: newState }),
			})

			if (res.ok) {
				mutate("/api/watchlist/movies")
				mutate("/api/watchlist/tv")
				onToggle?.(newState)
				onSuccess?.()
				toast.success(`${action} watchlist`)
			} else {
				toast.error("Failed to update watchlist")
			}
		} catch {
			toast.error("Failed to update watchlist")
		} finally {
			setIsMutating(false)
		}
	}

	if (iconOnly) {
		return (
			<button
				type="button"
				onClick={handleToggle}
				disabled={isMutating || isLoading}
				className={className}
				aria-label={isInWatchlist ? "Remove from watchlist" : "Add to watchlist"}
			>
				<Bookmark
					className={`w-5 h-5 ${isInWatchlist ? "fill-warning-base text-warning-base" : ""}`}
				/>
			</button>
		)
	}

	return (
		<Button
			variant={variant}
			btnType="primary"
			onClick={handleToggle}
			loading={isMutating || isLoading}
			disabled={isMutating || isLoading}
			leftIcon={
				<Bookmark
					className={`w-4 h-4 ${isInWatchlist ? "fill-current" : ""}`}
				/>
			}
			className={className}
			size={size}
			aria-label={isInWatchlist ? "Remove from watchlist" : "Add to watchlist"}
		>
			{isInWatchlist ? "In Watchlist" : "Add to Watchlist"}
		</Button>
	)
}
