import prisma from "lib/prisma";

export const getUserTodo = (user, todoId, listId) => {
  return prisma.todo.findUnique({
    where: {
      List: {
        OR: [{ userId: user.id }, { collaborators: { some: { id: user.id } } }],
      },
      id: todoId,
      listId: listId,
    },
  });
};
