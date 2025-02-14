import prisma from "lib/prisma";

export const getUserTodo = (user, todoId) => {
  return prisma.todo.findUnique({
    where: {
      user: user,
      id: todoId,
    },
  });
};
