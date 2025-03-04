"use client";

import Link from "next/link";

export const List = ({ list }) => {
  return (
    <Link
      href={{
        pathname: `/list/${list.id}/todo`,
      }}
    >
      <h2>{list.title}</h2>
    </Link>
  );
};
