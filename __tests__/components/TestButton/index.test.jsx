import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { TestButton } from "@/components/TestButton";

describe("TestButton", () => {
  it("Renders the TestButton component", () => {
    render(<TestButton />);

    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
  });
});
