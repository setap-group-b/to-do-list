import prisma from "lib/prisma";

export const getAllTasks = (user, isCompleted) => {
  return prisma.todo.findMany({
    where: {
      List: {
        OR: [{ userId: user.id }, { collaborators: { some: { id: user.id } } }],
      },
    },
  });
};
