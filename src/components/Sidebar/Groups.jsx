"use client";
import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { cn } from "@/lib/utils";
import { MoreHorizontal, Plus } from "lucide-react";
import UserAvatar from "../UserAvatar";
import ReusableButton from "../ui/ReusableButton";

const Groups = () => {
  const groups = [
    {
      name: "Home",
      icon: "🏠",
      people: [
        // {
        //   name: "Alice Johnson",
        //   image: "https://example.com/images/alice.jpg",
        //   email: "alice@example.com",
        // },
        // {
        //   name: "Bob Smith",
        //   image: "https://example.com/images/bob.jpg",
        //   email: "bob@example.com",
        // },
        // {
        //   name: "Charlie Davis",
        //   image: "https://example.com/images/charlie.jpg",
        //   email: "charlie@example.com",
        // },
        // {
        //   name: "Diana Lopez",
        //   image: "https://example.com/images/diana.jpg",
        //   email: "diana@example.com",
        // },
        // {
        //   name: "Ethan Williams",
        //   image: "https://example.com/images/ethan.jpg",
        //   email: "ethan@example.com",
        // },
      ],
      url: "",
    },
    {
      name: "Books to read",
      icon: "📚",
      people: [
        {
          name: "Fiona Carter",
          image: "https://example.com/images/fiona.jpg",
          email: "fiona@example.com",
        },
        {
          name: "George Miller",
          image: "https://example.com/images/george.jpg",
          email: "george@example.com",
        },
        {
          name: "Hannah White",
          image: "https://example.com/images/hannah.jpg",
          email: "hannah@example.com",
        },
        {
          name: "Ian Brown",
          image: "https://example.com/images/ian.jpg",
          email: "ian@example.com",
        },
        {
          name: "Kevin Turner",
          image: "https://example.com/images/kevin.jpg",
          email: "kevin@example.com",
        },
        {
          name: "Lily Adams",
          image: "https://example.com/images/lily.jpg",
          email: "lily@example.com",
        },
        {
          name: "Mason Scott",
          image: "https://example.com/images/mason.jpg",
          email: "mason@example.com",
        },
        {
          name: "Jackie Wilson",
          image: "https://example.com/images/jackie.jpg",
          email: "jackie@example.com",
        },
      ],
      url: "",
    },
  ];

  return (
    <SidebarGroup className={"flex flex-col gap-3"}>
      <SidebarGroupLabel className={"text-lg"}>Groups</SidebarGroupLabel>

      <SidebarGroupContent>
        <SidebarMenu className={"grid grid-cols-2 gap-2"}>
          {groups.map((group) => {
            return (
              <SidebarMenuItem key={group.name} className={"h-full"}>
                <SidebarMenuButton
                  className={
                    "min-h-32 h-full gap-4 pt-5 pb-3 flex items-start flex-col overflow-hidden"
                  }
                >
                  {group.people.length ? (
                    <div className="flex flex-wrap items-center justify-center -space-x-2 mr-2">
                      {group.people.slice(0, 5).map((item, i) => {
                        return (
                          <UserAvatar
                            key={i}
                            className={cn(
                              "text-accent size-10",
                              i >= 3 ? "-mt-2.5" : ""
                            )}
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
                      <p>{group.icon}</p>
                      <p className="text-wrap line-clamp-1">{group.name}</p>
                    </span>
                    <p className="text-[.85rem] text-neutral-400">
                      {group.people.length} people{" "}
                    </p>
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
          {groups.length >= 2 && (
            <SidebarMenuItem className={"col-span-2"}>
              <SidebarMenuButton className="text-sidebar-foreground/70">
                <MoreHorizontal />
                <span>View More</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarGroupContent>
      <ReusableButton
        className={
          "rounded-xl gap-1 flex items-center justify-between text-sm bg-accent text-accent-foreground *:flex *:items-center *:gap-2 hover:bg-accent cursor-pointer"
        }
      >
        <span>
          <Plus />
          <p>Create new group</p>
        </span>

        <span>
          <p>⌘</p>
          <p>G</p>
        </span>
      </ReusableButton>
    </SidebarGroup>
  );
};

export default Groups;
