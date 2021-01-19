const webpack = require("webpack");
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/good_vue_typescript/' : './',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: 666,
    proxy: {
      "/phpajax": {
        //target:'http://127.0.0.1/',
        target:'http://www.good1230.com/',
        ws: true,
        changeOrigin: true, //改变源
        pathRewrite: {
          '^/phpajax':'/phpajax'
        }
      },
      "/good": {
        //target:'http://127.0.0.1/',
        target:'http://www.good1230.com/',
        ws: true,
        pathRewrite: {
          '^/good2':'/good2'
        }
      }
    }
  }
};
