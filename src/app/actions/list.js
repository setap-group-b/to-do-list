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

  console.log("HIII");

  // TODO: respond better
  if (!session) {
    return;
  }
  console.log("HIII 22");

  const result = todoSchema.safeParse({
    title: formData.get("title"),
    backgroundColour: formData.get("background-colour"),
  });

  console.log({ result });

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
    console.log({ res });
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

  revalidatePath("/dashboard/list"); // purge cached data
  redirect("/dashboard/list");
}
