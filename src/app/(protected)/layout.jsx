import { Nav, SessionWrapper } from "@/components";
import Sidebar from "@/components/Sidebar";
import ThemeToggle from "@/components/ThemeToggle";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getServerSessionWrapper } from "@/utils";
import { redirect } from "next/navigation";
import React from "react";

export default async function AuthLayout({ children }) {
  const session = await getServerSessionWrapper();

  if (!session) {
    redirect("/login"); // Immediately redirects unauthenticated users
  }

  return (
    <SessionWrapper session={session}>
      <SidebarProvider>
        <main className="flex !overflow-hidden w-screen h-[100dvh]">
          <Sidebar />
          <SidebarInset>
            <div className="flex-1 flex flex-col h-full">
              <Nav />
              <div className="lg:p-10 md:p-6 p-4 bg-secondary *:h-full *:overflow-y-auto overflow-hidden flex-1">
                {children}
              </div>
            </div>
            <ThemeToggle
              className={
                "fixed bottom-8 right-8 hover:bg-background cursor-pointer"
              }
            />
          </SidebarInset>
        </main>
      </SidebarProvider>
    </SessionWrapper>
  );
}
