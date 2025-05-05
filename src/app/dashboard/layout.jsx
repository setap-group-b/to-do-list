import { Nav, SessionWrapper } from "@/components";
import Sidebar from "@/components/Sidebar";
import ThemeToggle from "@/components/ThemeToggle";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getServerSessionWrapper } from "@/utils";
import { redirect } from "next/navigation";

export default async function AuthLayout({ children }) {
  const session = await getServerSessionWrapper();

  if (!session) {
    redirect("/login"); // Immediately redirects unauthenticated users
  }

  return (
    <SessionWrapper session={session}>
      <SidebarProvider>
        <main className="flex !overflow-hidden w-screen h-[100dvh] bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950/30 dark:via-purple-950/30 dark:to-pink-950/30">
          <Sidebar />
          <SidebarInset className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-md">
            <div className="flex-1 flex flex-col h-full">
              <Nav />
              <div className="p-4 md:p-6 lg:p-8 overflow-hidden flex-1 transition-all">
                <div className="h-full overflow-y-auto overflow-x-hidden p-4 md:p-6 has-[.list]:p-0 has-[.settings]:p-0 has-[.list]:border-none has-[.settings]:border-none has-[.settings]:!bg-transparent has-[.settings]:!shadow-none bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-indigo-100 dark:border-indigo-900/40">
                  {children}
                </div>
              </div>
            </div>
            <ThemeToggle className="hidden sm:flex fixed bottom-8 right-8 bg-white dark:bg-gray-800 shadow-lg rounded-full p-3 hover:shadow-indigo-200 dark:hover:shadow-indigo-900 cursor-pointer transition-all hover:scale-105" />
          </SidebarInset>
        </main>
      </SidebarProvider>
    </SessionWrapper>
  );
}
