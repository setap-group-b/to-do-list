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
import { MoreHorizontal, Plus, Search } from "lucide-react";
import { useState } from "react";
import ListItems from "./ListItems";

const Lists = ({ userLists }) => {
  const { state } = useSidebar();
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (event) => {
    event.preventDefault();
    setSearchValue(event.target.value);
  };

  return (
    <SidebarGroup className={"flex flex-col gap-3"}>
      <SidebarGroupLabel className={"text-lg"}>Owned Lists</SidebarGroupLabel>
      {state === "expanded" && (
        <div className="relative hidden md:flex items-center w-full">
          <Search className="absolute left-3 h-4 w-4 text-indigo-500/70 dark:text-indigo-400/70" />
          <input
            type="text"
            placeholder="Search lists..."
            onChange={handleSearchChange}
            className="h-10 w-full rounded-md bg-indigo-50 dark:bg-indigo-900/30 border-none pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:focus:ring-indigo-600/50 placeholder:text-indigo-400/70 dark:placeholder:text-indigo-500/50"
          />
        </div>
      )}
      <SidebarGroupAction title="Create new list">
        <Link href={"/dashboard/list/add"}>
          <Plus size={18} />
        </Link>{" "}
        <span className="sr-only">Create new list</span>
      </SidebarGroupAction>
      <SidebarGroupContent>
        <SidebarMenu>
          <ListItems userLists={userLists} searchValue={searchValue} />
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
