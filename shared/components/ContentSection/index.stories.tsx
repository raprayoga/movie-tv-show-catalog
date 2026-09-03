import type { Meta, StoryObj } from "@storybook/react"
import ContentSection from "."
import type { TMDBMediaItem } from "@/shared/interface/tmdb"

const sampleMovieItems: TMDBMediaItem[] = [
	{
		id: 1,
		title: "The Shawshank Redemption",
		overview: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
		poster_path: "/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
		backdrop_path: "/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg",
		release_date: "1994-09-23",
		vote_average: 8.7,
		vote_count: 24000,
		genre_ids: [18, 80],
	},
	{
		id: 2,
		title: "The Godfather",
		overview: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
		poster_path: "/3bhkrj58Vtu7enYsLejTMtE5ULS.jpg",
		backdrop_path: "/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg",
		release_date: "1972-03-14",
		vote_average: 8.7,
		vote_count: 18000,
		genre_ids: [18, 80],
	},
	{
		id: 3,
		title: "The Dark Knight",
		overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
		poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
		backdrop_path: "/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg",
		release_date: "2008-07-16",
		vote_average: 8.5,
		vote_count: 30000,
		genre_ids: [18, 28, 80],
	},
	{
		id: 4,
		title: "Pulp Fiction",
		overview: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
		poster_path: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
		backdrop_path: "/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg",
		release_date: "1994-09-10",
		vote_average: 8.5,
		vote_count: 26000,
		genre_ids: [53, 80],
	},
	{
		id: 5,
		title: "Forrest Gump",
		overview: "A man with a low IQ has accomplished great things in his life and been present during significant historic events.",
		poster_path: "/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
		backdrop_path: "/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg",
		release_date: "1994-06-23",
		vote_average: 8.5,
		vote_count: 24000,
		genre_ids: [35, 18, 10749],
	},
	{
		id: 6,
		title: "Inception",
		overview: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
		poster_path: "/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg",
		backdrop_path: "/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg",
		release_date: "2010-07-15",
		vote_average: 8.4,
		vote_count: 32000,
		genre_ids: [28, 878, 12],
	},
]

const sampleTVItems: TMDBMediaItem[] = [
	{
		id: 1,
		name: "Breaking Bad",
		overview: "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine.",
		poster_path: "/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
		backdrop_path: "/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg",
		first_air_date: "2008-01-20",
		vote_average: 8.9,
		vote_count: 12000,
		genre_ids: [18, 80],
	},
	{
		id: 2,
		name: "Game of Thrones",
		overview: "Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.",
		poster_path: "/7WUHnWGx5OOQIRVSDAk9iPS9vnx.jpg",
		backdrop_path: "/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg",
		first_air_date: "2011-04-17",
		vote_average: 8.4,
		vote_count: 20000,
		genre_ids: [10765, 18, 10759],
	},
	{
		id: 3,
		name: "The Wire",
		overview: "The Baltimore drug scene, as seen through the eyes of drug dealers and law enforcement.",
		poster_path: "/cxxz6CMJgJ3a38qd1GlPQYJ3UYS.jpg",
		backdrop_path: "/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg",
		first_air_date: "2002-06-02",
		vote_average: 8.3,
		vote_count: 8000,
		genre_ids: [18, 80],
	},
	{
		id: 4,
		name: "True Detective",
		overview: "Anthology series in which police investigations unearth profound and dark mysteries.",
		poster_path: "/7LWx4HyPta8I6HyLwjLoGjMPU4U.jpg",
		backdrop_path: "/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg",
		first_air_date: "2014-01-12",
		vote_average: 8.3,
		vote_count: 6000,
		genre_ids: [18, 80],
	},
	{
		id: 5,
		name: "Better Call Saul",
		overview: "The trials and tribulations of criminal lawyer Jimmy McGill in the years before he became Walter White's lawyer.",
		poster_path: "/e3mJ8rZgM2q2hMXJ4M7qS8jU5T.jpg",
		backdrop_path: "/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg",
		first_air_date: "2015-02-08",
		vote_average: 8.6,
		vote_count: 10000,
		genre_ids: [18],
	},
]

const meta: Meta<typeof ContentSection> = {
	component: ContentSection,
	tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		title: "Popular Movies",
		items: sampleMovieItems,
		isLoading: false,
	},
}

export const TVShows: Story = {
	args: {
		title: "Top Rated TV Shows",
		items: sampleTVItems,
		isLoading: false,
	},
}

export const Loading: Story = {
	args: {
		title: "Loading Section",
		items: [],
		isLoading: true,
	},
}

export const Empty: Story = {
	args: {
		title: "No Results",
		items: [],
		isLoading: false,
	},
}

export const FewItems: Story = {
	args: {
		title: "Just Two Items",
		items: sampleMovieItems.slice(0, 2),
		isLoading: false,
	},
}

export const CustomSlidesPerView: Story = {
	args: {
		title: "Custom Slides Per View",
		items: sampleMovieItems,
		isLoading: false,
		slidesPerView: {
			sm: 1,
			md: 2,
			lg: 3,
			xl: 4,
		},
	},
}
