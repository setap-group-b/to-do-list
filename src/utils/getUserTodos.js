import prisma from "lib/prisma";

export const getUserTodos = (user) => {
  return prisma.todo.findMany({
    where: { user: user },
  });
};
