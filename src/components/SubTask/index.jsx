"use client";

import Link from "next/link";
import { useState, useActionState } from "react";

const p = console.log("Placeholder for a parent value for a nested subtask.");
// fields required are [
//    priority,
//    state checkbox,
//    content,
//    new subtask button,
//    save button,
//    cancel button,
// ]
export const SubTask = ({ formAction, initialData, parentForm }) => {
  const [priority, setPriority] = useState(initialData.priority || "Set Your Priority");
  const [formState, action] = useActionState(formAction, {
    errors: {
      priority: "ERROR: Priority",
      // Space for 'state' error handling
      content: "ERROR: Content",
    },
  });

  //naming its parent for ease of use when storing to a database later
  const parent = parentForm;
  console.log(`This Subtasks Parent Form is ${parent}`);

  return ( // returns a lesser version of TodoForm, used as the basis for created subtasks
  <>
    <section>
      <button
        htmlFor="priority"
        type="button"
        defaultValue={ initialData.priority || "Set Your Priority" }
        onClick={ handlePriority }
      ></button>
    </section>
    
    <form action={ action }>
    { formState.errors.priority && (
        <p>{ formState.errors.priority?.join(", ") }</p>
    )}

      <section>
        <br></br>
          <div> 
            {/** in theory, checkbox should be to the left of content (e.g. [x] Todo.content) */}
            <Todo />
          </div>
          <div>
            <label htmlFor="content"></label>
            <textarea
                id="content"
                name="content"
                defaultValue={ initialData.content || "Subtask Priority" }
                className="text-black bg-white"
            ></textarea>
          </div>
          <div>
            <button 
            htmlFor="subtask_button"
            type="button"
            onClick={ () => (
              <SubTask 
                formAction={ formAction }
                initialData={ initialData }
                parentForm={ p }
              />
            )}>
              Add SubTask
            </button>
          </div>
      </section>

      <section>
        <button type="submit" onClick={ () => console.log("Save Function Placeholder") }>Save</button>
        <Link href="/user/todo">Cancel</Link>
      </section>
    </form>
    </>
  )
}     