import { Button } from "@components/Button"
import type { Meta, StoryObj } from "@storybook/react"
import { Popover, PopoverContent, PopoverTrigger } from "."

const meta: Meta<typeof PopoverContent> = {
	component: PopoverContent,
	args: {
		className: "bg-white flex flex-col gap-2",
		side: "right",
		align: "start",
		sideOffset: 10,
	},
	tags: ["autodocs"],
	argTypes: {
		className: {
			description:
				"Adds additional CSS classes to customize the component's style.",
			table: {
				defaultValue: {
					summary: "undefined",
				},
			},
		},
		side: {
			control: "select",
			options: ["bottom", "top", "left", "right"],
			description: "Defines the position of popover relative to the trigger.",
			table: {
				defaultValue: {
					summary: "bottom",
				},
			},
		},
		align: {
			control: "select",
			options: ["center", "end", "start"],
			description: "The preferred alignment against the trigger.",
			table: {
				defaultValue: {
					summary: "center",
				},
			},
		},
		sideOffset: {
			description: "The distance in pixels from the trigger.",
			table: {
				defaultValue: {
					summary: "0",
				},
			},
		},
		ref: {
			control: false,
			description:
				"A reference to the component element, useful for direct DOM manipulation.",
		},
	},
}

export default meta
type Story = StoryObj<typeof PopoverContent>

export const Default: Story = {
	render: (args) => (
		<Popover>
			<PopoverTrigger asChild>
				<Button>Click me to open popover !</Button>
			</PopoverTrigger>
			<PopoverContent {...args}>
				<Button variant="text" btnType="neutral" className="w-full">
					Item 1
				</Button>

				<Button variant="text" btnType="neutral" className="w-full">
					Item 2
				</Button>
			</PopoverContent>
		</Popover>
	),
}
