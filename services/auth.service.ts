
import api from "@/lib/axios";
import { LoginDto, LoginResponse, User } from "@/types/auth";

export const authService = {
  login: async (body: LoginDto): Promise<LoginResponse> => {
    const { data } = await api.post("/auth/login", body);
    return data;
  },

  me: async (): Promise<User> => {
    const { data } = await api.get("/auth/profile");
    return data;
  },

  logout: async (): Promise<void> => {
    await api.post("/auth/logout");
  },
};