import api from "@/lib/axiosInstance";
export const getUserInfo = async () => {
  const response = await api.get("/users/me");
  return response.data;
};
