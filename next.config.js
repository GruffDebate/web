require('dotenv').config()

const withCss = require('@zeit/next-css')

module.exports = withCss({
  webpack(config, options) {
    config.module.rules.push({
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
        },
      },
    })
    return config
  },
  env: {
    API_URL: process.env.API_URL,
    ASSETS_BUCKET: process.env.ASSETS_BUCKET,
    ASSETS_BUCKET_NAME: process.env.ASSETS_BUCKET_NAME,
    ACCESS_KEY: process.env.ACCESS_KEY,
    SECRET_KEY: process.env.SECRET_KEY,
  },
})
