import { Box, Text } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import imgLoading from "../../assets/tres_pontos_loading.gif"

interface Props {
  texts: string[]
}

const LoadingTextRandom = ({ texts }: Props) => {
  const [index, setIndex] = useState(0)

  const loopArr = [...texts, ...texts, ...texts, ...texts, ...texts, ...texts]

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(index + 1)
    }, 3500)
    return () => clearInterval(interval)
  })

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      marginTop="20px"
      width="100%"
    >
      <Text fontSize={17}>{loopArr[index]}</Text>
      <img
        src={imgLoading}
        alt="..."
        style={{ width: "50px", paddingTop: "8px", marginLeft: "-7px" }}
      />
    </Box>
  )
}

export default LoadingTextRandom
