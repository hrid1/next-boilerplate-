import { create } from "zustand";
import { authConfig } from "@/config/auth.config";
import { cookie } from "@/lib/cookie";
import { authService } from "@/services/auth.service";
import { User } from "@/types/auth";

type AuthState = {
  user:      User | null;
  isLoading: boolean;

  login:   (email: string, password: string) => Promise<void>;
  logout:  () => Promise<void>;
  fetchMe: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user:      null,
  isLoading: false,

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const data = await authService.login({ email, password });
      console.log("login res data", data)

      // Bearer mode → backend returns token → store in cookie
      // httpOnly mode → backend sets cookie itself → nothing to do
      if (!authConfig.httpOnly && data.access_token) {
        cookie.set(authConfig.cookieName, data.access_token);
      }

      if (!authConfig.httpOnly && data.refresh_Token) {
        cookie.set(authConfig.refreshCookie, data.refresh_Token);
      }

      set({ user: data.user, isLoading: false });
    } catch (err) {
      set({ isLoading: false });
      throw err;
    }
  },

  logout: async () => {
    try {
      await authService.logout();   // backend clears httpOnly cookie if applicable
    } finally {
      if (!authConfig.httpOnly) {
        cookie.remove(authConfig.cookieName);
        cookie.remove(authConfig.refreshCookie);
      }
      set({ user: null });
      window.location.href = "/login";
    }
  },

  fetchMe: async () => {
    // Bearer mode → no token in cookie → skip
    if (!authConfig.httpOnly && !cookie.get(authConfig.cookieName)) {
      set({ user: null, isLoading: false });
      return;
    }

    set({ isLoading: true });
    try {
      const user = await authService.me();
      set({ user, isLoading: false });
    } catch {
      if (!authConfig.httpOnly) {
        cookie.remove(authConfig.cookieName);
      }
      set({ user: null, isLoading: false });
    }
  },
}));