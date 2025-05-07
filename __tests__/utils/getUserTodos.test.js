import { getUserTodos } from "@/utils/getUserTodos";
import prisma from "../../lib/prisma";

// Mock prisma
jest.mock("../../lib/prisma", () => ({
  todo: {
    findMany: jest.fn(),
  },
}));

describe("getUserTodos", () => {
  const mockUser = { id: "user-123", email: "test@example.com" };
  const mockListId = "list-123";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls prisma.todo.findMany with the correct parameters", async () => {
    const mockTodos = [
      { id: "todo-1", title: "Todo 1" },
      { id: "todo-2", title: "Todo 2" },
    ];
    prisma.todo.findMany.mockResolvedValue(mockTodos);

    const result = await getUserTodos(mockUser, mockListId);

    expect(prisma.todo.findMany).toHaveBeenCalledWith({
      where: {
        listId: mockListId,
        List: {
          OR: [
            { userId: mockUser.id },
            { collaborators: { some: { id: mockUser.id } } },
          ],
        },
      },
      orderBy: [
        {
          deadline: "asc",
        },
      ],
    });
    expect(result).toEqual(mockTodos);
  });

  it("returns empty array when no todos are found", async () => {
    prisma.todo.findMany.mockResolvedValue([]);

    const result = await getUserTodos(mockUser, mockListId);

    expect(result).toEqual([]);
  });

  it("handles database errors", async () => {
    prisma.todo.findMany.mockRejectedValue(new Error("Database error"));

    try {
      await getUserTodos(mockUser, mockListId);
    } catch (error) {
      expect(error.message).toBe("Database error");
    }

    expect(prisma.todo.findMany).toHaveBeenCalled();
  });
});
