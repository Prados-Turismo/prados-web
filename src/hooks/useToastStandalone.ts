import { createStandaloneToast } from "@chakra-ui/toast"

export const useToastStandalone = ({
  title,
  description,
  status = "success",
  duration = 7000
}: {
  title?: string
  description?: string
  status?: "info" | "warning" | "success" | "error" | "loading" | undefined
  duration?: number
}) => {
  const { toast } = createStandaloneToast()

  toast({
    title,
    description,
    status,
    duration,
    isClosable: true,
    variant: "top-accent",
    position: "top-right"
  })
}
