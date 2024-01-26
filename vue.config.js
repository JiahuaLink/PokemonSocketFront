const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    proxy:{
      '/socket.io':{
        target:'http://127.0.0.1:8889',
        changeOrigin:true,
        ws:true,
        pathRewrite:{
          '^/socket.io':'/socket.io'
        }
      }
    }
  }
})
