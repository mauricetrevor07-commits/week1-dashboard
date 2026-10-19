import Link from "next/link";
import LikeButton from "./LikeButton";
import { addClient, addProject } from "./actions";
import { prisma } from "../../lib/prisma";
import { logout } from "../auth/actions";
import DeleteButton from "./DeleteButton";

export default async function DashboardPage() {
  const [projects, clients] = await Promise.all([
    prisma.project.findMany({
      orderBy: { createdAt: "desc" },
      include: { client: true },
    }),
    prisma.client.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="mb-8">
        <LikeButton />
      </div>

      <section className="mb-8 p-4 border rounded">
        <h2 className="font-semibold mb-3">Add Client</h2>
<form action={logout}>
  <button className="text-sm text-gray-500 hover:text-red-600 mb-4">
    Log out
  </button>
</form>
        <form action={addClient} className="space-y-2">
          <input
            name="name"
            placeholder="Client name"
            className="border p-2 rounded block w-full"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email (optional)"
            className="border p-2 rounded block w-full"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Add Client
          </button>
        </form>
      </section>

      <section className="mb-8 p-4 border rounded">
        <h2 className="font-semibold mb-3">Add Project</h2>
        <form action={addProject} className="space-y-2">
          <input
            name="name"
            placeholder="Project name"
            className="border p-2 rounded block w-full"
            required
          />
          <input
            name="cost"
            type="number"
            placeholder="Cost"
            className="border p-2 rounded block w-full"
            required
          />
          <select
            name="clientId"
            className="border p-2 rounded block w-full"
            defaultValue=""
          >
            <option value="">— No client —</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Add Project
          </button>
        </form>
      </section>

      <section>
        <h2 className="font-semibold mb-3">Projects</h2>
        {projects.length === 0 ? (
          <p className="text-gray-500">No projects yet.</p>
        ) : (
          <ul className="space-y-2">
            {projects.map((p) => (
              <li key={p.id} className="flex items-center">
                <Link
                  href={`/dashboard/projects/${p.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {p.name} — KES {p.cost}
                </Link>
                {p.client && (
                  <span className="text-gray-500 ml-2"> · {p.client.name}</span>
                )}
                <DeleteButton projectId={p.id} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}