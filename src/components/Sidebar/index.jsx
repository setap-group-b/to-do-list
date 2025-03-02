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
    <ShadSidebar className="!bg-white dark:!bg-gray-900 !border-r border-gray-100 dark:border-gray-800">
      <SidebarHeader
        className="flex flex-row items-center gap-4 justify-between p-5 border-b border-gray-100 dark:border-gray-800"
      >
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Private</h2>
        <button className="h-6 w-6 flex items-center justify-center text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
            <path d="M15 3h6v6M14 10l6.1-6.1M9 21H3v-6M10 14l-6.1 6.1"/>
          </svg>
        </button>
      </SidebarHeader>
      
      <SidebarContent className="px-3 py-4">
        <ul className="space-y-1">
          {categories.map((category) => (
            <li key={category.id}>
              <button
                onClick={() => setActiveCategory(category.id)}
                className={`w-full flex items-center justify-between px-2 py-2.5 rounded-lg transition-colors ${
                  activeCategory === category.id 
                    ? "bg-gray-100 dark:bg-gray-800" 
                    : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span 
                    className="h-5 w-5 rounded-md border-2 flex-shrink-0" 
                    style={{ borderColor: category.color }}
                  ></span>
                  <span className="text-gray-700 dark:text-gray-300">{category.name}</span>
                </div>
                <span className="text-gray-400 dark:text-gray-500 text-sm">{category.count}</span>
              </button>
            </li>
          ))}
        </ul>
        
        <div className="mt-2 px-2">
          <button className="w-full flex items-center gap-2 py-2.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
            <PlusIcon className="h-4 w-4" />
            <span>Create new list</span>
          </button>
        </div>
        
        <div className="mt-6 mb-2">
          <h3 className="px-2 text-base font-semibold text-gray-800 dark:text-white mb-3">Group</h3>
          <div className="grid grid-cols-2 gap-2">
            {groups.map((group) => (
              <div 
                key={group.id} 
                className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex justify-center mb-2">
                  <div className="relative h-12 w-12">
                    <div className="absolute h-7 w-7 rounded-full bg-orange-400 top-0 left-0"></div>
                    <div className="absolute h-7 w-7 rounded-full bg-pink-400 bottom-0 left-2"></div>
                    <div className="absolute h-7 w-7 rounded-full bg-blue-400 top-1 right-0"></div>
                    <div className="absolute h-7 w-7 rounded-full bg-green-400 bottom-1 right-1"></div>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">{group.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{group.people} People</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-3 px-2">
            <button className="w-full flex items-center gap-2 py-2.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
              <PlusIcon className="h-4 w-4" />
              <span>Create new group</span>
            </button>
          </div>
        </div>
      </SidebarContent>
      
      <SidebarRail className="!bg-gray-50 dark:!bg-gray-800/50" />
    </ShadSidebar>
  );
};

export default Sidebar;
