import { unstable_cache } from "next/cache";

import prisma from "lib/prisma";

export default async function Page({ params }) {
  // TODO: add error handling for invald routes
  // TODO invalidate the cache with revalidate on edit
  const { id } = await params;
  const getPost = () => {
    return prisma.post.findUnique({
      where: {
        id: id,
      },
      include: {
        author: {
          select: { name: true },
        },
      },
    });
  };

  const getCachedPost = unstable_cache(async () => await getPost(), ["post"], {
    revalidate: 3600,
    tags: ["post"],
  });
  const post = await getCachedPost();

  return (
    <>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>author: {post.author.name}</p>
    </>
  );
}
