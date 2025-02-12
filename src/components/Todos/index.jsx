// import { unstable_cache } from "next/cache";
import { getServerSession } from "next-auth";

import prisma from "lib/prisma";
import { Todo } from "@/components";
import { authOptions } from "@/app/api";

export const Todos = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <section>Please sign in to see your to-do's!</section>;
  }

  const getTodos = () => {
    return prisma.todo.findMany({
      where: { user: session.user },
    });
  };

  // const getCachedTodos = unstable_cache(
  //   async () => await getTodos(),
  //   ["todos"],
  //   {
  //     revalidate: 10,
  //     tags: ["todos"],
  //   },
  // );

  const todos = await getTodos();

  return (
    <>
      {todos.map((todo) => (
        <div key={todo.id}>
          <Todo todo={todo} />
        </div>
      ))}
    </>
  );
};
