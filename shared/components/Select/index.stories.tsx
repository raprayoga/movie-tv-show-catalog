import { Circle, Settings, Star, AlertCircle } from 'lucide-react'
import type { Meta, StoryObj } from "@storybook/react"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "."

const meta: Meta<typeof SelectTrigger> = {
	component: SelectTrigger,
	args: {
		size: "xl",
	},
	tags: ["autodocs"],
	argTypes: {
		size: {
			control: "select",
			options: ["sm", "m", "lg", "xl"],
			description:
				"Controls the size of the input field and related elements. Example: 'xl' for extra-large size.",
			table: {
				defaultValue: {
					summary: "xl",
					detail: "44px height",
				},
			},
		},
		ref: {
			control: false,
			description:
				"A reference to the element, useful for direct DOM manipulation",
			table: {
				defaultValue: {
					summary: "undefined",
				},
			},
		},
	},
}

export default meta
type Story = StoryObj<typeof SelectTrigger>

export const Default: Story = {
	render: (args) => (
		<Select>
			<SelectTrigger className="w-[300px]" {...args}>
				<SelectValue placeholder="Pilih tema" />
			</SelectTrigger>
			<SelectContent className="w-full">
				<SelectItem value="light">Terang</SelectItem>
				<SelectItem value="dark">Gelap</SelectItem>
				<SelectItem value="system">Sistem</SelectItem>
			</SelectContent>
		</Select>
	),
}

export const DefaultItemText: Story = {
	render: (args) => (
		<Select>
			<SelectTrigger className="w-[300px]" {...args}>
				<SelectValue placeholder="Pilih tema" />
			</SelectTrigger>
			<SelectContent className="w-full">
				<SelectItem value="light" itemText="Terang">
					<div>
						<p className="font-medium">Terang</p>
						<p>
							<small className="text-text-secondary text-xs leading-4 font-normal">
								Terang merukan sebuah kondisi dimana tidak gelap
							</small>
						</p>
					</div>
				</SelectItem>
				<SelectItem value="dark" itemText="Gelap">
					<div>
						<p className="font-medium">Gelap</p>
						<p>
							<small className="text-text-secondary text-xs leading-4 font-normal">
								Gelap merukan sebuah kondisi dimana tidak terang
							</small>
						</p>
					</div>
				</SelectItem>
				<SelectItem value="system" itemText="Sistem">
					<div>
						<p className="font-medium">Sistem</p>
						<p>
							<small className="text-text-secondary text-xs leading-4 font-normal">
								Sistem merukan sebuah kondisi dimana mengikuti sistem yang
								berlaku
							</small>
						</p>
					</div>
				</SelectItem>
			</SelectContent>
		</Select>
	),
}

export const Icon: Story = {
	render: (args) => (
		<Select>
			<SelectTrigger className="w-[300px]" {...args}>
				<SelectValue placeholder="Pilih tema" />
			</SelectTrigger>
			<SelectContent className="w-full">
				<SelectItem
					value="light"
					IconLeft={<Circle />}
					IconRight={<AlertCircle />}
				>
					Terang
				</SelectItem>
				<SelectItem
					value="dark"
					IconLeft={<Star />}
					IconRight={<AlertCircle />}
				>
					Gelap
				</SelectItem>
				<SelectItem
					value="system"
					IconLeft={<Settings />}
					IconRight={<AlertCircle />}
				>
					Sistem
				</SelectItem>
			</SelectContent>
		</Select>
	),
}
