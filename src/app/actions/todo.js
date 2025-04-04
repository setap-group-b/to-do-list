"use server";

import prisma from "lib/prisma";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSessionWrapper } from "@/utils";

import { z } from "zod";

const todoSchema = z.object({
  title: z.string().min(1).max(255),
  content: z.string().min(1).max(4000),
  priority: z.string().min(1).max(30),
  deadline: z.string().min(1).max(30),
  notificationTime: z.string().min(1).max(30),
});

export async function createTodo(listId, formState, formData) {
  const session = await getServerSessionWrapper();

  // TODO: respond better
  if (!session) {
    return;
  }

  const result = todoSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
    priority: formData.get("priority"),
    deadline: formData.get("deadline"),
    notificationTime: formData.get("notification-time"),
  });

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
        title: result.data.title,
        content: result.data.content,
        priority: result.data.priority,
        deadline: result.data.deadline,
        notificationTime: result.data.notificationTime,
        List: { connect: { id: listId } },
        user: { connect: { email: session?.user?.email } },
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

  const result = todoSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
    priority: formData.get("priority"),
    deadline: formData.get("deadline"),
    notificationTime: formData.get("notification-time"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.todo.update({
      where: { id, user: session.user },
      data: {
        title: result.data.title,
        content: result.data.content,
        priority: result.data.priority,
        deadline: result.data.deadline,
        notificationTime: result.data.notificationTime,
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
