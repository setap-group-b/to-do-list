import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Logo from "@/components/Logo";

// Mock next/link
jest.mock("next/link", () => {
  return ({ children, href }) => {
    return <a href={href}>{children}</a>;
  };
});

describe("Logo", () => {
  it("renders the logo component with correct text", () => {
    render(<Logo />);

    const logoText = screen.getByText("To-do-list");
    expect(logoText).toBeInTheDocument();
  });

  it("links to the home page", () => {
    render(<Logo />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/");
  });
});
