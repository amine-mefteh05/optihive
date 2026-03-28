"use client";
import { useActionState } from "react";
import Input from "@/components/ui/input/input";
import Button from "@/components/ui/button/button";
import joinProjectAction from "./joinProjectAction";

interface State {
  error: string | null;
}
function Form() {
  const [_state, formAction, isPending] = useActionState<State, FormData>(
    joinProjectAction,
    { error: null },
  );
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
