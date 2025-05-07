import "@testing-library/jest-dom"
import { render, screen, fireEvent } from "@testing-library/react"
import PageHeader from "@/components/PageHeader"

// Mock the useRouter hook
const mockBack = jest.fn()
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    back: mockBack,
  }),
}))

describe("PageHeader", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders the title", () => {
    render(<PageHeader title="Test Title" />)

    expect(screen.getByText("Test Title")).toBeInTheDocument()
  })

  it("renders a back button", () => {
    render(<PageHeader title="Test Title" />)

    const backButton = screen.getByRole("button")
    expect(backButton).toBeInTheDocument()
  })

  it("calls router.back when back button is clicked", () => {
    render(<PageHeader title="Test Title" />)

    const backButton = screen.getByRole("button")
    fireEvent.click(backButton)

    expect(mockBack).toHaveBeenCalledTimes(1)
  })

  it("capitalizes the title", () => {
    render(<PageHeader title="test title" />)

    const heading = screen.getByText("test title")
    expect(heading).toHaveClass("capitalize")
  })
})
