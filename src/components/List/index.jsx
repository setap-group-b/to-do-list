"use client";

import Link from "next/link";

export const List = ({ list }) => {
  return (
    <Link
      href={{
        pathname: `/user/list/${list.id}`,
      }}
    >
      <h2>{list.title}</h2>
    </Link>
  );
};
