"use client";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { randomColor } from "@/utils/functions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserAvatar = ({ name, image, className }) => {
  const { theme } = useTheme();
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((value) => value[0].toUpperCase());
  const bgColor = randomColor(theme === "light");

  return (
    <Avatar className={cn("size-9", className)}>
      <AvatarImage src={image} alt="user avatar" />
      <AvatarFallback
        className={"bg-foreground font-medium"}
        style={{ backgroundColor: bgColor }}
      >
        {initials}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
