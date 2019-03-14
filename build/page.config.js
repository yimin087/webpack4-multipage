module.exports = {
  cacheGroups: {
    jquery: {
      test: /[\\/]node_modules[\\/]jquery/,
      priority: 0,
      name: 'jquery',
    },
    lodash: {
      test: /[\\/]node_modules[\\/]lodash/,
      priority: 0,
      name: 'lodash',
    },
    react: {
      test: /[\\/]node_modules[\\/]react.*/,
      priority: 0,
      name: 'react',
    }
  },
  pages: [
    {
      pageName: 'page1',
      entry: './src/pages/page1/index.js',
      chunks: ['react', 'jquery']
    },
    {
      pageName: 'page2',
      entry: './src/pages/page2/index.js',
      chunks: ['jquery', 'lodash']
    }
  ]
}