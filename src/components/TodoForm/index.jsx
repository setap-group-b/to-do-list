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
        <div>
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={initialData.title}
            />
            {formState.errors.title && (
              <div>
                {formState.errors.title?.join(", ")} // Display form errors
                related to the title field
              </div>
            )}
          </div>
          <div>
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              name="content"
              defaultValue={initialData.content}
            ></textarea>
            {formState.errors.content && (
              <div>
                {formState.errors.content?.join(", ")} // Display form errors
                related to the content field
              </div>
            )}
          </div>
          <div>
            <button type="submit">Save</button>
            <Link href="/user/todo">Cancel</Link>
          </div>
        </div>
      </form>
    </>
  );
};
