import { TMDBMediaItem } from "@/shared/interface/tmdb"
import {
	getNowPlayingMovies,
	getTopRatedMovies,
	getUpcomingMovies,
	getPopularMovies,
} from "@/shared/service/tmdb/movie"
import MoviesContent from "./components/MoviesContent"

export const revalidate = 3600

function mapMovieItems(results: Omit<TMDBMediaItem, "media_type">[]): TMDBMediaItem[] {
	return results.map((item) => ({
		...item,
		media_type: "movie" as const,
	}))
}

export default async function MoviesPage() {
	const [nowPlaying, topRated, upcoming, popular] = await Promise.all([
		getNowPlayingMovies(),
		getTopRatedMovies(),
		getUpcomingMovies(),
		getPopularMovies(),
	])

	const nowPlayingItems = mapMovieItems(nowPlaying.results)
	const topRatedItems = mapMovieItems(topRated.results)
	const upcomingItems = mapMovieItems(upcoming.results)
	const popularItems = mapMovieItems(popular.results)

	const heroItems = nowPlayingItems.slice(0, 3)

	return (
		<MoviesContent
			heroItems={heroItems}
			topRatedItems={topRatedItems}
			upcomingItems={upcomingItems}
			popularItems={popularItems}
			nowPlayingItems={nowPlayingItems}
		/>
	)
}
