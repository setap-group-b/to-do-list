"use client";

import Link from "next/link";
import { useActionState } from "react";

export const TodoForm = ({ formAction, initialData }) => {
  const [formState, action] = useActionState(formAction, {
    errors: {},
  });

  return (
    <>
      <h1>{initialData.title ? "Update" : "Create"} Post</h1>
      <form action={action}>
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
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            defaultValue={initialData.content}
            className="text-black bg-white"
          ></textarea>
          {formState.errors.content && (
            <div>
              {formState.errors.content?.join(", ")} // Display form errors
              related to the content field
            </div>
          )}
        </section>
        <section>
          <button type="submit">Save</button>
          <Link href="/user/todo">Cancel</Link>
        </section>
      </form>
    </>
  );
};
