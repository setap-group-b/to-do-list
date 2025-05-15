import { render, screen } from "@testing-library/react";
import Groups from "@/components/Groups";
import * as utils from "@/utils";

jest.mock("@/utils", () => ({
  getServerSessionWrapper: jest.fn(),
  getUserGroups: jest.fn(),
}));

jest.mock("@/components/Group", () => ({
  __esModule: true,
  default: ({ group }) => <div data-testid="group">{group.name}</div>,
}));

describe("Groups", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders sign in message if no session", async () => {
    utils.getServerSessionWrapper.mockResolvedValue(null);
    render(await Groups());
    expect(screen.getByText(/please sign in/i)).toBeInTheDocument();
  });

  it("renders create group message if no groups returned", async () => {
    utils.getServerSessionWrapper.mockResolvedValue({ user: { id: 1 } });
    utils.getUserGroups.mockResolvedValue(undefined);
    render(await Groups());
    expect(screen.getByText(/create a group/i)).toBeInTheDocument();
  });

  it("renders no groups message if userGroups is empty array", async () => {
    utils.getServerSessionWrapper.mockResolvedValue({ user: { id: 1 } });
    utils.getUserGroups.mockResolvedValue([]);
    render(await Groups());
    expect(screen.getByText(/no groups yet/i)).toBeInTheDocument();
  });

  it("renders groups if userGroups exist", async () => {
    utils.getServerSessionWrapper.mockResolvedValue({ user: { id: 1 } });
    utils.getUserGroups.mockResolvedValue([
      { id: 1, name: "Group 1" },
      { id: 2, name: "Group 2" },
    ]);
    render(await Groups());
    expect(screen.getAllByTestId("group")).toHaveLength(2);
    expect(screen.getByText("Group 1")).toBeInTheDocument();
    expect(screen.getByText("Group 2")).toBeInTheDocument();
  });
});
