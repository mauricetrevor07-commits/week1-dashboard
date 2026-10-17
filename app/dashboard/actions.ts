"use server";

import { prisma } from "../../lib/prisma";
import { getCurrentUser } from "../../lib/auth";
import { revalidatePath } from "next/cache";

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
  const clientId = formData.get("clientId")
    ? Number(formData.get("clientId"))
    : null;

  await prisma.project.create({
    data: { name, cost, clientId, userId: user.id },
  });

  revalidatePath("/dashboard");
}