// import { unstable_cache } from "next/cache";

import prisma from "lib/prisma";

export default async function UserTodo({ params }) {
  // TODO: add error handling for invald routes
  // TODO invalidate the cache with revalidate on edit
  const { id } = await params;
  const getUserTodo = () => {
    return prisma.todo.findUnique({
      where: {
        id: id,
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

  return (
    <>
      <h1>{userTodo.title}</h1>
      <p>{userTodo.content}</p>
    </>
  );
}
