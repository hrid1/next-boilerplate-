import { NextRequest, NextResponse } from "next/server";
import { authConfig } from "@/config/auth.config";

const protectedRoutes = ["/dashboard"];
const authRoutes      = ["/login", "/register"];

export function proxy(req: NextRequest) {
  const token       = req.cookies.get(authConfig.cookieName)?.value;
  const { pathname } = req.nextUrl;

  console.log("Auth token from middleware", token)

  const isProtected = protectedRoutes.some((r) => pathname.startsWith(r));
  const isAuthPage  = authRoutes.some((r) => pathname.startsWith(r));

  if (isProtected && !token) {
    const url = new URL("/login", req.url);
    url.searchParams.set("from", pathname);   // redirect back after login
    return NextResponse.redirect(url);
  }

  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};