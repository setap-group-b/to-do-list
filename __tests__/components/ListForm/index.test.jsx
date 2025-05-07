import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ListForm } from "@/components/ListForm";

// Mock next/navigation for PageHeader
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
  }),
}));

// Mock next/link
jest.mock("next/link", () => {
  return ({ children, href }) => {
    return <a href={href}>{children}</a>;
  };
});

// Mock useActionState hook
jest.mock("react", () => {
  const originalReact = jest.requireActual("react");
  return {
    ...originalReact,
    useActionState: (action, initialState) => {
      return [initialState, action];
    },
  };
});

describe("ListForm", () => {
  const mockFormAction = jest.fn();

  it("renders the form for creating a new list", () => {
    render(
      <ListForm
        formAction={mockFormAction}
        initialData={{ title: "", backgroundColour: "" }}
      />
    );

    expect(screen.getByText(/Create List/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Background Colour/i)).toBeInTheDocument();
    expect(screen.getByText(/Save/i)).toBeInTheDocument();
    expect(screen.getByText(/Cancel/i)).toBeInTheDocument();
  });

  it("renders the form for updating an existing list", () => {
    render(
      <ListForm
        formAction={mockFormAction}
        initialData={{ title: "Existing List", backgroundColour: "#ff0000" }}
      />
    );

    expect(screen.getByText(/Update List/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Title/i)).toHaveValue("Existing List");
    expect(screen.getByLabelText(/Background Colour/i)).toHaveValue("#ff0000");
  });

  it("links to the lists page when cancel is clicked", () => {
    render(
      <ListForm
        formAction={mockFormAction}
        initialData={{ title: "", backgroundColour: "" }}
      />
    );

    const cancelLink = screen.getByText(/Cancel/i).closest("a");
    expect(cancelLink).toHaveAttribute("href", "/dashboard/list");
  });

  it("submits the form with the correct data", async () => {
    const { container } = render(
      <ListForm
        formAction={mockFormAction}
        initialData={{ title: "", backgroundColour: "" }}
      />
    );

    fireEvent.change(screen.getByLabelText(/Title/i), {
      target: { value: "New List" },
    });
    fireEvent.change(screen.getByLabelText(/Background Colour/i), {
      target: { value: "#00ff00" },
    });

    const form = container.querySelector("form");
    fireEvent.submit(form);

    await waitFor(() => {
      expect(mockFormAction).toHaveBeenCalled();
    });

    expect(screen.getByLabelText(/Title/i)).toHaveValue("New List");
    expect(screen.getByLabelText(/Background Colour/i)).toHaveValue("#00ff00");
  });
});
