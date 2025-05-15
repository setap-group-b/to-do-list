import { render, screen } from "@testing-library/react";
import GroupsList from "@/components/Sidebar/GroupsList";

jest.mock("@/components/ui/sidebar", () => ({
  SidebarGroup: ({ children, ...props }) => (
    <section data-testid="sidebar-group" {...props}>
      {children}
    </section>
  ),
  SidebarGroupLabel: ({ children }) => (
    <div data-testid="sidebar-group-label">{children}</div>
  ),
  SidebarGroupContent: ({ children }) => (
    <div data-testid="sidebar-group-content">{children}</div>
  ),
  SidebarMenu: ({ children, ...props }) => (
    <nav data-testid="sidebar-menu" {...props}>
      {children}
    </nav>
  ),
  SidebarMenuButton: ({ children, ...props }) => (
    <button data-testid="sidebar-menu-button" {...props}>
      {children}
    </button>
  ),
  SidebarMenuItem: ({ children, ...props }) => (
    <div data-testid="sidebar-menu-item" {...props}>
      {children}
    </div>
  ),
  useSidebar: () => ({ state: "expanded" }),
}));
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, ...props }) => <a {...props}>{children}</a>,
}));
jest.mock("@/components/UserAvatar", () => ({
  __esModule: true,
  default: ({ name }) => <span data-testid="user-avatar">{name}</span>,
}));
jest.mock("lucide-react", () => ({
  MoreHorizontal: () => <span data-testid="more-horizontal">...</span>,
}));

describe("GroupsList", () => {
  const groups = [
    {
      id: 1,
      title: "Group 1",
      backgroundColour: "#fff",
      collaborators: [],
      user: { name: "User 1" },
    },
    {
      id: 2,
      title: "Group 2",
      backgroundColour: "#000",
      collaborators: [{ name: "Col 1" }],
      user: { name: "User 2" },
    },
  ];

  it("renders group items and view all", () => {
    render(<GroupsList groups={groups} />);
    expect(screen.getByTestId("sidebar-group")).toBeInTheDocument();
    expect(screen.getByTestId("sidebar-group-label")).toHaveTextContent(
      "Collaborative Lists"
    );
    expect(screen.getAllByTestId("sidebar-menu-item").length).toBeGreaterThan(
      0
    );
    expect(screen.getByText("View all")).toBeInTheDocument();
  });
});
