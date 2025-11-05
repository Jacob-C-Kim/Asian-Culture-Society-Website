"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { hasAnyRole, type Role } from "@/lib/rbac";

const ADMIN_ROLES: Role[] = ["EBOARD", "PRESIDENT", "VICE_PRESIDENT", "TREASURER", "WEBMASTER"];

export default function Nav() {
  const { data } = useSession();
  const roles = data?.user?.roles ?? [];

  return (
    <header className="w-full border-b">
      <nav className="mx-auto flex max-w-6xl items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="font-semibold">ACS Workspace</Link>
          {data?.user && (
            <>
              <Link href="/dashboard" className="text-sm opacity-80 hover:opacity-100">
                Dashboard
              </Link>
              {hasAnyRole(roles, ADMIN_ROLES) && (
                <Link href="/admin" className="text-sm opacity-80 hover:opacity-100">
                  Admin
                </Link>
              )}
            </>
          )}
        </div>
        <div className="flex items-center gap-3 text-sm">
          {data?.user ? (
            <>
              <span className="hidden sm:inline opacity-70">{data.user.email}</span>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="rounded-md border px-3 py-1 hover:bg-gray-50"
              >
                Sign out
              </button>
            </>
          ) : (
            <Link href="/signin" className="rounded-md border px-3 py-1 hover:bg-gray-50">
              Sign in
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
