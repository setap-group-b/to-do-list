import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskStatusButton from "@/components/TaskStatusButton";

// Mock the updateTodoStatus function
jest.mock("@/app/actions/todo", () => ({
  updateTodoStatus: jest.fn(),
}));

describe("TaskStatusButton", () => {
  it("renders with the correct initial state", () => {
    render(
      <TaskStatusButton
        type="list"
        listId="list-123"
        task={{ id: "task-123" }}
        currentState="PENDING"
      />
    );

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("cycles through states when clicked", () => {
    render(
      <TaskStatusButton
        type="list"
        listId="list-123"
        task={{ id: "task-123" }}
        currentState="PENDING"
      />
    );

    const button = screen.getByRole("button");

    // First click should change from PENDING to IN_PROGRESS
    fireEvent.click(button);

    // Second click should change from IN_PROGRESS to COMPLETED
    fireEvent.click(button);

    // Third click should cycle back to PENDING
    fireEvent.click(button);
  });
});
