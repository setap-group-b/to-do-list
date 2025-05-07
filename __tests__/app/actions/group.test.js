import { createGroup, deleteGroup } from "@/app/actions/group";
import prisma from "../../../lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Mock the prisma client
jest.mock("../../../lib/prisma", () => ({
  user: {
    findMany: jest.fn(),
  },
  list: {
    update: jest.fn(),
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

describe("Group Actions", () => {
  const mockFormData = new FormData();
  const mockFormState = { errors: {} };

  beforeEach(() => {
    jest.clearAllMocks();
    mockFormData.append(
      "collaborators",
      JSON.stringify(["collaborator@example.com"])
    );
  });

  describe("createGroup", () => {
    it("adds collaborators to a list", async () => {
      prisma.user.findMany.mockResolvedValue([
        { id: "user-456", email: "collaborator@example.com" },
      ]);
      prisma.list.update.mockResolvedValue({ id: "list-123" });

      await createGroup("list-123", mockFormState, mockFormData);

      expect(prisma.user.findMany).toHaveBeenCalledWith({
        where: {
          email: { in: ["collaborator@example.com"] },
        },
      });
      expect(prisma.list.update).toHaveBeenCalledWith({
        where: {
          id: "list-123",
        },
        data: {
          collaborators: {
            set: [],
            connect: [{ id: "user-456" }],
          },
        },
      });
      expect(revalidatePath).toHaveBeenCalledWith(
        "/dashboard/list/list-123/todo"
      );
      expect(redirect).toHaveBeenCalledWith("/dashboard/list/list-123/todo");
    });

    it("returns error when collaborators are not found", async () => {
      prisma.user.findMany.mockResolvedValue([]);

      const result = await createGroup("list-123", mockFormState, mockFormData);

      expect(result).toHaveProperty("errors");
      expect(result.errors).toHaveProperty("collaborators");
      expect(result.errors.collaborators).toContain(
        "One or more of the collaborators were not found."
      );
    });

    it("handles database errors", async () => {
      prisma.user.findMany.mockResolvedValue([
        { id: "user-456", email: "collaborator@example.com" },
      ]);
      prisma.list.update.mockRejectedValue(new Error("Database error"));

      const result = await createGroup("list-123", mockFormState, mockFormData);

      expect(result).toHaveProperty("errors");
      expect(result.errors).toHaveProperty("_form");
      expect(result.errors._form).toContain("Database error");
    });

    it("validates collaborator emails", async () => {
      mockFormData.set("collaborators", JSON.stringify(["invalid-email"]));

      const result = await createGroup("list-123", mockFormState, mockFormData);

      expect(result).toHaveProperty("errors");
      expect(result.errors).toHaveProperty("collaborators");
    });
  });

  describe("deleteGroup", () => {
    it("removes all collaborators from a list", async () => {
      prisma.list.update.mockResolvedValue({ id: "list-123" });

      await deleteGroup("list-123");

      expect(prisma.list.update).toHaveBeenCalledWith({
        where: { id: "list-123", user: undefined },
        data: {
          collaborators: {
            set: [],
          },
        },
      });
      expect(revalidatePath).toHaveBeenCalledWith("/dashboard/group");
      expect(redirect).toHaveBeenCalledWith("/dashboard/group");
    });

    it("handles database errors", async () => {
      prisma.list.update.mockRejectedValue(new Error("Database error"));

      const result = await deleteGroup("list-123");

      expect(result).toHaveProperty("errors");
      expect(result.errors).toHaveProperty("_form");
      expect(result.errors._form).toContain("Database error");
    });
  });
});
