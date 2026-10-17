"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteButton({ projectId }: { projectId: number }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm("Delete this project?")) return;

    setLoading(true);
    const res = await fetch(`/api/projects/${projectId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.refresh(); // re-renders the server component
    } else {
      alert("Failed to delete");
    }
    setLoading(false);
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-red-600 hover:underline text-sm ml-2"
    >
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
}