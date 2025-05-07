import { getUserGroups } from "@/utils/getUserGroups";
import prisma from "../../lib/prisma";

// Mock prisma
jest.mock("../../lib/prisma", () => ({
  list: {
    findMany: jest.fn(),
  },
}));

describe("getUserGroups", () => {
  const mockUser = { id: "user-123", email: "test@example.com" };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls prisma.list.findMany with the correct parameters", async () => {
    const mockGroups = [
      { id: "group-1", title: "Group 1" },
      { id: "group-2", title: "Group 2" },
    ];
    prisma.list.findMany.mockResolvedValue(mockGroups);

    const result = await getUserGroups(mockUser);

    expect(prisma.list.findMany).toHaveBeenCalledWith({
      where: {
        collaborators: {
          some: {
            id: mockUser.id,
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
    expect(result).toEqual(mockGroups);
  });

  it("returns empty array when no groups are found", async () => {
    prisma.list.findMany.mockResolvedValue([]);

    const result = await getUserGroups(mockUser);

    expect(result).toEqual([]);
  });

  it("handles database errors", async () => {
    prisma.list.findMany.mockRejectedValue(new Error("Database error"));

    try {
      await getUserGroups(mockUser);
    } catch (error) {
      expect(error.message).toBe("Database error");
    }

    expect(prisma.list.findMany).toHaveBeenCalled();
  });
});
