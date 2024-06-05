import { render, fireEvent } from "@testing-library/react"
import HideShow from "../HideShow"

describe("HideShow Component", () => {
  it("Should execute action click and to show content", () => {
    const { getByTestId } = render(<HideShow hideContent="contentShow" />)

    const hideShowAction = getByTestId("hideShowAction")
    const hideShowValue = getByTestId("hideShowValue")
    fireEvent.click(hideShowAction)

    expect(hideShowValue.innerHTML).toEqual("contentShow")
  })

  it("Should have a before text", () => {
    const { getByTestId, queryByTestId } = render(
      <HideShow hideContent="contentShower" beforeText="beforeText" />
    )

    const hideShowBeforeText = getByTestId("hideShowBeforeText")
    const hideShowAfterText = queryByTestId("hideShowAfterText")

    expect(hideShowBeforeText.innerHTML).toEqual("beforeText")
    expect(hideShowAfterText).toBeNull()
  })

  it("Should have a after text", () => {
    const { getByTestId, queryByTestId } = render(
      <HideShow hideContent="contentShower" afterText="afterText" />
    )

    const hideShowAfterText = getByTestId("hideShowAfterText")
    const hideShowBeforeText = queryByTestId("hideShowBeforeText")

    expect(hideShowAfterText.innerHTML).toEqual("afterText")
    expect(hideShowBeforeText).toBeNull()
  })
})
