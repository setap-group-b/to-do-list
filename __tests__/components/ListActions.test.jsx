import "@testing-library/jest-dom"
import { render, screen, fireEvent } from "@testing-library/react"
import ListActions from "@/components/ListActions"

// Mock next/link
jest.mock("next/link", () => {
  return ({ children, href }) => {
    return <a href={href}>{children}</a>
  }
})

// Mock the ListDelete component
jest.mock("@/components/ListDelete", () => ({
  ListDelete: () => <button data-testid="list-delete">Delete List</button>,
}))

describe("ListActions", () => {
  const mockListId = "list-123"

  it("renders the more button", () => {
    render(<ListActions listId={mockListId} />)

    const moreButton = screen.getByText("More ...")
    expect(moreButton).toBeInTheDocument()
  })

  it("opens the popover when clicked", () => {
    render(<ListActions listId={mockListId} />)

    const moreButton = screen.getByText("More ...")
    fireEvent.click(moreButton)

    // Check if popover content is rendered
    expect(screen.getByText("Edit List")).toBeInTheDocument()
    expect(screen.getByTestId("list-delete")).toBeInTheDocument()
  })

  it("has a link to edit the list", () => {
    render(<ListActions listId={mockListId} />)

    const moreButton = screen.getByText("More ...")
    fireEvent.click(moreButton)

    const editLink = screen.getByText("Edit List").closest("a")
    expect(editLink).toHaveAttribute("href", `/dashboard/list/${mockListId}/edit`)
  })

  it("includes the ListDelete component", () => {
    render(<ListActions listId={mockListId} />)

    const moreButton = screen.getByText("More ...")
    fireEvent.click(moreButton)

    expect(screen.getByTestId("list-delete")).toBeInTheDocument()
  })
})
