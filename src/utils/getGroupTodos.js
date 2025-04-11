import prisma from "lib/prisma";

export const getGroupTodos = (user, listId) => {
  return prisma.todo.findMany({
    where: {
      listId: listId,
      list: {
        OR: [{ userId: userId }, { collaborators: { some: { id: user.id } } }],
      },
    },
  });
};
