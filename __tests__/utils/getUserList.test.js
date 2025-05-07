import { getUserList } from "@/utils/getUserList";
import prisma from "../../lib/prisma";

// Mock prisma
jest.mock("../../lib/prisma", () => ({
  list: {
    findUnique: jest.fn(),
  },
}));

describe("getUserList", () => {
  const mockUser = { id: "user-123", email: "test@example.com" };
  const mockListId = "list-123";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls prisma.list.findUnique with the correct parameters", async () => {
    const mockList = {
      id: mockListId,
      title: "Test List",
      collaborators: [
        { id: "user-456", name: "Collaborator", email: "collab@example.com" },
      ],
    };
    prisma.list.findUnique.mockResolvedValue(mockList);

    const result = await getUserList(mockUser, mockListId);

    expect(prisma.list.findUnique).toHaveBeenCalledWith({
      where: {
        user: mockUser,
        id: mockListId,
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
    expect(result).toEqual(mockList);
  });

  it("returns null when list is not found", async () => {
    prisma.list.findUnique.mockResolvedValue(null);

    const result = await getUserList(mockUser, mockListId);

    expect(result).toBeNull();
  });

  it("handles database errors", async () => {
    prisma.list.findUnique.mockRejectedValue(new Error("Database error"));

    try {
      await getUserList(mockUser, mockListId);
    } catch (error) {
      expect(error.message).toBe("Database error");
    }

    expect(prisma.list.findUnique).toHaveBeenCalled();
  });
});
