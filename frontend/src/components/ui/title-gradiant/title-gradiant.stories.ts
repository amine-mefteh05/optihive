import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import TitleGradiant from "./title-gradiant";
import "@/app/globals.css";
const meta = {
  title: "Components/TitleGradiant",
  component: TitleGradiant,
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
    },
    level: {
      control: "select",
      options: [1, 2, 3, 4, 5, 6],
    },
  },
} satisfies Meta<typeof TitleGradiant>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Title",
    level: 1,
  },
};
