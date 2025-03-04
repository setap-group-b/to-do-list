"use client";

import Link from "next/link";
import { useActionState } from "react";

export const TodoForm = ({ formAction, initialData }) => {
  const [formState, action] = useActionState(formAction, {
    errors: {},
  });

  return (
    <>
      <h1>{initialData.title ? "Update" : "Create"} Task</h1>
      <form action={action}>
        {/* Title Field */}
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

        {/* Content Field */}
        <section>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            defaultValue={initialData.content}
            className="text-black bg-white"
          ></textarea>
          {formState.errors.content && (
            <div>{formState.errors.content?.join(", ")}</div>
          )}
        </section>

        {/* Deadline Field */}
        <section>
          <label htmlFor="deadline">Deadline</label>
          <input
            type="date"
            id="deadline"
            name="deadline"
            defaultValue={initialData.deadline || ""}
            className="text-black bg-white"
          />
          {formState.errors.deadline && (
            <p>{formState.errors.deadline?.join(", ")}</p>
          )}
        </section>

        {/* Notification Field */}
        <section>
          <label htmlFor="notification">Notification</label>
          <select
            id="notification"
            name="notification"
            defaultValue={initialData.notification || ""}
            className="text-black bg-white"
          >
            <option value="">Select notification time</option>
            <option value="1 day">1 day before deadline</option>
            <option value="1 week">1 week before deadline</option>
            <option value="1 month">1 month before deadline</option>
          </select>
          {formState.errors.notification && (
            <p>{formState.errors.notification?.join(", ")}</p>
          )}
        </section>

        {/* Submit and Cancel Buttons */}
        <section>
          <button type="submit">Save</button>
          <Link href="/user/todo">Cancel</Link>
        </section>
      </form>
    </>
  );
};

