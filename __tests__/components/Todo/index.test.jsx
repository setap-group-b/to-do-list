import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Todo } from "@/components/Todo";
import { deleteTodo } from "@/app/actions/todo";
import { displayErrorMessage } from "@/utils/displayError";

// Mock the deleteTodo function
jest.mock("@/app/actions/todo", () => ({
  deleteTodo: jest.fn(),
}));

// Mock the displayErrorMessage function
jest.mock("@/utils/displayError", () => ({
  displayErrorMessage: jest.fn(),
}));

// Mock the useRouter hook
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock the TaskStatusButton component
jest.mock("@/components/TaskStatusButton", () => {
  return function MockTaskStatusButton() {
    return <div data-testid="task-status-button" />;
  };
});

// Mock the Accordion components
jest.mock("@/components/ui/accordion", () => ({
  AccordionItem: ({ children, value }) => (
    <div data-testid={`accordion-item-${value}`}>{children}</div>
  ),
  AccordionTrigger: ({ children, className }) => (
    <div data-testid="accordion-trigger">{children}</div>
  ),
  AccordionContent: ({ children }) => (
    <div data-testid="accordion-content">{children}</div>
  ),
}));

describe("Todo", () => {
  const mockTask = {
    id: "task-123",
    title: "Test Task",
    content: "Task description",
    priority: "HIGH",
    status: "PENDING",
    deadline: new Date("2023-12-31T23:59:59").toISOString(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the task title and status button", () => {
    render(<Todo type="list" listId="list-123" task={mockTask} />);

    expect(screen.getByText("Test Task")).toBeInTheDocument();
    expect(screen.getByTestId("task-status-button")).toBeInTheDocument();
  });

  it("renders the task content in the accordion content", () => {
    render(<Todo type="list" listId="list-123" task={mockTask} />);

    expect(screen.getByText("Task description")).toBeInTheDocument();
  });

  it("navigates to edit page when edit button is clicked", () => {
    render(<Todo type="list" listId="list-123" task={mockTask} />);

    const editButton = screen.getByText("Edit");
    fireEvent.click(editButton);

    expect(mockPush).toHaveBeenCalledWith(
      "/dashboard/list/list-123/todo/task-123/edit"
    );
  });

  it("calls deleteTodo when delete button is clicked", async () => {
    deleteTodo.mockResolvedValue({ success: true });

    render(<Todo type="list" listId="list-123" task={mockTask} />);

    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    expect(deleteTodo).toHaveBeenCalledWith("task-123", "list-123", "list");
  });

  it("renders deadline information correctly", () => {
    render(<Todo type="list" listId="list-123" task={mockTask} />);

    // The deadline text should be visible
    expect(screen.getByText(/Due date:/)).toBeInTheDocument();
  });

  it("handles different task types correctly", () => {
    render(<Todo type="group" listId="group-123" task={mockTask} />);

    const editButton = screen.getByText("Edit");
    fireEvent.click(editButton);

    expect(mockPush).toHaveBeenCalledWith(
      "/dashboard/group/group-123/todo/task-123/edit"
    );
  });
});
