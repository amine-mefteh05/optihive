import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Error from "./error";
import "@/app/globals.css";
const meta = {
  title: "ui/error",
  component: Error,
} satisfies Meta<typeof Error>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {},
};
