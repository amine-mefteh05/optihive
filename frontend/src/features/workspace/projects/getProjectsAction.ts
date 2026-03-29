"use server";
import { getToken } from "@/features/auth/token";
import { cacheTag } from "next/cache";
import api from "@/lib/axiosInstance";

const fetchProjects = async (token: string) => {
  "use cache";
  cacheTag("projects");
  const response = await api.get("/projects", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.projects;
};
export const getProjectsAction = async () => {
  const token = await getToken();
  if (!token) {
    throw new Error("Unauthorized");
  }
  return fetchProjects(token);
};
