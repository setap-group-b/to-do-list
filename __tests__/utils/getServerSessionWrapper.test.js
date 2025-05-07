import { getServerSessionWrapper } from "@/utils/getServerSessionWrapper";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

// Mock next-auth
jest.mock("next-auth", () => ({
  getServerSession: jest.fn(),
}));

// Mock auth options
jest.mock("../../lib/auth", () => ({
  authOptions: { providers: [] },
}));

describe("getServerSessionWrapper", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls getServerSession with authOptions", async () => {
    const mockSession = { user: { name: "Test User" } };
    getServerSession.mockResolvedValue(mockSession);

    const result = await getServerSessionWrapper();

    expect(getServerSession).toHaveBeenCalledWith(authOptions);
    expect(result).toEqual(mockSession);
  });

  it("returns null when no session exists", async () => {
    getServerSession.mockResolvedValue(null);

    const result = await getServerSessionWrapper();

    expect(getServerSession).toHaveBeenCalledWith(authOptions);
    expect(result).toBeNull();
  });

  it("handles errors gracefully", async () => {
    getServerSession.mockRejectedValue(new Error("Session error"));

    try {
      await getServerSessionWrapper();
    } catch (error) {
      expect(error.message).toBe("Session error");
    }

    expect(getServerSession).toHaveBeenCalledWith(authOptions);
  });
});
