"use client";

import Link from "next/link";
import { useState, useActionState, useRef } from "react";
import PageHeader from "../PageHeader";
import ReusableButton from "../ui/ReusableButton";
import ReusableDropdown from "../ui/ReusableDropdown";
import { priorityObject } from "@/utils/constants";
import { displayErrorMessage } from "@/utils/displayError";

export const TodoForm = ({ formAction, initialData, listId }) => {
  const [priority, setPriority] = useState(initialData.priority || "NONE");
  const priorities = Object.entries(priorityObject).map(([key, value]) => ({
    label: value,
    value: key,
  }));

  const formRef = useRef(null);
  const [formState, setFormState] = useState({ errors: {} });

  async function submitForm(prevState, formData) {
    const result = await formAction(prevState, formData);
    if (result.success && formRef.current) {
      formRef.current.reset();
    } else {
      if (Array.isArray(result.errors)) {
        displayErrorMessage(result.errors);
      } else setFormState({ errors: result.errors });
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop default form submission

    const formData = new FormData(e.target);
    await submitForm(formState, formData);
  };

  const [notification, setNotification] = useState(
    initialData.notification || ""
  );

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
    <div className="flex flex-col h-full gap-6 max-w-3xl m-auto add-list">
      <PageHeader title={`${initialData?.title ? "Update" : "Create"} Task`} />
      <div className=" flex-1 flex flex-col overflow-y-auto">
        <form
          ref={formRef}
          noValidate
          onSubmit={handleSubmit}
          className="flex flex-1 gap-5 flex-col mx-auto w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <div className="flex-1 space-y-6">
            {/* Title Field */}
            <section className="space-y-2">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                defaultValue={initialData?.title || ""}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 text-gray-900 dark:text-gray-100 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800"
                placeholder="Enter task title"
              />
              {formState.errors?.title && (
                <p className="text-sm text-red-500 dark:text-red-400">
                  {formState.errors.title?.join(", ")}
                </p>
              )}
            </section>

            {/* Priority Field */}
            <section className="space-y-2">
              <ReusableDropdown
                autoModifyOptions={false}
                defaultValue={initialData?.priority || "NONE"}
                placeholder={"Set task priority"}
                name="priority"
                id="priority"
                value={priority}
                label={"Priority"}
                onChange={(value) => {
                  setPriority(value);
                }}
                options={priorities}
                containerClassName={"w-full"}
              >
                <input type="hidden" name="priority" value={priority} />
                {formState.errors.priority && (
                  <p className="text-sm text-red-500 dark:text-red-400">
                    {formState.errors.priority?.join(", ")}
                  </p>
                )}
              </ReusableDropdown>
            </section>

            {/* Content Field */}
            <section className="space-y-2">
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Content
              </label>
              <textarea
                id="content"
                name="content"
                defaultValue={initialData?.content || ""}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 text-gray-900 dark:text-gray-100 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800 min-h-[120px]"
                placeholder="Enter task description"
              ></textarea>
              {formState.errors?.content && (
                <p className="text-sm text-red-500 dark:text-red-400">
                  {formState.errors.content?.join(", ")}
                </p>
              )}
            </section>

            {/* Deadline Field */}
            <section className="space-y-2">
              <label
                htmlFor="deadline"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Deadline
              </label>
              <input
                type="datetime-local"
                id="deadline"
                name="deadline"
                defaultValue={formatDateForInput(initialData?.deadline) || ""}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 text-gray-900 dark:text-gray-100 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800"
              />
              {formState.errors.deadline && (
                <p className="text-sm text-red-500 dark:text-red-400">
                  {formState.errors.deadline?.join(", ")}
                </p>
              )}
            </section>

            {/* Notification Field */}
            <section className="space-y-2">
              <ReusableDropdown
                autoModifyOptions={false}
                defaultValue={initialData?.notification || ""}
                placeholder={"Select notification time"}
                name="notification"
                id="notification"
                value={notification}
                label={"Notification"}
                onChange={(value) => {
                  setNotification(value);
                }}
                containerClassName={"w-full"}
                options={notificationOptions}
              />
              <input type="hidden" name="notification" value={notification} />
              {formState.errors.notification && (
                <p className="text-sm text-red-500 dark:text-red-400">
                  {formState.errors.notification?.join(", ")}
                </p>
              )}
            </section>
          </div>

          {/* Submit and Cancel Buttons */}
          <section className="flex items-center gap-4 justify-end *:w-[10rem]">
            <ReusableButton type="submit">Save</ReusableButton>
            <Link
              href={`/dashboard/list/${listId}/todo`}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 min-w-32"
            >
              Cancel
            </Link>
          </section>
        </form>
      </div>
    </div>
  );
};
