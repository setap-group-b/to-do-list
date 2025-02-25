
"use client";

import Link from "next/link";
import { useState } from "react";

// Define the three states for the task
const TASK_STATES = {
  UNFINISHED: "unfinished",
  IN_PROGRESS: "in-progress",
  FINISHED: "finished",
};

export const Todo = ({ todo }) => {
  
  const [taskState, setTaskState] = useState(todo.state || TASK_STATES.UNFINISHED);

  // Function to cycle through the three states
  const handleCheckboxChange = () => {
    setTaskState((prevState) => {
      switch (prevState) {
        case TASK_STATES.UNFINISHED:
          return TASK_STATES.IN_PROGRESS;
        case TASK_STATES.IN_PROGRESS:
          return TASK_STATES.FINISHED;
        case TASK_STATES.FINISHED:
          return TASK_STATES.UNFINISHED;
        default:
          return TASK_STATES.UNFINISHED;
      }
    });

    
    console.log("Updated task state:", taskState);
  };

  // checkbox appearance based on the state
  const getCheckboxAppearance = () => {
    switch (taskState) {
      case TASK_STATES.IN_PROGRESS:
        return "–"; // Dash for in-progress
      case TASK_STATES.FINISHED:
        return "✔"; // Tick for finished
      default:
        return ""; // Empty for unfinished
    }
  };

  //small styling for box 

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <div
        style={{
          width: "20px",
          height: "20px",
          border: "1px solid #000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
        onClick={handleCheckboxChange}
      >
        {getCheckboxAppearance()}
      </div>
      <Link
        href={{
          pathname: `/user/todo/${todo.id}`,
        }}
      >
        <h2>{todo.title}</h2>
      </Link>
    </div>
  );
};

