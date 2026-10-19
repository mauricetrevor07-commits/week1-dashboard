import { prisma } from "../../../../../lib/prisma";
import { getCurrentUser } from "../../../../../lib/auth";
import { updateProject } from "../../../actions";
import { redirect } from "next/navigation";

export default async function EditProjectPage({
    params,
}: {
    params: Promise<{ projectId: string }>;
}) {
    const user = await getCurrentUser();
    if (!user) redirect("/login");
    const { projectId } = await params;
    const id = Number(projectId);

    const [project, clients] = await Promise.all([
        prisma.project.findFirst({
            where: { id, userId: user.id },
        }),
    prisma.client.findMany({
        where: { userId: user.id },
        orderBy: { name: "asc" },
    }),
    ]);
if (!project) {
    return <p className="text-red-600"> Project not found.</p>;
}
return(
    <div className="max-w-md">
        <h1 className="text-2xl font-bold mb-6">Edit project</h1>
        <form action={updateProject} className="space-y-3">
            <input type="hidden" name="id" value={project.id} />
            <input
            name="name"
            defaultValue={project.name}
            placeholder="Project name"
            className="border p-2 rounded block w-full"
            required
            />
            <input
            name="cost"
            type="number"
            defaultValue={project.cost}
            placeholder="cost"
            className="border p-2 rounded block w-full"
            required
            />
            <select
            name="clientId"
            defaultValue={project.clientId ?? ""}
            className="border p-2 rounded block w-full"
            >
                <option value="">- No client -</option>
                {clients.map((c) => (
                    <option key={c.id}>
                        {c.name}
                    </option>
                ))}
                </select> 
                <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                    Save changes
                    </button> 
            </form>
    </div>
);
}