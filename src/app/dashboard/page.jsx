import CurrentDateTime from "@/components/CurrentDateTime";
import { getServerSessionWrapper } from "@/utils";
import {
  BookOpen,
  Calendar,
  Clock,
  GraduationCap,
  ListChecks,
  Sparkles,
  Trophy,
} from "lucide-react";

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

  // Sample data for student dashboard
  const upcomingDeadlines = [
    {
      id: 1,
      title: "React Project",
      course: "SETAP 101",
      dueDate: "Tomorrow, 11:59 PM",
      priority: "high",
    },
    {
      id: 2,
      title: "Usability CW",
      course: "USAB 202",
      dueDate: "Friday, 5:00 PM",
      priority: "medium",
    },
    {
      id: 3,
      title: "Login System",
      course: "COMP 210",
      dueDate: "Next Monday",
      priority: "low",
    },
  ];

  const studySessions = [
    {
      id: 1,
      subject: "SETAP",
      duration: "2 hours",
      time: "Today, 3:00 PM",
      location: "Library, Floor 2",
    },
    {
      id: 2,
      subject: "Web Programming",
      duration: "1 hour",
      time: "Tomorrow, 4:30 PM",
      location: "Student Center",
    },
  ];

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
              <CurrentDateTime />
            </p>
          </div>
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-3 rounded-xl">
            <div className="flex flex-col items-center p-2 bg-white/10 rounded-lg">
              <span className="text-xs text-indigo-100">Tasks</span>
              <span className="text-xl font-bold">12</span>
            </div>
            <div className="flex flex-col items-center p-2 bg-white/10 rounded-lg">
              <span className="text-xs text-indigo-100">Completed</span>
              <span className="text-xl font-bold">8</span>
            </div>
            <div className="flex flex-col items-center p-2 bg-white/10 rounded-lg">
              <span className="text-xs text-indigo-100">Streak</span>
              <span className="text-xl font-bold">5</span>
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
            <button className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium">
              View All
            </button>
          </div>
          <div className="p-4">
            <ul className="space-y-3">
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
            </ul>
            <button
              href={"/dashboard/list/add"}
              className="w-full mt-4 py-2 rounded-xl border border-dashed border-indigo-300 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
            >
              + Add New Task
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-indigo-100 dark:border-indigo-900/40 overflow-hidden">
          <div className="flex items-center justify-between bg-indigo-50 dark:bg-indigo-900/30 p-4 border-b border-indigo-100 dark:border-indigo-800/30">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              <h2 className="font-semibold text-indigo-900 dark:text-indigo-200">
                Study Sessions
              </h2>
            </div>
            <button className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium">
              Schedule
            </button>
          </div>
          <div className="p-4">
            <ul className="space-y-3">
              {studySessions.map((session) => (
                <li
                  key={session.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-indigo-50/50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/30"
                >
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 dark:from-indigo-600 dark:to-purple-700 flex items-center justify-center text-white">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">
                      {session.subject}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{session.time}</span>
                      </div>
                      <span>•</span>
                      <span>{session.duration}</span>
                      <span>•</span>
                      <span>{session.location}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <button className="w-full mt-4 py-2 rounded-xl border border-dashed border-indigo-300 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:bg-indigo-50 dark:hover:bg-indigo-900/20">
              + Schedule Study Session
            </button>
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
