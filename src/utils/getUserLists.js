import prisma from "lib/prisma";

export const getUserLists = (user) => {
  return prisma.list.findMany({
    where: { user },
  });
};
