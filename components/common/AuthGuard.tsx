"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const user       = useAuthStore((s) => s.user);
  const isLoading = useAuthStore((s) => s.isLoading);
  const fetchMe    = useAuthStore((s) => s.fetchMe);
  const router     = useRouter();

  useEffect(() => {
    fetchMe();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-sm text-muted-foreground">Loading…</span>
      </div>
    );
  }

  if (!user) {
    router.replace("/login");
    return null;
  }

  return <>{children}</>;
}