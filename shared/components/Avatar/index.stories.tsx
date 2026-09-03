import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Avatar } from "./index";

const meta: Meta<typeof Avatar> = {
	component: Avatar,
	tags: ["autodocs"],
	argTypes: {
		size: {
			control: "select",
			options: ["sm", "md", "lg"],
			description: "Avatar size",
		},
		src: {
			control: "text",
			description: "Image URL for the avatar",
		},
		alt: {
			control: "text",
			description: "Alt text for the image",
		},
		fallback: {
			control: "text",
			description: "Fallback text when no image or on error",
		},
	},
	args: {
		size: "md",
		fallback: "JD",
	},
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
	args: {
		fallback: "JD",
	},
};

export const Small: Story = {
	args: {
		size: "sm",
		fallback: "JD",
	},
};

export const Medium: Story = {
	args: {
		size: "md",
		fallback: "JD",
	},
};

export const Large: Story = {
	args: {
		size: "lg",
		fallback: "JD",
	},
};

export const WithImage: Story = {
	args: {
		src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
		alt: "User avatar",
		fallback: "JD",
	},
};

export const ImageErrorFallback: Story = {
	render: (args) => {
		return (
			<Avatar
				{...args}
				src="invalid-image-url"
				fallback="JD"
			/>
		);
	},
	args: {
		size: "md",
	},
};

export const DifferentInitials: Story = {
	render: () => (
		<div className="flex gap-4">
			<Avatar fallback="AB" size="sm" />
			<Avatar fallback="CD" size="md" />
			<Avatar fallback="EF" size="lg" />
		</div>
	),
};

export const Sizes: Story = {
	render: () => (
		<div className="flex gap-4 items-center">
			<Avatar fallback="SM" size="sm" />
			<Avatar fallback="MD" size="md" />
			<Avatar fallback="LG" size="lg" />
		</div>
	),
};
