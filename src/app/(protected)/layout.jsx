import { Nav, SessionWrapper } from "@/components";
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
      <main>
        <Nav />
        {children}
      </main>
    </SessionWrapper>
  );
}
