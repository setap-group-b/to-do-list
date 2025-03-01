import { cn } from "@/lib/utils";
import { FormLabel } from "./form";
import React, { useState } from "react";
import { Input as ShadcnInput } from "./input";
import ReusableInputLoader from "./ReusableInputLoader";
import { IoIosCloseCircle, IoIosSearch } from "react-icons/io";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const ReusableInput = (
  {
    labelClassName,
    inputUnitsClassName,
    containerClassName,
    removeFileInputUI,
    toggleVisibility,
    inputClassName,
    removeFile,
    isLoading,
    useFormLabel,
    className,
    showIcon,
    required,
    children,
    currency,
    label,
    value,
    type,
    icon,
    unit,
    ...props
  },
  ref
) => {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const togglePasswordVisibility = () => setPasswordIsVisible((prev) => !prev);

  return (
    <div className={cn("space-y-2 w-full text-base", containerClassName)}>
      {label &&
        (useFormLabel ? (
          <FormLabel
            htmlFor={props.id || props.name}
            className="text-base font-medium"
          >
            {label}
            {required ? "*" : ""}
          </FormLabel>
        ) : (
          <label
            htmlFor={props.id || props.name}
            className={`${labelClassName} text-base font-medium`}
          >
            {label}
            {required ? "*" : ""}
          </label>
        ))}
      <div className="relative">
        {isLoading ? (
          <ReusableInputLoader className="border p-4 rounded-md shadow-sm" />
        ) : (
          <>
            <ShadcnInput
              ref={ref}
              value={value}
              required={required}
              className={cn(
                "py-6 text-base mx-1",
                inputClassName,
                showIcon ? "pl-9" : "",
                unit ? "pr-16" : "",
                value && currency ? "pl-7" : ""
              )}
              type={(passwordIsVisible && "text") || type || "text"}
              {...props}
            />
            {showIcon ? (
              <span
                className={cn(
                  "absolute top-1/2 left-2 -translate-y-1/2",
                  inputUnitsClassName
                )}
              >
                {icon || <IoIosSearch size={"1.4rem"} />}
              </span>
            ) : (
              ""
            )}
            {children}
            {value && currency ? (
              <p
                className={cn(
                  "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500",
                  inputUnitsClassName
                )}
              >
                {currency}
              </p>
            ) : (
              ""
            )}
            {value && unit ? (
              <p
                className={cn(
                  "absolute right-2 top-1/2 -translate-y-1/2 text-gray-500",
                  inputUnitsClassName
                )}
              >
                {unit}
              </p>
            ) : (
              ""
            )}
            {removeFileInputUI ? (
              <IoIosCloseCircle
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
                onClick={removeFile}
                size="1.2rem"
              />
            ) : (
              ""
            )}
            {toggleVisibility && type === "password" && (
              <span
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                {passwordIsVisible ? (
                  <AiOutlineEye
                    className="text-gray-500 hover:text-gray-700"
                    size={18}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="text-gray-500 hover:text-gray-700"
                    size={18}
                  />
                )}
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ReusableInput;
