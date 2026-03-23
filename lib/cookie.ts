import { authConfig } from "@/config/auth.config";

export const cookie = {
  get: (name: string): string | null => {
    if (typeof document === "undefined") return null; // SSR guard
    return (
      document.cookie
        .split("; ")
        .find((row) => row.startsWith(`${name}=`))
        ?.split("=")[1] ?? null
    );
  },

  set: (name: string, value: string, days = authConfig.tokenExpiry) => {
    const expires = new Date();
    expires.setDate(expires.getDate() + days);
    document.cookie = [
      `${name}=${value}`,
      `expires=${expires.toUTCString()}`,
      "path=/",
      "SameSite=Strict",
      process.env.NODE_ENV === "production" ? "Secure" : "",
    ]
      .filter(Boolean)
      .join("; ");
  },

  remove: (name: string) => {
    document.cookie = `${name}=; Max-Age=0; path=/`;
  },
};
