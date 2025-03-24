import Lists from "./Lists";
import Groups from "./Groups";
import Sidebar from "./Sidebar";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import Link from "next/link";

const index = () => {
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

      <Lists />
      <Groups />
    </Sidebar>
  );
};

export default index;
