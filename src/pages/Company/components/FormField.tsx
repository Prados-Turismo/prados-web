import { Input, Box, SimpleGrid, InputProps } from "@chakra-ui/react"

interface Props extends InputProps {
  label: string
  name: string
}

export default function FormField({ label, name, ...rest }: Props) {
  return (
    <SimpleGrid templateColumns={{ base: "none", xl: "150px 1fr" }}>
      <Box mr="2" display="flex" alignItems="center">
        <Box as="label" htmlFor={name} mb={{ base: "4", xl: "0" }}>
          {label}
        </Box>
      </Box>
      <Box flex="1" display="flex" alignItems="center">
        <Input name={name} h="12" rounded="none" {...rest} />
      </Box>
    </SimpleGrid>
  )
}
