import prisma from "lib/prisma";

export const getUserGroup = (user, listId) => {
  return prisma.list.findUnique({
    where: {
      collaborators: {
        some: {
          id: user.id,
        },
      },
      id: listId,
    },
  });
};
