import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import Link from "next/link";
import { MoreHorizontal, Plus } from "lucide-react";
import ReusableButton from "../ui/ReusableButton";

const Lists = () => {
  const collections = [
    {
      name: "Home",
      icon: "🏠",
      noOfTasks: Math.trunc(Math.random() * 10),
      url: "",
    },
    {
      name: "Books to read",
      icon: "📚",
      noOfTasks: Math.trunc(Math.random() * 10),
      url: "",
    },
    {
      name: "Completed",
      icon: "✅",
      noOfTasks: Math.trunc(Math.random() * 10),
      url: "",
    },
    {
      name: "Workout",
      icon: "💪",
      noOfTasks: Math.trunc(Math.random() * 10),
      url: "",
    },
    {
      name: "Diet",
      icon: "🍽️",
      noOfTasks: Math.trunc(Math.random() * 10),
      url: "",
    },
    {
      name: "Road trip",
      icon: "🚗",
      noOfTasks: Math.trunc(Math.random() * 10),
      url: "",
    },
  ];

  return (
    <SidebarGroup className={"flex flex-col gap-3"}>
      <SidebarGroupLabel className={"text-lg"}>Lists</SidebarGroupLabel>
      <SidebarGroupAction title="Create new list">
        <Plus /> <span className="sr-only">Create new list</span>
      </SidebarGroupAction>
      <SidebarGroupContent>
        <SidebarMenu>
          {collections.map((collection) => {
            return (
              <SidebarMenuItem key={collection.name}>
                <SidebarMenuButton
                  size="l"
                  className={"p-2 flex items-center gap-4 justify-between"}
                >
                  <Link
                    href={collection.url}
                    className="flex items-center gap-4 w-full"
                  >
                    <span className="text-lg">{collection.icon}</span>
                    <span>{collection.name}</span>
                  </Link>
                  <span className="bg-accent p-2 rounded-sm h-5 w-6 flex items-center justify-center">
                    {collection.noOfTasks}
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
          {collections.length >= 6 && (
            <SidebarMenuItem className={"cursor-pointer"}>
              <SidebarMenuButton className="text-sidebar-foreground/70">
                <MoreHorizontal />
                <span>View all</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default Lists;
