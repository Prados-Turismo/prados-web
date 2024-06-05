const getHost = () => {
  const protocol = window.location.protocol
  const hostname = window.location.hostname
  const pathname = window.location.pathname
  const port = window.location.port

  return {
    protocol,
    hostname,
    pathname,
    port
  }
}

export default getHost
