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
import UserAvatar from "../UserAvatar";
import ReusableButton from "../ui/ReusableButton";
import { MoreHorizontal, Plus } from "lucide-react";

const GroupList = ({ state, group }) => {
  return state === "expanded" ? (
    <SidebarMenuItem className={"h-full"}>
      <SidebarMenuButton
        className={
          "min-h-32 h-full gap-4 pt-5 pb-3 flex items-start flex-col overflow-hidden bg-sidebar-accent/70"
        }
      >
        {group.members.length ? (
          <div className="flex flex-wrap items-center justify-center -space-x-2 mr-2">
            {group.members.slice(0, 5).map((item, i) => {
              return (
                <UserAvatar
                  key={i}
                  className={cn("text-accent size-10", i >= 3 ? "-mt-2.5" : "")}
                  image={item.image}
                  name={item.name}
                />
              );
            })}
          </div>
        ) : (
          <p className="text-center flex items-center justify-center w-full flex-1">
            No one yet
          </p>
        )}
        <span className="flex flex-col gap-1">
          <span className="flex gap-2 items-center">
            <p>🧑‍🧑‍🧒‍🧒</p>
            <p className="text-wrap line-clamp-1">{group.title}</p>
          </span>
          <p className="text-[.85rem] text-neutral-400">
            {group.members.length} people{" "}
          </p>
        </span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  ) : (
    <SidebarMenuItem>
      <SidebarMenuButton
        size="l"
        className={"p-2 flex items-center gap-4 justify-between"}
      >
        <Link href="/" className="flex items-center gap-4">
          <span className="text-lg">🧑‍🧑‍🧒‍🧒</span>
          <span>{group.title}</span>
        </Link>
        <p className="text-[.85rem] text-neutral-400">
          {group.members.length} people{" "}
        </p>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

const Groups = ({ groups }) => {
  const { state } = useSidebar();

  return (
    <SidebarGroup className={"flex flex-col gap-3"}>
      <SidebarGroupLabel className={"text-lg"}>Groups</SidebarGroupLabel>
      <SidebarGroupAction title="Create new group">
        <Link href={"/dashboard/group/create"}>
          <Plus size={18} />
        </Link>{" "}
        <span className="sr-only">Create new group</span>
      </SidebarGroupAction>
      <SidebarGroupContent>
        <SidebarMenu
          className={cn(state === "expanded" ? "grid grid-cols-2 gap-2" : "")}
        >
          {groups.slice(0, 5).map((group, idx) => {
            return <Group key={idx} state={state} group={group} />;
          })}
          <SidebarMenuItem
            className={cn(state === "expanded" ? "col-span-2" : "")}
          >
            <SidebarMenuButton className="text-sidebar-foreground/70">
              <Link
                href={`/dashboard/group`}
                className={cn(
                  "flex items-center gap-4",
                  state === "expanded" ? "w-full" : ""
                )}
              >
                <MoreHorizontal
                  className={cn(state === "expanded" ? "!size-6" : "!size-5")}
                />
                <span>View all</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default Groups;
