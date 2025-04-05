"use server";

import prisma from "lib/prisma";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSessionWrapper } from "@/utils";

import { z } from "zod";
import { priority, status } from "@/utils/constants";
const priorityEnum = z.enum(priority);
const statusEnum = z.enum(status);

const todoSchema = z.object({
  title: z.string().min(1).max(255),
  content: z.string().max(4000).optional(),
  priority: priorityEnum.default("LOW"),
  deadline: z.preprocess(
    (val) => (val ? new Date(val) : undefined),
    z.date().optional(),
  ),
  notification: z.string().optional(),
  status: statusEnum.default("PENDING"),
  priority: z.string().min(1).max(30),
  deadline: z.string().min(1).max(30),
  notification: z.string().min(1).max(30),
});

export async function createTodo(listId, formState, formData) {
  const session = await getServerSessionWrapper();

  // TODO: respond better
  if (!session) {
    return;
  }

  const formDataObject = Object.fromEntries(formData.entries());
  const result = todoSchema.safeParse(formDataObject);

  if (!result.success) {
    return {
      // The flatten method is used to convert the validation errors into a flat object structure
      // that can be easily displayed in the form.
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.todo.create({
      data: {
        ...result.data,
        List: { connect: { id: listId } },
        User: { connect: { email: session?.user?.email } },
      },
    });
  } catch (error) {
    console.log({ ...error }, error.message);
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Something went wrong"],
        },
      };
    }
  }

  revalidatePath(`/dashboard/list/${listId}/todo`); // purge cached data
  redirect(`/dashboard/list/${listId}/todo`);
}

export async function updateTodo(id, listId, formState, formData) {
  const session = getServerSessionWrapper();

  // TODO: respond better
  if (!session) {
    return;
  }
  const formDataObject = Object.fromEntries(formData.entries());
  const result = todoSchema.safeParse(formDataObject);

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.todo.update({
      where: { id, user: session.user },
      data: result.data,
    });
  } catch (error) {
    console.log({ ...error }, error.message);
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Something went wrong"],
        },
      };
    }
  }

  revalidatePath(`/dashboard/list/${listId}/todo/${id}`); // purge cached data
  redirect(`/dashboard/list/${listId}/todo/${id}`);
}

export async function deleteTodo(id, listId) {
  const session = getServerSessionWrapper();

  // TODO: respond better
  if (!session) {
    return;
  }

  try {
    await prisma.todo.delete({
      where: { id, user: session.user },
    });
  } catch (error) {
    console.log({ ...error }, error.message);
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Something went wrong"],
        },
      };
    }
  }

  revalidatePath(`/dashboard/list/${listId}/todo`); // purge cached data
  redirect(`/dashboard/list/${listId}/todo`);
}
