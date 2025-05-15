import { render, screen } from "@testing-library/react";
import Lists from "@/components/Sidebar/Lists";

jest.mock("@/components/ui/sidebar", () => ({
  SidebarGroup: ({ children }) => (
    <section data-testid="sidebar-group">{children}</section>
  ),
  SidebarGroupLabel: ({ children }) => (
    <div data-testid="sidebar-group-label">{children}</div>
  ),
  SidebarGroupAction: ({ children }) => (
    <div data-testid="sidebar-group-action">{children}</div>
  ),
  SidebarGroupContent: ({ children }) => (
    <div data-testid="sidebar-group-content">{children}</div>
  ),
  SidebarMenu: ({ children }) => (
    <nav data-testid="sidebar-menu">{children}</nav>
  ),
  SidebarMenuButton: ({ children }) => (
    <button data-testid="sidebar-menu-button">{children}</button>
  ),
  SidebarMenuItem: ({ children }) => (
    <div data-testid="sidebar-menu-item">{children}</div>
  ),
  useSidebar: () => ({ state: "expanded" }),
}));
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, ...props }) => <a {...props}>{children}</a>,
}));
jest.mock("@/lib/utils", () => ({
  cn: (...args) => args.filter(Boolean).join(" "),
}));
jest.mock("lucide-react", () => ({
  MoreHorizontal: () => <span data-testid="more-horizontal">...</span>,
  Plus: () => <span data-testid="plus">+</span>,
  Search: () => <span data-testid="search">search</span>,
}));
jest.mock("@/components/Sidebar/SortableListItem", () => ({
  SortableListItem: ({ list }) => (
    <div data-testid="sortable-list-item">{list.title}</div>
  ),
}));
jest.mock("@dnd-kit/core", () => ({
  DndContext: ({ children }) => <div data-testid="dnd-context">{children}</div>,
  closestCenter: jest.fn(),
  PointerSensor: jest.fn(),
  useSensor: jest.fn(),
  useSensors: () => [],
}));
jest.mock("@dnd-kit/sortable", () => ({
  SortableContext: ({ children }) => (
    <div data-testid="sortable-context">{children}</div>
  ),
  verticalListSortingStrategy: jest.fn(),
  arrayMove: (arr, from, to) => {
    const copy = [...arr];
    const [item] = copy.splice(from, 1);
    copy.splice(to, 0, item);
    return copy;
  },
}));

describe("Sidebar/Lists", () => {
  const userLists = [
    { id: 1, title: "List 1", backgroundColour: "#fff", Todo: [1, 2] },
    { id: 2, title: "List 2", backgroundColour: "#000", Todo: [] },
  ];

  it("renders lists and search", () => {
    render(<Lists userLists={userLists} />);
    expect(screen.getByTestId("sidebar-group-label")).toHaveTextContent(
      "Owned Lists"
    );
    expect(screen.getAllByTestId("sortable-list-item")).toHaveLength(2);
    expect(screen.getByTestId("sidebar-group-action")).toBeInTheDocument();
    expect(screen.getByTestId("sidebar-menu")).toBeInTheDocument();
    expect(screen.getByText("View all")).toBeInTheDocument();
  });
});
