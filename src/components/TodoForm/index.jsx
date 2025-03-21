"use client";

import Link from "next/link";
import { useState, useActionState } from "react";
import { cyclePriority } from "@/utils/cyclePriority";


export const TodoForm = ({ formAction, initialData, listId }) => {
  const [formState, action] = useActionState(formAction, {
    errors: {}
  });

  //setup for cyclePriority
  const [priority, setPriority] = useState("Set Priority");
  const priorities = ["No-Priority", "Low-Priority", "Medium-Priority", "High-Priority"];

  return (
    <>
      <h1>{initialData?.title ? "Update" : "Create"} Task</h1>
      <form action={action}>

        {/* Title Field */}
        <section style={{marginBottom: "5px"}}>
          <label htmlFor="title" style={{marginRight: "5px"}}>Title:</label>
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
        
        {/* Priority Field */}
        <section style={{marginBottom: "5px"}}>
          <button
            type="button"
            onClick={() => cyclePriority(priority, priorities, setPriority)}
            >{priority}
          </button>
        </section>

        {/* Content Field */}
        <section style={{marginBottom: "5px"}}>
          <label htmlFor="content" style={{marginBottom: "5px"}}>Content:</label>
          <br/>
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
        <section style={{marginBottom: "5px"}}>
          <label htmlFor="deadline" style={{marginRight: "5px"}}>Deadline:</label>
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
          <label htmlFor="notification">Notification:</label>
          <select
            id="notification"
            name="notification"
            defaultValue={initialData?.notification || ""}
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
          <button type="submit" style={{marginRight: "2.5px"}}>Save</button>
          <Link href={`/list/${listId}/todo`} style={{marginLeft: "2.5px"}}>Cancel</Link>
        </section>
      </form>
    </>
  );
};

