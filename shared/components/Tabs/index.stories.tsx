import type { Meta, StoryObj } from "@storybook/react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "."

import { Headphones, Book, Settings } from "lucide-react"

const meta: Meta<typeof TabsList> = {
	component: TabsList,
	args: {
		className: "",
		variant: "underline",
		size: "lg",
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
		size: {
			control: "select",
			options: ["sm", "lg"],
			description:
				"Determines the size of the container of tab list & tab button trigger.",
			table: {
				defaultValue: {
					summary: "lg",
					detail: "tab list with height 40px",
				},
			},
		},
		variant: {
			control: "select",
			options: ["underline", "pill", "card"],
			description:
				"Defines the style of tab list. Example variant underline for tab with underline as active indicator.",
			table: {
				defaultValue: {
					summary: "undereline",
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
type Story = StoryObj<typeof TabsList>

export const Default: Story = {
	render: (args) => (
		<Tabs defaultValue="menu1" className="w-[400px]">
			<TabsList {...args}>
				<TabsTrigger value="menu1">Menu Tabs</TabsTrigger>
				<TabsTrigger value="menu2">Menu Tabs</TabsTrigger>
				<TabsTrigger value="menu3">Menu Tabs</TabsTrigger>
			</TabsList>
			<TabsContent value="menu1">
				standard dummy text ever since the 1500s, when an unknown printer.
			</TabsContent>
			<TabsContent value="menu2">
				Many desktop publishing packages and web page editors now use Lorem
				Ipsum.
			</TabsContent>
			<TabsContent value="menu3">
				There are many variations of passages of Lorem Ipsum available.
			</TabsContent>
		</Tabs>
	),
}

export const Pill: Story = {
	args: {
		variant: "pill",
	},
	render: (args) => (
		<Tabs defaultValue="menu1" className="w-[400px]">
			<TabsList {...args}>
				<TabsTrigger value="menu1">Menu Tabs</TabsTrigger>
				<TabsTrigger value="menu2">Menu Tabs</TabsTrigger>
				<TabsTrigger value="menu3">Menu Tabs</TabsTrigger>
			</TabsList>
			<TabsContent value="menu1">
				standard dummy text ever since the 1500s, when an unknown printer.
			</TabsContent>
			<TabsContent value="menu2">
				Many desktop publishing packages and web page editors now use Lorem
				Ipsum.
			</TabsContent>
			<TabsContent value="menu3">
				There are many variations of passages of Lorem Ipsum available.
			</TabsContent>
		</Tabs>
	),
}

export const Card: Story = {
	args: {
		variant: "card",
	},
	render: (args) => (
		<Tabs defaultValue="menu1" className="w-[400px]">
			<TabsList {...args}>
				<TabsTrigger value="menu1">Menu Tabs</TabsTrigger>
				<TabsTrigger value="menu2">Menu Tabs</TabsTrigger>
				<TabsTrigger value="menu3">Menu Tabs</TabsTrigger>
			</TabsList>
			<TabsContent value="menu1">
				standard dummy text ever since the 1500s, when an unknown printer.
			</TabsContent>
			<TabsContent value="menu2">
				Many desktop publishing packages and web page editors now use Lorem
				Ipsum.
			</TabsContent>
			<TabsContent value="menu3">
				There are many variations of passages of Lorem Ipsum available.
			</TabsContent>
		</Tabs>
	),
}

export const Underline: Story = {
	args: {
		variant: "underline",
	},
	render: (args) => (
		<Tabs defaultValue="menu1" className="w-[400px]">
			<TabsList {...args}>
				<TabsTrigger value="menu1">Menu Tabs</TabsTrigger>
				<TabsTrigger value="menu2">Menu Tabs</TabsTrigger>
				<TabsTrigger value="menu3">Menu Tabs</TabsTrigger>
			</TabsList>
			<TabsContent value="menu1">
				standard dummy text ever since the 1500s, when an unknown printer.
			</TabsContent>
			<TabsContent value="menu2">
				Many desktop publishing packages and web page editors now use Lorem
				Ipsum.
			</TabsContent>
			<TabsContent value="menu3">
				There are many variations of passages of Lorem Ipsum available.
			</TabsContent>
		</Tabs>
	),
}

export const WithIcon: Story = {
	args: {
		variant: "card",
		className: "w-full grid w-full grid-cols-3 mb-2",
	},
	render: (args) => (
		<Tabs defaultValue="menu1" className="min-w-8/12">
			<TabsList {...args}>
				<TabsTrigger value="menu1">
					<Settings className="w-5 h-5" />
					Atur Preferensi
				</TabsTrigger>
				<TabsTrigger value="menu2">
					<Headphones className="w-5 h-5" />
					Atur Instruksi & Kondisi
				</TabsTrigger>
				<TabsTrigger value="menu3">
					<Book className="w-5 h-5" />
					Tambah Pengetahuan & Latih Ai
				</TabsTrigger>
			</TabsList>
			<div className="rounded-lg border border-stroke-primary p-4 min-h-60">
				<TabsContent value="menu1">
					standard dummy text ever since the 1500s, when an unknown printer.
				</TabsContent>
				<TabsContent value="menu2">
					Many desktop publishing packages and web page editors now use Lorem
					Ipsum.
				</TabsContent>
				<TabsContent value="menu3">
					There are many variations of passages of Lorem Ipsum available.
				</TabsContent>
			</div>
		</Tabs>
	),
}
