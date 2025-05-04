import Lists from "./Lists";
import Sidebar from "./Sidebar";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import Link from "next/link";
import ListItems from "./ListItems";
import Groups from "./Groups";
import { getServerSessionWrapper, getUserLists } from "@/utils";

const index = async () => {
  const session = await getServerSessionWrapper();
  const userLists = await getUserLists(session.user);

  console.log(userLists);

  return (
    <Sidebar>
      <SidebarMenu>
        <SidebarMenuItem className={"mx-3"}>
          <SidebarMenuButton
            size="lg"
            className={"p-2 flex items-center gap-4 justify-between"}
          >
            <Link
              href={`/dashboard/`}
              className="flex items-center gap-4 w-full capitalize"
            >
              <span className="text-xl">🏠</span>
              <span>Home</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
      <Lists userLists={userLists} />
      <Groups />
    </Sidebar>
  );
};

export default index;
