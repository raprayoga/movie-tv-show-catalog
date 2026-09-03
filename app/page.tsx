"use client"

import useSWR from "swr"

import Hero from "@/shared/components/Hero"
import ContentSection from "@/shared/components/ContentSection"
import {
	TMDBMediaItem,
	TMDbMovieListResponse,
	TMDbTVListResponse,
} from "@/shared/interface/tmdb"

type MovieCategory = "now-playing" | "top-rated" | "upcoming" | "popular"
type TVCategory = "airing-today" | "top-rated" | "on-the-air" | "popular"

const movieFetcher = async (key: MovieCategory): Promise<TMDbMovieListResponse> => {
	const res = await fetch(`/api/movies/${key}`)
	if (!res.ok) {
		throw new Error(`Failed to fetch movie ${key}`)
	}
	return res.json()
}

const tvFetcher = async (key: TVCategory): Promise<TMDbTVListResponse> => {
	const res = await fetch(`/api/tv/${key}`)
	if (!res.ok) {
		throw new Error(`Failed to fetch tv ${key}`)
	}
	return res.json()
}

export default function HomePage() {
	const { data: nowPlayingMovies, isLoading: isLoadingNowPlaying } = useSWR<TMDbMovieListResponse>(
		"home-now-playing",
		() => movieFetcher("now-playing")
	)

	const { data: popularMovies, isLoading: isLoadingPopularMovies } = useSWR<TMDbMovieListResponse>(
		"home-popular-movies",
		() => movieFetcher("popular")
	)

	const { data: topRatedMovies, isLoading: isLoadingTopRatedMovies } = useSWR<TMDbMovieListResponse>(
		"home-top-rated-movies",
		() => movieFetcher("top-rated")
	)

	const { data: upcomingMovies, isLoading: isLoadingUpcomingMovies } = useSWR<TMDbMovieListResponse>(
		"home-upcoming-movies",
		() => movieFetcher("upcoming")
	)

	const { data: airingTodayTV, isLoading: isLoadingAiringToday } = useSWR<TMDbTVListResponse>(
		"home-airing-today",
		() => tvFetcher("airing-today")
	)

	const { data: popularTV, isLoading: isLoadingPopularTV } = useSWR<TMDbTVListResponse>(
		"home-popular-tv",
		() => tvFetcher("popular")
	)

	const { data: topRatedTV, isLoading: isLoadingTopRatedTV } = useSWR<TMDbTVListResponse>(
		"home-top-rated-tv",
		() => tvFetcher("top-rated")
	)

	const { data: onTheAirTV, isLoading: isLoadingOnTheAir } = useSWR<TMDbTVListResponse>(
		"home-on-the-air",
		() => tvFetcher("on-the-air")
	)

	const nowPlayingItems: TMDBMediaItem[] = (nowPlayingMovies?.results || []).map((item) => ({
		...item,
		media_type: "movie" as const,
	}))

	const popularMovieItems: TMDBMediaItem[] = (popularMovies?.results || []).map((item) => ({
		...item,
		media_type: "movie" as const,
	}))

	const topRatedMovieItems: TMDBMediaItem[] = (topRatedMovies?.results || []).map((item) => ({
		...item,
		media_type: "movie" as const,
	}))

	const upcomingMovieItems: TMDBMediaItem[] = (upcomingMovies?.results || []).map((item) => ({
		...item,
		media_type: "movie" as const,
	}))

	const airingTodayItems: TMDBMediaItem[] = (airingTodayTV?.results || []).map((item) => ({
		...item,
		name: item.name,
		media_type: "tv" as const,
	}))

	const popularTVItems: TMDBMediaItem[] = (popularTV?.results || []).map((item) => ({
		...item,
		name: item.name,
		media_type: "tv" as const,
	}))

	const topRatedTVItems: TMDBMediaItem[] = (topRatedTV?.results || []).map((item) => ({
		...item,
		name: item.name,
		media_type: "tv" as const,
	}))

	const onTheAirItems: TMDBMediaItem[] = (onTheAirTV?.results || []).map((item) => ({
		...item,
		name: item.name,
		media_type: "tv" as const,
	}))

	const heroTVItems = airingTodayItems.slice(0, 3)
	const heroMovieItems = nowPlayingItems.slice(0, 3)
	const heroItems = [...heroTVItems, ...heroMovieItems]

	const isHeroLoading = isLoadingNowPlaying || isLoadingAiringToday

	return (
		<div className="min-h-screen bg-bg-primary">
			<Hero items={heroItems} isLoading={isHeroLoading} maxItems={6} showMediaType />

			<div className="mt-6">
				<ContentSection
					title="Popular Movies"
					items={popularMovieItems}
					isLoading={isLoadingPopularMovies}
				/>

				<ContentSection
					title="Top Rated TV Shows"
					items={topRatedTVItems}
					isLoading={isLoadingTopRatedTV}
				/>

				<ContentSection
					title="Upcoming Movies"
					items={upcomingMovieItems}
					isLoading={isLoadingUpcomingMovies}
				/>

				<ContentSection
					title="Popular TV Shows"
					items={popularTVItems}
					isLoading={isLoadingPopularTV}
				/>

				<ContentSection
					title="Top Rated Movies"
					items={topRatedMovieItems}
					isLoading={isLoadingTopRatedMovies}
				/>

				<ContentSection
					title="Airing Today"
					items={airingTodayItems}
					isLoading={isLoadingAiringToday}
				/>

				<ContentSection
					title="Now Playing"
					items={nowPlayingItems}
					isLoading={isLoadingNowPlaying}
				/>

				<ContentSection
					title="On The Air"
					items={onTheAirItems}
					isLoading={isLoadingOnTheAir}
				/>
			</div>
		</div>
	)
}
