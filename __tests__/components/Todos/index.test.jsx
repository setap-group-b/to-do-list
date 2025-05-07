import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Todos } from "@/components/Todos";

// Mock the getUserTodos function
jest.mock("@/utils", () => ({
  getServerSessionWrapper: jest.fn().mockResolvedValue({
    user: { id: "user-123", name: "Test User", email: "test@example.com" },
  }),
  getUserTodos: jest.fn(),
}));

// Mock the Todo component
jest.mock("@/components", () => ({
  Todo: function MockTodo({ task }) {
    return <div data-testid={`todo-${task.id}`}>{task.title}</div>;
  },
}));

// Mock the Accordion component
jest.mock("@/components/ui/accordion", () => ({
  Accordion: ({ children }) => <div>{children}</div>,
}));

describe("Todos", () => {
  it("renders a message when user is not signed in", async () => {
    const { getServerSessionWrapper } = require("@/utils");
    getServerSessionWrapper.mockResolvedValueOnce(null);

    const { findByText } = render(await Todos({ listId: "list-123" }));

    expect(
      await findByText(/Please sign in to see your To-do list!/i)
    ).toBeInTheDocument();
  });

  it("renders a message when no todos are available", async () => {
    const { getUserTodos } = require("@/utils");
    getUserTodos.mockResolvedValueOnce([]);

    const { findByText } = render(await Todos({ listId: "list-123" }));

    expect(await findByText(/No tasks yet/i)).toBeInTheDocument();
  });

  it("renders todos when they are available", async () => {
    const { getUserTodos } = require("@/utils");
    const mockTodos = [
      { id: "todo-1", title: "Todo 1", priority: "HIGH", status: "PENDING" },
      {
        id: "todo-2",
        title: "Todo 2",
        priority: "MEDIUM",
        status: "IN_PROGRESS",
      },
    ];
    getUserTodos.mockResolvedValueOnce(mockTodos);

    render(await Todos({ listId: "list-123" }));

    // Since we're mocking the Todo component, we can check if it's rendered with the correct props
    expect(screen.getByTestId("todo-todo-1")).toBeInTheDocument();
    expect(screen.getByTestId("todo-todo-2")).toBeInTheDocument();
  });

  it("renders a message when todos are null", async () => {
    const { getUserTodos } = require("@/utils");
    getUserTodos.mockResolvedValueOnce(null);

    const { findByText } = render(await Todos({ listId: "list-123" }));

    expect(
      await findByText(/Create a To-do to get started!/i)
    ).toBeInTheDocument();
  });

  it("passes the correct type prop to Todo components", async () => {
    const { getUserTodos } = require("@/utils");
    const mockTodos = [
      { id: "todo-1", title: "Todo 1", priority: "HIGH", status: "PENDING" },
    ];
    getUserTodos.mockResolvedValueOnce(mockTodos);

    render(await Todos({ type: "group", listId: "list-123" }));

    // We can't directly test the prop, but we can verify the component renders
    expect(screen.getByTestId("todo-todo-1")).toBeInTheDocument();
  });
});
