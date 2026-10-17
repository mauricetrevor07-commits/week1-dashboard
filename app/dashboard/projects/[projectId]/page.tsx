async function getProject(id: string) {
  const projects: Record<string, { name: string; cost: number; client: string }> = {
    "1": { name: "Ziido Dashboard", cost: 50000, client: "Konza" },
    "2": { name: "Konza Portal",    cost: 100000, client: "Konza" },
    "3": { name: "RAG Chatbot",     cost: 180000, client: "Internal" },
  };

  return projects[id];
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const project = await getProject(projectId);

  if (!project) {
    return <p className="text-red-600">Project not found.</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{project.name}</h1>
      <p>Client: {project.client}</p>
      <p>Cost: KES {project.cost}</p>
    </div>
  );
}