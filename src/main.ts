import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex';
import store from './vuex/store';
import path from './vuex/global'
import constant from './vuex/const'
import './registerServiceWorker'
import router from './router'
/*import store from './store'*/
import axios from 'axios'
import ElementUI from 'element-ui';
import Ehartist from 'vue-chartist';
import button from './button.css-1.0.4-2/css/button.css'
import chartist from './button.css-1.0.4-2/chartist.min.css'
import style from './button.css-1.0.4-2/style.css'
import style2 from './button/style.css'
import 'element-ui/lib/theme-chalk/index.css';    // 默认主题
import Good from './views/index.js'
Vue.use(Good)
Vue.config.productionTip = false
Vue.use(button)
Vue.use(chartist)
Vue.use(style)
Vue.use(style2)
Vue.use(ElementUI);
Vue.use(Ehartist);
Vue.prototype.$axios = axios;
Vue.prototype.constant = constant;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')



Vue.filter('moment', function (value, formatString) {

    if(value!=false){
      formatString = formatString || 'YYYY-MM-DD HH:mm:ss';
      return moment(parseInt(value)).format(formatString)
    }

     
 })

let num=0;
axios.interceptors.request.use(

config => {

    // Vue.prototype.$hlj.loading();
    num++
    //Good.constant2(config)
    if (localStorage.getItem("token")) {  // 判断是否存在X-Authorization，如果存在的话，则每个http header都加上token
        config.headers["token"] ="token"+localStorage.getItem("token");
    }
    return config;
})


axios.interceptors.response.use(
 res => {
  // console.log(num)
   num--
if(res.data.retType === 'failed'){
      /*let options={
          type:"success",
          message:res.data.retMsg,
      }*/
      //Vue.prototype.$hlj.message(options)
      window.location.href='#/login';
      return
    }

    if(res.data.retType==='success'||res.data.retType==='error'||res.data.retType==='warning'||res.data.retType==='info') {
     const options={
          type:res.data.retType,
          message:res.data.message,
      }
      Vue.prototype.$message(options);
      
      if(res.data.retType==='error'||res.data.retType==='warning') {

        return
      }
    }
   
    // console.log(num)
    if(num===0){
      //Vue.prototype.$hlj.loading2()
    }

    return res;
},
error => {
  /*let options={
          type:"warning",
          message:'接口请求异常！',
      }*/
      //Vue.prototype.$hlj.message(options)
      //return error;
      return Promise.reject('接口请求异常！'+error)
      //return Promise.reject(new Error('接口请求异常！'))
})