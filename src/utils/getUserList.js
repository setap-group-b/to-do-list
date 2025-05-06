import prisma from "lib/prisma";

export const getUserList = (user, listId) => {
  return prisma.list.findUnique({
    where: {
      user: user,
      id: listId,
    },
    include: {
      collaborators: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
    },
  });
};
