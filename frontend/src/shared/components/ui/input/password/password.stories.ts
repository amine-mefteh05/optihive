import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Password from "./password";
import "@/app/globals.css";
const meta = {
  title: "Components/Password",
  component: Password,
  tags: ["autodocs"],
} satisfies Meta<typeof Password>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Password",
    name: "password",
  },
};
