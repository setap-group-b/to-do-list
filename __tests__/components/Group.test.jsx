import "@testing-library/jest-dom"
import { render, screen, fireEvent } from "@testing-library/react"
import Group from "@/components/Group"

// Mock the useRouter hook
const mockPush = jest.fn()
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

// Mock the ListItem component
jest.mock("@/components/ListItem", () => {
  return function MockListItem({ task }) {
    return <div data-testid={`list-item-${task.id}`}>{task.title}</div>
  }
})

describe("Group", () => {
  const mockGroup = {
    id: "group-123",
    title: "Test Group",
    Todo: [
      { id: "task-1", title: "Task 1" },
      { id: "task-2", title: "Task 2" },
    ],
  }

  it("renders the group title", () => {
    render(<Group group={mockGroup} />)

    const title = screen.getByText("Test Group")
    expect(title).toBeInTheDocument()
  })

  it("renders tasks when they exist", () => {
    render(<Group group={mockGroup} />)

    expect(screen.getByTestId("list-item-task-1")).toBeInTheDocument()
    expect(screen.getByTestId("list-item-task-2")).toBeInTheDocument()
  })

  it("displays 'No tasks yet' when there are no tasks", () => {
    const emptyGroup = { ...mockGroup, Todo: [] }
    render(<Group group={emptyGroup} />)

    expect(screen.getByText("No tasks yet")).toBeInTheDocument()
  })

  it("navigates to add task page when 'Add New Task' is clicked", () => {
    render(<Group group={mockGroup} />)

    const addButton = screen.getByText("+ Add New Task")
    fireEvent.click(addButton)

    expect(mockPush).toHaveBeenCalledWith(`/dashboard/group/${mockGroup.id}/todo/add`)
  })

  it("navigates to view all tasks when 'View all tasks' is clicked", () => {
    render(<Group group={mockGroup} />)

    const viewAllButton = screen.getByText("View all tasks")
    fireEvent.click(viewAllButton)

    expect(mockPush).toHaveBeenCalledWith(`/dashboard/group/${mockGroup.id}/todo`)
  })
})
