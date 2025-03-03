import prisma from "lib/prisma";

export const getUserTodo = (user, todoId, listId) => {
  return prisma.todo.findUnique({
    where: {
      user: user,
      id: todoId,
      listId: listId,
    },
  });
};
