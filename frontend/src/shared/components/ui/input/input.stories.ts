import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Input from "./input";
import "@/app/globals.css";
const meta = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    placeholder: {
      control: "text",
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Input",
  },
};
