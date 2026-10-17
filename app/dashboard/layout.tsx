import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <aside className="w-64 p-6 border-r">
        <h2 className="text-xl font-bold mb-6">My SaaS App</h2>
        <nav className="flex flex-col gap-4">
          <Link href="/dashboard" className="text-gray-700 hover:text-blue-500">
            Overview
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}