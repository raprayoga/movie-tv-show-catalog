import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Navbar } from "./index";

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
	argTypes: {
		isLoggedIn: {
			control: "boolean",
			description: "Toggle between logged-in and logged-out state",
		},
	},
};

export default meta;
type Story = StoryObj<typeof Navbar>;

export const NonLoggedIn: Story = {
	args: {
		isLoggedIn: false,
	},
};

export const LoggedIn: Story = {
	args: {
		isLoggedIn: true,
	},
};

export const BothStates: Story = {
	render: () => (
		<div className="space-y-8">
			<div>
				<h2 className="mb-4 text-lg font-semibold text-text-primary">
					Non-Logged In
				</h2>
				<Navbar isLoggedIn={false} />
			</div>
			<div>
				<h2 className="mb-4 text-lg font-semibold text-text-primary">Logged In</h2>
				<Navbar isLoggedIn={true} />
			</div>
		</div>
	),
	parameters: {
		layout: "padded",
	},
};
