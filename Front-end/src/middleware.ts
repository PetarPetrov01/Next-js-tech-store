import { NextResponse } from "next/server";

import { auth } from "@/auth";

// Routes that require authentication
const protectedRoutes = [
  "/profile",
  "/products/post",
];

// Dynamic route patterns that require authentication
const protectedPatterns = [
  /^\/products\/[^/]+\/edit$/,
  /^\/products\/[^/]+\/images$/,
];

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.includes(pathname);
  const isProtectedPattern = protectedPatterns.some((pattern) =>
    pattern.test(pathname)
  );

  if (isProtectedRoute || isProtectedPattern) {
    if (!req.auth) {
      // Redirect to login with callback URL
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
});

export const config = {
  // Match all routes except static files and API routes (except auth)
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api routes (except /api/auth)
     */
    "/((?!_next/static|_next/image|favicon.ico|public|api(?!/auth)).*)",
  ],
};
