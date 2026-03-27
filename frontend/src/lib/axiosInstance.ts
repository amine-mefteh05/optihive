import axios from "axios";
import { deleteToken, getToken } from "@/features/auth/token";
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
api.interceptors.request.use(async (config) => {
  try {
    if (config.headers.Authorization)
      return config; /* to handle cached requests */
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error(error);
  }
  return config;
});
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      try {
        await deleteToken();
      } catch (error) {
        console.error(error);
      }
    }
    return Promise.reject(error);
  },
);
export default api;
