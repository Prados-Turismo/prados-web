import { SimpleGrid } from "@chakra-ui/react"

interface Props {
  children: React.ReactNode
}

export default function Row({ children }: Props) {
  return (
    <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: 4, lg: 8 }}>
      {children}
    </SimpleGrid>
  )
}
