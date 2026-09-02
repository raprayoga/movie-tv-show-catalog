import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Label } from ".";
import { Input } from "@components/Input";

const meta: Meta<typeof Label> = {
  component: Label,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  render: () => (
    <div>
      <div className="flex items-center space-x-2">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" placeholder="Email" />
      </div>
    </div>
  ),
};
