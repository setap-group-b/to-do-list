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
  
  // Get current date in a student-friendly format
  const today = new Date();
  const options = { weekday: 'long', month: 'short', day: 'numeric' };
  const formattedDate = today.toLocaleDateString('en-US', options);
  
  return (
    <div className="p-4 flex items-center justify-between gap-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md border-b border-indigo-100 dark:border-indigo-900/40 rounded-b-xl">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="size-9 text-lg md:hidden bg-indigo-100 dark:bg-indigo-900/50 hover:bg-indigo-200 dark:hover:bg-indigo-800/70 text-indigo-700 dark:text-indigo-300 rounded-xl hover:scale-105 transition-all" />
        
        <div className="hidden md:flex items-center gap-2 text-indigo-700 dark:text-indigo-300">
          <CalendarDays className="h-4 w-4" />
          <span className="text-sm font-medium">{formattedDate}</span>
        </div>
        
        <div className="hidden md:flex h-5 w-px bg-indigo-200 dark:bg-indigo-800 mx-1"></div>
        
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
                  <BreadcrumbItem className="hidden md:flex" key={i}>
                    <BreadcrumbLink 
                      href={href}
                      className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors font-medium"
                    >
                      {path || "Dashboard"}
                    </BreadcrumbLink>
                    {i < pathname.trim().split("/").length - 1 && (
                      <span className="mx-2 text-indigo-400/60 dark:text-indigo-600/60">/</span>
                    )}
                  </BreadcrumbItem>
                );
              })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      <div className="flex items-center gap-3">
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
    </div>
  );
};
