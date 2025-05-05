import cron from "node-cron";
import { showNotification } from "./notification";

function getDateUnitValue(dateValue = "") {
  if (!dateValue) return "";
  const pad = (n) => n.toString().padStart(2, "0");
  const date = new Date(dateValue);
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const weekday = pad(date.getDay());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return { year, month, day, hours, minutes, weekday };
}

export const scheduleNotification = (notificationDate) => {
  const unitValues = getDateUnitValue(notificationDate);

  return cron.schedule(
    `${unitValues.minutes} ${unitValues.hours} ${unitValues.day} ${unitValues.month} ${unitValues.weekday}`,
    showNotification
  );
};
