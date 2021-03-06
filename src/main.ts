import Vue from 'vue'
import App from './App.vue'
import store from './vuex/store'
import moment from 'moment';
import constant from './vuex/const'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import Ehartist from 'vue-chartist'
import Good from './views/index.js'
import color from './../public/color.js'
import 'element-ui/lib/theme-chalk/index.css'    // 默认主题
import './registerServiceWorker'
import './../public/button.css/css/button.css'
import './../public/css/chartist.min.css'
import './../public/css/style.css'
color() //皮肤设置
Vue.use(Good)
Vue.config.productionTip = false
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


axios.interceptors.response.use((res: any) => {
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
     const options: any={
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
(error: any) => {
  /*let options={
          type:"warning",
          message:'接口请求异常！',
      }*/
      //Vue.prototype.$hlj.message(options)
      //return error;
      return Promise.reject('接口请求异常！'+error)
      //return Promise.reject(new Error('接口请求异常！'))
})