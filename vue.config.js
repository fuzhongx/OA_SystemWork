const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const resolve = dir => {
  return path.join(__dirname, dir)
}
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      sass: {
        additionalData: `@use  "~@/styles/styles.scss"`
      },
      scss: {
        additionalData: `@use  "~@/styles/styles.scss";`
      }
    }
    },
    chainWebpack(config) {
      config.module
        .rule('svg')
        .exclude.add(resolve('src/assets/svg'))
        .end()
      config.module
        .rule('icons')
        .test(/\.svg$/)
        .include.add(resolve('src/assets/svg'))
        .end()
        .use('svg-sprite-loader')
        .loader('svg-sprite-loader')
        .options({
          symbolId: 'icon-[name]',
        })
        .end()
        config.plugin('define').tap((definitions) => {
          Object.assign(definitions[0], {
            __VUE_OPTIONS_API__: 'true',
            __VUE_PROD_DEVTOOLS__: 'false',
            __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
          })
          return definitions
        })
    },
})
