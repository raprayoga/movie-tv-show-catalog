"use client"

import useSWR from "swr"

import TVHero from "./components/Hero"
import ContentSection from "@/shared/components/ContentSection"
import {
	TMDBMediaItem,
	TMDbTVListResponse,
} from "@/shared/interface/tmdb"
import { Navbar } from "@/shared/components/Navbar"

type TVCategory = "airing-today" | "top-rated" | "on-the-air" | "popular"

const fetcher = async (key: TVCategory): Promise<TMDbTVListResponse> => {
	const res = await fetch(`/api/tv/${key}`)
	if (!res.ok) {
		throw new Error(`Failed to fetch ${key}`)
	}
	return res.json()
}

interface TVShowPageProps {
	onItemClick?: (item: TMDBMediaItem) => void
}

export default function TVShowPage({ onItemClick }: TVShowPageProps) {
	const { data: airingToday, isLoading: isLoadingAiringToday } = useSWR<TMDbTVListResponse>(
		"airing-today",
		() => fetcher("airing-today")
	)

	const { data: topRated, isLoading: isLoadingTopRated } = useSWR<TMDbTVListResponse>(
		"top-rated",
		() => fetcher("top-rated")
	)

	const { data: onTheAir, isLoading: isLoadingOnTheAir } = useSWR<TMDbTVListResponse>(
		"on-the-air",
		() => fetcher("on-the-air")
	)

	const { data: popular, isLoading: isLoadingPopular } = useSWR<TMDbTVListResponse>(
		"popular",
		() => fetcher("popular")
	)

	const airingTodayItems: TMDBMediaItem[] = (airingToday?.results || []).map((item) => ({
		...item,
		name: item.name,
		media_type: "tv" as const,
	}))

	const topRatedItems: TMDBMediaItem[] = (topRated?.results || []).map((item) => ({
		...item,
		name: item.name,
		media_type: "tv" as const,
	}))

	const onTheAirItems: TMDBMediaItem[] = (onTheAir?.results || []).map((item) => ({
		...item,
		name: item.name,
		media_type: "tv" as const,
	}))

	const popularItems: TMDBMediaItem[] = (popular?.results || []).map((item) => ({
		...item,
		name: item.name,
		media_type: "tv" as const,
	}))

	return (
		<>
			<Navbar />
			<main className="flex flex-1 flex-col">
				<div className="min-h-screen bg-bg-primary">
					<TVHero items={airingTodayItems} isLoading={isLoadingAiringToday} onItemClick={onItemClick} />

					<div className="mt-6">
						<ContentSection
							title="Top Rated"
							items={topRatedItems}
							isLoading={isLoadingTopRated}
							onItemClick={onItemClick}
						/>

						<ContentSection
							title="Airing Today"
							items={airingTodayItems}
							isLoading={isLoadingAiringToday}
							onItemClick={onItemClick}
						/>

						<ContentSection
							title="On The Air"
							items={onTheAirItems}
							isLoading={isLoadingOnTheAir}
							onItemClick={onItemClick}
						/>

						<ContentSection
							title="Popular"
							items={popularItems}
							isLoading={isLoadingPopular}
							onItemClick={onItemClick}
						/>
					</div>
				</div>
			</main>
		</>
	)
}
