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
        <SettingsDropdown />
      </div>
    </nav>
  );
};
