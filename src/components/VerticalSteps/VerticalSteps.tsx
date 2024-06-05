import React, { ReactNode } from "react"
import { Box, Flex, Text } from "@chakra-ui/react"

interface StepProps {
  index: number
  title: string
  isCompleted: boolean
  active: boolean
  children: ReactNode
}

interface VerticalStepsProps {
  steps: StepProps[] | []
}

const VerticalSteps: React.FC<VerticalStepsProps> = ({ steps }) => {
  return (
    <Flex direction="column" alignItems="flex-start">
      {steps
        .filter(({ active }) => active)
        .map(({ index, title, isCompleted, children }) => (
          <Box key={index} width="100%">
            <Flex direction="row" alignItems="center">
              <Flex
                w={8}
                h={8}
                borderRadius="full"
                bg={isCompleted ? "brandSecond.500" : "gray.200"}
                alignItems="center"
                justifyContent="center"
                fontSize="md"
                fontWeight="bold"
                border="2px solid"
                borderColor="brandSecond.500"
                color={isCompleted ? "contrast" : "unset"}
                mb={1}
                mt={1}
              >
                {isCompleted ? "✓" : index + 1}
              </Flex>
              <Text
                ml={4}
                fontWeight="medium"
                color={isCompleted ? "gray.500" : "gray.900"}
              >
                {title}
              </Text>
            </Flex>
            <Flex
              minHeight="30px"
              borderLeft={
                isCompleted || index + 1 < steps.length ? "2px solid" : "unset"
              }
              ml={4}
              pl="16px"
              borderColor={isCompleted ? "brandSecond.500" : "gray.300"}
            >
              {children}
            </Flex>
          </Box>
        ))}
    </Flex>
  )
}

export default VerticalSteps
