import "next-auth";
import type { Role } from "@/lib/rbac";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      roles: Role[];
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    roles?: Role[];
  }
}
