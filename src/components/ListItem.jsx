import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { cn } from "@/lib/utils";
import { dateFormatter } from "@/utils/functions";
import { priorityObject } from "@/utils/constants";
import { BsHourglassSplit } from "react-icons/bs";
import TaskStatusButton from "./TaskStatusButton";

const ListItem = ({ task, container }) => {
  const priority = priorityObject[task.priority];
  const colorVar = `--${priority.split(" ")[0]?.toLowerCase?.()}-priority`;
  const ContainerValue = container || "li";
  return (
    <ContainerValue className="flex items-center gap-3 p-3 rounded-xl bg-indigo-50/50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/30">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div
              className={cn("h-3 w-3 rounded-full")}
              style={{
                background: `oklch(var(${colorVar}))`,
              }}
            ></div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{priority}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div className="flex-1 flex flex-col gap-1">
        <h3 className="font-medium text-gray-900 dark:text-gray-100">
          {task.title}
        </h3>
        <div className="flex gap-2 text-xs text-gray-600 dark:text-gray-400">
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
      <TaskStatusButton currentState={task.status} />
    </ContainerValue>
  );
};

export default ListItem;
