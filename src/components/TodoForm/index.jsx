"use client";

import Link from "next/link";
import { useState, useActionState, useRef } from "react";
import PageHeader from "../PageHeader";
import ReusableButton from "../ui/ReusableButton";
import ReusableDropdown from "../ui/ReusableDropdown";
import { priorityObject } from "@/utils/constants";

export const TodoForm = ({ formAction, initialData, listId }) => {
  const formRef = useRef(null);
  async function submitForm(prevState, formData) {
    const result = await formAction(prevState, formData);
    if (result.success && formRef.current) {
      formRef.current.reset();
    }
    return result;
  }
  const [formState, action] = useActionState(submitForm, {
    errors: {},
  });

  const [notification, setNotification] = useState(
    initialData.notification || "",
  );

  const [priority, setPriority] = useState(initialData.priority || "");
  const priorities = Object.entries(priorityObject).map(([key, value]) => ({
    label: value,
    value: key,
  }));

  const notificationOptions = [
    { label: "1 day before deadline", value: "1 day" },
    { label: "1 week before deadline", value: "1 week" },
    { label: "1 month before deadline", value: "1 month" },
  ];

  function formatDateForInput(dateValue) {
    if (!dateValue) return "";
    const pad = (n) => n.toString().padStart(2, "0");
    const date = new Date(dateValue);
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  return (
    <div className="flex flex-col h-full gap-6">
      <PageHeader title={`${initialData?.title ? "Update" : "Create"} Task`} />
      <form
        ref={formRef}
        action={action}
        className="flex flex-1 flex-col gap-4 *:*:[&>input]:border *:*:[&>input]:p-3 *:*:[&>textarea]:border *:*:[&>textarea]:p-3"
      >
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
            />
            {formState.errors?.title && (
              <p>{formState.errors.title?.join(", ")}</p>
            )}
          </section>

          <section style={{ marginBottom: "5px" }}>
            <ReusableDropdown
              autoModifyOptions={false}
              defaultValue={initialData?.priority || ""}
              placeholder={"Set task priority"}
              name="priority"
              id="priority"
              value={priority}
              label={"Priority:"}
              onChange={(value) => {
                setPriority(value);
              }}
              options={priorities}
              containerClassName={"flex"}
            />

            <input type="hidden" name="priority" value={priority} />
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
              type="datetime-local"
              id="deadline"
              name="deadline"
              defaultValue={formatDateForInput(initialData?.deadline) || ""}
            />
            {formState.errors.deadline && (
              <p>{formState.errors.deadline?.join(", ")}</p>
            )}
          </section>

          {/* Notification Field */}
          <section>
            <ReusableDropdown
              autoModifyOptions={false}
              defaultValue={initialData?.notification || ""}
              placeholder={"Select notification time"}
              name="notification"
              id="notification"
              value={notification}
              label={"Notification:"}
              onChange={(value) => {
                setNotification(value);
              }}
              containerClassName={"flex"}
              options={notificationOptions}
            />

            <input type="hidden" name="notification" value={notification} />

            {formState.errors.notification && (
              <p>{formState.errors.notification?.join(", ")}</p>
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
