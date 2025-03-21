"use client";

import Link from "next/link";
import { useActionState } from "react";
import { cyclePriority } from "@/utils/cyclePriority";

export const SubtaskForm = ({ formAction, initialData, listId }) => {
const [formState, action] = useActionState(formAction, {
  errors: {}
});

//setup for cyclePriority
const [priority, setPriority] = useState("Set Priority");
const priorities = ["No-Priority", "Low-Priority", "Medium-Priority", "High-Priority"];

return (
  <>
    <h1>{initialData?.title ? "Update" : "Create"} Subtask</h1>
    <form action={action}>

      {/* Title Field */}
      <section>
        <label htmlFor="subtitle">Subtask Title:</label>
        <input
          type="text"
          id="subtitle"
          name="subtitle"
          defaultValue={initialData?.subtitle || ""}
          className="text-black bg-white"
        />
        {formState.errors?.subtitle && (
          <p>{formState.errors.subtitle?.join(", ")}</p>
        )}
      </section>

      {/* Priority Field */}
      <section>
        <button
          type="button"
          onClick={() => cyclePriority(priority, priorities, setPriority)}
          >{priority}
        </button>
      </section>

      {/* Content Field */}
      <section>
        <label htmlFor="content">Content:</label>
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

      {/* Submit and Cancel Buttons */}
      <section>
        <button type="submit">Save</button>
        <Link href={`/list/${listId}/todo`}>Cancel</Link>
      </section>
    </form>
  </>
)
}