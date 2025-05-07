import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import UserAvatar from "@/components/UserAvatar";

// Mock the useTheme hook
jest.mock("next-themes", () => ({
  useTheme: () => ({ theme: "light" }),
}));

// Mock the randomColor function
jest.mock("@/utils/functions", () => ({
  randomColor: () => "#123456",
}));

describe("UserAvatar", () => {
  // it("renders the avatar with image when provided", () => {
  //   render(
  //     <UserAvatar
  //       name="John Doe"
  //       image={
  //         "https://img.freepik.com/premium-vector/round-gray-circle-with-simple-human-silhouette-light-gray-shadow-around-circle_213497-4963.jpg?semt=ais_hybrid&w=740"
  //       }
  //     />
  //   );

  //   const avatar = screen.getByAltText("user avatar");
  //   expect(avatar).toBeInTheDocument();
  //   expect(avatar).toHaveAttribute(
  //     "src",
  //     "https://img.freepik.com/premium-vector/round-gray-circle-with-simple-human-silhouette-light-gray-shadow-around-circle_213497-4963.jpg?semt=ais_hybrid&w=740"
  //   );
  // });

  it("renders initials when no image is provided", () => {
    render(<UserAvatar name="John Doe" />);

    const fallback = screen.getByText("JD");
    expect(fallback).toBeInTheDocument();
  });

  it("handles single name correctly", () => {
    render(<UserAvatar name="John" />);

    const fallback = screen.getByText("J");
    expect(fallback).toBeInTheDocument();
  });
});
