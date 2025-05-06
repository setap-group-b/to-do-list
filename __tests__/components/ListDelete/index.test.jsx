import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ListDelete } from "@/components/ListDelete";

jest.mock("@/app/actions/list", () => ({
  deleteList: jest.fn(),
}));

describe("ListDelete", () => {
  it("Renders the ListDelete component", () => {
    render(<ListDelete />);

    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
  });
});
