import { getUserGroup } from "@/utils/getUserGroup";
import prisma from "../../lib/prisma";

// Mock prisma
jest.mock("../../lib/prisma", () => ({
  list: {
    findUnique: jest.fn(),
  },
}));

describe("getUserGroup", () => {
  const mockUser = { id: "user-123", email: "test@example.com" };
  const mockListId = "list-123";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls prisma.list.findUnique with the correct parameters", async () => {
    const mockGroup = { id: mockListId, title: "Test Group" };
    prisma.list.findUnique.mockResolvedValue(mockGroup);

    const result = await getUserGroup(mockUser, mockListId);

    expect(prisma.list.findUnique).toHaveBeenCalledWith({
      where: {
        collaborators: {
          some: {
            id: mockUser.id,
          },
        },
        id: mockListId,
      },
    });
    expect(result).toEqual(mockGroup);
  });

  it("returns null when group is not found", async () => {
    prisma.list.findUnique.mockResolvedValue(null);

    const result = await getUserGroup(mockUser, mockListId);

    expect(result).toBeNull();
  });

  it("handles database errors", async () => {
    prisma.list.findUnique.mockRejectedValue(new Error("Database error"));

    try {
      await getUserGroup(mockUser, mockListId);
    } catch (error) {
      expect(error.message).toBe("Database error");
    }

    expect(prisma.list.findUnique).toHaveBeenCalled();
  });
});
