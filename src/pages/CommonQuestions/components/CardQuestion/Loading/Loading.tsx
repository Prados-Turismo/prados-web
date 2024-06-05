import { Skeleton, Stack } from "@chakra-ui/react"

const Loading = () => {
  return (
    <Stack maxWidth={700} direction="column" gap="16px">
      <Stack maxWidth={700}>
        <Skeleton height={15} maxWidth={700} />
        <Stack mt="16px !important">
          <Skeleton height="10px" width={320} />
          <Skeleton height="10px" width={320} />
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Loading
