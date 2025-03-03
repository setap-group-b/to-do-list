"use client";

import Logo from "../Logo";
import {
  Sidebar as ShadSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from "../ui/sidebar";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

const Sidebar = () => {
  const [activeCategory, setActiveCategory] = useState("home");

  // Categories with color coding similar to the reference image
  const categories = [
    { id: "home", name: "Home", color: "#f97316", count: 8 },
    { id: "completed", name: "Completed", color: "#6b7280", count: 16 },
    { id: "personal", name: "Personal", color: "#d946ef", count: 4 },
    { id: "work", name: "Study", color: "#3b82f6", count: 6 },
    { id: "diet", name: "Diet", color: "#eab308", count: 3 },
    { id: "books", name: "List of Books", color: "#22c55e", count: 8 },
    { id: "trips", name: "Road trip list", color: "#ef4444", count: 6 },
  ];

  // Study groups with avatars
  const groups = [
    { id: "mobal", name: "SETAP Project", people: 5, color: "#f97316" },
    { id: "futur", name: "Usability Project", people: 4, color: "#f472b6" },
  ];

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
