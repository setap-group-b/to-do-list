import { FaCircleCheck } from "react-icons/fa6";
import { TbProgressCheck } from "react-icons/tb";
import { capitalizeString } from "./functions";

export const localStorageFont = "fontSettings";
export const localStorageBoldness = "boldnessSettings";

export const status = ["PENDING", "IN_PROGRESS", "COMPLETED"];
export const statusIcons = {
  PENDING: "",
  IN_PROGRESS: <TbProgressCheck />,
  COMPLETED: <FaCircleCheck />,
};

export const statusObject = Object.fromEntries(
  status.map((val) => [
    val,
    capitalizeString(val.toLowerCase().replaceAll("_", " ")),
  ])
);

export const priority = ["HIGH", "MEDIUM", "LOW"];
export const priorityObject = Object.fromEntries(
  priority.map((val) => [
    val,
    capitalizeString(val.toLowerCase()) + " priority",
  ])
);
