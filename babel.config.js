module.exports = (api) => {
  api.cache(true)

  const presets = [
    "@babel/preset-typescript",
    "@babel/preset-env",
    ["@babel/preset-react", { runtime: "automatic" }]
  ]

  return {
    presets
  }
}
