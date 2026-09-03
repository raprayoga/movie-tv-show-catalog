"use client"

import useSWR from "swr"

import HomeHero from "./components/Hero"
import ContentSection from "@/shared/components/ContentSection"
import {
    TMDBMediaItem,
    TMDbMovieListResponse,
} from "@/shared/interface/tmdb"
import { Navbar } from "@/shared/components/Navbar"

type MovieCategory = "now-playing" | "top-rated" | "upcoming" | "popular"

const fetcher = async (key: MovieCategory): Promise<TMDbMovieListResponse> => {
    const res = await fetch(`/api/movies/${key}`)
    if (!res.ok) {
        throw new Error(`Failed to fetch ${key}`)
    }
    return res.json()
}

interface HomePageProps {
    onItemClick?: (item: TMDBMediaItem) => void
}

export default function HomePage({ onItemClick }: HomePageProps) {
    const { data: nowPlaying, isLoading: isLoadingNowPlaying } = useSWR<TMDbMovieListResponse>(
        "now-playing",
        () => fetcher("now-playing")
    )

    const { data: topRated, isLoading: isLoadingTopRated } = useSWR<TMDbMovieListResponse>(
        "top-rated",
        () => fetcher("top-rated")
    )

    const { data: upcoming, isLoading: isLoadingUpcoming } = useSWR<TMDbMovieListResponse>(
        "upcoming",
        () => fetcher("upcoming")
    )

    const { data: popular, isLoading: isLoadingPopular } = useSWR<TMDbMovieListResponse>(
        "popular",
        () => fetcher("popular")
    )

    const nowPlayingItems: TMDBMediaItem[] = (nowPlaying?.results || []).map((item) => ({
        ...item,
        media_type: "movie" as const,
    }))

    const topRatedItems: TMDBMediaItem[] = (topRated?.results || []).map((item) => ({
        ...item,
        media_type: "movie" as const,
    }))

    const upcomingItems: TMDBMediaItem[] = (upcoming?.results || []).map((item) => ({
        ...item,
        media_type: "movie" as const,
    }))

    const popularItems: TMDBMediaItem[] = (popular?.results || []).map((item) => ({
        ...item,
        media_type: "movie" as const,
    }))

    return (
        <>

            <Navbar />
            <main className="flex flex-1 flex-col">
                <div className="min-h-screen bg-bg-primary">
                    <HomeHero items={nowPlayingItems} isLoading={isLoadingNowPlaying} onItemClick={onItemClick} />

                    <div className="mt-6">
                        <ContentSection
                            title="Top Rated"
                            items={topRatedItems}
                            isLoading={isLoadingTopRated}
                            onItemClick={onItemClick}
                        />

                        <ContentSection
                            title="Upcoming"
                            items={upcomingItems}
                            isLoading={isLoadingUpcoming}
                            onItemClick={onItemClick}
                        />

                        <ContentSection
                            title="Popular"
                            items={popularItems}
                            isLoading={isLoadingPopular}
                            onItemClick={onItemClick}
                        />

                        <ContentSection
                            title="Now Playing"
                            items={nowPlayingItems}
                            isLoading={isLoadingNowPlaying}
                            onItemClick={onItemClick}
                        />
                    </div>
                </div>
            </main>
        </>

    )
}
