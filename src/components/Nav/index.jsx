"use client";

import ThemeToggle from "../ThemeToggle";
import SettingsDropdown from "./SettingsDropdown";
import { SidebarTrigger } from "@/components/ui/sidebar";

export const Nav = () => {
  return (
    <div className="p-4 flex items-center justify-between gap-4 shadow-lg bg-sidebar">
      <div className="flex items-center gap-2">
        <SidebarTrigger className={"size-8 text-lg"} />
        {/* <BreadCrumb className="sm:block hidden" /> */}
      </div>
      <div className="flex items-center gap-4">
        <SettingsDropdown />
      </div>
    </div>
  );
};
