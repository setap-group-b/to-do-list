"use client";

import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { MoreHorizontal, Plus } from "lucide-react";

const Lists = ({ children }) => {
  const { state } = useSidebar();

  return (
    <SidebarGroup className={"flex flex-col gap-3"}>
      <SidebarGroupLabel className={"text-lg"}>Owned Lists</SidebarGroupLabel>
      <SidebarGroupAction title="Create new list">
        <Link href={"/dashboard/list/add"}>
          <Plus size={18} />
        </Link>{" "}
        <span className="sr-only">Create new list</span>
      </SidebarGroupAction>
      <SidebarGroupContent>
        <SidebarMenu>
          {children}
          <SidebarMenuItem className={"cursor-pointer"}>
            <SidebarMenuButton className="text-sidebar-foreground/70">
              <Link
                href={`/dashboard/list`}
                className={cn(
                  "flex items-center gap-4",
                  state === "expanded" ? "w-full" : ""
                )}
              >
                <MoreHorizontal />
                <span>View all</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default Lists;
