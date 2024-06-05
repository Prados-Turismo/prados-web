const pixelToRem = (pxValue: number): string => {
  const htmlFontSize = parseFloat(
    getComputedStyle(document.documentElement).fontSize
  )

  const remValue = pxValue / htmlFontSize

  return `${remValue}rem`
}

export default pixelToRem
