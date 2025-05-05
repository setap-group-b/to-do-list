"use client";

import { LucideArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const PageHeader = ({ title }) => {
  const router = useRouter();
  return (
    <h1 className="flex items-center gap-3 capitalize">
      <button className="cursor-pointer" onClick={() => router.back()}>
        <LucideArrowLeft size={"20"} />
      </button>{" "}
      {title}
    </h1>
  );
};

export default PageHeader;
