import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import ListItem from "@/components/ListItem"

// Mock the TaskStatusButton component
jest.mock("@/components/TaskStatusButton", () => {
  return function MockTaskStatusButton() {
    return <div data-testid="task-status-button" />
  }
})

describe("ListItem", () => {
  const mockTask = {
    id: "task-123",
    title: "Test Task",
    priority: "HIGH",
    deadline: new Date("2023-12-31T23:59:59").toISOString(),
    status: "PENDING",
  }

  it("renders the task title", () => {
    render(<ListItem task={mockTask} />)

    const title = screen.getByText("Test Task")
    expect(title).toBeInTheDocument()
  })

  it("renders the deadline information", () => {
    render(<ListItem task={mockTask} />)

    // Check for the deadline text (partial match since formatting may vary)
    const deadline = screen.getByText(/Due:/)
    expect(deadline).toBeInTheDocument()
  })

  it("renders with a custom container element when provided", () => {
    render(<ListItem task={mockTask} container="div" />)

    // The default is 'li', so we're checking it's now a div
    const container = screen.getByText("Test Task").closest("div")
    expect(container).toBeInTheDocument()
  })

  it("renders the task status button", () => {
    render(<ListItem task={mockTask} />)

    const statusButton = screen.getByTestId("task-status-button")
    expect(statusButton).toBeInTheDocument()
  })
})
