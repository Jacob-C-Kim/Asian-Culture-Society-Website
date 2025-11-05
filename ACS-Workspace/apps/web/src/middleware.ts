import { auth as baseAuth } from "@/auth";
import { NextResponse, type NextRequest } from "next/server";
import { hasAnyRole, type Role } from "@/lib/rbac";

// Roles allowed to see Admin
const ADMIN_ROLES: Role[] = [
  "EBOARD",
  "PRESIDENT",
  "VICE_PRESIDENT",
  "TREASURER",
  "WEBMASTER",
];

type ReqWithAuth = NextRequest & {
  auth?: { user?: { roles?: string[] } | null } | null;
};

export default baseAuth((req: ReqWithAuth) => {
  const { nextUrl } = req;
  const path = nextUrl.pathname;
  const roles = req.auth?.user?.roles ?? [];

  // 1) Require sign-in for all matched routes
  if (!req.auth) {
    const url = new URL("/signin", nextUrl);
    url.searchParams.set("redirect", nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  // 2) Gate /admin to Admin roles
  if (path.startsWith("/admin") && !hasAnyRole(roles, ADMIN_ROLES)) {
    return NextResponse.redirect(new URL("/dashboard?unauthorized=1", nextUrl));
  }

  return NextResponse.next();
});

// Apply auth to these paths
export const config = { matcher: ["/dashboard/:path*", "/admin/:path*"] };
