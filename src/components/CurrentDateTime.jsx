"use client";
import { dateFormatter } from "@/utils/functions";
import { useEffect, useState } from "react";

const CurrentDateTime = () => {
  const [dateTime, setDatetime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setDatetime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {dateFormatter(dateTime, {
        dateStyle: "medium",
        timeStyle: "short",
      })}
    </>
  );
};

export default CurrentDateTime;
