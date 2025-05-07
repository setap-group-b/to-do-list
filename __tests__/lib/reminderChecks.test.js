import { checkAndSendReminders } from "@/lib/reminderChecks";
import prisma from "../../lib/prisma";
import { sendReminder } from "../../lib/mailer";

// Mock prisma
jest.mock("../../lib/prisma", () => ({
  todo: {
    findMany: jest.fn(),
    update: jest.fn(),
  },
}));

// Mock mailer
jest.mock("../../lib/mailer", () => ({
  sendReminder: jest.fn(),
}));

describe("reminderChecks", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Mock Date.now to return a fixed date
    const mockDate = new Date("2023-01-01T12:00:00Z");
    jest.spyOn(global, "Date").mockImplementation(() => mockDate);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("sends reminders for todos with reminder dates today", async () => {
    const mockTodos = [
      {
        id: "todo-1",
        title: "Todo 1",
        reminderDate: new Date("2023-01-01T10:00:00Z"),
        status: "PENDING",
        remindedAt: null,
        List: {
          collaborators: [{ id: "user-2", email: "collaborator@example.com" }],
        },
        User: { id: "user-1", email: "owner@example.com" },
      },
    ];

    prisma.todo.findMany.mockResolvedValue(mockTodos);

    await checkAndSendReminders();

    expect(prisma.todo.findMany).toHaveBeenCalledWith({
      where: {
        reminderDate: expect.any(Object),
        status: { in: ["PENDING", "IN_PROGRESS"] },
        remindedAt: null,
      },
      include: {
        List: { include: { collaborators: true } },
        User: true,
      },
    });

    expect(sendReminder).toHaveBeenCalledWith(mockTodos[0], [
      { id: "user-2", email: "collaborator@example.com" },
      { id: "user-1", email: "owner@example.com" },
    ]);

    expect(prisma.todo.update).toHaveBeenCalledWith({
      where: { id: "todo-1" },
      data: {
        remindedAt: new Date("2023-01-01T10:00:00Z"),
      },
    });
  });

  it("does not send reminders for completed todos", async () => {
    prisma.todo.findMany.mockResolvedValue([]);

    await checkAndSendReminders();

    expect(sendReminder).not.toHaveBeenCalled();
    expect(prisma.todo.update).not.toHaveBeenCalled();
  });

  it("does not send reminders for todos that already have reminders sent", async () => {
    prisma.todo.findMany.mockResolvedValue([]);

    await checkAndSendReminders();

    expect(sendReminder).not.toHaveBeenCalled();
    expect(prisma.todo.update).not.toHaveBeenCalled();
  });
});
