import prisma from "lib/prisma";
import { sendReminder } from "lib/mailer";

export async function checkAndSendReminders() {
  const now = new Date();
  const start = new Date(now.setHours(0, 0, 0, 0));
  const end = new Date(now.setHours(23, 59, 59, 999));

  const reminders = await prisma.todo.findMany({
    where: {
      reminderDate: { gte: start, lte: end },
      status: { in: ["PENDING", "IN_PROGRESS"] },
      remindedAt: null,
    },
    include: {
      List: { include: { collaborators: true } },
      User: true,
    },
  });

  for (const reminder of reminders) {
    await sendReminder(reminder, [
      ...(reminder.List.collaborators || []),
      reminder.User,
    ]);
    await prisma.todo.update({
      where: { id: reminder.id },
      data: { remindedAt: new Date() },
    });
  }
}
