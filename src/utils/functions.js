export function randomColor(isLightMode) {
  const random = () =>
    isLightMode
      ? Math.floor(Math.random() * 100)
      : Math.floor(Math.random() * 106) + 150;
  const r = random();
  const g = random();
  const b = random();

  return `#${r.toString(16).padStart(2, "0")}${g
    .toString(16)
    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

export function dateFormatter(date, options) {
  let value = "";
  const dateValue = typeof date === "string" ? new Date(date) : date;
  try {
    const formatter = new Intl.DateTimeFormat("en-GB", {
      dateStyle: "full",
      timeStyle: "medium",

      ...options,
    });
    value = formatter.format(dateValue);
  } catch (error) {}
  return value;
}

export const capitalizeString = (value) => {
  return value && value.length > 0
    ? value[0].toUpperCase().concat(value.slice(1))
    : value;
};

export const modifyOptions = (arr, label) => {
  return arr?.map((value) => ({
    label: capitalizeString(label || value),
    value,
  }));
};

export const getNotificationDate = (deadlineDate, option) => {
  if (!deadlineDate || !option) return null;

  const deadline = new Date(deadlineDate);
  const notification = new Date(deadline);
  const today = new Date();

  switch (option.toLowerCase()) {
    case "1 day":
      notification.setDate(deadline.getDate() - 1);
      break;
    case "1 week":
      notification.setDate(deadline.getDate() - 7);
      break;
    case "1 month":
      notification.setMonth(deadline.getMonth() - 1);
      break;
    default:
      return null;
  }

  // If notification date is in the past, set it to today
  if (notification < today) {
    return today;
  }

  return notification;
};
