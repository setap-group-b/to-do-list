import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { priorityObject } from "@/utils/constants";
import ListItem from "@/components/ListItem";

jest.mock("@/app/actions/todo", () => ({
  updateTodoStatus: jest.fn(),
}));

jest.mock("@/utils/functions", () => ({
  dateFormatter: jest.fn(),
}));

jest.mock("@/utils/constants", () => ({
  priorityObject: priorityObject,
}));

describe("ListItem", () => {
  it("Renders the ListItem component", () => {
    render(<ListItem />);

    const list = screen.getByRole("li");

    expect(list).toBeInTheDocument();
  });
});
