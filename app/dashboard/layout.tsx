"use client";

import { useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { fetchMe, user, isLoading } = useAuth();

  useEffect(() => {
    if (!user) fetchMe();
  }, []);

  if (isLoading) return <div>Chcking User Loading…</div>;

  return <>{children}</>;
}


// import React from 'react'

// export default function DashboardLayout({children}) {

//   const
//   return (
//     <div>
//         {children}
//     </div>
//   )
// }
