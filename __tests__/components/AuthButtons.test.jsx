import { render, screen, fireEvent } from "@testing-library/react";
import {
  GoogleSignInButton,
  GithubSignInButton,
} from "@/components/AuthButtons";

jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}));
jest.mock("react-icons/fa", () => ({
  FaGithub: () => <span data-testid="fa-github">github</span>,
}));
jest.mock("react-icons/fc", () => ({
  FcGoogle: () => <span data-testid="fc-google">google</span>,
}));
jest.mock("@/components/ui/button", () => ({
  Button: ({ children, ...props }) => <button {...props}>{children}</button>,
}));

import { signIn } from "next-auth/react";

describe("AuthButtons", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders GoogleSignInButton and triggers signIn with google", () => {
    render(<GoogleSignInButton />);
    expect(screen.getByText(/continue with google/i)).toBeInTheDocument();
    expect(screen.getByTestId("fc-google")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button"));
    expect(signIn).toHaveBeenCalledWith("google");
  });

  it("renders GithubSignInButton and triggers signIn with github", () => {
    render(<GithubSignInButton />);
    expect(screen.getByText(/continue with github/i)).toBeInTheDocument();
    expect(screen.getByTestId("fa-github")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button"));
    expect(signIn).toHaveBeenCalledWith("github");
  });
});
