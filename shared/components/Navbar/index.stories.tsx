import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Navbar } from "./index"

const meta: Meta<typeof Navbar> = {
	component: Navbar,
	tags: ["autodocs"],
	parameters: {
		layout: "fullscreen",
		backgrounds: {
			default: "white",
			values: [
				{ name: "white", value: "#ffffff" },
				{ name: "dark", value: "#0a0a0a" },
			],
		},
	},
}

export default meta
type Story = StoryObj<typeof Navbar>

export const Default: Story = {}

export const NonLoggedIn: Story = {
	parameters: {
		nextjs: {
			appRouter: true,
		},
	},
}

export const LoggedIn: Story = {
	parameters: {
		nextjs: {
			appRouter: true,
		},
	},
}
