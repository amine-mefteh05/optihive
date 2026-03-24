"use client";
import Input from "@/components/ui/input/input";
import Password from "@/components/ui/input/password/password";
import { loginAction } from "./loginAction";
import { useActionState } from "react";
import Button from "@/components/ui/button/button";
import Accordion from "@/components/ui/accordion/accordion";
import { AlertCircle } from "lucide-react";
import useApplyDarkmode from "@/features/darkmode/useApplyDarkmode";

function Form() {
  useApplyDarkmode();
  const [state, formAction, isPending] = useActionState(loginAction, {
    error: null,
  });
  return (
    <form className="flex flex-col gap-5" action={formAction}>
      <Input type="email" placeholder="Email" name="email" required />
      <Password name="password" placeholder="Password" required minLength={8} />
      <Button
        type="submit"
        size="lg"
        className="w-full disabled:cursor-not-allowed disabled:opacity-50"
        variant="primary"
        disabled={isPending}
      >
        {isPending ? "Submitting..." : "Login"}
      </Button>
      {state.error && (
        <Accordion variant="alert">
          <AlertCircle className="inline mr-2" />
          {state.error}
        </Accordion>
      )}
    </form>
  );
}

export default Form;
