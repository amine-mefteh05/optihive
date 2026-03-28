"use server";
import api from "@/lib/axiosInstance";
import { revalidateTag } from "next/cache";
interface State {
  success: boolean | null;
  error: string | null;
  timespan: number;
}
const joinProjectAction = async (
  _prevState: State,
  formData: FormData,
): Promise<State> => {
  const invitationCode = formData.get("invitationCode");
  try {
    await api.post("/projects/join", { invitationCode });
    revalidateTag("projects", "max");
    return { success: true, error: null, timespan: Date.now() };
  } catch (error) {
    return {
      success: false,
      error: "An unexpected error occurred",
      timespan: Date.now(),
    };
  }
};

export default joinProjectAction;
