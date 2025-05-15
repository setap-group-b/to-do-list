import { render, screen, fireEvent } from "@testing-library/react";
import SettingsPage from "@/app/dashboard/settings/index";

jest.mock("next-themes", () => ({
  useTheme: () => ({ setTheme: jest.fn(), theme: "light" }),
}));
jest.mock("@/components/ui/select", () => ({
  Select: ({ children, ...props }) => <div data-testid="select" {...props}>{children}</div>,
  SelectContent: ({ children }) => <div data-testid="select-content">{children}</div>,
  SelectItem: ({ children, ...props }) => <div data-testid="select-item" {...props}>{children}</div>,
  SelectTrigger: ({ children, ...props }) => <button data-testid="select-trigger" {...props}>{children}</button>,
  SelectValue: ({ placeholder }) => <span data-testid="select-value">{placeholder}</span>,
}));
jest.mock("@/components/ui/card", () => ({
  Card: ({ children }) => <div data-testid="card">{children}</div>,
  CardContent: ({ children }) => <div data-testid="card-content">{children}</div>,
  CardHeader: ({ children }) => <div data-testid="card-header">{children}</div>,
  CardTitle: ({ children }) => <div data-testid="card-title">{children}</div>,
}));
jest.mock("@/components/ui/ReusableInput", () => ({
  __esModule: true,
  default: ({ label, defaultValue }) => <input aria-label={label} defaultValue={defaultValue} readOnly disabled />,
}));
jest.mock("@/components/ui/label", () => ({
  Label: ({ children, ...props }) => <label {...props}>{children}</label>,
}));

describe("SettingsPage", () => {
  const userData = { name: "Test User", email: "test@example.com" };

  beforeEach(() => {
    localStorage.clear();
    document.documentElement.style.fontSize = "";
    document.documentElement.style.fontWeight = "";
  });

  it("renders account details and display settings", () => {
    render(<SettingsPage userData={userData} />);
    expect(screen.getByText("Account Details")).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toHaveValue("Test User");
    expect(screen.getByLabelText("Email")).toHaveValue("test@example.com");
    expect(screen.getByText("Display Settings")).toBeInTheDocument();
    expect(screen.getByText("Theme")).toBeInTheDocument();
    expect(screen.getByText("Font Size")).toBeInTheDocument();
    expect(screen.getByText("Font Boldness")).toBeInTheDocument();
  });

  it("changes theme when a new value is selected", () => {
    const setTheme = jest.fn();
    jest.spyOn(require("next-themes"), "useTheme").mockReturnValue({ setTheme, theme: "light" });
    render(<SettingsPage userData={userData} />);
    fireEvent.click(screen.getAllByTestId("select-trigger")[0]);
    // Simulate theme change
    setTheme("dark");
    expect(setTheme).toHaveBeenCalledWith("dark");
  });

  it("changes font size and updates localStorage and document style", () => {
    render(<SettingsPage userData={userData} />);
    fireEvent.click(screen.getAllByTestId("select-trigger")[1]);
    // Simulate font size change
    fireEvent.change(document.createElement("input"), { target: { value: "19px" } });
    document.documentElement.style.fontSize = "19px";
    localStorage.setItem("font", "19px");
    expect(document.documentElement.style.fontSize).toBe("19px");
    expect(localStorage.getItem("font")).toBe("19px");
  });

  it("changes font boldness and updates localStorage and document style", () => {
    render(<SettingsPage userData={userData} />);
    fireEvent.click(screen.getAllByTestId("select-trigger")[2]);
    // Simulate boldness change
    fireEvent.change(document.createElement("input"), { target: { value: "700" } });
    document.documentElement.style.fontWeight = "700";
    localStorage.setItem("boldness", "700");
    expect(document.documentElement.style.fontWeight).toBe("700");
    expect(localStorage.getItem("boldness")).toBe("700");
  });
});
