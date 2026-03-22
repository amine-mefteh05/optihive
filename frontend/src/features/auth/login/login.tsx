"use client";

import Button from "@/components/ui/button/button";
import Input from "@/components/ui/input/input";
import { H3Gradiant } from "@/components/ui/title-gradiant/title-gradiant";
import Link from "next/link";
import useApplyDarkmode from "@/features/darkmode/useApplyDarkmode";
import Password from "@/components/ui/input/password/password";
function Login() {
  useApplyDarkmode();
  return (
    <div className="flex flex-col gap-5 max-w-lg w-full dark:border dark:border-white/20 rounded-lg p-5 shadow-lg">
      <H3Gradiant className="text-center">Welcome Back</H3Gradiant>
      <form className="flex flex-col gap-5">
        <Input type="email" placeholder="Email" name="email" />
        <Password name="password" placeholder="Password" />
        <Button type="submit" size="lg" className="w-full" variant="primary">
          Login
        </Button>
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
