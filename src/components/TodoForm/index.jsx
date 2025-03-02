"use client";

import Link from "next/link";
import { useState, useActionState } from "react";

export const TodoForm = ({ formAction, initialData }) => {
  const [formState, action] = useActionState(formAction, {
    errors: {},
  });

  // setup for cycle priority
  const [priority, setPriority] = useState(todo.priority || "Set Your Priority");
  const priorities = ["No-Priority", "Low-Priority", "Medium-Priority", "High- Priority"];

  // finds current priority and increments by one
  const cyclePriority = () => {
    const currentIndex = priorities.indexOf(priority);
    const nextIndex = (currentIndex + 1) % priorities.length;
  }
  // Assuming that height order of elements is [Title, ]
  return (
    <> 
      <h1>{initialData.title ? "Update" : "Create"} Post</h1>
      <form action={action}>

      <section> {/** upon clicking, the button adheres to cyclePriority, overwriting the default value */}
          <button 
            htmlFor="priority" 
            type="button" 
            onClick={ cyclePriority }
            >{ priority }
          </button>
        </section>

        <section>
          <label htmlFor="title">Title</label>
          <br></br>
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
          <label htmlFor="content">Content</label>
          <br></br>
          <textarea
            id="content"
            name="content"
            defaultValue={initialData.content}
            className="text-black bg-white"
          ></textarea>
          {formState.errors.content && (
            <div>
              {formState.errors.content?.join(", ")} {/** Display form errors
              related to the content field */}
            </div>
          )}
        </section>

        <section>
          <label htmlFor="Deadline"> 
            Date
            <input
              type="date"
              id="deadline"
              name="deadline"
              className="text-black bg-white"
              defaultValue={ initialData.deadline || getCurrentDate() }
            /> 
            
          </label>
        </section>

        <section> {/** .log statement being used as a bookmark for later stages of DB posting implementation */}
          <button type="submit">Save</button>
          <Link href="/user/todo">Cancel</Link>
        </section>
      </form>
    </>
  );
};
