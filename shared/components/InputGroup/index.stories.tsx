import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AtSign, Copy, DollarSign, Search } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from ".";

const meta: Meta<typeof InputGroup> = {
  component: InputGroup,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InputGroup>;

export const Default: Story = {
  render: () => (
    <InputGroup className="max-w-sm">
      <InputGroupInput placeholder="Nama lengkap" />
    </InputGroup>
  ),
};

export const InlineTextStart: Story = {
  render: () => (
    <InputGroup className="max-w-sm">
      <InputGroupText className='ml-1'>
        <AtSign />
      </InputGroupText>
      <InputGroupInput type="email" placeholder="nama@email.com" />
    </InputGroup>
  ),
};

export const InlineButtonEnd: Story = {
  render: () => (
    <InputGroup className="max-w-sm">
      <InputGroupInput placeholder="Kode undangan" />
      <InputGroupButton className="items-center" variant="text">
        <Copy />
        <span className="text-xs">Salin</span>
      </InputGroupButton>
    </InputGroup>
  ),
};

export const AddonInlineStart: Story = {
  render: () => (
    <InputGroup className="max-w-sm">
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
      <InputGroupInput placeholder="Cari tamu..." />
    </InputGroup>
  ),
};

export const AddonInlineEnd: Story = {
  render: () => (
    <InputGroup className="max-w-sm">
      <InputGroupInput placeholder="Nominal donasi" />
      <InputGroupAddon align="inline-end">
        <DollarSign />
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const BlockStart: Story = {
  render: () => (
    <InputGroup className="max-w-sm">
      <InputGroupAddon align="inline-start">
        <kbd className="rounded bg-muted px-1.5 py-0.5 text-xs">Ctrl</kbd>+{" "}
        <kbd className="rounded bg-muted px-1.5 py-0.5 text-xs">K</kbd>
      </InputGroupAddon>
      <InputGroupInput placeholder="Shortcut" />
    </InputGroup>
  ),
};

export const BlockEnd: Story = {
  render: () => (
    <>
      <InputGroup className="max-w-sm">
        <InputGroupInput placeholder="Catatan" />
      </InputGroup>
      <InputGroupAddon align="block-end">Maks. 200 karakter</InputGroupAddon>
    </>
  ),
};

export const Disabled: Story = {
  render: () => (
    <InputGroup className="max-w-sm">
      <InputGroupInput placeholder="Tidak dapat diisi" disabled />
      <InputGroupButton size="xs" disabled>
        Salin
      </InputGroupButton>
    </InputGroup>
  ),
};

export const Invalid: Story = {
  render: () => (
    <InputGroup className="max-w-sm">
      <InputGroupInput placeholder="nama@email.com" aria-invalid />
    </InputGroup>
  ),
};
