import { createList, updateList, deleteList } from "@/app/actions/list";
import prisma from "../../../lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Mock the prisma client
jest.mock("../../../lib/prisma", () => ({
  list: {
    create: jest.fn(),
    update: jest.fn(),
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

describe("List Actions", () => {
  const mockFormData = new FormData();
  const mockFormState = { errors: {} };

  beforeEach(() => {
    jest.clearAllMocks();
    mockFormData.append("title", "Test List");
    mockFormData.append("background-colour", "#ff0000");
  });

  describe("createList", () => {
    it("creates a list with valid data", async () => {
      prisma.list.create.mockResolvedValue({
        id: "list-123",
        title: "Test List",
      });

      await createList(mockFormState, mockFormData);

      expect(prisma.list.create).toHaveBeenCalledWith({
        data: {
          title: "Test List",
          backgroundColour: "#ff0000",
          user: { connect: { email: "test@example.com" } },
        },
      });
      expect(revalidatePath).toHaveBeenCalledWith("/dashboard/list");
      expect(redirect).toHaveBeenCalledWith("/dashboard/list");
    });

    it("returns validation errors for invalid data", async () => {
      const emptyFormData = new FormData();

      const result = await createList(mockFormState, emptyFormData);

      expect(result).toHaveProperty("errors");
      expect(prisma.list.create).not.toHaveBeenCalled();
    });

    it("handles database errors", async () => {
      prisma.list.create.mockRejectedValue(new Error("Database error"));

      const result = await createList(mockFormState, mockFormData);

      expect(result).toHaveProperty("errors");
      expect(Array.isArray(result.errors)).toBe(true);
      expect(result.errors).toContain("Database error");
    });

    it("returns early when no session is available", async () => {
      const { getServerSessionWrapper } = require("@/utils");
      getServerSessionWrapper.mockResolvedValueOnce(null);

      await createList(mockFormState, mockFormData);

      expect(prisma.list.create).not.toHaveBeenCalled();
    });
  });

  describe("updateList", () => {
    it("updates a list with valid data", async () => {
      prisma.list.update.mockResolvedValue({
        id: "list-123",
        title: "Updated List",
      });

      await updateList("list-123", mockFormState, mockFormData);

      expect(prisma.list.update).toHaveBeenCalledWith({
        where: { id: "list-123", user: expect.any(Object) },
        data: {
          title: "Test List",
          backgroundColour: "#ff0000",
          user: { connect: { email: "test@example.com" } },
        },
      });
      expect(revalidatePath).toHaveBeenCalledWith(
        "/dashboard/list/list-123/todo"
      );
      expect(redirect).toHaveBeenCalledWith("/dashboard/list/list-123/todo");
    });

    it("returns validation errors for invalid data", async () => {
      const emptyFormData = new FormData();

      const result = await updateList("list-123", mockFormState, emptyFormData);

      expect(result).toHaveProperty("errors");
      expect(prisma.list.update).not.toHaveBeenCalled();
    });

    it("handles database errors", async () => {
      prisma.list.update.mockRejectedValue(new Error("Database error"));

      const result = await updateList("list-123", mockFormState, mockFormData);
      expect(result).toHaveProperty("errors");
      expect(Array.isArray(result.errors)).toBe(true);
      expect(result.errors).toContain("Database error");
    });
  });

  describe("deleteList", () => {
    it("deletes a list", async () => {
      prisma.list.delete.mockResolvedValue({ id: "list-123" });

      await deleteList("list-123");

      expect(prisma.list.delete).toHaveBeenCalledWith({
        where: { id: "list-123", user: undefined },
      });
      expect(revalidatePath).toHaveBeenCalledWith("/dashboard/list");
      expect(redirect).toHaveBeenCalledWith("/dashboard/list");
    });

    it("handles database errors", async () => {
      prisma.list.delete.mockRejectedValue(new Error("Database error"));

      const result = await deleteList("list-123");
      expect(result).toHaveProperty("errors");
      expect(Array.isArray(result.errors)).toBe(true);
      expect(result.errors).toContain("Database error");
    });
  });
});
