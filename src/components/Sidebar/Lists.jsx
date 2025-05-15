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
import { useEffect, useState } from "react";
import { SortableListItem } from "./SortableListItem";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

const LOCAL_STORAGE_KEY = "sidebar-list-order";

const Lists = ({ userLists }) => {
  const { state } = useSidebar();
  const [searchValue, setSearchValue] = useState("");
  const [lists, setLists] = useState(userLists);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      const order = JSON.parse(stored);
      const ordered = order
        .map((id) => userLists.find((l) => l.id === id))
        .filter(Boolean);
      const remaining = userLists.filter((l) => !order.includes(l.id));

      const combined = [...ordered, ...remaining];
      if (order.length > 0) {
        setLists(combined);
      } else {
        console.warn("LocalStorage order mismatch. Falling back to userLists.");
        setLists(userLists);
      }
    } else {
      setLists(userLists);
    }
  }, [userLists]);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const filteredLists = lists.filter((l) => {
    return (
      typeof l?.title === "string" &&
      l.title.toLowerCase().includes(searchValue.toLowerCase())
    );
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Require 5px movement before drag starts
      },
    }),
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = lists.findIndex((item) => item.id === active.id);
      const newIndex = lists.findIndex((item) => item.id === over.id);
      const newOrder = arrayMove(lists, oldIndex, newIndex);
      setLists(newOrder);
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify(newOrder.map((l) => l.id)),
      );
    }
  };

  return (
    <SidebarGroup className="flex flex-col gap-3">
      <SidebarGroupLabel className="text-lg">Owned Lists</SidebarGroupLabel>

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
        </Link>
        <span className="sr-only">Create new list</span>
      </SidebarGroupAction>

      <SidebarGroupContent>
        <SidebarMenu>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={filteredLists.map((item) => item.id)}
              strategy={verticalListSortingStrategy}
            >
              {filteredLists.map((list) => {
                return (
                  <SortableListItem key={list.id} list={list} state={state} />
                );
              })}
            </SortableContext>
          </DndContext>

          <SidebarMenuItem className="cursor-pointer">
            <SidebarMenuButton className="text-sidebar-foreground/70">
              <Link
                href={`/dashboard/list`}
                className={cn(
                  "flex items-center gap-4",
                  state === "expanded" ? "w-full" : "",
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
