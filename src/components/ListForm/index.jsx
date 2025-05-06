"use client";

import Link from "next/link";
import { useActionState } from "react";
import ReusableButton from "../ui/ReusableButton";
import PageHeader from "../PageHeader";

export const ListForm = ({ formAction, initialData }) => {
  const [formState, action] = useActionState(formAction, {
    errors: {},
  });

  return (
    <div className="h-full flex flex-col gap-4">
      <PageHeader title={`${initialData.title ? "Update" : "Create"} List`} />
      <form action={action} className="flex flex-col gap-5">
        <section>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={initialData.title}
            className="text-black bg-white"
          />
          {formState.errors.title && (
            <p>{formState.errors.title?.join(", ")}</p>
          )}
        </section>
        <section>
          <label htmlFor="content">Background Colour</label>
          <input
            type="color"
            id="background-colour"
            name="background-colour"
            defaultValue={initialData.backgroundColour}
            className="text-black bg-white"
          ></input>
          {formState.errors.content && (
            <div>
              {formState.errors.content?.join(", ")} // Display form errors
              related to the content field
            </div>
          )}
        </section>
        <section className="*:min-w-32 flex items-center gap-4">
          <ReusableButton type="submit">Save</ReusableButton>
          <ReusableButton type="button">
            <Link href={`/dashboard/list`}>Cancel</Link>
          </ReusableButton>
        </section>
      </form>
    </div>
  );
};
