"use server";

import prisma from "lib/prisma";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSessionWrapper } from "@/utils";

import { z } from "zod";

const todoSchema = z.object({
  title: z.string().min(1).max(255),
  backgroundColour: z.string().min(7).max(7),
});

export async function createList(formState, formData) {
  const session = await getServerSessionWrapper();

  // TODO: respond better
  if (!session) {
    return;
  }

  const result = todoSchema.safeParse({
    title: formData.get("title"),
    backgroundColour: formData.get("background-colour"),
  });

  if (!result.success) {
    return {
      // The flatten method is used to convert the validation errors into a flat object structure
      // that can be easily displayed in the form.
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    const res = await prisma.list.create({
      data: {
        title: result.data.title,
        backgroundColour: result.data.backgroundColour,
        user: { connect: { email: session?.user?.email } },
      },
    });
  } catch (error) {
    return {
      success: false,
      errors:
        error instanceof Error ? [error.message] : ["Something went wrong"],
    };
  }

  revalidatePath("/dashboard/list"); // purge cached data
  redirect("/dashboard/list");
}

export async function updateList(listId, formState, formData) {
  const session = await getServerSessionWrapper();

  // TODO: respond better
  if (!session) {
    return;
  }

  const result = todoSchema.safeParse({
    title: formData.get("title"),
    backgroundColour: formData.get("background-colour"),
  });

  if (!result.success) {
    return {
      // The flatten method is used to convert the validation errors into a flat object structure
      // that can be easily displayed in the form.
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    const res = await prisma.list.update({
      where: { id: listId, user: session.user },
      data: {
        title: result.data.title,
        backgroundColour: result.data.backgroundColour,
        user: { connect: { email: session?.user?.email } },
      },
    });
  } catch (error) {
    return {
      success: false,
      errors:
        error instanceof Error ? [error.message] : ["Something went wrong"],
    };
  }

  revalidatePath(`/dashboard/list/${listId}/todo`); // purge cached data
  redirect(`/dashboard/list/${listId}/todo`);
}

export async function deleteList(listId) {
  const session = getServerSessionWrapper();

  // TODO: respond better
  if (!session) {
    return;
  }

  try {
    await prisma.list.delete({
      where: { id: listId, user: session.user },
    });
  } catch (error) {
    return {
      success: false,
      errors:
        error instanceof Error ? [error.message] : ["Something went wrong"],
    };
  } finally {
    revalidatePath(`/dashboard/list`); // purge cached data
    redirect(`/dashboard/list`);
  }
}
