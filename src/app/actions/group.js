"use server";

import prisma from "lib/prisma";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSessionWrapper } from "@/utils";

import { z } from "zod";

const groupSchema = z.object({
  collaborators: z
    .array(
      z.string().email({
        message: "Please enter a valid email address",
      })
    )
    .refine((emails) => new Set(emails).size === emails.length, {
      message: "Duplicate emails are not allowed",
    }),
});

export async function createGroup(listId, formState, formData) {
  const session = await getServerSessionWrapper();

  // TODO: respond better
  if (!session) {
    return;
  }

  const collaborators = formData.get("collaborators");

  const result = groupSchema.safeParse({
    collaborators: JSON.parse(collaborators),
  });

  if (!result.success) {
    return {
      // The flatten method is used to convert the validation errors into a flat object structure
      // that can be easily displayed in the form.
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    // Fetch users by their emails
    const collaborators = await prisma.user.findMany({
      where: {
        email: { in: result.data.collaborators },
      },
    });

    if (collaborators.length !== result.data.collaborators.length) {
      return {
        // The flatten method is used to convert the validation errors into a flat object structure
        // that can be easily displayed in the form.
        errors: {
          collaborators: ["One or more of the collaborators were not found."],
        },
      };
    }

    // Update the List with the collaborators
    await prisma.list.update({
      where: {
        id: listId,
      },
      data: {
        collaborators: {
          set: [],
          connect: collaborators.map((user) => ({ id: user.id })),
        },
      },
    });
  } catch (error) {
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

  revalidatePath(`/dashboard/list/${listId}/todo`);
  redirect(`/dashboard/list/${listId}/todo`);
}

export async function deleteGroup(listId) {
  const session = getServerSessionWrapper();

  // TODO: respond better
  if (!session) {
    return;
  }

  try {
    await prisma.list.update({
      where: { id: listId, user: session.user },
      data: {
        collaborators: {
          set: [],
        },
      },
    });
  } catch (error) {
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
  } finally {
    revalidatePath(`/dashboard/group`); // purge cached data
    redirect(`/dashboard/group`);
  }
}
