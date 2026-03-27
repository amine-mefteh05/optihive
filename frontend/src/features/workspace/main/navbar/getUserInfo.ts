"use server";
import { getToken } from "@/features/auth/token";
import api from "@/lib/axiosInstance";
import { cacheTag } from "next/cache";
const fetchUserInfo = async (token: string) => {
  "use cache";
  cacheTag("userInfo");
  const response = await api.get("/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
export const getUserInfo = async () => {
  const token = await getToken();
  if (!token) throw new Error("Unauthorized");
  const user = await fetchUserInfo(token);
  return user;
};
