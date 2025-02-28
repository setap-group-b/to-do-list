"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LuListTodo } from "react-icons/lu";

export default function AuthFormLayout({ children }) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex items-center gap-2 font-bold text-xl fixed z-50 left-4 top-5">
        <LuListTodo size={22} />
        <p>To-do-list</p>
      </div>
      <div className="flex flex-1 items-center justify-center">{children}</div>
    </div>
  );
}
