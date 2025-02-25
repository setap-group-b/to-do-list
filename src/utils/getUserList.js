import prisma from "lib/prisma";

export const getUserList = (user, listId) => {
  return prisma.list.findUnique({
    where: {
      user: user,
      id: listId,
    },
  });
};
