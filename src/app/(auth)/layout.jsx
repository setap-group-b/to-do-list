import { SessionWrapper } from "@/components";
import { getServerSessionWrapper } from "@/utils";
import { redirect } from "next/navigation";
import { LuListTodo } from "react-icons/lu";

export default async function AuthFormLayout({ children }) {
  const session = await getServerSessionWrapper();

  if (session) {
    redirect("/"); // Immediately redirects authenticated users
  }

  return (
    <SessionWrapper session={session}>
      <div className="flex flex-col items-center justify-center min-h-dvh">
        <div className="flex items-center gap-2 self-start mt-5 ml-4 font-bold text-xl sm:fixed sm:m-0 sm:left-4 sm:top-5 z-50">
          <LuListTodo size={22} />
          <p>To-do-list</p>
        </div>
        <div className="flex flex-1 items-center justify-center m-auto w-full">
          {children}
        </div>
      </div>
    </SessionWrapper>
  );
}
