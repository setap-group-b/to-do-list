"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import SettingsDropdown from "./SettingsDropdown";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

export const Nav = () => {
  const pathname = usePathname();
  return (
    <div className="p-4 flex items-center justify-between gap-4 shadow-lg bg-sidebar">
      <div className="flex items-center gap-2">
        <SidebarTrigger className={"size-8 text-lg md:hidden"} />
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
        <SettingsDropdown />
      </div>
    </div>
  );
};
