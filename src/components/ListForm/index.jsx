"use client";

import Link from "next/link";
import { useActionState, useRef, useState } from "react";
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
    <div className="h-full flex flex-col gap-4">
      <PageHeader title={`${initialData.title ? "Update" : "Create"} List`} />
      <form
        ref={formRef}
        noValidate
        onSubmit={handleSubmit}
        className="flex flex-col gap-5"
      >
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
          <label htmlFor="background-colour">Background Colour</label>
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
