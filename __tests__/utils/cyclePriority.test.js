import { cyclePriority } from "@/utils/cyclePriority"

describe("cyclePriority", () => {
  it("cycles to the next priority in the list", () => {
    const priorities = [{ value: "HIGH" }, { value: "MEDIUM" }, { value: "LOW" }]

    const currentPriority = { value: "HIGH" }
    const setPriority = jest.fn()

    cyclePriority(currentPriority, priorities, setPriority)

    expect(setPriority).toHaveBeenCalledWith(priorities[1])
  })

  it("cycles back to the first priority when at the end of the list", () => {
    const priorities = [{ value: "HIGH" }, { value: "MEDIUM" }, { value: "LOW" }]

    const currentPriority = { value: "LOW" }
    const setPriority = jest.fn()

    cyclePriority(currentPriority, priorities, setPriority)

    expect(setPriority).toHaveBeenCalledWith(priorities[0])
  })

  it("handles case when current priority is not in the list", () => {
    const priorities = [{ value: "HIGH" }, { value: "MEDIUM" }, { value: "LOW" }]

    const currentPriority = { value: "UNKNOWN" }
    const setPriority = jest.fn()

    cyclePriority(currentPriority, priorities, setPriority)

    // Should default to the first priority
    expect(setPriority).toHaveBeenCalledWith(priorities[0])
  })
})
