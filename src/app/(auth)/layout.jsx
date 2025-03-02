import Logo from "@/components/Logo";
import { redirect } from "next/navigation";
import { SessionWrapper } from "@/components";
import { getServerSessionWrapper } from "@/utils";
import ThemeToggle from "@/components/ThemeToggle";

export default async function AuthFormLayout({ children }) {
  const session = await getServerSessionWrapper();

  if (session) {
    redirect("/"); // Immediately redirects authenticated users
  }

  return (
    <SessionWrapper session={session}>
      <div className="flex flex-col gap-10 items-center justify-center min-h-dvh bg-secondary">
        <div className="p-4 w-full justify-between flex items-center gap-6">
          <Logo />
          <ThemeToggle />
        </div>
        <div className="flex flex-1 items-center justify-center w-full">
          {children}
        </div>
      </div>
    </SessionWrapper>
  );
}
