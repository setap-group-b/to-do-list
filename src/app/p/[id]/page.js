import prisma from "lib/prisma";

export default async function Page({ params }) {
  const slug = (await params).slug;
  const post = await prisma.post.findUnique({
    where: {
      id: String(slug?.id),
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  console.log(post);

  return <h1>{post}</h1>;
}
