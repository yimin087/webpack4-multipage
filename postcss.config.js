module.exports = {
  // parser: 'sugarss',
  plugins: [
    require('autoprefixer'),
    require('postcss-pxtorem')({
      rootValue: 75,
      unitPrecision: 4,
      propList: ['*'],
      selectorBlackList: ['am-'],
      replace: true,
      mediaQuery: false,
      minPixelValue: 12
    })
  ]
}