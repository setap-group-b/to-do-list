import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import Link from "next/link";
import { cn } from "@/lib/utils";

import { useSortable } from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

export const SortableListItem = ({ list, state }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: list.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <SidebarMenuItem
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <SidebarMenuButton className="text-sidebar-foreground">
        {!isDragging && (
          <Link
            href={`/dashboard/list/${list.id}/todo`}
            className={cn(
              "flex items-center gap-4",
              state === "expanded" ? "w-full" : ""
            )}
          >
            <div
              className="h-2 w-2 rounded-full mr-2"
              style={{ backgroundColor: list.backgroundColour || "#999" }}
            />
            <span className="truncate">{list.title}</span>
            <span className="ml-auto bg-muted text-xs rounded px-2 py-0.5">
              {list?.Todo?.length || 0}
            </span>
          </Link>
        )}
        {isDragging && (
          <div
            className={cn(
              "flex items-center gap-4 pointer-events-none",
              state === "expanded" ? "w-full" : ""
            )}
          >
            <div
              className="h-2 w-2 rounded-full mr-2"
              style={{ backgroundColor: list.backgroundColour || "#999" }}
            />
            <span className="truncate">{list.title}</span>
            <span className="ml-auto bg-muted text-xs rounded px-2 py-0.5">
              {list?.Todo?.length || 0}
            </span>
          </div>
        )}
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
