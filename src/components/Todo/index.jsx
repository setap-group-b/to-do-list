"use client";

import Link from "next/link";

export const Todo = ({ todo }) => {
  return (
    <Link
      href={{
        pathname: `/user/todo/${todo.id}`,
      }}
    >
      <h2>{todo.title}</h2>
    </Link>
  );
};
