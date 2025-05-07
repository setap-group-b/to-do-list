import { getUserTodo } from "@/utils/getUserTodo";
import prisma from "../../lib/prisma";

// Mock prisma
jest.mock("../../lib/prisma", () => ({
  todo: {
    findUnique: jest.fn(),
  },
}));

describe("getUserTodo", () => {
  const mockUser = { id: "user-123", email: "test@example.com" };
  const mockTodoId = "todo-123";
  const mockListId = "list-123";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls prisma.todo.findUnique with the correct parameters", async () => {
    const mockTodo = {
      id: mockTodoId,
      title: "Test Todo",
      content: "Todo content",
    };
    prisma.todo.findUnique.mockResolvedValue(mockTodo);

    const result = await getUserTodo(mockUser, mockTodoId, mockListId);

    expect(prisma.todo.findUnique).toHaveBeenCalledWith({
      where: {
        List: {
          OR: [
            { userId: mockUser.id },
            { collaborators: { some: { id: mockUser.id } } },
          ],
        },
        id: mockTodoId,
        listId: mockListId,
      },
    });
    expect(result).toEqual(mockTodo);
  });

  it("returns null when todo is not found", async () => {
    prisma.todo.findUnique.mockResolvedValue(null);

    const result = await getUserTodo(mockUser, mockTodoId, mockListId);

    expect(result).toBeNull();
  });

  it("handles database errors", async () => {
    prisma.todo.findUnique.mockRejectedValue(new Error("Database error"));

    try {
      await getUserTodo(mockUser, mockTodoId, mockListId);
    } catch (error) {
      expect(error.message).toBe("Database error");
    }

    expect(prisma.todo.findUnique).toHaveBeenCalled();
  });
});
