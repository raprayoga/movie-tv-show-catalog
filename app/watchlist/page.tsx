"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Trash2 } from "lucide-react"

import { Button } from "@/shared/components/Button"
import ContentCard from "@/shared/components/ContentCard"
import Skeleton from "@/shared/components/Skeleton"
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/Tabs"
import { useCurrentUser } from "@/shared/hooks/use-current-user"
import { useWatchlist, removeFromWatchlist, type WatchlistItem } from "@/shared/hooks/use-watchlist"

type FilterType = "all" | "movies" | "tv"

export default function WatchlistPage() {
	const router = useRouter()
	const { isAuthenticated, isLoading: isLoadingAuth, login } = useCurrentUser()
	const { allItems, movies, tvShows, isLoading, mutate } = useWatchlist()
	const [activeFilter, setActiveFilter] = React.useState<FilterType>("all")
	const [removingId, setRemovingId] = React.useState<number | null>(null)

	const handleItemClick = (item: WatchlistItem) => {
		const route = item.mediaType === "tv" ? "/tv" : "/movies"
		router.push(`${route}/${item.id}`)
	}

	const handleRemove = async (e: React.MouseEvent, item: WatchlistItem) => {
		e.stopPropagation()
		setRemovingId(item.id)
		const success = await removeFromWatchlist(item.mediaType, item.id)
		if (!success) {
			mutate()
		}
		setRemovingId(null)
	}

	const getFilteredItems = (): WatchlistItem[] => {
		switch (activeFilter) {
			case "movies":
				return movies
			case "tv":
				return tvShows
			default:
				return allItems
		}
	}

	const filteredItems = getFilteredItems()

	if (isLoadingAuth) {
		return (
			<main className="min-h-screen bg-bg-primary">
				<div className="max-w-7xl mx-auto px-4 py-8">
					<WatchlistPageSkeleton />
				</div>
			</main>
		)
	}

	if (!isAuthenticated) {
		return (
			<main className="min-h-screen bg-bg-primary">
				<div className="max-w-7xl mx-auto px-4 py-8">
					<div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
						<h1 className="text-3xl font-bold text-text-primary mb-4">My Watchlist</h1>
						<p className="text-text-secondary mb-8">Sign in to save movies and TV shows to your watchlist.</p>
						<Button variant="solid" btnType="primary" onClick={login}>
							Sign In
						</Button>
					</div>
				</div>
			</main>
		)
	}

	return (
		<main className="min-h-screen bg-bg-primary">
			<div className="max-w-7xl mx-auto px-4 py-8">
				<header className="mb-8">
					<h1 className="text-3xl font-bold text-text-primary mb-2">My Watchlist</h1>
					<p className="text-text-secondary">Movies and TV shows you want to watch</p>
				</header>

				<nav aria-label="Watchlist filters" className="mb-8">
					<Tabs value={activeFilter} onValueChange={(v) => setActiveFilter(v as FilterType)}>
						<TabsList variant="pill">
							<TabsTrigger value="all">All</TabsTrigger>
							<TabsTrigger value="movies">Movies</TabsTrigger>
							<TabsTrigger value="tv">TV Shows</TabsTrigger>
						</TabsList>
					</Tabs>
				</nav>

				<section aria-label="Watchlist">
					{isLoading ? (
						<WatchlistGridSkeleton />
					) : filteredItems.length === 0 ? (
						<EmptyState
							filter={activeFilter}
							onExplore={() => router.push(activeFilter === "tv" ? "/tv" : "/movies")}
							onExploreTV={() => router.push("/tv")}
						/>
					) : (
						<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
							{filteredItems.map((item) => (
								<div key={`${item.mediaType}-${item.id}`} className="relative group">
									<ContentCard
										id={item.id}
										title={item.title}
										name={item.name}
										poster_path={item.poster_path}
										release_date={item.release_date}
										first_air_date={item.first_air_date}
										vote_average={item.vote_average}
										onClick={() => handleItemClick(item)}
									/>
									<button
										onClick={(e) => handleRemove(e, item)}
										disabled={removingId === item.id}
										className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-black/50 hover:bg-danger-dark text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
										aria-label={`Remove ${item.title || item.name} from watchlist`}
									>
										<Trash2 className="w-4 h-4" />
									</button>
								</div>
							))}
						</div>
					)}
				</section>
			</div>
		</main>
	)
}

function WatchlistGridSkeleton() {
	return (
		<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
			{[...Array(6)].map((_, i) => (
				<div key={i}>
					<Skeleton className="aspect-[2/3] w-full rounded-lg" />
					<div className="pt-2 space-y-1">
						<Skeleton className="h-4 w-full rounded" />
						<Skeleton className="h-3 w-2/3 rounded" />
					</div>
				</div>
			))}
		</div>
	)
}

function WatchlistPageSkeleton() {
	return (
		<>
			<div className="mb-8">
				<Skeleton className="h-9 w-48 mb-2" />
				<Skeleton className="h-5 w-72" />
			</div>
			<Skeleton className="h-10 w-64 mb-8" />
			<WatchlistGridSkeleton />
		</>
	)
}

interface EmptyStateProps {
	filter: FilterType
	onExplore: () => void
	onExploreTV: () => void
}

function EmptyState({ filter, onExplore, onExploreTV }: EmptyStateProps) {
	if (filter === "movies") {
		return (
			<div className="flex flex-col items-center justify-center min-h-[40vh] text-center">
				<h2 className="text-xl font-semibold text-text-primary mb-2">No movies in your watchlist</h2>
				<p className="text-text-secondary mb-6">Add movies you want to watch later.</p>
				<Button variant="outline" btnType="primary" onClick={onExplore}>
					Explore Movies
				</Button>
			</div>
		)
	}

	if (filter === "tv") {
		return (
			<div className="flex flex-col items-center justify-center min-h-[40vh] text-center">
				<h2 className="text-xl font-semibold text-text-primary mb-2">No TV shows in your watchlist</h2>
				<p className="text-text-secondary mb-6">Add TV shows you want to watch later.</p>
				<Button variant="outline" btnType="primary" onClick={onExplore}>
					Explore TV Shows
				</Button>
			</div>
		)
	}

	return (
		<div className="flex flex-col items-center justify-center min-h-[40vh] text-center">
			<h2 className="text-xl font-semibold text-text-primary mb-2">Your watchlist is empty</h2>
			<p className="text-text-secondary mb-6">Start adding movies and TV shows you want to watch later.</p>
			<div className="flex gap-4">
				<Button variant="outline" btnType="primary" onClick={onExplore}>
					Explore Movies
				</Button>
				<Button variant="outline" btnType="primary" onClick={onExploreTV}>
					Explore TV Shows
				</Button>
			</div>
		</div>
	)
}
