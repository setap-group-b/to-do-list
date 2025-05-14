"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import ReusableButton from "../ui/ReusableButton";
import PageHeader from "../PageHeader";
import { displayErrorMessage } from "@/utils/displayError";

export const ListForm = ({ formAction, initialData }) => {
  const formRef = useRef(null);
  const [formState, setFormState] = useState({ errors: {} });

  async function submitForm(prevState, formData) {
    const result = await formAction(prevState, formData);

    if (result?.success && formRef?.current) {
      formRef.current.reset();
    } else {
      if (Array.isArray(result?.errors)) {
        displayErrorMessage(result?.errors);
      } else setFormState({ errors: result?.errors });
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop default form submission
    const formData = new FormData(e.target);
    await submitForm(formState, formData);
  };

  return (
    <div className="h-full flex flex-col gap-6 p-4 md:p-6">
      <PageHeader title={`${initialData.title ? "Update" : "Create"} List`} />
      <form
        ref={formRef}
        noValidate
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 max-w-2xl mx-auto w-full bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-indigo-100 dark:border-indigo-900/40 p-6"
      >
        <section className="flex flex-col gap-2">
          <label
            htmlFor="title"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={initialData.title}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:focus:ring-indigo-600/50"
            placeholder="Enter list title"
          />
          {formState.errors.title && (
            <p className="text-sm text-red-500 dark:text-red-400">
              {formState.errors.title?.join(", ")}
            </p>
          )}
        </section>
        <section className="flex flex-col gap-2">
          <label
            htmlFor="background-colour"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Background Colour
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              id="background-colour"
              name="background-colour"
              defaultValue={initialData.backgroundColour || "#818cf8"}
              className="h-10 w-20 rounded-lg cursor-pointer border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
            />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Choose a color for your list
            </span>
          </div>
          {formState.errors.content && (
            <p className="text-sm text-red-500 dark:text-red-400">
              {formState.errors.content?.join(", ")}
            </p>
          )}
        </section>
        <section className="flex items-center gap-4 pt-4">
          <ReusableButton
            type="submit"
            className="cursor-pointer flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Save
          </ReusableButton>
          <ReusableButton
            type="button"
            className="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100"
          >
            <Link className="flex-1" href={`/dashboard/list`}>
              Cancel
            </Link>
          </ReusableButton>
        </section>
      </form>
    </div>
  );
};
