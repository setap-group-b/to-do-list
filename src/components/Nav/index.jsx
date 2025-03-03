"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";

import SettingsDropdown from "./SettingsDropdown";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { CalendarDays, Clock, Search } from "lucide-react";

export const Nav = () => {
  const pathname = usePathname();
  return (
    <nav className="md:px-6 px-4 py-5 flex items-center justify-between gap-4 z-10 bg-sidebar shadow-[box-shadow:_rgba(33,_35,_38,_0.1)_0px_10px_10px_-10px]">
      <div className="flex items-center gap-2">
        <SidebarTrigger className={"size-8 text-lg"} />
        <Breadcrumb>
          <BreadcrumbList>
            {pathname
              .trim()
              .split("/")
              .map((path, i) => {
                if (!path && i > 0) return "";
                const href =
                  "/" +
                  pathname
                    .split("/")
                    .slice(1, i + 1)
                    .join("/");
                return (
                  <BreadcrumbItem className={"hidden md:block"} key={i}>
                    <BreadcrumbLink href={href}>
                      {path || "Home"}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                );
              })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative hidden md:flex items-center">
          <Search className="absolute left-3 h-4 w-4 text-indigo-500/70 dark:text-indigo-400/70" />
          <input
            type="text"
            placeholder="Search tasks..."
            className="h-9 w-[180px] rounded-full bg-indigo-50 dark:bg-indigo-900/30 border-none pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:focus:ring-indigo-600/50 placeholder:text-indigo-400/70 dark:placeholder:text-indigo-500/50"
          />
        </div>
        <SettingsDropdown />
      </div>
    </nav>
  );
};
