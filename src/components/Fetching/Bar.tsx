import { Box, useTheme } from "@chakra-ui/react"

const Bar = ({
  animationDuration,
  progress
}: {
  animationDuration: number
  progress: number
}) => {
  const theme = useTheme()
  const colorTheme = theme.colors.brand[500]

  return (
    <Box
      backgroundColor={colorTheme}
      height={1}
      left={0}
      marginLeft={`${(-1 + progress) * 100}%`}
      position="fixed"
      top={0}
      transition={`margin-left ${animationDuration}ms linear`}
      width="100%"
      zIndex={1031}
    >
      <Box
        boxShadow={`0 0 10px ${colorTheme}, 0 0 5px ${colorTheme}`}
        display="block"
        width={100}
        height="100%"
        opacity={1}
        position="absolute"
        right={0}
        transform="rotate(3deg) translate(0px, -4px)"
      />
    </Box>
  )
}

export default Bar
