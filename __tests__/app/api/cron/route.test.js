import { GET } from "@/app/api/cron/route"
import { checkAndSendReminders } from "@/lib/reminderChecks"
import { NextResponse } from "next/server"

// Mock the reminderChecks module
jest.mock("@/lib/reminderChecks", () => ({
  checkAndSendReminders: jest.fn(),
}))

// Mock next/server
jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn((data) => data),
  },
}))

describe("Cron API Route", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("successfully runs the reminder check", async () => {
    checkAndSendReminders.mockResolvedValue(undefined)

    const response = await GET()

    expect(checkAndSendReminders).toHaveBeenCalled()
    expect(NextResponse.json).toHaveBeenCalledWith({ success: true })
  })

  it("handles errors during reminder check", async () => {
    const error = new Error("Failed to send reminders")
    checkAndSendReminders.mockRejectedValue(error)

    const response = await GET()

    expect(checkAndSendReminders).toHaveBeenCalled()
    expect(NextResponse.json).toHaveBeenCalledWith({ error: "Failed to send reminders" }, { status: 500 })
  })

  it("handles unknown errors during reminder check", async () => {
    checkAndSendReminders.mockRejectedValue("Unknown error")

    const response = await GET()

    expect(checkAndSendReminders).toHaveBeenCalled()
    expect(NextResponse.json).toHaveBeenCalledWith({ error: "Unknown error" }, { status: 500 })
  })
})
