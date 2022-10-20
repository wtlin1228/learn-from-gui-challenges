const postcssPresetEnv = require('postcss-preset-env')
const postcssEasings = require('postcss-easings')

module.exports = {
  plugins: [
    postcssEasings(),
    postcssPresetEnv({
      stage: 0,
    }),
  ],
}
