import { getServerSessionWrapper } from "@/utils";
import { dateFormatter } from "@/utils/functions";
import {
  BookOpen,
  Calendar,
  GraduationCap,
  ListChecks,
  Sparkles,
} from "lucide-react";
import { getUserLists } from "@/utils";
import Link from "next/link";

export default async function Home() {
  let timeOfDay = "";
  const session = await getServerSessionWrapper();
  const date = new Date();
  const hour = date.getHours();
  switch (true) {
    case hour >= 0 && hour <= 11:
      timeOfDay = "morning";
      break;
    case hour >= 12 && hour <= 17:
      timeOfDay = "afternoon";
      break;
    case hour >= 18:
      timeOfDay = "evening";
      break;
    default:
      timeOfDay = "day";
      break;
  }

  // Get real data from the database
  const userLists = await getUserLists(session?.user);
  const allTasks = userLists?.flatMap(list => list.Todo || []) || [];
  const upcomingTasks = allTasks
    .filter(task => task.deadline && new Date(task.deadline) > new Date())
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .slice(0, 3);

  const completedTasks = allTasks.filter(task => task.status === "COMPLETED").length;
  const totalTasks = allTasks.length;

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-700 dark:to-purple-800 p-6 rounded-2xl shadow-lg text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Good {timeOfDay}, {session?.user?.name}!{" "}
              <Sparkles className="inline-block h-6 w-6 ml-1" />
            </h1>
            <p className="text-indigo-100 dark:text-indigo-200">
              {dateFormatter(date)}
            </p>
          </div>
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-3 rounded-xl">
            <div className="flex flex-col items-center p-2 bg-white/10 rounded-lg">
              <span className="text-xs text-indigo-100">Tasks</span>
              <span className="text-xl font-bold">{totalTasks}</span>
            </div>
            <div className="flex flex-col items-center p-2 bg-white/10 rounded-lg">
              <span className="text-xs text-indigo-100">Completed</span>
              <span className="text-xl font-bold">{completedTasks}</span>
            </div>
            <div className="flex flex-col items-center p-2 bg-white/10 rounded-lg">
              <span className="text-xs text-indigo-100">Lists</span>
              <span className="text-xl font-bold">{userLists?.length || 0}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-indigo-100 dark:border-indigo-900/40 overflow-hidden">
          <div className="flex items-center justify-between bg-indigo-50 dark:bg-indigo-900/30 p-4 border-b border-indigo-100 dark:border-indigo-800/30">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              <h2 className="font-semibold text-indigo-900 dark:text-indigo-200">
                Upcoming Deadlines
              </h2>
            </div>
            <Link href="/dashboard/list" className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium">
              View All
            </Link>
          </div>
          <div className="p-4">
            <ul className="space-y-3">
              {upcomingTasks.length > 0 ? (
                upcomingTasks.map((task) => (
                  <li
                    key={task.id}
                    className="flex items-center gap-3 p-3 rounded-xl bg-indigo-50/50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/30"
                  >
                    <div
                      className={`h-3 w-3 rounded-full ${
                        task.priority === "HIGH"
                          ? "bg-red-500"
                          : task.priority === "MEDIUM"
                          ? "bg-amber-500"
                          : "bg-green-500"
                      }`}
                    ></div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-gray-100">
                        {task.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                        <span>Due: {new Date(task.deadline).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <Link
                      href={`/dashboard/list/${task.listId}/todo`}
                      className="h-8 w-8 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-800/30"
                    >
                      <ListChecks className="h-4 w-4" />
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-center text-gray-500 dark:text-gray-400 py-4">
                  No upcoming deadlines
                </li>
              )}
            </ul>
            <Link
              href="/dashboard/list/add"
              className="w-full mt-4 py-2 rounded-xl border border-dashed border-indigo-300 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:bg-indigo-50 dark:hover:bg-indigo-900/20 flex items-center justify-center"
            >
              + Add New Task
            </Link>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-indigo-100 dark:border-indigo-900/40 overflow-hidden">
          <div className="flex items-center justify-between bg-indigo-50 dark:bg-indigo-900/30 p-4 border-b border-indigo-100 dark:border-indigo-800/30">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              <h2 className="font-semibold text-indigo-900 dark:text-indigo-200">
                Your Lists
              </h2>
            </div>
            <Link href="/dashboard/list" className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium">
              View All
            </Link>
          </div>
          <div className="p-4">
            <ul className="space-y-3">
              {userLists?.slice(0, 3).map((list) => (
                <Link
                  key={list.id}
                  href={`/dashboard/list/${list.id}/todo`}
                  className="block"
                >
                  <li
                    className="flex items-center gap-3 p-3 rounded-xl bg-indigo-50/50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/30 hover:bg-indigo-100/50 dark:hover:bg-indigo-900/30 transition-colors"
                  >
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 dark:from-indigo-600 dark:to-purple-700 flex items-center justify-center text-white">
                      <GraduationCap className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-gray-100">
                        {list.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <ListChecks className="h-3 w-3" />
                          <span>{list.Todo?.length || 0} tasks</span>
                        </div>
                        <span>•</span>
                        <span>{list.collaborators?.length || 0} collaborators</span>
                      </div>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                      <ListChecks className="h-4 w-4" />
                    </div>
                  </li>
                </Link>
              ))}
            </ul>
            <Link
              href="/dashboard/list/add"
              className="w-full mt-4 py-2 rounded-xl border border-dashed border-indigo-300 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:bg-indigo-50 dark:hover:bg-indigo-900/20 flex items-center justify-center"
            >
              + Create New List
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 dark:from-purple-900/20 dark:to-indigo-900/20 p-5 rounded-2xl border border-indigo-200/50 dark:border-indigo-800/30 text-center">
        <p className="text-indigo-800 dark:text-indigo-200 italic font-medium">
          "The beautiful thing about learning is that no one can take it away
          from you."
        </p>
        <p className="text-indigo-600 dark:text-indigo-400 text-sm mt-1">
          — B.B. King
        </p>
      </div>
    </div>
  );
}
