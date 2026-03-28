import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Button from "./button";
import "@/app/globals.css";
const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    variant: {
      control: "select",
      options: ["primary", "secondary"],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    size: "sm",
    variant: "primary",
    children: "Button",
  },
};

export const Medium: Story = {
  args: {
    size: "md",
    variant: "primary",
    children: "Button",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    variant: "primary",
    children: "Button",
  },
};
