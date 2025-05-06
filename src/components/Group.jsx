"use client";
import { MdGroups } from "react-icons/md";
import ListItem from "./ListItem";
import { useRouter } from "next/navigation";

const Group = ({ group }) => {
  const router = useRouter();

  return (
    <div className="bg-white flex flex-col dark:bg-gray-800 rounded-2xl shadow-md border border-indigo-100 dark:border-indigo-900/40 overflow-hidden">
      <div className="flex items-center justify-between bg-indigo-50 dark:bg-indigo-900/30 p-4 border-b border-indigo-100 dark:border-indigo-800/30">
        <div className="flex items-center gap-2">
          {
            <MdGroups className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          }
          <h2 className="font-semibold text-indigo-900 dark:text-indigo-200 capitalize">
            {group.title}
          </h2>
        </div>
        <button
          className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium"
          onClick={() => router.push(`/dashboard/group/${group.id}/todo`)}
        >
          View all tasks
        </button>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex-1 *:w-full *:h-full">
          {group?.Todo?.length ? (
            <ul className="flex flex-col gap-3 min-h-28">
              {group?.Todo?.slice(0, 2).map((task) => (
                <ListItem key={task.id} task={task} />
              ))}
            </ul>
          ) : (
            <div className="text-center flex items-center justify-center min-h-28">
              No tasks yet
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 *:flex-1">
          {["Add New Task"].map((item, i) => {
            return (
              <button
                key={i}
                onClick={() =>
                  router.push(`/dashboard/group/${group.id}/todo/add`)
                }
                className=" mt-4 py-2 rounded-xl border border-dashed border-indigo-300 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:bg-indigo-50 dark:hover:bg-indigo-900/20 capitalize"
              >
                + {item}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Group;
