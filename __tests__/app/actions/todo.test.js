import {
  createTodo,
  updateTodo,
  updateTodoStatus,
  deleteTodo,
} from "@/app/actions/todo";
import prisma from "../../../lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Mock the prisma client
jest.mock("../../../lib/prisma", () => ({
  todo: {
    create: jest.fn(),
    update: jest.fn(),
    findUnique: jest.fn(),
    delete: jest.fn(),
  },
}));

// Mock next/cache and next/navigation
jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

// Mock getServerSessionWrapper
jest.mock("@/utils", () => ({
  getServerSessionWrapper: jest.fn().mockResolvedValue({
    user: { id: "user-123", email: "test@example.com" },
  }),
}));

// Mock getNotificationDate and capitalizeString
jest.mock("@/utils/functions", () => ({
  ...jest.requireActual("@/utils/functions"),
  getNotificationDate: jest.fn().mockReturnValue(new Date("2023-01-01")),
  capitalizeString: jest.fn((str) => {
    return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalizes the first letter of each word
  }),
}));

describe("Todo Actions", () => {
  const mockFormData = new FormData();
  const mockFormState = { errors: {} };

  beforeEach(() => {
    jest.clearAllMocks();
    mockFormData.append("title", "Test Todo");
    mockFormData.append("content", "Todo description");
    mockFormData.append("priority", "HIGH");
    mockFormData.append("status", "PENDING");
    mockFormData.append("deadline", "2023-12-31T23:59:59");
    mockFormData.append("notification", "1 day");
  });

  describe("createTodo", () => {
    it("creates a todo with valid data", async () => {
      prisma.todo.create.mockResolvedValue({
        id: "todo-123",
        title: "Test Todo",
      });

      await createTodo("list-123", "list", mockFormState, mockFormData);

      expect(prisma.todo.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          title: "Test Todo",
          content: "Todo description",
          priority: "HIGH",
          status: "PENDING",
          reminderDate: expect.any(Date),
          List: { connect: { id: "list-123" } },
          User: { connect: { email: "test@example.com" } },
        }),
      });
      expect(revalidatePath).toHaveBeenCalledWith(
        "/dashboard/list/list-123/todo"
      );
      expect(redirect).toHaveBeenCalledWith("/dashboard/list/list-123/todo");
    });

    it("returns validation errors for invalid data", async () => {
      const emptyFormData = new FormData();
      emptyFormData.append("priority", "INVALID");

      const result = await createTodo(
        "list-123",
        "list",
        mockFormState,
        emptyFormData
      );

      expect(result).toHaveProperty("errors");
      expect(prisma.todo.create).not.toHaveBeenCalled();
    });

    it("handles database errors", async () => {
      prisma.todo.create.mockRejectedValue(new Error("Database error"));

      const result = await createTodo(
        "list-123",
        "list",
        mockFormState,
        mockFormData
      );

      expect(result).toHaveProperty("success", false);
      expect(result).toHaveProperty("errors");
      expect(result.errors).toContain("Database error");
    });
  });

  describe("updateTodo", () => {
    beforeEach(() => {
      prisma.todo.findUnique.mockResolvedValue({
        id: "todo-123",
        title: "Old Title",
        deadline: new Date("2023-01-01"),
      });
    });

    it("updates a todo with valid data", async () => {
      prisma.todo.update.mockResolvedValue({
        id: "todo-123",
        title: "Test Todo",
      });

      await updateTodo(
        "todo-123",
        "list-123",
        "list",
        mockFormState,
        mockFormData
      );

      expect(prisma.todo.update).toHaveBeenCalledWith({
        where: { id: "todo-123", user: undefined },
        data: {
          title: "Test Todo",
          content: "Todo description",
          priority: "HIGH",
          status: "PENDING",
          notification: "1 day",
          deadline: new Date("2023-12-31T23:59:59"),
          reminderDate: expect.any(Date),
          remindedAt: null,
        },
      });
      expect(revalidatePath).toHaveBeenCalledWith(
        "/dashboard/list/list-123/todo"
      );
      expect(redirect).toHaveBeenCalledWith("/dashboard/list/list-123/todo");
    });

    it("returns validation errors for invalid data", async () => {
      const emptyFormData = new FormData();
      emptyFormData.append("priority", "INVALID");

      const result = await updateTodo(
        "todo-123",
        "list-123",
        "list",
        mockFormState,
        emptyFormData
      );

      expect(result).toHaveProperty("errors");
      expect(prisma.todo.update).not.toHaveBeenCalled();
    });

    it("handles database errors", async () => {
      prisma.todo.update.mockRejectedValue(new Error("Database error"));

      const result = await updateTodo(
        "todo-123",
        "list-123",
        "list",
        mockFormState,
        mockFormData
      );

      expect(result).toHaveProperty("success", false);
      expect(result).toHaveProperty("errors");
      expect(result.errors).toContain("Database error");
    });

    it("throws an error when todo is not found", async () => {
      prisma.todo.findUnique.mockResolvedValue(null);

      const result = await updateTodo(
        "todo-123",
        "list-123",
        "list",
        mockFormState,
        mockFormData
      );

      expect(result).toHaveProperty("success", false);
      expect(result.errors).toContain("Todo not found");
    });
  });

  describe("updateTodoStatus", () => {
    it("updates a todo status", async () => {
      prisma.todo.update.mockResolvedValue({
        id: "todo-123",
        status: "COMPLETED",
      });

      await updateTodoStatus("todo-123", "list-123", "list", "COMPLETED");

      expect(prisma.todo.update).toHaveBeenCalledWith({
        where: { id: "todo-123", user: undefined },
        data: { status: "COMPLETED" },
      });
      expect(revalidatePath).toHaveBeenCalledWith(
        "/dashboard/list/list-123/todo"
      );
    });

    it("handles database errors", async () => {
      prisma.todo.update.mockRejectedValue(new Error("Database error"));

      const result = await updateTodoStatus(
        "todo-123",
        "list-123",
        "list",
        "COMPLETED"
      );

      expect(result).toHaveProperty("success", false);
      expect(result).toHaveProperty("errors");
      expect(result.errors).toContain("Database error");
    });
  });

  describe("deleteTodo", () => {
    it("deletes a todo", async () => {
      prisma.todo.delete.mockResolvedValue({ id: "todo-123" });

      await deleteTodo("todo-123", "list-123", "list");

      expect(prisma.todo.delete).toHaveBeenCalledWith({
        where: { id: "todo-123", user: undefined },
      });
      expect(revalidatePath).toHaveBeenCalledWith(
        "/dashboard/list/list-123/todo"
      );
      expect(redirect).toHaveBeenCalledWith("/dashboard/list/list-123/todo");
    });

    it("handles database errors", async () => {
      prisma.todo.delete.mockRejectedValue(new Error("Database error"));

      const result = await deleteTodo("todo-123", "list-123", "list");

      expect(result).toHaveProperty("success", false);
      expect(result).toHaveProperty("errors");
      expect(result.errors).toContain("Database error");
    });
  });
});
