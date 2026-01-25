import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

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

// Proxy wrapper function that provides req.auth
function proxy(handler: (req: NextRequest & { auth: any }) => Promise<NextResponse> | NextResponse) {
  return async (req: NextRequest) => {
    // Get auth token using NextAuth v4's getToken
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    
    // Create request with auth attached (token contains user info)
    const reqWithAuth = Object.assign(req, { auth: token });
    
    // Call the handler with the enhanced request
    return handler(reqWithAuth);
  };
}

export default proxy(async (req) => {
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
