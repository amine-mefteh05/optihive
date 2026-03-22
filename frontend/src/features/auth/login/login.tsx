"use client";

import Input from "@/components/ui/input/input";
import { H3Gradiant } from "@/components/ui/title-gradiant/title-gradiant";
import Link from "next/link";
import useApplyDarkmode from "@/features/darkmode/useApplyDarkmode";
import Password from "@/components/ui/input/password/password";
import SubmitButton from "../submit-button";
function Login() {
  useApplyDarkmode();
  return (
    <div className="flex flex-col gap-5 max-w-lg w-full dark:border dark:border-white/20 rounded-lg p-5 shadow-lg">
      <H3Gradiant className="text-center">Welcome Back</H3Gradiant>
      <form className="flex flex-col gap-5">
        <Input type="email" placeholder="Email" name="email" required />
        <Password
          name="password"
          placeholder="Password"
          required
          minLength={8}
        />
        <SubmitButton />
      </form>
      <p className="text-center">
        Don't have an account?{" "}
        <Link href="/signup" className="text-primary">
          Sign Up
        </Link>
      </p>
    </div>
  );
}

export default Login;
