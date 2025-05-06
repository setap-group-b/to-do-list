import nodemailer from "nodemailer";
import { dateFormatter } from "@/utils/functions";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendReminder = async (task, list) => {
  const recipients = list.map((user) => user.email);
  console.log({ recipients, task, mailer: process.env.EMAIL_FROM });
  const date = dateFormatter(task.deadline, {
    timeStyle: "short",
    hour12: false,
  });
  await transporter.sendMail({
    from: `"To-do-list" <${process.env.EMAIL_FROM}>`,
    to: recipients.join(", "),
    subject: `⏰ Reminder: ${task.title} - Deadline on ${date}`,
    text: `Hi ${task.User.name},

This is a friendly reminder that your upcoming deadline is on ${date}.
    ${task.content ? `Details: ${task.content}\n\n` : ""}

You asked to be notified ${
      task.notification
    } in advance, so we're sending this now to help you stay on track.

Best of luck!

Warm regards,
To-do-list Team`,
  });
};
