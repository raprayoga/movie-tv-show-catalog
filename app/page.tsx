import { TMDBMediaItem } from "@/shared/interface/tmdb"
import {
	getNowPlayingMovies,
	getPopularMovies,
	getTopRatedMovies,
	getUpcomingMovies,
	getAiringTodayTV,
	getPopularTV,
	getTopRatedTV,
	getOnTheAirTV,
} from "@/shared/service/tmdb/movie"
import HomeContent from "./components/HomeContent"

export const revalidate = 3600

function mapMovieItems(results: Omit<TMDBMediaItem, "media_type">[]): TMDBMediaItem[] {
	return results.map((item) => ({
		...item,
		media_type: "movie" as const,
	}))
}

function mapTVItems(results: Omit<TMDBMediaItem, "media_type">[]): TMDBMediaItem[] {
	return results.map((item) => ({
		...item,
		name: item.name,
		media_type: "tv" as const,
	}))
}

export default async function HomePage() {
	const [nowPlaying, popularMovies, topRatedMovies, upcomingMovies, airingToday, popularTV, topRatedTV, onTheAir] = await Promise.all([
		getNowPlayingMovies(),
		getPopularMovies(),
		getTopRatedMovies(),
		getUpcomingMovies(),
		getAiringTodayTV(),
		getPopularTV(),
		getTopRatedTV(),
		getOnTheAirTV(),
	])

	const nowPlayingItems = mapMovieItems(nowPlaying.results)
	const popularMovieItems = mapMovieItems(popularMovies.results)
	const topRatedMovieItems = mapMovieItems(topRatedMovies.results)
	const upcomingMovieItems = mapMovieItems(upcomingMovies.results)
	const airingTodayItems = mapTVItems(airingToday.results)
	const popularTVItems = mapTVItems(popularTV.results)
	const topRatedTVItems = mapTVItems(topRatedTV.results)
	const onTheAirItems = mapTVItems(onTheAir.results)

	const heroTVItems = airingTodayItems.slice(0, 3)
	const heroMovieItems = nowPlayingItems.slice(0, 3)
	const heroItems = [...heroTVItems, ...heroMovieItems]

	return (
		<HomeContent
			heroItems={heroItems}
			popularMovieItems={popularMovieItems}
			topRatedMovieItems={topRatedMovieItems}
			upcomingMovieItems={upcomingMovieItems}
			popularTVItems={popularTVItems}
			topRatedTVItems={topRatedTVItems}
			airingTodayItems={airingTodayItems}
			nowPlayingItems={nowPlayingItems}
			onTheAirItems={onTheAirItems}
		/>
	)
}
