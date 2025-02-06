import { unstable_cache } from "next/cache";

import prisma from "lib/prisma";

import { Post } from "@/components";

export const Posts = async () => {
  const getPosts = () => {
    return prisma.post.findMany({
      where: { published: true },
      include: {
        author: {
          select: { name: true },
        },
      },
    });
  };
  const getCachedPost = unstable_cache(
    async () => await getPosts(),
    ["posts"],
    {
      revalidate: 10,
      tags: ["posts"],
    },
  );
  const posts = await getCachedPost();

  return (
    <>
      {posts.map((post) => (
        <div key={post.id}>
          <Post post={post} />
        </div>
      ))}
    </>
  );
};
