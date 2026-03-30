"use client";
import Input from "@/shared/components/ui/input/input";
import Button from "@/shared/components/ui/button/button";
import joinProjectAction from "./joinProjectAction";
import useForm from "@/shared/hooks/useForm";

function Form() {
  const { formAction, isPending } = useForm({
    action: joinProjectAction,
    successMessage: "Project joined successfully",
    errorMessage: "Failed to join project",
  });
  return (
    <form action={formAction} className="flex flex-col gap-5 w-4/5">
      <Input
        type="text"
        placeholder="Invitation code"
        name="invitationCode"
        className="text-md font-bold px-2 py-4!"
        required
      />
      <Button
        type="submit"
        size="lg"
        variant="primary"
        disabled={isPending}
        className="cursor-pointer font-bold disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? "Joining..." : "Join project"}
      </Button>
    </form>
  );
}

export default Form;
