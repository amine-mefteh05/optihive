"use client";
import { useActionState } from "react";
import Input from "@/shared/components/ui/input/input";
import Button from "@/shared/components/ui/button/button";
import joinProjectAction from "./joinProjectAction";
import useToast from "@/shared/hooks/useToast";

interface State {
  success: boolean | null;
  error: string | null;
  timespan: number;
}
function Form() {
  const [state, formAction, isPending] = useActionState<State, FormData>(
    joinProjectAction,
    { success: null, error: null, timespan: Date.now() },
  );
  useToast({
    successMessage: "Project joined successfully",
    errorMessage: "Failed to join project",
    success: state.success,
    timespan: state.timespan,
  });
  return (
    <form action={formAction} className="flex flex-col gap-5">
      <Input
        type="text"
        placeholder="Invitation code"
        name="invitationCode"
        className="text-sm px-2 py-1!"
        required
      />
      <Button
        type="submit"
        size="sm"
        variant="primary"
        disabled={isPending}
        className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? "Joining..." : "Join project"}
      </Button>
    </form>
  );
}

export default Form;
