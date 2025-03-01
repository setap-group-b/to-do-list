import Spinner from "./spinner";
import { Button } from "./button";
import { cn } from "@/lib/utils";

const ReusableButton = ({
  children,
  title,
  className,
  disabled,
  isLoading,
  isBordered,
  isLightDanger,
  isDanger,
  variant,
  icon,
  iconPosition = "left",
  ...buttonProps
}) => {
  let buttonVariant = variant || "default";
  if (isDanger) buttonVariant = "destructive";
  if (isBordered) buttonVariant = "outline";
  if (isLightDanger) buttonVariant = "secondary";

  const buttonContent = (
    <>
      {isLoading ? (
        <Spinner size={"sm"} className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <>
          {icon && iconPosition === "left" && (
            <span className="mr-2">{icon}</span>
          )}

          {title || children}

          {icon && iconPosition === "right" && (
            <span className="ml-2">{icon}</span>
          )}
        </>
      )}
    </>
  );

  return (
    <Button
      className={cn(
        {
          "bg-red-600": isDanger,
          "bg-red-600/10 !text-pc4": isLightDanger,
          "border !text-foreground border-gray-300": isBordered,
        },
        "text-base font-semibold text-center rounded-lg font-inter leading-snug py-5 px-4",
        "inline-flex items-center justify-center",
        className
      )}
      disabled={disabled || isLoading}
      variant={buttonVariant}
      {...buttonProps}
    >
      {buttonContent}
    </Button>
  );
};

export default ReusableButton;
