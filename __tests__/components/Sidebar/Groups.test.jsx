import { render, screen } from "@testing-library/react";
import Groups from "@/components/Sidebar/Groups";

jest.mock("@/components/Sidebar/GroupsList", () => ({
  __esModule: true,
  default: ({ groups }) => <div data-testid="groups-list">GroupsList {groups ? "with data" : "no data"}</div>,
}));
jest.mock("@/utils", () => ({
  getServerSessionWrapper: jest.fn(() => Promise.resolve({ user: { id: 1 } })),
  getUserGroups: jest.fn(() => Promise.resolve([{ id: 1, title: "Group 1" }])),
}));

describe("Sidebar/Groups", () => {
  it("renders GroupsList with user groups", async () => {
    render(await Groups());
    expect(screen.getByTestId("groups-list")).toHaveTextContent("GroupsList with data");
  });
});
