import { toast } from "react-toastify";
import api from "../app/axios"
import { useAuthStore } from "./auth.store"
import type { AuthRes,User } from "./type";
import axios from "axios";

//login
export const login = async (username: string, password: string):Promise<AuthRes> => {
  const setTokens = useAuthStore.getState().setTokens;

  try {
    const { data } = await api.post<AuthRes>("/auth/login", { username, password });
    setTokens(data.accessToken, data.refreshToken);
    toast.success("Login successful");

    return data;
  } catch (error: any) {
    setTokens(null, null);
    const message : string =
      error.code === "ERR_NETWORK"
        ? "Connect to internet"
        : error.response?.data?.message || "Login failed";
    toast.error(message);
    throw error;
  }
};

//refresh with axios
export const refresh = async (refreshToken: string): Promise<AuthRes> => {
  try {
    const { data } = await axios.post<AuthRes>("https://dummyjson.com/auth/refresh", { refreshToken });
    return data;
  } catch (error: any) {
    // Edge case: Network error or server unavailable
    const message = error.code === "ERR_NETWORK" 
      ? "Network error during token refresh"
      : error.response?.data?.message || "Token refresh failed";
    console.error(message);
    throw error;
  }
}

//Curent user
export const getuserData = async ():Promise<User> => {
  const { data } = await api.get<User>('/auth/me');
      return data;
}