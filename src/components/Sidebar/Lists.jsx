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
import { getServerSessionWrapper, getUserLists } from "@/utils";

const Lists = async () => {
  const session = await getServerSessionWrapper();
  const userLists = await getUserLists(session.user);
  console.log({ userLists });

  return (
    <SidebarGroup className={"flex flex-col gap-3"}>
      <SidebarGroupLabel className={"text-lg"}>Lists</SidebarGroupLabel>
      <SidebarGroupAction title="Create new list">
        <Link href={"/dashboard/list/add"}>
          <Plus size={18} />
        </Link>{" "}
        <span className="sr-only">Create new list</span>
      </SidebarGroupAction>
      <SidebarGroupContent>
        <SidebarMenu>
          {userLists.slice(0, 5).map((list, idx) => {
            return (
              <SidebarMenuItem key={idx}>
                <SidebarMenuButton
                  size="l"
                  className={"p-2 flex items-center gap-4 justify-between"}
                >
                  <Link
                    href={`/dashboard/list/${list.id}/todo`}
                    className="flex items-center gap-4 w-full capitalize"
                  >
                    <span className="text-lg">✅</span>
                    <span>{list.title}</span>
                  </Link>
                  <span className="bg-accent p-2 rounded-sm h-5 w-6 flex items-center justify-center">
                    {list?.todo?.length || 0}
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}

          <SidebarMenuItem className={"cursor-pointer"}>
            <SidebarMenuButton className="text-sidebar-foreground/70">
              <Link
                href={`/dashboard/list`}
                className="flex items-center gap-4 w-full"
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
