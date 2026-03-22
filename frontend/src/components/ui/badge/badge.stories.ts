import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Badge from "./badge";
import "@/app/globals.css";
const meta = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Badge",
  },
};
