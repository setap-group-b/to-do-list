"use server";

import prisma from "lib/prisma";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSessionWrapper } from "@/utils";

import { z } from "zod";
import { priority, status } from "@/utils/constants";
import { getNotificationDate } from "@/utils/functions";
const priorityEnum = z.enum(priority);
const statusEnum = z.enum(status);

const todoSchema = z.object({
  title: z.string().min(1).max(255),
  content: z.string().max(4000).optional(),
  priority: priorityEnum.default("NONE"),
  deadline: z.preprocess(
    (val) => (val ? new Date(val) : undefined),
    z.date().optional()
  ),
  notification: z.string().optional(),
  status: statusEnum.default("PENDING"),
});

export async function createTodo(listId, type, formState, formData) {
  const session = await getServerSessionWrapper();

  // TODO: respond better
  if (!session) {
    return;
  }

  const formDataObject = Object.fromEntries(formData.entries());
  const result = todoSchema.safeParse(formDataObject);

  try {
    if (!result.success) {
      return {
        // The flatten method is used to convert the validation errors into a flat object structure
        // that can be easily displayed in the form.
        errors: result.error.flatten().fieldErrors,
      };
    }
    await prisma.todo.create({
      data: {
        ...result.data,
        reminderDate: getNotificationDate(
          result.data.deadline,
          result.data.notification
        ),
        List: { connect: { id: listId } },
        User: { connect: { email: session?.user?.email } },
      },
    });
  } catch (error) {
    return {
      success: false,
      errors:
        error instanceof Error ? [error.message] : ["Something went wrong"],
    };
  }

  revalidatePath(`/dashboard/${type}/${listId}/todo`); // purge cached data
  redirect(`/dashboard/${type}/${listId}/todo`);
}

export async function updateTodo(id, listId, type, formData) {
  const session = getServerSessionWrapper();

  // TODO: respond better
  if (!session) {
    return;
  }
  const formDataObject = Object.fromEntries(formData.entries());
  const result = todoSchema.safeParse(formDataObject);

  try {
    if (!result.success) {
      return {
        errors: result.error.flatten().fieldErrors,
      };
    }

    const currentData = await prisma.todo.findUnique({
      where: { id, user: session.user },
    });

    if (!currentData) {
      throw new Error("Todo not found");
    }

    const newData = { ...result.data };

    // Only update `reminderDate` if the deadline changed
    if (result.data.deadline !== currentData.deadline) {
      newData.reminderDate = getNotificationDate(
        result.data.deadline,
        result.data.notification
      );
      newData.remindedAt = null; // Reset reminder status
    }

    await prisma.todo.update({
      where: { id, user: session.user },
      data: newData,
    });
  } catch (error) {
    return {
      success: false,
      errors:
        error instanceof Error ? [error.message] : ["Something went wrong"],
    };
  }

  revalidatePath(`/dashboard/${type}/${listId}/todo`); // purge cached data
  redirect(`/dashboard/${type}/${listId}/todo`);
}

export async function updateTodoStatus(id, listId, type, status) {
  const session = getServerSessionWrapper();

  // TODO: respond better
  if (!session) {
    return;
  }

  try {
    await prisma.todo.update({
      where: { id, user: session.user },
      data: { status },
    });
  } catch (error) {
    return {
      success: false,
      errors:
        error instanceof Error ? [error.message] : ["Something went wrong"],
    };
  }

  revalidatePath(`/dashboard/${type}/${listId}/todo`); // purge cached data
}

export async function deleteTodo(id, listId, type) {
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
    return {
      success: false,
      errors:
        error instanceof Error ? [error.message] : ["Something went wrong"],
    };
  }

  revalidatePath(`/dashboard/${type}/${listId}/todo`); // purge cached data
  redirect(`/dashboard/${type}/${listId}/todo`);
}
