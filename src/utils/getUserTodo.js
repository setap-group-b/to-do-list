import prisma from "lib/prisma";

export const getUserTodo = (user, todoId, listId) => {
  return prisma.todo.findUnique({
    where: {
      User: user,
      id: todoId,
      listId: listId,
    },
  });
};
