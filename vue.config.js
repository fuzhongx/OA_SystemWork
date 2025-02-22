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
    devServer: {
      open:false,
      host:"localhost",//外部访问
      port:3000,
      client: {
        overlay: false
      },
      proxy: {
        '/api': {
           target:'https://demo.tuoluojiang.com', // 目标API地址
          // target:process.env.VUE_APP_API_URL, // 目标API地址
          ws:false,
          changeOrigin: true, // 开启代理，在本地创建一个虚拟服务器，然后发送请求的数据，会同时会收到请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
          pathRewrite: {
            '^api': '' // 路径重写，移除路径中的/api
          }
        }
      }
    }
})
