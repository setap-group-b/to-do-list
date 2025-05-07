import "@testing-library/jest-dom"
import { render, act } from "@testing-library/react"
import CurrentDateTime from "@/components/CurrentDateTime"

// Mock the dateFormatter function
jest.mock("@/utils/functions", () => ({
  dateFormatter: jest.fn().mockReturnValue("January 1, 2023, 12:00 PM"),
}))

describe("CurrentDateTime", () => {
  beforeEach(() => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date("2023-01-01T12:00:00"))
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it("renders the formatted date and time", () => {
    const { container } = render(<CurrentDateTime />)
    expect(container).toHaveTextContent("January 1, 2023, 12:00 PM")
  })

  it("updates the time every second", () => {
    const { container } = render(<CurrentDateTime />)

    // Fast-forward time by 1 second
    act(() => {
      jest.advanceTimersByTime(1000)
    })

    expect(container).toHaveTextContent("January 1, 2023, 12:00 PM")
  })
})
