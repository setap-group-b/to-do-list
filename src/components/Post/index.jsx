"use client";

import Link from "next/link";

export const Post = ({ post }) => {
  const authorName = post.author ? post.author.name : "Unknown author";
  return (
    <Link
      href={{
        pathname: `/p/${post.id}`,
      }}
    >
      <h2>{post.title}</h2>
      <small>By {authorName}</small>
    </Link>
  );
};
