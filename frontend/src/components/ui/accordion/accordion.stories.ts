import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Accordion from "./accordion";
import "@/app/globals.css";
const meta = {
  title: "Components/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
    },
    variant: {
      control: "select",
      options: ["default", "alert"],
    },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Accordion",
    variant: "default",
  },
};

export const Alert: Story = {
  args: {
    children: "Accordion",
    variant: "alert",
  },
};
