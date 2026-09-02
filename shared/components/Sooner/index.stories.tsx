import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Toaster as Sonner } from "./index";
import { toast } from "sonner";
import { Button } from "@components/Button";

const meta: Meta<typeof Sonner> = {
  component: Sonner,
  tags: ["autodocs"],
  argTypes: {
    theme: {
      control: "select",
      options: ["light", "dark", "system"],
      description: "Color scheme of the toasts",
    },
    position: {
      control: "select",
      options: ["top-left", "top-center", "top-right", "bottom-left", "bottom-center", "bottom-right"],
      description: "Where to position the toasts",
    },
    expand: {
      control: "boolean",
      description: "Whether to expand toasts",
    },
    visibleToasts: {
      control: { type: "number", min: 1, max: 10 },
      description: "Number of visible toasts",
    },
    closeButton: {
      control: "boolean",
      description: "Show close button on toasts",
    },
    richColors: {
      control: "boolean",
      description: "Use rich colors for toast types",
    },
  },
  args: {
    theme: "system",
    position: "bottom-right",
    expand: false,
    visibleToasts: 3,
    closeButton: false,
    richColors: true,
  },
};

export default meta;
type Story = StoryObj<typeof Sonner>;

export const Default: Story = {
  render: (args) => {
    return (
      <div className="flex justify-center py-10">
        <Sonner {...args} />
        <Button
          variant="outline"
          btnType="neutral"
          onClick={() =>
            toast("Event has been created", {
              description: "Sunday, December 03, 2023 at 9:00 AM",
              action: {
                label: "Undo",
                onClick: () => console.log("Undo"),
              },
            })
          }
        >
          Show Toast
        </Button>
      </div>
    );
  },
};

export const Success: Story = {
  render: (args) => {
    return (
      <div className="flex justify-center py-10">
        <Sonner {...args} />
        <Button
          variant="outline"
          btnType="primary"
          onClick={() =>
            toast.success("Changes saved successfully", {
              description: "Your profile has been updated.",
            })
          }
        >
          Show Success
        </Button>
      </div>
    );
  },
};

export const Danger: Story = {
  render: (args) => {
    return (
      <div className="flex justify-center py-10">
        <Sonner {...args} />
        <Button
          variant="outline"
          btnType="destructive"
          onClick={() =>
            toast.error("Something went wrong", {
              description: "Please try again later.",
            })
          }
        >
          Show Danger
        </Button>
      </div>
    );
  },
};
