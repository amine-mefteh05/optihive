"use server";
import { deleteToken } from "@/features/auth/token";
async function logoutAction() {
  await deleteToken();
}

export default logoutAction;
