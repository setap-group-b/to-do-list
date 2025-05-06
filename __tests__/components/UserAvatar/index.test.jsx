import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import UserAvatar from "@/components/UserAvatar";

describe("UserAvatar", () => {
  it("Renders the UserAvatar component", () => {
    render(<UserAvatar />);

    const avatar = screen.getByRole("span");

    expect(avatar).toBeInTheDocument();
  });
});
