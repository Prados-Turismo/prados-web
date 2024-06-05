import { Spinner } from "@chakra-ui/react"
import { useIsFetching, useIsMutating } from "react-query"
import { NProgress } from "@tanem/react-nprogress"

import Bar from "./Bar"
import Container from "./Container"

const Fetching = () => {
  const isFetching = !!useIsFetching()
  const isMutating = !!useIsMutating()

  return (
    <NProgress isAnimating={isFetching || isMutating}>
      {({ animationDuration, isFinished, progress }) => (
        <Container
          animationDuration={animationDuration}
          isFinished={isFinished}
        >
          <Bar animationDuration={animationDuration} progress={progress} />
          <Spinner
            width="25px"
            height="25px"
            position="fixed"
            top="10px"
            left="10px"
            zIndex="1031"
            thickness="4px"
            speed="0.65s"
            color="brand.500"
            emptyColor="brand.200"
            role="status"
            transform="translate(-50%, -50%)"
          />
        </Container>
      )}
    </NProgress>
  )
}

export default Fetching
