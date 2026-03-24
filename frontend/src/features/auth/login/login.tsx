import { H3Gradiant } from "@/components/ui/title-gradiant/title-gradiant";
import Link from "next/link";
import Form from "./form";
import { reverseProtectedAction } from "../protectedAction";
async function Login() {
  await reverseProtectedAction();
  return (
    <div className="flex flex-col gap-5 max-w-lg w-full dark:border dark:border-white/20 rounded-lg p-5 shadow-lg">
      <H3Gradiant className="text-center">Welcome Back</H3Gradiant>
      <Form />
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
