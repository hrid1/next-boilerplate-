import { useAuthStore } from "@/store/auth.store";

export function useAuth() {
  const user      = useAuthStore((s:any) => s.user);
  const isLoading = useAuthStore((s:any) => s.isLoading);
  const login     = useAuthStore((s:any) => s.login);
  const logout    = useAuthStore((s:any) => s.logout);
  const fetchMe   = useAuthStore((s:any) => s.fetchMe);

  return {
    user,
    isLoading,
    login,
    logout,
    fetchMe,
    isAuthenticated: !!user,
    isAdmin:         user?.role === "admin",
  };
}