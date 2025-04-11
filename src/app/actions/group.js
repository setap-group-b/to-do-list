"use server";

import prisma from "lib/prisma";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSessionWrapper } from "@/utils";

import { z } from "zod";

const groupSchema = z.object({
  title: z.string().min(1).max(255),
});

export async function createGroup(formState, formData) {
  const session = await getServerSessionWrapper();

  // TODO: respond better
  if (!session) {
    return;
  }

  const formDataObject = Object.fromEntries(formData.entries());
  const result = groupSchema.safeParse(formDataObject);

  console.log({ result });

  if (!result.success) {
    return {
      // The flatten method is used to convert the validation errors into a flat object structure
      // that can be easily displayed in the form.
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    const res = await prisma.group.create({
      data: {
        ...result.data,
        owner: { connect: { email: session?.user?.email } },
      },
    });
  } catch (error) {
    console.log({ error });

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

  revalidatePath("/dashboard/group"); // purge cached data
  redirect("/dashboard/group");
}
