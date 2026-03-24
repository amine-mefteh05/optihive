"use server";
import { redirect } from "next/navigation";
import { getToken } from "./token";
export const protectedAction = async () => {
  const token = await getToken();
  if (!token) {
    redirect("/login");
  }
};

export const reverseProtectedAction = async () => {
  const token = await getToken();
  if (token) {
    redirect("/");
  }
};
