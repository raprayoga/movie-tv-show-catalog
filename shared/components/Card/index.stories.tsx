import { Button } from "@components/Button"
import { FastForward } from "lucide-react"
import type { Meta, StoryObj } from "@storybook/react"
import { Card, CardContent, CardFooter, CardHeader } from "."

const CardHeaderContent = () => <h2>Fitur Pengalihan</h2>

const CardContentContent = () => (
	<>
		<p className="font-semibold text-xl">
			Kondisi untuk Mengalihkan Ke CS (Manusia) *
		</p>
		<p className="text-text-secondary text-sm">
			Tentukan kondisi yang akan memicu AI untuk mentransfer chat ke CS manusia.
			Status chat akan menjadi Pending dan akan alihkan ke CS manusia di
			WhatsApp.
		</p>
	</>
)

const CardFooterContent = () => (
	<div className="flex justify-between">
		<Button variant="outline" btnType="neutral" className="w-1/3">
			Cancel
		</Button>
		<Button className="w-1/3">Continue</Button>
	</div>
)

const meta: Meta<typeof Card> = {
	component: Card,
	tags: ["autodocs"],
	argTypes: {
		ref: {
			control: false,
			description:
				"A reference to the card element, useful for direct DOM manipulation.",
			table: {
				defaultValue: {
					summary: "undefined",
				},
			},
		},
	},
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	render: () => (
		<Card className="w-[640px]">
			<CardHeader>
				<CardHeaderContent />
			</CardHeader>
			<CardContent>
				<CardContentContent />
			</CardContent>
			<CardFooter>
				<CardFooterContent />
			</CardFooter>
		</Card>
	),
}

export const WithHeader: Story = {
	render: () => (
		<Card className="w-[640px]">
			<CardHeader>
				<CardHeaderContent />
			</CardHeader>
			<CardContent>
				<CardContentContent />
			</CardContent>
		</Card>
	),
}

export const WithFooter: Story = {
	render: () => (
		<Card className="w-[640px]">
			<CardContent>
				<CardContentContent />
			</CardContent>
			<CardFooter>
				<CardFooterContent />
			</CardFooter>
		</Card>
	),
}

export const ContentOnly: Story = {
	render: () => (
		<Card className="w-[640px]">
			<CardContent>
				<CardContentContent />
			</CardContent>
		</Card>
	),
}

export const FullyCustomCard: Story = {
	render: () => (
		<Card className="w-[800px] border-primary-dark">
			<CardHeader className="rounded-t-xl bg-bg-primary text-lg font-bold flex gap-2 items-center">
				<FastForward className="w-5 h-5" />
				Langkah - langkah
			</CardHeader>
			<CardContent className="flex gap-3">
				<Card className="bg-bg-primary border-stroke-primary w-1/3">
					<CardContent>
						<p className="font-semibold text-xl">Langkah 1</p>
						<p className="text-text-secondary text-sm">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
							enim ad minim veniam,
						</p>
					</CardContent>
				</Card>
				<Card className="bg-bg-primary border-stroke-primary w-1/3">
					<CardContent>
						<p className="font-semibold text-xl">Langkah 2</p>
						<p className="text-text-secondary text-sm">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
							enim ad minim veniam,
						</p>
					</CardContent>
				</Card>
				<Card className="bg-bg-primary border-stroke-primary w-1/3">
					<CardContent>
						<p className="font-semibold text-xl">Langkah 3</p>
						<p className="text-text-secondary text-sm">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
							enim ad minim veniam,
						</p>
					</CardContent>
				</Card>
			</CardContent>
			<CardFooter className="rounded-b-xl border-t-none bg-bg-primary">
				<div className="flex justify-between">
					<Button variant="solid" btnType="destructive" className="w-1/3">
						Cancel
					</Button>
					<Button className="w-1/3">Continue</Button>
				</div>
			</CardFooter>
		</Card>
	),
}
