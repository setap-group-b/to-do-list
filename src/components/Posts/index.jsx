import { unstable_cache } from "next/cache";

import prisma from "lib/prisma";

import { Post } from "@/components";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api";

export const Posts = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <section>Please sign in to see your to-do's!</section>;
  }

  const getPosts = () => {
    return prisma.post.findMany({
      where: { author: session.user.name },
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
