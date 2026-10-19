import Link from "next/link";
import { prisma } from "../../../../lib/prisma";
import { getCurrentUser } from "../../../../lib/auth";
import { redirect } from "next/navigation";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const { projectId } = await params;
  const id = Number(projectId);

  const project = await prisma.project.findFirst({
    where: { id, userId: user.id },
    include: { client: true },
  });

  if (!project) {
    return <p className="text-red-600">Project not found.</p>;
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        <h1 className="text-2xl font-bold">{project.name}</h1>
        <Link
          href={`/dashboard/projects/${project.id}/edit`}
          className="text-blue-600 hover:underline text-sm"
        >
          Edit
        </Link>
      </div>

      <p>Client: {project.client?.name ?? "—"}</p>
      {project.client?.email && <p>Email: {project.client.email}</p>}
      <p>Cost: KES {project.cost}</p>
      <p className="text-sm text-gray-500 mt-4">
        Created: {project.createdAt.toLocaleString()}
      </p>
    </div>
  );
}