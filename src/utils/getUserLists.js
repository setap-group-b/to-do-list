import prisma from "lib/prisma";

export const getUserLists = (user) => {
  return prisma.list.findMany({
    where: {
      user: user,
    },
    include: {
      Todo: true,
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
