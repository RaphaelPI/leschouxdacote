module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    })

    return config
  },
  images: {
    // loader: "imgix",
    domains: ["leschouxdacote.imgix.net"],
  },
}
