import { getUserLists } from "@/utils/getUserLists";
import prisma from "../../lib/prisma";

// Mock prisma
jest.mock("../../lib/prisma", () => ({
  list: {
    findMany: jest.fn(),
  },
}));

describe("getUserLists", () => {
  const mockUser = { id: "user-123", email: "test@example.com" };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls prisma.list.findMany with the correct parameters", async () => {
    const mockLists = [
      { id: "list-1", title: "List 1" },
      { id: "list-2", title: "List 2" },
    ];
    prisma.list.findMany.mockResolvedValue(mockLists);

    const result = await getUserLists(mockUser);

    expect(prisma.list.findMany).toHaveBeenCalledWith({
      where: {
        user: mockUser,
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
    expect(result).toEqual(mockLists);
  });

  it("returns empty array when no lists are found", async () => {
    prisma.list.findMany.mockResolvedValue([]);

    const result = await getUserLists(mockUser);

    expect(result).toEqual([]);
  });

  it("handles database errors", async () => {
    prisma.list.findMany.mockRejectedValue(new Error("Database error"));

    try {
      await getUserLists(mockUser);
    } catch (error) {
      expect(error.message).toBe("Database error");
    }

    expect(prisma.list.findMany).toHaveBeenCalled();
  });
});
