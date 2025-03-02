import Logo from "../Logo";
import {
  Sidebar as ShadSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "../ui/sidebar";
import Lists from "./Lists";
import Groups from "./Groups";

const Sidebar = () => {
  return (
    <ShadSidebar collapsible="icon" className={"shadow-lg !border-0 z-20"}>
      <SidebarHeader
        className={"flex flex-row items-center gap-4 pt-5 justify-between"}
      >
        <SidebarMenuButton size="lg" className="">
          <Logo className={"gap-4 ml-1"} />
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <Lists />
        <Groups />
      </SidebarContent>
      <SidebarRail />
    </ShadSidebar>
  );
};

export default Sidebar;
