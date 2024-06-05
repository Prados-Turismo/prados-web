import { useEffect } from "react"

const Favicon = ({ favicon }: { favicon: string }) => {
  useEffect(() => {
    const link = document.querySelector<HTMLLinkElement>("link[rel~='icon']")

    if (link) {
      link.href = favicon
    }
  }, [favicon])

  return null
}

export default Favicon
