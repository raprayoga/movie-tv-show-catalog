import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import WatchlistButton from "."

const meta: Meta<typeof WatchlistButton> = {
	component: WatchlistButton,
	tags: ["autodocs"],
	argTypes: {
		mediaType: {
			control: "select",
			options: ["movie", "tv"],
			description: "The type of media",
		},
		mediaId: {
			control: "number",
			description: "The ID of the media",
		},
		isInWatchlist: {
			control: "boolean",
			description: "Whether the item is already in watchlist",
		},
		isLoading: {
			control: "boolean",
			description: "Whether the button is in loading state",
		},
		iconOnly: {
			control: "boolean",
			description: "Show only the icon without text",
		},
		size: {
			control: "select",
			options: ["sm", "m", "lg", "xl"],
			description: "The size of the button",
		},
		variant: {
			control: "select",
			options: ["solid", "outline", "text"],
			description: "The variant of the button",
		},
		title: {
			control: "text",
			description: "Title used in toast notification",
		},
	},
	args: {
		mediaType: "movie",
		mediaId: 123,
		isInWatchlist: false,
		isLoading: false,
		iconOnly: false,
		size: "m",
		variant: "solid",
		title: "Sample Movie Title",
	},
}

export default meta
type Story = StoryObj<typeof WatchlistButton>

export const Default: Story = {
	render: (args) => (
		<div className="p-4">
			<WatchlistButton
				{...args}
				onToggle={(newState) => console.log("Toggle:", newState)}
				onSuccess={() => console.log("Success")}
			/>
		</div>
	),
}

export const InWatchlist: Story = {
	args: {
		isInWatchlist: true,
	},
	render: (args) => (
		<div className="p-4">
			<WatchlistButton
				{...args}
				onToggle={(newState) => console.log("Toggle:", newState)}
				onSuccess={() => console.log("Success")}
			/>
		</div>
	),
}

export const Loading: Story = {
	args: {
		isLoading: true,
	},
	render: (args) => (
		<div className="p-4">
			<WatchlistButton
				{...args}
				onToggle={(newState) => console.log("Toggle:", newState)}
				onSuccess={() => console.log("Success")}
			/>
		</div>
	),
}

export const IconOnly: Story = {
	args: {
		iconOnly: true,
	},
	render: (args) => (
		<div className="p-4">
			<WatchlistButton
				{...args}
				onToggle={(newState) => console.log("Toggle:", newState)}
				onSuccess={() => console.log("Success")}
			/>
		</div>
	),
}

export const IconOnlyInWatchlist: Story = {
	args: {
		iconOnly: true,
		isInWatchlist: true,
	},
	render: (args) => (
		<div className="p-4">
			<WatchlistButton
				{...args}
				onToggle={(newState) => console.log("Toggle:", newState)}
				onSuccess={() => console.log("Success")}
			/>
		</div>
	),
}

export const TVShow: Story = {
	args: {
		mediaType: "tv",
		title: "Sample TV Show Title",
	},
	render: (args) => (
		<div className="p-4">
			<WatchlistButton
				{...args}
				onToggle={(newState) => console.log("Toggle:", newState)}
				onSuccess={() => console.log("Success")}
			/>
		</div>
	),
}

export const Outline: Story = {
	args: {
		variant: "outline",
	},
	render: (args) => (
		<div className="p-4">
			<WatchlistButton
				{...args}
				onToggle={(newState) => console.log("Toggle:", newState)}
				onSuccess={() => console.log("Success")}
			/>
		</div>
	),
}

export const Text: Story = {
	args: {
		variant: "text",
	},
	render: (args) => (
		<div className="p-4">
			<WatchlistButton
				{...args}
				onToggle={(newState) => console.log("Toggle:", newState)}
				onSuccess={() => console.log("Success")}
			/>
		</div>
	),
}

export const SmallSize: Story = {
	args: {
		size: "sm",
	},
	render: (args) => (
		<div className="p-4">
			<WatchlistButton
				{...args}
				onToggle={(newState) => console.log("Toggle:", newState)}
				onSuccess={() => console.log("Success")}
			/>
		</div>
	),
}

export const LargeSize: Story = {
	args: {
		size: "lg",
	},
	render: (args) => (
		<div className="p-4">
			<WatchlistButton
				{...args}
				onToggle={(newState) => console.log("Toggle:", newState)}
				onSuccess={() => console.log("Success")}
			/>
		</div>
	),
}

export const ExtraLargeSize: Story = {
	args: {
		size: "xl",
	},
	render: (args) => (
		<div className="p-4">
			<WatchlistButton
				{...args}
				onToggle={(newState) => console.log("Toggle:", newState)}
				onSuccess={() => console.log("Success")}
			/>
		</div>
	),
}

export const AllVariants: Story = {
	render: () => (
		<div className="flex flex-wrap gap-4 p-4">
			<WatchlistButton
				mediaType="movie"
				mediaId={1}
				isInWatchlist={false}
				size="m"
				variant="solid"
				onToggle={(newState) => console.log("Toggle:", newState)}
				onSuccess={() => console.log("Success")}
			/>
			<WatchlistButton
				mediaType="movie"
				mediaId={2}
				isInWatchlist={true}
				size="m"
				variant="solid"
				onToggle={(newState) => console.log("Toggle:", newState)}
				onSuccess={() => console.log("Success")}
			/>
			<WatchlistButton
				mediaType="movie"
				mediaId={3}
				isInWatchlist={false}
				size="m"
				variant="outline"
				onToggle={(newState) => console.log("Toggle:", newState)}
				onSuccess={() => console.log("Success")}
			/>
			<WatchlistButton
				mediaType="movie"
				mediaId={4}
				isInWatchlist={true}
				size="m"
				variant="outline"
				onToggle={(newState) => console.log("Toggle:", newState)}
				onSuccess={() => console.log("Success")}
			/>
		</div>
	),
}

export const AllSizes: Story = {
	render: () => (
		<div className="flex flex-wrap items-center gap-4 p-4">
			<WatchlistButton
				mediaType="movie"
				mediaId={1}
				isInWatchlist={false}
				size="sm"
				onToggle={(newState) => console.log("Toggle:", newState)}
				onSuccess={() => console.log("Success")}
			/>
			<WatchlistButton
				mediaType="movie"
				mediaId={2}
				isInWatchlist={false}
				size="m"
				onToggle={(newState) => console.log("Toggle:", newState)}
				onSuccess={() => console.log("Success")}
			/>
			<WatchlistButton
				mediaType="movie"
				mediaId={3}
				isInWatchlist={false}
				size="lg"
				onToggle={(newState) => console.log("Toggle:", newState)}
				onSuccess={() => console.log("Success")}
			/>
			<WatchlistButton
				mediaType="movie"
				mediaId={4}
				isInWatchlist={false}
				size="xl"
				onToggle={(newState) => console.log("Toggle:", newState)}
				onSuccess={() => console.log("Success")}
			/>
		</div>
	),
}

export const IconOnlyVariants: Story = {
	render: () => (
		<div className="flex flex-wrap gap-4 p-4">
			<WatchlistButton
				mediaType="movie"
				mediaId={1}
				isInWatchlist={false}
				iconOnly
				size="m"
				onToggle={(newState) => console.log("Toggle:", newState)}
				onSuccess={() => console.log("Success")}
			/>
			<WatchlistButton
				mediaType="movie"
				mediaId={2}
				isInWatchlist={true}
				iconOnly
				size="m"
				onToggle={(newState) => console.log("Toggle:", newState)}
				onSuccess={() => console.log("Success")}
			/>
		</div>
	),
}
