"use client";

import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";

export default function Dashboard() {
  const { data } = useSession();
  const roles = data?.user?.roles ?? [];

  const ping = useQuery({
    queryKey: ["ping"],
    queryFn: async () => {
      const res = await fetch("/api/ping", { cache: "no-store" });
      if (!res.ok) throw new Error("Ping failed");
      return (await res.json()) as { ok: boolean; ts: string };
    },
  });

  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="opacity-70">Welcome{data?.user?.name ? `, ${data.user.name}` : ""}.</p>
      </section>

      <section className="rounded-xl border p-4">
        <h2 className="mb-2 font-semibold">Your Roles</h2>
        <div className="text-sm">{roles.length ? roles.join(", ") : "No roles"}</div>
      </section>

      <section className="rounded-xl border p-4">
        <h2 className="mb-2 font-semibold">Test API Call</h2>
        {ping.isLoading && <div className="text-sm opacity-70">Loading…</div>}
        {ping.error && <div className="text-sm text-red-600">{(ping.error as Error).message}</div>}
        {ping.data && (
          <pre className="overflow-auto rounded bg-gray-50 p-3 text-xs">
{JSON.stringify(ping.data, null, 2)}
          </pre>
        )}
      </section>
    </div>
  );
}
