import { TMDBMediaItem } from "@/shared/interface/tmdb"
import {
	getAiringTodayTV,
	getTopRatedTV,
	getOnTheAirTV,
	getPopularTV,
} from "@/shared/service/tmdb/movie"
import TVContent from "./components/TVContent"

export const revalidate = 3600

function mapTVItems(results: Omit<TMDBMediaItem, "media_type">[]): TMDBMediaItem[] {
	return results.map((item) => ({
		...item,
		name: item.name,
		media_type: "tv" as const,
	}))
}

export default async function TVPage() {
	const [airingToday, topRated, onTheAir, popular] = await Promise.all([
		getAiringTodayTV(),
		getTopRatedTV(),
		getOnTheAirTV(),
		getPopularTV(),
	])

	const airingTodayItems = mapTVItems(airingToday.results)
	const topRatedItems = mapTVItems(topRated.results)
	const onTheAirItems = mapTVItems(onTheAir.results)
	const popularItems = mapTVItems(popular.results)

	const heroItems = airingTodayItems.slice(0, 3)

	return (
		<TVContent
			heroItems={heroItems}
			topRatedItems={topRatedItems}
			airingTodayItems={airingTodayItems}
			onTheAirItems={onTheAirItems}
			popularItems={popularItems}
		/>
	)
}
