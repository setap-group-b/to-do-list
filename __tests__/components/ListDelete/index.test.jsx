import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { ListDelete } from "@/components/ListDelete";
import { deleteList } from "@/app/actions/list";

// Mock the deleteList function
jest.mock("@/app/actions/list", () => ({
  deleteList: jest.fn(),
}));

describe("ListDelete", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the delete button", () => {
    render(<ListDelete listId="list-123" />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Delete list");
  });

  it("calls deleteList when clicked", () => {
    render(<ListDelete listId="list-123" />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(deleteList).toHaveBeenCalledWith("list-123");
  });

  it("applies custom className when provided", () => {
    const customClass = "test-class";
    render(<ListDelete listId="list-123" className={customClass} />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass(customClass);
  });
});
