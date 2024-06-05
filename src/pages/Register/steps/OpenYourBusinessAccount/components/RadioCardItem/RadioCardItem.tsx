import { Box, Flex, Text, useRadio } from "@chakra-ui/react"
import { BoxCard } from "./styled"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RadioCardItem = (props: any) => {
  const { getInputProps, getCheckboxProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as="label" marginInlineStart="0 !important">
      <input {...input} />
      <BoxCard {...checkbox}>
        <Flex justifyContent="flex-start" w="max-content">
          <Box className="inputRadio">
            <Box className="inputRadioChecked"></Box>
          </Box>
        </Flex>
        <Text>{props.card.title}</Text>
      </BoxCard>
    </Box>
  )
}

export default RadioCardItem
