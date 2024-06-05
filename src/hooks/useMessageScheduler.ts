import { useEffect, useState } from "react"

let timeout: NodeJS.Timeout

export function useMessageScheduler(messages: string[], timeGap: number) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [timeControll, setTimeControll] = useState(0)

  useEffect(() => {
    if (currentIndex !== messages.length - 1) {
      timeout = setTimeout(() => {
        setTimeControll((state) => state + 1)
        setCurrentIndex((state) => state + 1)
      }, timeGap)
    }

    return () => clearTimeout(timeout)
  }, [timeControll])

  return { message: messages[currentIndex] }
}
