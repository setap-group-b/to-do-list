import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { Lists } from "@/components/Lists";

// Mock the getUserLists function
jest.mock("@/utils", () => ({
  getServerSessionWrapper: jest.fn().mockResolvedValue({
    user: { id: "user-123", name: "Test User", email: "test@example.com" },
  }),
  getUserLists: jest.fn(),
}));

// Mock the List component
jest.mock("@/components/List", () => {
  return function MockList({ list }) {
    return <div data-testid={`list-${list.id}`}>{list.title}</div>;
  };
});

describe("Lists", () => {
  it("renders a message when user is not signed in", async () => {
    const { getServerSessionWrapper } = require("@/utils");
    getServerSessionWrapper.mockResolvedValueOnce(null);

    const { findByText } = render(await Lists());

    expect(
      await findByText(/Please sign in to see your lists!/i)
    ).toBeInTheDocument();
  });

  it("renders a message when no lists are available", async () => {
    const { getUserLists } = require("@/utils");
    getUserLists.mockResolvedValueOnce([]);

    const { findByText } = render(await Lists());

    expect(await findByText(/No Lists yet/i)).toBeInTheDocument();
  });

  it("renders lists when they are available", async () => {
    const { getUserLists } = require("@/utils");
    const mockLists = [
      { id: "list-1", title: "List 1" },
      { id: "list-2", title: "List 2" },
    ];
    getUserLists.mockResolvedValueOnce(mockLists);

    const { findByTestId } = render(await Lists());

    expect(await findByTestId("list-list-1")).toBeInTheDocument();
    expect(await findByTestId("list-list-2")).toBeInTheDocument();
  });

  it("renders a message when lists are null", async () => {
    const { getUserLists } = require("@/utils");
    getUserLists.mockResolvedValueOnce(null);

    const { findByText } = render(await Lists());

    expect(
      await findByText(/Create a list to get started!/i)
    ).toBeInTheDocument();
  });
});
