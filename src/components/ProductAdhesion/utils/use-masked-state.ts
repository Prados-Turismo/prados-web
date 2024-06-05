import React from "react"

type MaskLike = (s: string) => string

export function useMaskedState(
  mask: MaskLike,
  initialState: string
): [string, (s: string) => void] {
  const [state, _setState] = React.useState(initialState)
  const setState = React.useCallback(
    (value: string) => {
      _setState(mask(value))
    },
    [mask]
  )

  return [state, setState]
}
