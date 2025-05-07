import { POST } from "@/app/api/auth/signup/route";
import prisma from "../../../../../lib/prisma";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

// Mock prisma
jest.mock("../../../../../lib/prisma", () => ({
  user: {
    findFirst: jest.fn(),
    create: jest.fn(),
  },
}));

// Mock bcrypt
jest.mock("bcrypt", () => ({
  hash: jest.fn().mockResolvedValue("hashed_password"),
}));

// Mock next/server
jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn((data, options) => ({ data, options })),
  },
}));

describe("Signup API Route", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("creates a new user with valid data", async () => {
    const mockRequest = {
      json: jest.fn().mockResolvedValue({
        name: "Test User",
        email: "test@example.com",
        password: "Password123*",
      }),
    };

    prisma.user.findFirst.mockResolvedValue(null);
    prisma.user.create.mockResolvedValue({
      id: "user-123",
      name: "Test User",
      email: "test@example.com",
      password: "hashed_password",
    });

    await POST(mockRequest);

    expect(prisma.user.findFirst).toHaveBeenCalledWith({
      where: { email: "test@example.com" },
    });
    expect(hash).toHaveBeenCalledWith("Password123*", 10);
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        name: "Test User",
        email: "test@example.com",
        password: "hashed_password",
      },
    });
    expect(NextResponse.json).toHaveBeenCalledWith(
      {
        user: {
          id: "user-123",
          name: "Test User",
          email: "test@example.com",
        },
        message: "Account created successfully",
      },
      { status: 201 }
    );
  });

  it("returns error when user already exists", async () => {
    const mockRequest = {
      json: jest.fn().mockResolvedValue({
        name: "Test User",
        email: "existing@example.com",
        password: "Password123*",
      }),
    };

    prisma.user.findFirst.mockResolvedValue({
      id: "user-123",
      email: "existing@example.com",
    });

    await POST(mockRequest);

    expect(NextResponse.json).toHaveBeenCalledWith(
      {
        error: "User with this email already exists",
      },
      { status: 409 }
    );
    expect(prisma.user.create).not.toHaveBeenCalled();
  });

  it("handles validation errors", async () => {
    const mockRequest = {
      json: jest.fn().mockResolvedValue({
        name: "Test User",
        email: "invalid-email",
        password: "short",
      }),
    };

    await POST(mockRequest);

    expect(NextResponse.json).toHaveBeenCalledWith(
      {
        error: "Something went wrong",
      },
      { status: 500 }
    );
    expect(prisma.user.create).not.toHaveBeenCalled();
  });

  it("handles server errors", async () => {
    const mockRequest = {
      json: jest.fn().mockRejectedValue(new Error("Server error")),
    };

    await POST(mockRequest);

    expect(NextResponse.json).toHaveBeenCalledWith(
      {
        error: "Something went wrong",
      },
      { status: 500 }
    );
  });
});
