const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  configureWebpack: {
    plugins: [
      require('unplugin-auto-import/webpack'),
      require('unplugin-vue-components/webpack'),
    ],
  },
  transpileDependencies: true,
  publicPath:"./"
})
