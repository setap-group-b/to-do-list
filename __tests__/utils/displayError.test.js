import { displayErrorMessage } from "@/utils/displayError"
import toast from "react-hot-toast"

// Mock react-hot-toast
jest.mock("react-hot-toast", () => ({
  error: jest.fn(),
}))

describe("displayErrorMessage", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("displays a string error message", () => {
    const errorMsg = "Test error message"
    displayErrorMessage(errorMsg)

    expect(toast.error).toHaveBeenCalledWith(errorMsg)
  })

  it("displays an error object with message property", () => {
    const errorObj = { message: "Error object message" }
    displayErrorMessage(errorObj)

    expect(toast.error).toHaveBeenCalledWith(errorObj.message)
  })

  it("displays an error object with data.message property", () => {
    const errorObj = { data: { message: "Error data message" } }
    displayErrorMessage(errorObj)

    expect(toast.error).toHaveBeenCalledWith(errorObj.data.message)
  })

  it("displays multiple error messages from an array", () => {
    const errorObj = { data: { message: ["Error 1", "Error 2"] } }
    displayErrorMessage(errorObj)

    expect(toast.error).toHaveBeenCalledTimes(2)
    expect(toast.error).toHaveBeenNthCalledWith(1, "Error 1")
    expect(toast.error).toHaveBeenNthCalledWith(2, "Error 2")
  })

  it("displays a default message when no specific error is provided", () => {
    displayErrorMessage({})

    expect(toast.error).toHaveBeenCalledWith("Something went wrong, please try again!")
  })
})
