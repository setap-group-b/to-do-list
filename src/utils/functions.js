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
