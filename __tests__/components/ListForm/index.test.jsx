import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { ListForm } from "@/components/ListForm";


jest.mock("../ui/ReusableButton", () => ({ children, ...props }) => (
  <button {...props}>{children}</button>
));
jest.mock("../PageHeader", () => ({ title }) => <h1>{title}</h1>);

describe("ListForm", () => {
  const mockFormAction = jest.fn();
  const initialData = {
    title: "My List",
    backgroundColour: "#ff0000",
  };

  it("renders correctly with initial data", () => {
    render(<ListForm formAction={mockFormAction} initialData={initialData} />);

    
    expect(screen.getByText("Update List")).toBeInTheDocument();
    
    expect(screen.getByLabelText("Title")).toHaveValue("My List");
    
    expect(screen.getByLabelText("Background Colour")).toHaveValue("#ff0000");
  });

  it("renders correctly when creating a new list", () => {
    render(<ListForm formAction={mockFormAction} initialData={{}} />);

    
    expect(screen.getByText("Create List")).toBeInTheDocument();
    
    expect(screen.getByLabelText("Title")).toHaveValue("");
    
    expect(screen.getByLabelText("Background Colour")).toHaveValue("#000000");
  });

  it("renders validation error for title if present", () => {
    const formStateWithError = {
      errors: {
        title: ["Title is required"],
      },
    };

    jest
      .spyOn(React, "useActionState")
      .mockReturnValue([formStateWithError, mockFormAction]);

    render(<ListForm formAction={mockFormAction} initialData={{}} />);

    
    expect(screen.getByText("Title is required")).toBeInTheDocument();
  });

  it("renders validation error for background colour if present", () => {
    const formStateWithError = {
      errors: {
        "background-colour": ["Background colour is invalid"],
      },
    };

    jest
      .spyOn(React, "useActionState")
      .mockReturnValue([formStateWithError, mockFormAction]);

    render(<ListForm formAction={mockFormAction} initialData={{}} />);

    
    expect(screen.getByText("Background colour is invalid")).toBeInTheDocument();
  });

  it("has working Save and Cancel buttons", () => {
    render(<ListForm formAction={mockFormAction} initialData={{}} />);

    
    expect(screen.getByRole("button", { name: /Save/i })).toBeInTheDocument();
    
    expect(screen.getByRole("link", { name: /Cancel/i })).toHaveAttribute("href", "/dashboard/list");
  });

  it("calls formAction on form submission", () => {
    render(<ListForm formAction={mockFormAction} initialData={{}} />);
    
    
    fireEvent.submit(screen.getByRole("form"));
    
    
    expect(mockFormAction).toHaveBeenCalledTimes(1);
  });
});
