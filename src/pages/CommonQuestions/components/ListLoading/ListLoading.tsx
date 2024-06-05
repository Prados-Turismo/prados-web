import { Center, Stack } from "@chakra-ui/react"
import Loading from "../CardQuestion/Loading"

const ListLoading = () => {
  return (
    <Center mt={10}>
      <Stack direction="column" gap="50px" flexWrap="wrap" mt={20}>
        {Array.from({ length: 2 }).map((_, index) => (
          <Loading key={index} />
        ))}
      </Stack>
    </Center>
  )
}
export default ListLoading
