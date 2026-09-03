import type { Meta, StoryObj } from "@storybook/react"
import ContentCard from "."

const meta: Meta<typeof ContentCard> = {
	component: ContentCard,
	tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const MovieCard: Story = {
	args: {
		id: 12345,
		title: "The Shawshank Redemption",
		poster_path: "/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
		release_date: "1994-09-23",
		vote_average: 8.7,
	},
}

export const TVCard: Story = {
	args: {
		id: 12345,
		name: "Breaking Bad",
		poster_path: "/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
		first_air_date: "2008-01-20",
		vote_average: 8.9,
	},
}

export const WithoutPoster: Story = {
	args: {
		id: 12345,
		title: "Unknown Movie",
		poster_path: null,
		release_date: "2024-01-01",
		vote_average: 7.5,
	},
}

export const LowRating: Story = {
	args: {
		id: 12345,
		title: "Low Rated Movie",
		poster_path: "/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
		release_date: "2024-01-01",
		vote_average: 4.2,
	},
}

export const HighRating: Story = {
	args: {
		id: 12345,
		title: "Highly Rated Movie",
		poster_path: "/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
		release_date: "2024-01-01",
		vote_average: 9.8,
	},
}

export const WithoutReleaseDate: Story = {
	args: {
		id: 12345,
		title: "Movie Without Date",
		poster_path: "/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
		release_date: undefined,
		vote_average: 8.0,
	},
}
