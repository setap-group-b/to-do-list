"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { localStorageBoldness, localStorageFont } from "@/utils/constants";
import { useEffect } from "react";

export default function ThemeToggle({ className }) {
  const { setTheme } = useTheme();

  const baseFont = localStorage.getItem(localStorageFont);
  const baseBoldness = localStorage.getItem(localStorageBoldness);

  useEffect(() => {
    document.documentElement.style.fontSize = baseFont;
    document.documentElement.style.fontWeight = baseBoldness;
  }, [baseFont, baseBoldness]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className={className}>
          <MdOutlineLightMode className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MdDarkMode className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
