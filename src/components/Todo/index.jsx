"use client";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { cn } from "@/lib/utils";
import { dateFormatter } from "@/utils/functions";
import { priorityObject } from "@/utils/constants";
import { BsHourglassSplit } from "react-icons/bs";

// import { useRouter } from "next/navigation";
import ReusableButton from "../ui/ReusableButton";
import TaskStatusButton from "../TaskStatusButton";
import { TodoDelete } from "..";

export const Todo = ({ listId, key, task }) => {
  // const router = useRouter();
  //small styling for box
  const priority = priorityObject[task.priority];
  const priorityValue = priority.split(" ")[0]?.toLowerCase?.();
  const colorVar = `--${priorityValue}-priority`;
  return (
    <AccordionItem
      value={task.id}
      className="bg-white flex flex-col dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg ring ring-white/5"
    >
      <AccordionTrigger
        className={cn(
          "relative rounded-b-none flex items-center gap-3 p-3 *:text-gray-200 bg-indigo-50 dark:bg-indigo-900/30 border-b border-indigo-100 dark:border-indigo-800/30"
        )}
        style={{
          background: `oklch(var(${colorVar}) / 80%)`,
        }}
      >
        {/* <TaskStatusButton currentState={task.status} /> */}

        <div className="flex-1 flex flex-col gap-1">
          <h3 className="font-medium text-[1.1rem]">{task.title}</h3>
          <div className="flex gap-2 text-sm">
            <BsHourglassSplit className="min-w-4 min-h-4" />
            <span>
              Due:{" "}
              {dateFormatter(task.deadline, {
                dateStyle: "medium",
                timeStyle: "short",
                hour12: true,
              })}
            </span>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="relative px-4 py-5 overflow-hidden flex flex-col gap-3 font-medium">
        <p className="text-[1.0rem]">{task.content}</p>
        <div className="self-end *:p-2 *:min-w-24 space-x-3">
          <ReusableButton
            onClick={() => {
              // router.push(`/dashboard/list/${listId}/todo/${task.id}/edit`);
            }}
            title={"Edit"}
          />
          <TodoDelete listId={listId} id={task.id} />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
