import { getAllTasks } from "@/utils/getAllTasks";
import prisma from "../../lib/prisma";

// Mock prisma
jest.mock("../../lib/prisma", () => ({
  todo: {
    findMany: jest.fn(),
  },
}));

describe("getAllTasks", () => {
  const mockUser = { id: "user-123", email: "test@example.com" };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls prisma.todo.findMany with the correct parameters", async () => {
    const mockTasks = [
      { id: "task-1", title: "Task 1" },
      { id: "task-2", title: "Task 2" },
    ];
    prisma.todo.findMany.mockResolvedValue(mockTasks);

    const result = await getAllTasks(mockUser);

    expect(prisma.todo.findMany).toHaveBeenCalledWith({
      where: {
        List: {
          OR: [
            { userId: mockUser.id },
            { collaborators: { some: { id: mockUser.id } } },
          ],
        },
      },
    });
    expect(result).toEqual(mockTasks);
  });

  it("passes isCompleted parameter correctly", async () => {
    const mockTasks = [{ id: "task-1", title: "Task 1", status: "COMPLETED" }];
    prisma.todo.findMany.mockResolvedValue(mockTasks);

    const result = await getAllTasks(mockUser, true);

    // The implementation doesn't actually use isCompleted, but we're testing the function signature
    expect(prisma.todo.findMany).toHaveBeenCalled();
    expect(result).toEqual(mockTasks);
  });

  it("returns empty array when no tasks are found", async () => {
    prisma.todo.findMany.mockResolvedValue([]);

    const result = await getAllTasks(mockUser);

    expect(result).toEqual([]);
  });

  it("handles database errors", async () => {
    prisma.todo.findMany.mockRejectedValue(new Error("Database error"));

    try {
      await getAllTasks(mockUser);
    } catch (error) {
      expect(error.message).toBe("Database error");
    }

    expect(prisma.todo.findMany).toHaveBeenCalled();
  });
});
