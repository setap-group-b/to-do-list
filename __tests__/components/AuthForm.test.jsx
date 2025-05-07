import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AuthForm from "@/components/AuthForm";
import { signIn } from "next-auth/react";
import { displayErrorMessage } from "@/utils/displayError";
import toast from "react-hot-toast";

// Mock next-auth
jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}));

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock displayErrorMessage
jest.mock("@/utils/displayError", () => ({
  displayErrorMessage: jest.fn(),
}));

// Mock toast
jest.mock("react-hot-toast", () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

// Mock fetch for signup
global.fetch = jest.fn();

describe("AuthForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Login Form", () => {
    it("renders login form correctly", () => {
      render(<AuthForm />);

      expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
      expect(screen.getByText(/Log in to account/i)).toBeInTheDocument();
      expect(screen.getByText(/Continue with Google/i)).toBeInTheDocument();
      expect(screen.getByText(/Continue with Github/i)).toBeInTheDocument();
    });

    it("handles login submission", async () => {
      signIn.mockResolvedValue({ ok: true });

      render(<AuthForm />);

      fireEvent.change(screen.getByLabelText(/Email/i), {
        target: { value: "test@example.com" },
      });
      fireEvent.change(screen.getByLabelText(/Password/i), {
        target: { value: "Password123*" },
      });

      fireEvent.click(screen.getByText(/Log in to account/i));

      await waitFor(() => {
        expect(signIn).toHaveBeenCalledWith("credentials", {
          email: "test@example.com",
          password: "Password123*",
          redirect: false,
        });
        expect(toast.success).toHaveBeenCalledWith("Login successful");
      });
    });

    it("handles login error", async () => {
      signIn.mockResolvedValue({ ok: false, error: "Invalid credentials" });

      render(<AuthForm />);

      fireEvent.change(screen.getByLabelText(/Email/i), {
        target: { value: "test@example.com" },
      });
      fireEvent.change(screen.getByLabelText(/Password/i), {
        target: { value: "wrong-Password123*" },
      });

      fireEvent.click(screen.getByText(/Log in to account/i));

      await waitFor(() => {
        expect(displayErrorMessage).toHaveBeenCalledWith("Invalid credentials");
      });
    });
  });

  describe("Signup Form", () => {
    it("renders signup form correctly", () => {
      render(<AuthForm isSignUp />);

      expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
      expect(screen.getByText(/Create account/i)).toBeInTheDocument();
    });

    it("handles signup submission", async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({ message: "Account created successfully" }),
      });

      signIn.mockResolvedValue({ ok: true });

      render(<AuthForm isSignUp />);

      fireEvent.change(screen.getByLabelText(/Name/i), {
        target: { value: "Test User" },
      });
      fireEvent.change(screen.getByLabelText(/Email/i), {
        target: { value: "test@example.com" },
      });
      fireEvent.change(screen.getByLabelText(/Password/i), {
        target: { value: "Password123*" },
      });

      fireEvent.click(screen.getByText(/Create account/i));

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: "Test User",
            email: "test@example.com",
            password: "Password123*",
          }),
        });
        expect(toast.success).toHaveBeenCalledWith(
          "Account created successfully"
        );
        expect(signIn).toHaveBeenCalledWith("credentials", {
          email: "test@example.com",
          password: "Password123*",
          redirect: false,
        });
      });
    });

    it("handles signup error", async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve({ error: "Email already exists" }),
      });

      render(<AuthForm isSignUp />);

      fireEvent.change(screen.getByLabelText(/Name/i), {
        target: { value: "Test User" },
      });
      fireEvent.change(screen.getByLabelText(/Email/i), {
        target: { value: "existing@example.com" },
      });
      fireEvent.change(screen.getByLabelText(/Password/i), {
        target: { value: "Password123*" },
      });

      fireEvent.click(screen.getByText(/Create account/i));

      await waitFor(() => {
        expect(displayErrorMessage).toHaveBeenCalledWith(
          new Error("Email already exists")
        );
      });
    });
  });

  it("handles social login with Google", () => {
    render(<AuthForm />);

    fireEvent.click(screen.getByText(/Continue with Google/i));

    expect(signIn).toHaveBeenCalledWith("google");
  });

  it("handles social login with GitHub", () => {
    render(<AuthForm />);

    fireEvent.click(screen.getByText(/Continue with Github/i));

    expect(signIn).toHaveBeenCalledWith("github");
  });
});
