"use server";
import api from "@/lib/axiosInstance";
import { revalidateTag } from "next/cache";

interface State {
  error: string | null;
}
const joinProjectAction = async (
  _prevState: State,
  formData: FormData,
): Promise<State> => {
  const invitationCode = formData.get("invitationCode");
  try {
    await api.post("/projects/join", { invitationCode });
    revalidateTag("projects", "max");
    return { error: null };
  } catch (error) {
    return { error: "An unexpected error occurred" };
  }
};

export default joinProjectAction;
