async function getProjects() {
  return [
    { id: 1, name: "Ziido Dashboard", cost: 50000 },
    { id: 2, name: "Konza Portal",    cost: 100000 },
    { id: 3, name: "RAG Chatbot",     cost: 180000 },
  ];
}

export default async function HomePage() {
  const projects = await getProjects();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">My SaaS App</h1>
      <ul className="space-y-2">
        {projects.map((p) => (
          <li key={p.id}>
            {p.name} — KES {p.cost}
          </li>
        ))}
      </ul>
    </main>
  );
}