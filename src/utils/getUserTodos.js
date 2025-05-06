import prisma from "lib/prisma";

export const getUserTodos = (user, listId) => {
  return prisma.todo.findMany({
    where: {
      listId: listId,
      List: {
        OR: [{ userId: user.id }, { collaborators: { some: { id: user.id } } }],
      },
    },
    orderBy: [
      {
        deadline: "asc",
      },
    ],
  });
};
