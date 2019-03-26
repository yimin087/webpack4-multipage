module.exports = {
  cacheGroups: {
    jquery: {
      test: /[\\/]node_modules[\\/]jquery/,
      priority: 0,
      name: 'jquery',
    }
  },
  pages: [
    {
      pageName: '19ReportFeb',
      entry: './src/pages/19ReportFeb/index.js',
      chunks: []
    }
  ]
}