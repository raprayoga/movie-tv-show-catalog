import { FastForward } from "lucide-react"
import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "."

const meta: Meta<typeof Button> = {
	component: Button,
	args: {
		children: "Button",
		variant: "solid",
		btnType: "primary",
		size: "xl",
		disabled: false,
		className: "min-w-44",
	},
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: ["solid", "outline", "text"],
			description:
				'Specifies the main style of the button. For example, "solid" for a standard button look.',
			table: {
				defaultValue: {
					summary: "solid",
					detail: "button with solid decoration",
				},
			},
		},
		btnType: {
			control: "select",
			options: ["primary", "neutral", "destructive"],
			description:
				'Defines the type of the button based on its purpose, like "primary" for the main action or "secondary" for a secondary action.',
			table: {
				defaultValue: {
					summary: "primary",
					detail: "button with primary color dominant",
				},
			},
		},
		size: {
			control: "select",
			options: ["sm", "m", "lg", "xl"],
			description: `Sets the button's size. For example, "xl" for an extra-large button.`,
			table: {
				defaultValue: {
					summary: "m",
					detail: "36px height",
				},
			},
		},
		className: {
			description:
				"Adds additional CSS classes to customize the button's style.",
			table: {
				defaultValue: {
					summary: "undefined",
				},
			},
		},
		disabled: {
			description:
				"If set to true, disables the button, making it unclickable.",
			table: {
				defaultValue: {
					summary: "false",
				},
			},
		},
		asChild: {
			control: "boolean",
			description:
				"determines the component type for rendering. If asChild is true, it returns Slot from Radix UI, allowing the component to inherit attributes and behaviors from its parent.",
		},
		leftIcon: {
			control: false,
			description:
				"Adds an icon to the left side of the button text, such as a fast-forward icon.",
			table: {
				defaultValue: {
					summary: "undefined",
				},
			},
		},
		rightIcon: {
			control: false,
			description:
				"Adds an icon to the right side of the button text, similar to the leftIcon.",
			table: {
				defaultValue: {
					summary: "undefined",
				},
			},
		},
		ref: {
			control: false,
			description:
				"A reference to the button element, useful for direct DOM manipulation (e.g., focusing the button).",
			table: {
				defaultValue: {
					summary: "undefined",
				},
			},
		},
	},
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
	args: {
		variant: "solid",
	},
}

export const Outline: Story = {
	args: {
		variant: "outline",
	},
}

export const Text: Story = {
	args: {
		variant: "text",
	},
}

export const WithIcon: Story = {
	render: (args) => (
		<Button {...args} leftIcon={<FastForward />} rightIcon={<FastForward />}>
			Button
		</Button>
	),
}

export const LeftIcon: Story = {
	render: (args) => (
		<Button {...args} leftIcon={<FastForward />}>
			Button
		</Button>
	),
}
export const RightIcon: Story = {
	render: (args) => (
		<Button {...args} rightIcon={<FastForward />}>
			Button
		</Button>
	),
}

export const OnlyIcon: Story = {
	args: {
		className: "",
	},
	render: (args) => (
		<Button {...args}>
			<FastForward className="w-4 h-4" />
		</Button>
	),
}

export const Link: Story = {
	args: {
		variant: "text",
		btnType: "primary",
		size: "sm",
		asChild: true,
	},
	render: (args) => (
		<Button {...args}>
			<a href="http://localhost:6006/">Login</a>
		</Button>
	),
}
