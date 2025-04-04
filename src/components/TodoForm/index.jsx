"use client";

import Link from "next/link";
import { useState, useActionState } from "react";
import { cyclePriority } from "@/utils/cyclePriority";
import PageHeader from "../PageHeader";
import ReusableButton from "../ui/ReusableButton";

export const TodoForm = ({ formAction, initialData, listId }) => {
  const [formState, action] = useActionState(formAction, {
    errors: {},
  });

  //setup for cyclePriority
  const [priority, setPriority] = useState(
    `${initialData?.priority ? initialData.priority : "No-Priority"}`,
  );
  const priorities = [
    "No-Priority",
    "Low-Priority",
    "Medium-Priority",
    "High-Priority",
  ];

  return (
    <div className="flex flex-col h-full gap-6">
      <PageHeader title={`${initialData?.title ? "Update" : "Create"} Task`} />
      <form action={action} className="flex flex-1 flex-col gap-4">
        <div className="flex-1">
          {/* Title Field */}
          <section style={{ marginBottom: "5px" }}>
            <label htmlFor="title" style={{ marginRight: "5px" }}>
              Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={initialData?.title || ""}
              className="text-black bg-white"
            />
            {formState.errors?.title && (
              <p>{formState.errors.title?.join(", ")}</p>
            )}
          </section>

          <section style={{ marginBottom: "5px" }}>
            <label htmlFor="priority">Priority:</label>
            <select
              id="priority"
              name="priority"
              defaultValue={initialData?.priority || ""}
              className="text-black bg-white"
            >
              <option value="none">None</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            {formState.errors.priority && (
              <p>{formState.errors.priority?.join(", ")}</p>
            )}
          </section>

          {/* Content Field */}
          <section style={{ marginBottom: "5px" }}>
            <label htmlFor="content" style={{ marginBottom: "5px" }}>
              Content:
            </label>
            <br />
            <textarea
              id="content"
              name="content"
              defaultValue={initialData?.content || ""}
              className="text-black bg-white"
            ></textarea>
            {formState.errors?.content && (
              <div>{formState.errors.content?.join(", ")}</div>
            )}
          </section>

          {/* Deadline Field */}
          <section style={{ marginBottom: "5px" }}>
            <label htmlFor="deadline" style={{ marginRight: "5px" }}>
              Deadline:
            </label>
            <input
              type="date"
              id="deadline"
              name="deadline"
              defaultValue={initialData?.deadline || ""}
              className="text-black bg-white"
            />
            {formState.errors.deadline && (
              <p>{formState.errors.deadline?.join(", ")}</p>
            )}
          </section>

          {/* Notification Field */}
          <section>
            <label htmlFor="notification-time">Notification time:</label>
            <select
              id="notification-time"
              name="notification-time"
              defaultValue={initialData?.notificationTime || ""}
              className="text-black bg-white"
            >
              <option value="none">No notification time</option>
              <option value="1-day">1 day before deadline</option>
              <option value="1-week">1 week before deadline</option>
              <option value="1-month">1 month before deadline</option>
            </select>
            {formState.errors.notificationTime && (
              <p>{formState.errors.notificationTime?.join(", ")}</p>
            )}
          </section>
        </div>

        {/* Submit and Cancel Buttons */}
        <section className="*:min-w-32 flex items-center gap-4 justify-end">
          <ReusableButton type="submit">Save</ReusableButton>
          <ReusableButton>
            <Link
              href={`/dashboard/list/${listId}/todo`}
              style={{ marginLeft: "2.5px" }}
            >
              Cancel
            </Link>
          </ReusableButton>
        </section>
      </form>
    </div>
  );
};
