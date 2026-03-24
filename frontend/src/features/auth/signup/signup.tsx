"use client";
import Accordion from "@/components/ui/accordion/accordion";
import Input from "@/components/ui/input/input";
import { H3Gradiant } from "@/components/ui/title-gradiant/title-gradiant";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import useApplyDarkmode from "@/features/darkmode/useApplyDarkmode";
import Password from "@/components/ui/input/password/password";
import SubmitButton from "../submit-button";
import {
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
  PASSWORD_MIN_LENGTH,
} from "../../../../../constants.js";
function Signup() {
  useApplyDarkmode();
  return (
    <div className="flex flex-col gap-5 max-w-2xl w-full dark:border dark:border-white/20 rounded-lg p-5 shadow-lg">
      <H3Gradiant className="text-center">Create Account</H3Gradiant>
      <form className="flex flex-col gap-5">
        <Input
          type="text"
          placeholder="Name"
          name="name"
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
          {PASSWORD_MIN_LENGTH} characters and must contain at least one
          uppercase letter, one lowercase letter and one number
        </Accordion>
        <SubmitButton text="Sign Up" />
      </form>
      <p className="text-center">
        Already have an account?{" "}
        <Link href="/login" className="text-primary">
          Login
        </Link>
      </p>
    </div>
  );
}

export default Signup;
