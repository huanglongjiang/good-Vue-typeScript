/*const webpack = require("webpack");
module.exports = {
  lintOnSave: true,
  productionSourceMap: false,
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "windows.jQuery": "jquery"
      })
    ]
  },
  chainWebpack: config => {
    //忽略的打包文件
    config.externals({
      vue: "Vue",
      "vue-router": "VueRouter",
      vuex: "Vuex",
      axios: "axios",
      "element-ui": "ELEMENT"
    });
    const entry = config.entry("app");
    entry.add("babel-polyfill").end();
    entry.add("classlist-polyfill").end();
    entry.add("@/mock").end();
  },
  devServer: {
    port: 1888,
    proxy: {
      "/good": {
        //本地服务接口地址
        //target: 'http://localhost',
        //傅树丰的服务接口地址
        // target: 'http://172.28.20.135',
        //涛哥儿的服务接口地址
        // target: 'http://172.28.20.111',
        //杨明威的服务接口地址
        // target: 'http://172.28.20.150:8088',
        //翁新喆的服务接口地址
        // target: 'http://172.28.20.177:80',
        // target: 'http://192.168.2.101:80',
        //史郭文的服务接口地址
        //target: 'http://172.28.20.234:8036',
        // target: 'http://192.168.2.121:8036',
        //姜浩
        // target: 'http://172.28.20.66',
        //黄俊松
        //target: 'http://172.28.21.22',
        //陈金燕
        // target: 'http://172.28.23.254',
        // target: 'http://192.168.2.140',
        // target: 'http://172.28.20.123/',
        
        //洪祥
        //  target: 'http://172.28.20.253:80',
        // 陈舟亮
        // target: 'http://172.28.20.111:80',

        //测试服务地址
        // target: 'http://172.28.20.245:31080', //内网
        // target: 'http://dev.gateway.36cpc.com',  //外网
        //target: "http://test.gateway.36cpc.com", //测试
        //外网prod环境
        // target: '10.116.140.11:31080',
        target:'http://www.good1230.com/',
        //target: 'http://172.28.20.76:8080',
        // target: 'http://sjpt.vanyang.com.cn/api',
        ws: true,
        pathRewrite: {
          '^/good':'/good'
        }
      }
    }
  }
};
*/