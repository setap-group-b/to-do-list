import { NextResponse } from "next/server";
import { checkAndSendReminders } from "@/lib/reminderChecks";

export async function GET() {
  try {
    await checkAndSendReminders();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Cron job failed:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
