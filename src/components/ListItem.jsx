import { ListChecks } from "lucide-react";

const ListItem = ({ task }) => {
  return (
    <li className="flex items-center gap-3 p-3 rounded-xl bg-indigo-50/50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/30">
      <div
        className={`h-3 w-3 rounded-full ${
          task.priority === "high"
            ? "bg-red-500"
            : task.priority === "medium"
            ? "bg-amber-500"
            : "bg-green-500"
        }`}
      ></div>
      <div className="flex-1">
        <h3 className="font-medium text-gray-900 dark:text-gray-100">
          {task.title}
        </h3>
        <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
          <span className="bg-indigo-100 dark:bg-indigo-800/50 px-2 py-0.5 rounded-full">
            {task.course}
          </span>
          <span>Due: {task.dueDate}</span>
        </div>
      </div>
      <button className="h-8 w-8 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-800/30">
        <ListChecks className="h-4 w-4" />
      </button>
    </li>
  );
};

export default ListItem;
