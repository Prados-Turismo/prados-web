import { ReactNode, FC } from "react"
import { Box } from "@chakra-ui/react"

const Container: FC<{
  animationDuration: number
  isFinished: boolean
  children: ReactNode
}> = ({ animationDuration, children, isFinished }) => (
  <Box
    opacity={isFinished ? 0 : 1}
    pointerEvents="none"
    transition={`opacity ${animationDuration}ms linear`}
  >
    {children}
  </Box>
)

export default Container
