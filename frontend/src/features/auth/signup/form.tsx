"use client";

import Input from "@/shared/components/ui/input/input";
import Password from "@/shared/components/ui/input/password/password";
import Accordion from "@/shared/components/ui/accordion/accordion";
import { AlertCircle } from "lucide-react";
import Button from "@/shared/components/ui/button/button";
import {
  USERNAME_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from "../../../../../constants.mjs";
import { useActionState } from "react";
import { signupAction } from "./signupAction";

function Form() {
  const [state, formAction, isPending] = useActionState(signupAction, {
    error: null,
  });
  return (
    <form className="flex flex-col gap-5" action={formAction}>
      <Input
        type="text"
        placeholder="Name"
        name="username"
        required
        minLength={USERNAME_MIN_LENGTH}
        maxLength={USERNAME_MAX_LENGTH}
      />
      <Accordion className="text-sm">
        <AlertCircle className="inline mr-2" /> name must contain between{" "}
        {USERNAME_MIN_LENGTH} and {USERNAME_MAX_LENGTH} characters and must
        contain only letters and numbers
      </Accordion>
      <Input type="email" placeholder="Email" name="email" required />
      <Accordion className="text-sm">
        <AlertCircle className="inline mr-2" /> email must be a valid email
        address
      </Accordion>
      <Password
        name="password"
        placeholder="Password"
        required
        minLength={PASSWORD_MIN_LENGTH}
      />
      <Accordion className="text-sm">
        <AlertCircle className="inline mr-2" /> password must contain at least{" "}
        {PASSWORD_MIN_LENGTH} characters and must contain at least one uppercase
        letter, one lowercase letter and one number
      </Accordion>
      <Button
        type="submit"
        size="lg"
        className="w-full disabled:cursor-not-allowed disabled:opacity-50"
        variant="primary"
        disabled={isPending}
      >
        {isPending ? "Submitting..." : "Sign Up"}
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
