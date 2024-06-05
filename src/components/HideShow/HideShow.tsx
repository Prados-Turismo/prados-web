import { useState } from "react"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"

import { HideShowWrap } from "./styled"

import { IHideShow } from "./types"

const HideShow = ({ beforeText, afterText, hideContent }: IHideShow) => {
  const [show, setShow] = useState(false)

  return (
    <HideShowWrap>
      <button onClick={() => setShow(!show)} data-testid="hideShowAction">
        {show ? <AiFillEye size={30} /> : <AiFillEyeInvisible size={30} />}
      </button>

      <span className="contentWrap">
        {beforeText && (
          <span className="text" data-testid="hideShowBeforeText">
            {beforeText}
          </span>
        )}

        <span className="value" data-testid="hideShowValue">
          {show ? hideContent : `${"*".repeat(hideContent.length + 1)}`}
        </span>

        {afterText && (
          <span className="text" data-testid="hideShowAfterText">
            {afterText}
          </span>
        )}
      </span>
    </HideShowWrap>
  )
}

export default HideShow
