import { redirect } from "next/dist/server/api-utils";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  console.log("middleware executed");
  const authToken = request.cookies.get("next-auth.session-token");

  const loginUserNotAccessPath = request.nextUrl.pathname === "/login";
  // request.nextUrl.pathname === "/register";
  const reisterPth = request.nextUrl.pathname === "/register";

  const isAdminRoute = request.nextUrl.pathname.startsWith("/dashboard");

  if (isAdminRoute && !authToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (!authToken && reisterPth) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (loginUserNotAccessPath) {
    if (authToken) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/login", "/register", "/dashboard/:path*"],
};
