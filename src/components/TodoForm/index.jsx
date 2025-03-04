"use client";

import Link from "next/link";
import { useState, useActionState } from "react";
import { Todo } from "@/components";
import { SubTask } from "@/components";


// setup for cycle priority
const priorities = ["No-Priority", "Low-Priority", "Medium-Priority", "High-Priority"];

export const TodoForm = ({ formAction, initialData }) => {
  const [priority, setPriority] = useState(initialData.priority || "Set Your Priority");
  const [title, setTitle] = useState(initialData.title || "Set Your Title");
  const [formState, action] = useActionState(formAction, {
    errors: {
      title: "ERROR: Title",
      priority: "ERROR: Priority",
      // Space for 'state' error handling
      content: "ERROR: Content",
      deadline: "ERROR: Deadline"
    },
  });

  // finds current priority and increments by one
  const handlePriority = () => {
    const currentIndex = priorities.indexOf(priority);
    const nextIndex = (currentIndex + 1) % priorities.length;

    setPriority(nextIndex);
  }

  const getDates = () => {
    const date = new Date();

    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    // getting time units for later use in notification timers etc
    const hour = date.getHours();
    const minute = date.getMinutes() % 10;
    //return (`${year}-${month}-${day}`);
    return (`${day}-${month}-${year}`);
  }
 
  // Assuming that height order of elements is [Title, State, Priority, Content, Deadline]
  return (
    <> 
      <h1>{ initialData.title ? "Update" : "Create" } Post</h1>
      <form action={action}>

      <section>
        <label htmlFor="title">Title</label>
        <br></br>
        <input
          type="text"
          id="title"
          name="title"
          value={ title }
          onChange={ (e) => { setTitle(e.target.value) } }
          className="text-black bg-white"
        />
        { formState.errors.title && (
          <p>{ formState.errors.title?.join(", ") }</p>
        ) }
        {/** button that will call the creation of a subtask */}
        <button
          htmlFor="subtask_button"
          type="button"
          onClick={ () => (
            <SubTask // In theory, should present
              formAction={ formAction }
              initialData={ initialData }
              parentForm={ title }
            />
          )}>
        </button>
      </section>

      <section>
        {/** upon clicking, the button adheres to cyclePriority, 
         * overwriting the default value */}
        <button 
          htmlFor="priority" 
          type="button" 
          onClick={ handlePriority }
          >{ priority }
        </button>
        { formState.errors.priority && (
          <p>{ formState.errors.priority?.join(", ") }</p>
        ) }
          {/** Display form errors related to the priority field */}

          {/** In theory, should call saqib's task state field
           *  and display next to next to priority and under title.
           * also need to add error handling somehow. */}
        <Todo />
      </section>
       
      <section>
        <label htmlFor="content">Content</label>
        <br></br>
        <textarea
          id="content"
          name="content"
          defaultValue={ initialData.content }
          className="text-black bg-white"
        ></textarea>
        { formState.errors.content && (
          <p>{ formState.errors.content?.join(", ") }</p>
        ) } {/** Display form errors related to the content field */}
      </section>

        <section>
          <label htmlFor="Deadline"> 
            Date
            <input
              type="date"
              id="deadline"
              name="deadline"
              className="text-black bg-white"
              defaultValue={ initialData.deadline || getDates() }
            />
          </label>
          { formState.errors.deadline && (
            <p>{ formState.errors.deadline?.join(", ") }</p>
          ) }
        </section>

        <section>
          <button type="submit" onClick={ () => console.log("Save Function Placeholder") }>Save</button>
          <Link href={`/list/${listId}/todo`}>Cancel</Link>
        </section>

      </form>
    </>
  );
};
// TODO: change Link to have list id
