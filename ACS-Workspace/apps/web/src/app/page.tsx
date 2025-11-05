import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <h1 className="text-3xl font-semibold">ACS Workspace</h1>
      <p className="opacity-80">Centralized budgets and requests for ACS.</p>
      <Link href="/dashboard" className="inline-block rounded-md border px-3 py-1 hover:bg-gray-50">
        Open Dashboard
      </Link>
    </div>
  );
}