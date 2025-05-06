import prisma from "lib/prisma";

export const getUserGroups = (user) => {
  return prisma.list.findMany({
    where: {
      collaborators: {
        some: {
          id: user.id,
        },
      },
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
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
