// import { unstable_cache } from "next/cache";
import { authOptions } from "@/app/api";
import { getServerSession } from "next-auth";

import prisma from "lib/prisma";

export default async function UserTodo({ params }) {
  // TODO: add error handling for invald routes
  // TODO invalidate the cache with revalidate on edit
  const session = await getServerSession(authOptions);

  if (!session) {
    return <section>Please sign in!</section>;
  }

  const { id } = await params;

  const getUserTodo = () => {
    return prisma.todo.findUnique({
      where: {
        id: id,
        user: session.user,
      },
    });
  };

  // const getCachedUserTodo = unstable_cache(
  //   async () => await getUserTodo(),
  //   ["todo"],
  //   {
  //     revalidate: 10,
  //     tags: ["todo"],
  //   },
  // );

  const userTodo = await getUserTodo();

  if (!userTodo) {
    return <>Not found!</>;
  }

  return (
    <>
      <h1>{userTodo.title}</h1>
      <p>{userTodo.content}</p>
    </>
  );
}
