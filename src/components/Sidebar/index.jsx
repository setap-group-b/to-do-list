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
    <ShadSidebar
      collapsible="icon"
      className={"!bg-background shadow-lg !border-0"}
    >
      <SidebarHeader
        className={"flex flex-row items-center gap-4 justify-between"}
      >
        <SidebarMenuButton size="lg" className="">
          <Logo className={"text-base gap-2"} />
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
