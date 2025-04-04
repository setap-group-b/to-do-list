"use client";

import { status, statusIcons, statusObject } from "@/utils/constants";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { useState } from "react";
import { cn } from "@/lib/utils";

const TaskStatusButton = ({ currentStatus }) => {
  const [taskState, setTaskState] = useState(currentStatus || status[0]);

  // Function to cycle through the three states
  const handleCheckboxChange = () => {
    setTaskState((prevState) => {
      const currentIndex = status.indexOf(prevState);
      const newIndex =
        currentIndex === status.length - 1 ? 0 : currentIndex + 1;
      return status[newIndex];
    });
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            className={cn(
              "size-6 cursor-pointer rounded-full font-bold flex items-center justify-center bg-white dark:bg-gray-900 *:w-full *:h-full",
              taskState === "COMPLETED"
                ? "dark:text-green-500 text-green-600"
                : "dark:text-blue-500 text-blue-600"
            )}
            onClick={(e) => {
              e.stopPropagation();
              handleCheckboxChange();
            }}
          >
            {statusIcons[taskState]}
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p>{statusObject[taskState]}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TaskStatusButton;
