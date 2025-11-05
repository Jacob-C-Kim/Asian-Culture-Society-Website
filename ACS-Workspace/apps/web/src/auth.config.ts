import Google from "next-auth/providers/google";
import type { NextAuthConfig, Session, User } from "next-auth";
import type { AdapterUser } from "next-auth/adapters";
import type { JWT } from "next-auth/jwt";
import type { Role } from "@/lib/rbac";

const allowedDomain = process.env.ALLOWED_EMAIL_DOMAIN ?? "rit.edu";
const eboardAllowlist = (process.env.EBOARD_ALLOWLIST ?? "")
  .split(",")
  .map((s) => s.trim().toLowerCase())
  .filter(Boolean);

const authConfig: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/signin" },
  callbacks: {
    async signIn({ user }: { user: User | AdapterUser }) {
      const email = (user?.email ?? "").toLowerCase();
      return email.endsWith(`@${allowedDomain}`);
    },
    async jwt({ token, user }: { token: JWT; user?: User | AdapterUser | null }) {
      if (user?.email && !token.roles) {
        const email = user.email.toLowerCase();
        const roles: Role[] = [];
        if (eboardAllowlist.includes(email)) roles.push("EBOARD");
        token.roles = roles;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.user.roles = token.roles ?? [];
      return session;
    },
  },
};

export default authConfig;
