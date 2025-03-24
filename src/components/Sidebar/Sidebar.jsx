"use client";

import Logo from "../Logo";
import {
  Sidebar as ShadSidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from "../ui/sidebar";

const Sidebar = ({ children }) => {
  return (
    <ShadSidebar
      collapsible="icon"
      className={"shadow-lg  z-20 border-sidebar-accent"}
    >
      <SidebarHeader
        className={"flex flex-row items-center gap-4 pt-5 justify-between"}
      >
        <SidebarMenuButton size="lg" className="!bg-transparent">
          <Logo className={"gap-4 ml-1"} />
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>{children}</SidebarContent>

      <SidebarRail />
    </ShadSidebar>
  );
};

export default Sidebar;
