import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get("authToken")?.value;
  const userCookie = req.cookies.get("user")?.value;

  const user = userCookie ? JSON.parse(userCookie) : null;

  // Admin routes
  if (pathname.startsWith("/admin")) {
    if (!token || user?.role !== "admin") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // User routes
  if (pathname.startsWith("/user")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/user/:path*"],
};
