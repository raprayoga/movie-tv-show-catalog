import { Button } from "@components/Button"
import type { Meta, StoryObj } from "@storybook/react"
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTrigger,
} from "."

type Story = StoryObj<typeof Dialog>

const meta: Meta<typeof Dialog> = {
	component: Dialog,
	tags: ["autodocs"],
}

export const Default: Story = {
	render: () => {
		return (
			<Dialog>
				<DialogTrigger asChild>
					<Button>Open</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-md">
					<DialogHeader>
						Hapus File
					</DialogHeader>
					<p className="px-3">Apakah Anda yakin ingin menghapus file ini?</p>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant={"outline"} btnType="neutral" type="button">
								Cancel
							</Button>
						</DialogClose>
						<Button variant='solid' btnType={"destructive"} type="button">
							Continue
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		)
	},
}
export default meta
