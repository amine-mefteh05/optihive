"use server";
import api from "@/lib/axiosInstance";
import { revalidateTag } from "next/cache";
export async function createProjectAction(formData: FormData) {
  const projectName = formData.get("name") as string;
  const description = formData.get("description") as string;
  const deadline = formData.get("deadline") as string;
  const usDeadline = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(deadline));
  const project = await api.post("/projects/create", {
    projectName,
    projectDescription: description,
    deadline: usDeadline,
  });
  revalidateTag("projects", "max");
  return project;
}
