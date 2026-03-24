import { H3Gradiant } from "@/components/ui/title-gradiant/title-gradiant";
import Link from "next/link";
import { reverseProtectedAction } from "../protectedAction";
import Form from "./form";
async function Signup() {
  await reverseProtectedAction();
  return (
    <div className="flex flex-col gap-5 max-w-2xl w-full dark:border dark:border-white/20 rounded-lg p-5 shadow-lg">
      <H3Gradiant className="text-center">Create Account</H3Gradiant>
      <Form />
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
