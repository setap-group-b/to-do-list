import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { ReactNode } from "react";

const ReusablePopover = ({
  actionsContainerClassName,
  actionClassName,
  className,
  children,
  actions,
  trigger,
}) => {
  return (
    <Popover>
      <PopoverTrigger
        asChild
        className={cn("w-max cursor-pointer", className)}
        onClick={(e) => e.stopPropagation()}
      >
        {trigger}
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className={cn("w-auto p-0", actionsContainerClassName)}
      >
        {children ||
          actions?.map((action, i) => {
            return (
              <div
                key={i}
                className={cn(
                  "p-4 cursor-pointer hover:bg-background text-[.95rem]",
                  actionClassName
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  action?.function && action?.function();
                }}
              >
                {action?.trigger || action?.label}
              </div>
            );
          })}
      </PopoverContent>
    </Popover>
  );
};

export default ReusablePopover;
