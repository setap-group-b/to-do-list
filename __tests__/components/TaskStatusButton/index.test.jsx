import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import TaskStatusButton from "@/components/TaskStatusButton";

jest.mock("@/app/actions/todo", () => ({
  updateTodoStatus: jest.fn(),
}));

describe("TaskStatusButton", () => {
  it("Renders the TaskStatusButton component", () => {
    render(<TaskStatusButton />);

    const span = screen.getByRole("span");

    expect(span).toBeInTheDocument();
  });
});
