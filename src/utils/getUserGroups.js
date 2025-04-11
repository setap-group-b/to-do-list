import prisma from "lib/prisma";

export const getUserGroups = (user) => {
  return prisma.group.findMany({
    where: {
      OR: [
        { ownerId: user.id },
        {
          members: {
            some: {
              userId: user.id,
            },
          },
        },
      ],
    },
    include: {
      members: true,
      lists: true,
    },
  });
};
