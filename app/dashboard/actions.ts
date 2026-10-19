"use server";

import { prisma } from "../../lib/prisma";
import { getCurrentUser } from "../../lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addClient(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Not logged in");

  const name = formData.get("name") as string;
  const email = (formData.get("email") as string) || null;

  await prisma.client.create({
    data: { name, email, userId: user.id },
  });

  revalidatePath("/dashboard");
}

export async function addProject(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Not logged in");

  const name = formData.get("name") as string;
  const cost = Number(formData.get("cost"));
  const rawClientId = formData.get("clientId") as string;
  const clientId = rawClientId ? Number(rawClientId) : null;

  // Verify the client (if any) belongs to this user
  if (clientId) {
    const client = await prisma.client.findFirst({
      where: { id: clientId, userId: user.id },
    });
    if (!client) throw new Error("Client not found");
  }

  await prisma.project.create({
    data: { name, cost, clientId, userId: user.id },
  });

  revalidatePath("/dashboard");
}

export async function updateProject(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Not logged in");

  const id = Number(formData.get("id"));
  const name = formData.get("name") as string;
  const cost = Number(formData.get("cost"));
  const rawClientId = formData.get("clientId") as string;
  const clientId = rawClientId ? Number(rawClientId) : null;

  // Verify ownership
  const existing = await prisma.project.findFirst({
    where: { id, userId: user.id },
  });
  if (!existing) throw new Error("Project not found");

  // Verify the client (if any) belongs to this user
  if (clientId) {
    const client = await prisma.client.findFirst({
      where: { id: clientId, userId: user.id },
    });
    if (!client) throw new Error("Client not found");
  }

  await prisma.project.update({
    where: { id },
    data: { name, cost, clientId },
  });

  revalidatePath("/dashboard");
  revalidatePath(`/dashboard/projects/${id}`);
  redirect(`/dashboard/projects/${id}`);
}