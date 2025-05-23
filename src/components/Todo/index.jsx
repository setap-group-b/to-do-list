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

import { useRouter } from "next/navigation";
import { deleteTodo } from "@/app/actions/todo";
import ReusableButton from "../ui/ReusableButton";
import TaskStatusButton from "../TaskStatusButton";
import { displayErrorMessage } from "@/utils/displayError";

export const Todo = ({ type, listId, task }) => {
  const router = useRouter();
  //small styling for box
  const priority = priorityObject[task.priority];
  const priorityValue = priority.split(" ")[0]?.toLowerCase?.();
  const colorVar = `--${priorityValue}-priority`;

  const now = new Date();
  const deadline = new Date(task.deadline);
  const isPassedDueDate = now >= deadline;
  const aDayToDueDate =
    !isPassedDueDate &&
    deadline.getTime() - now.getTime() <= 24 * 60 * 60 * 1000;

  return (
    <AccordionItem
      value={task.id}
      className="bg-white flex flex-col dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg ring ring-white/5"
    >
      <AccordionTrigger
        className={cn(
          "relative rounded-b-none hover:cursor-pointer hover:no-underline flex items-center gap-3 p-3 bg-indigo-50 dark:bg-indigo-900/30",
        )}
      >
        <TaskStatusButton
          type={type}
          listId={listId}
          task={task}
          currentState={task.status}
        />

        <div className="flex-1 flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span
              className={cn("h-3 w-3 rounded-full")}
              style={{
                background: `oklch(var(${colorVar}))`,
              }}
            ></span>
            <h3 className="font-medium text-[1.1rem]">{task.title}</h3>
          </div>
          {task.deadline && (
            <div
              className={cn(
                "flex gap-2 items-center text-sm text-gray-500 dark:text-gray-400",
                isPassedDueDate
                  ? "!text-red-400"
                  : aDayToDueDate
                    ? "text-yellow-400"
                    : "",
              )}
            >
              <BsHourglassSplit className="min-w-4 min-h-4 " />
              <div className="flex flex-col">
                <span>
                  {`Due date: ${dateFormatter(task.deadline, {
                    dateStyle: "medium",
                    timeStyle: "short",
                    hour12: true,
                  })}`}
                </span>
                <span>
                  {isPassedDueDate
                    ? "Passed due date"
                    : aDayToDueDate
                      ? "Due in less than 24 hrs"
                      : ``}
                </span>
              </div>
            </div>
          )}
        </div>
      </AccordionTrigger>
      <AccordionContent className="relative px-4 py-5 overflow-hidden flex flex-col gap-3 font-medium">
        <p className="text-[1.04rem]">{task.content}</p>
        <div className="self-end *:p-2 *:min-w-24 space-x-3">
          <ReusableButton
            onClick={() => {
              router.push(`/dashboard/${type}/${listId}/todo/${task.id}/edit`);
            }}
            title={"Edit"}
            className="cursor-pointer"
          />
          <ReusableButton
            variant="destructive"
            title={"Delete"}
            className="cursor-pointer"
            onClick={async (e) => {
              e.preventDefault(); // Prevent the form from being submitted in the traditional way.
              const result = await deleteTodo(task.id, listId, type);
              if (!result.success) displayErrorMessage(result.errors);
            }}
          />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
