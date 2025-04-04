import prisma from "lib/prisma";

export const getUserTodos = (user, listId) => {
  return prisma.todo.findMany({
    where: { User: user, listId: listId },
  });
};
