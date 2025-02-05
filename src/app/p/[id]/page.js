import prisma from "lib/prisma";

export default async function Page({ params }) {
  // TODO: add error handling for invald routes
  const { id } = await params;
  const post = await prisma.post.findUnique({
    where: {
      id: id,
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  return (
    <>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>author: {post.author.name}</p>
    </>
  );
}
