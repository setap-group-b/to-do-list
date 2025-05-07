import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Nav } from "@/components/Nav";

// Mock the usePathname hook
jest.mock("next/navigation", () => ({
  usePathname: jest.fn().mockReturnValue("/dashboard/list/123/todo"),
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock the SidebarTrigger component
jest.mock("@/components/ui/sidebar", () => ({
  SidebarTrigger: () => (
    <button data-testid="sidebar-trigger">Toggle Sidebar</button>
  ),
}));

// Mock the SettingsDropdown component
jest.mock("@/components/Nav/SettingsDropdown", () => {
  return function MockSettingsDropdown() {
    return <div data-testid="settings-dropdown">Settings Dropdown</div>;
  };
});

describe("Nav", () => {
  it("renders the navigation bar with sidebar trigger", () => {
    render(<Nav />);

    expect(screen.getByTestId("sidebar-trigger")).toBeInTheDocument();
  });

  it("renders the settings dropdown", () => {
    render(<Nav />);

    expect(screen.getByTestId("settings-dropdown")).toBeInTheDocument();
  });

  it("renders breadcrumbs based on the current path", () => {
    render(<Nav />);

    // Check if breadcrumb items are rendered
    expect(screen.getByText("dashboard")).toBeInTheDocument();
    expect(screen.getByText("list")).toBeInTheDocument();
  });

  it("handles different paths correctly", () => {
    const { usePathname } = require("next/navigation");
    usePathname.mockReturnValue("/dashboard/group/456/todo");

    render(<Nav />);

    expect(screen.getByText("dashboard")).toBeInTheDocument();
    expect(screen.getByText("group")).toBeInTheDocument();
  });

  it("handles root path correctly", () => {
    const { usePathname } = require("next/navigation");
    usePathname.mockReturnValue("/");

    render(<Nav />);

    // Should only show "Home" for root path
    expect(screen.getByText("Home")).toBeInTheDocument();
  });
});
