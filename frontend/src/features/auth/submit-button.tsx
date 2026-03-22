"use client";
import { useFormStatus } from "react-dom";
import Button from "@/components/ui/button/button";

type submitButtonProps = {
  text: string;
};
function SubmitButton({ text }: Readonly<submitButtonProps>) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      size="lg"
      className="w-full disabled:cursor-not-allowed disabled:opacity-50"
      variant="primary"
      disabled={pending}
    >
      {pending ? "Submitting..." : text}
    </Button>
  );
}

export default SubmitButton;
