"use client";

import Link from "next/link";
import ReusableButton from "./ui/ReusableButton";
import PageHeader from "./PageHeader";
import { useActionState } from "react";

const GroupForm = ({ formAction, initialData }) => {
  const [formState, action] = useActionState(formAction, {
    errors: {},
  });
  return (
    <div className="h-full flex flex-col gap-4">
      <PageHeader title={`${initialData.title ? "Update" : "Create"} Group`} />
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
        {/* <section></section> */}
        <section className="*:min-w-32 flex items-center gap-4">
          <ReusableButton type="submit">Save</ReusableButton>
          <ReusableButton type="button">
            <Link href={`/dashboard/group`}>Cancel</Link>
          </ReusableButton>
        </section>
      </form>
    </div>
  );
};

export default GroupForm;
