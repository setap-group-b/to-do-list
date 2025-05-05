"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import SettingsDropdown from "./SettingsDropdown";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { CalendarDays, Clock, Search } from "lucide-react";
import { Fragment } from "react";

export const Nav = () => {
  const pathname = usePathname();
  const pathList = pathname.trim().split("/");
  return (
    <nav className="md:px-6 px-4 py-5 flex items-center justify-between gap-4 z-10 bg-sidebar shadow-[box-shadow:_rgba(33,_35,_38,_0.1)_0px_10px_10px_-10px]">
      <div className="flex items-center gap-2">
        <SidebarTrigger className={"sm:size-8 text-lg"} />
        <Breadcrumb>
          <BreadcrumbList className={"hidden md:flex"} key={"list"}>
            {pathList.map((path, i) => {
              if (
                (!path && i > 0) ||
                ["list", "group", "todo"].includes(
                  (pathList[i - 1] || "").toLowerCase()
                )
              )
                return "";
              const href = "/" + pathList.slice(1, i + 1).join("/");
              return (
                <Fragment key={i}>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem className={"hidden md:block"}>
                    <BreadcrumbLink href={href} className={"capitalize"}>
                      {path || "Home"}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex items-center gap-4">
        <SettingsDropdown />
      </div>
    </nav>
  );
};
