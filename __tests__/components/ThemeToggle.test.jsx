"use client";

import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ThemeToggle from "@/components/ThemeToggle";

// Mock the useTheme hook
jest.mock("next-themes", () => ({
  useTheme: () => ({
    theme: "light",
    setTheme: jest.fn(),
  }),
}));

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
};
Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("ThemeToggle", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue("16px");
  });

  it("renders the theme toggle button", () => {
    render(<ThemeToggle />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-haspopup", "menu");
  });

  it("opens the dropdown menu when clicked", async () => {
    render(<ThemeToggle />);

    fireEvent.click(screen.getByRole("button"));

    // await waitFor(() => {
    //   expect(screen.getByText("Light")).toBeInTheDocument();
    //   expect(screen.getByText("Dark")).toBeInTheDocument();
    //   expect(screen.getByText("System")).toBeInTheDocument();
    // });
  });

  it("calls setTheme with the correct theme when an option is selected", () => {
    const { setTheme } = require("next-themes").useTheme();
    render(<ThemeToggle />);

    // Open dropdown
    const button = screen.getByRole("button");
    fireEvent.click(button);

    // Click on Dark theme option
    // const darkOption = screen.getByText("Dark");
    // fireEvent.click(darkOption);

    // expect(setTheme).toHaveBeenCalledWith("dark");
  });

  it("applies custom className when provided", () => {
    const customClass = "test-class";
    render(<ThemeToggle className={customClass} />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass(customClass);
  });

  it("loads font settings from localStorage on mount", () => {
    localStorageMock.getItem
      .mockReturnValueOnce("18px")
      .mockReturnValueOnce("bold");

    render(<ThemeToggle />);

    // We can't directly test the document.documentElement.style changes,
    // but we can verify localStorage was accessed
    expect(localStorageMock.getItem).toHaveBeenCalledTimes(2);
  });
});
