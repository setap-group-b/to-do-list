import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { TodoForm } from "@/components/TodoForm";
import { displayErrorMessage } from "@/utils/displayError";

// Mock next/navigation for PageHeader
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
  }),
}));

// Mock the displayErrorMessage function
jest.mock("@/utils/displayError", () => ({
  displayErrorMessage: jest.fn(),
}));

// Mock next/link
jest.mock("next/link", () => {
  return ({ children, href }) => {
    return <a href={href}>{children}</a>;
  };
});

describe("TodoForm", () => {
  const mockFormAction = jest.fn();
  const mockInitialData = {
    title: "",
    content: "",
    priority: "",
    status: "",
  };
  const mockListId = "list-123";

  beforeEach(() => {
    jest.clearAllMocks();
    mockFormAction.mockResolvedValue({ success: true });
  });

  it("renders the form with empty initial data", () => {
    render(
      <TodoForm
        formAction={mockFormAction}
        initialData={mockInitialData}
        listId={mockListId}
      />
    );

    expect(screen.getByLabelText(/Title:/i)).toBeInTheDocument();
    expect(screen.getByText(/Priority:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Content:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Deadline:/i)).toBeInTheDocument();
    expect(screen.getByText(/Notification:/i)).toBeInTheDocument();
    expect(screen.getByText(/Save/i)).toBeInTheDocument();
    expect(screen.getByText(/Cancel/i)).toBeInTheDocument();
  });

  it("renders the form with existing data for editing", () => {
    const existingData = {
      title: "Existing Task",
      content: "Task description",
      priority: "HIGH",
      status: "PENDING",
      deadline: "2023-12-31T23:59:59",
      notification: "1 day",
    };

    render(
      <TodoForm
        formAction={mockFormAction}
        initialData={existingData}
        listId={mockListId}
      />
    );

    expect(screen.getByLabelText(/Title:/i)).toHaveValue("Existing Task");
    expect(screen.getByLabelText(/Content:/i)).toHaveValue("Task description");
  });

  it("submits the form with valid data", async () => {
    mockFormAction.mockResolvedValue({ success: true });

    render(
      <TodoForm
        formAction={mockFormAction}
        initialData={mockInitialData}
        listId={mockListId}
      />
    );

    fireEvent.change(screen.getByLabelText(/Title:/i), {
      target: { value: "New Task" },
    });
    fireEvent.change(screen.getByLabelText(/Content:/i), {
      target: { value: "Task description" },
    });

    fireEvent.submit(screen.getByText(/Save/i).closest("form"));

    await waitFor(() => {
      expect(mockFormAction).toHaveBeenCalled();
    });
  });

  it("displays errors when form submission fails", async () => {
    mockFormAction.mockResolvedValue({
      success: false,
      errors: ["Title is required"],
    });

    render(
      <TodoForm
        formAction={mockFormAction}
        initialData={mockInitialData}
        listId={mockListId}
      />
    );

    fireEvent.submit(screen.getByText(/Save/i).closest("form"));

    await waitFor(() => {
      expect(displayErrorMessage).toHaveBeenCalledWith(["Title is required"]);
    });
  });

  it("links to the list page when cancel is clicked", () => {
    render(
      <TodoForm
        formAction={mockFormAction}
        initialData={mockInitialData}
        listId={mockListId}
      />
    );

    const cancelLink = screen.getByText(/Cancel/i).closest("a");
    expect(cancelLink).toHaveAttribute(
      "href",
      `/dashboard/list/${mockListId}/todo`
    );
  });
});
