import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import AddCollaborators from "@/components/AddCollaborators";
import { createGroup, deleteGroup } from "@/app/actions/group";

// Mock the group actions
jest.mock("@/app/actions/group", () => ({
  createGroup: jest.fn(),
  deleteGroup: jest.fn(),
}));

// Mock useActionState hook
jest.mock("react", () => {
  const originalReact = jest.requireActual("react");
  return {
    ...originalReact,
    useActionState: (action) => [{ errors: {} }, action],
  };
});

describe("AddCollaborators", () => {
  const mockProps = {
    listId: "list-123",
    user: { email: "owner@example.com" },
    listCollaborators: ["collaborator1@example.com"],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the add collaborators button", () => {
    render(<AddCollaborators {...mockProps} />);

    const button = screen.getByText("Add collaborators");
    expect(button).toBeInTheDocument();
  });

  it("opens the dialog when button is clicked", () => {
    render(<AddCollaborators {...mockProps} />);

    const button = screen.getByText("Add collaborators");
    fireEvent.click(button);

    expect(screen.getByText("Collaborators")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Collaborators will be able to view, edit and delete tasks in this list"
      )
    ).toBeInTheDocument();
  });

  it("initializes with existing collaborators", () => {
    render(<AddCollaborators {...mockProps} />);

    const button = screen.getByText("Add collaborators");
    fireEvent.click(button);
  });

  it("filters out the owner's email from collaborators", () => {
    render(<AddCollaborators {...mockProps} />);

    const button = screen.getByText("Add collaborators");
    fireEvent.click(button);

    // Submit the form
    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);

    // Check that the owner's email is filtered out
    expect(createGroup).toHaveBeenCalledWith("list-123", expect.anything());
  });

  it("calls deleteGroup when 'Remove all collaborators' is clicked", () => {
    render(<AddCollaborators {...mockProps} />);

    const button = screen.getByText("Add collaborators");
    fireEvent.click(button);

    const removeButton = screen.getByText("Remove all collaborators");
    fireEvent.click(removeButton);

    expect(deleteGroup).toHaveBeenCalledWith("list-123");
  });
});
