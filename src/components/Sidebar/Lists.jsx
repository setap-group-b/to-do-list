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

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const LOCAL_STORAGE_KEY = "sidebar-list-order";

const SortableListItem = ({ list, state }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: list.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <SidebarMenuItem ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <SidebarMenuButton className="text-sidebar-foreground">
        <Link
          href={`/dashboard/list/${list.id}/todo`}
          className={cn("flex items-center gap-4", state === "expanded" ? "w-full" : "")}
        >
          <div
            className="h-2 w-2 rounded-full mr-2"
            style={{ backgroundColor: list.backgroundColour || "#999" }}
          />
          <span className="truncate">{list.title}</span>
          <span className="ml-auto bg-muted text-xs rounded px-2 py-0.5">
            {list.taskCount ?? 0}
          </span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

const Lists = ({ userLists }) => {
  const { state } = useSidebar();
  const [searchValue, setSearchValue] = useState("");
  const [lists, setLists] = useState(userLists);
  console.log("userLists:", userLists);
  console.log("First list structure:", userLists[0]);

useEffect(() => {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (stored) {
    const order = JSON.parse(stored);
    console.log("Loaded order from localStorage:", order);
    const ordered = order
      .map((id) => userLists.find((l) => l.id === id))
      .filter(Boolean);
    const remaining = userLists.filter((l) => !order.includes(l.id));

    const combined = [...ordered, ...remaining];
    if (combined.length > 0) {
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

  console.log("searchValue:", searchValue);
  console.log("lists:", lists);

  const filteredLists = lists.filter((l) => {
  console.log("Checking:", l.title);
  return (
    typeof l?.title === "string" &&
    l.title.toLowerCase().includes(searchValue.toLowerCase())
  );
});

  console.log("filteredLists:", filteredLists);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = lists.findIndex((item) => item.id === active.id);
      const newIndex = lists.findIndex((item) => item.id === over.id);
      const newOrder = arrayMove(lists, oldIndex, newIndex);
      setLists(newOrder);
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify(newOrder.map((l) => l.id))
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
          console.log("Rendering list item:", list);
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
          className={cn("flex items-center gap-4", state === "expanded" ? "w-full" : "")}
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
}
export default Lists;
