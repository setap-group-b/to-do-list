"use client";

import { ListIcon } from "lucide-react";
import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { useParams } from "next/navigation";

const List = ({ list }) => {
  // const params = useParams();
  const router = useRouter();
  console.log({ list });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-indigo-100 dark:border-indigo-900/40 overflow-hidden">
      <div className="flex items-center justify-between bg-indigo-50 dark:bg-indigo-900/30 p-4 border-b border-indigo-100 dark:border-indigo-800/30">
        <div className="flex items-center gap-2">
          {
            <ListIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          }
          <h2 className="font-semibold text-indigo-900 dark:text-indigo-200 capitalize">
            {list.title}
          </h2>
        </div>
        <button
          className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium"
          onClick={() => router.push(`/dashboard/list/${list.id}/todo`)}
        >
          View All
        </button>
      </div>
      <div className="p-4 flex flex-col">
        <div className="flex-1 *:w-full *:h-full">
          {list?.todo?.length ? (
            /* <ul className="space-y-3">
          {upcomingDeadlines.map((task) => (
            <li
              key={task.id}
              className="flex items-center gap-3 p-3 rounded-xl bg-indigo-50/50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/30"
            >
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
          ))}
        </ul> */ l
          ) : (
            <div className="text-center flex items-center justify-center min-h-28">
              No tasks yet
            </div>
          )}
        </div>

        <button
          onClick={() => router.push(`/dashboard/list/${list.id}/todo/add`)}
          className="w-full mt-4 py-2 rounded-xl border border-dashed border-indigo-300 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
        >
          + Add New Task
        </button>
      </div>
    </div>
  );
};

export default List;
