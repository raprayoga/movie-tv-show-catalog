"use client"

import { Button } from "@components/Button"
import type { Meta, StoryObj } from "@storybook/react"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./"

const meta: Meta<typeof DropdownMenu> = {
	component: DropdownMenu,
	args: {},
	tags: ["autodocs"],
	argTypes: {},
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	render: () => (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button>Dropdown Item</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="min-w-96">
				<DropdownMenuItem>Dropdown Item 1</DropdownMenuItem>
				<DropdownMenuItem>Dropdown Item 2</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	),
}