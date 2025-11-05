"use client";

import { signIn, useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignIn() {
  const { data } = useSession();
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (data?.user) {
      router.replace("/dashboard");
    }
  }, [data?.user, router]);

  const redirect = params.get("redirect") ?? "/dashboard";

  return (
    <div className="mx-auto max-w-md space-y-6">
      <h1 className="text-2xl font-semibold">Sign in</h1>
      <p className="opacity-70">
        Use your <code>@rit.edu</code> account to continue.
      </p>
      <button
        className="w-full rounded-md border px-4 py-2 hover:bg-gray-50"
        onClick={() => signIn("google", { callbackUrl: redirect })}
      >
        Continue with Google
      </button>
    </div>
  );
}