import type { Meta, StoryObj } from "@storybook/react"
import Skeleton from "."

const meta: Meta<typeof Skeleton> = {
	component: Skeleton,
	tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof Skeleton>

export const Default: Story = {
	args: {
		className: "h-12 w-12 rounded-full",
	},
	render: (args) => {
		return <Skeleton {...args} />
	},
}

export const Circle: Story = {
	args: {
		className: "h-[125px] w-[250px]",
	},
	render: (args) => {
		return <Skeleton {...args} />
	},
}
