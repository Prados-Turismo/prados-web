import { Box, Flex, Text, useRadio } from "@chakra-ui/react"
import { BoxCard } from "./styled"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RadioCard = (props: any) => {
  const { getInputProps, getCheckboxProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as="label" marginInlineStart="0 !important">
      <input {...input} />
      <BoxCard {...checkbox}>
        <Flex justifyContent="flex-end" w="100%">
          <Box className="inputRadio">
            <Box className="inputRadioChecked"></Box>
          </Box>
        </Flex>

        {props.card.icon}
        <Text>{props.card.label}</Text>
      </BoxCard>
    </Box>
  )
}

export default RadioCard
