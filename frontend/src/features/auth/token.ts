import { cookies } from "next/headers";

export async function getToken() {
  const cookieStore = (await cookies()).get("token");
  return cookieStore?.value;
}
export async function setToken(token: string) {
  const cookieStore = (await cookies()).set("token", token);
}
export async function deleteToken() {
  const cookieStore = (await cookies()).delete("token");
}
