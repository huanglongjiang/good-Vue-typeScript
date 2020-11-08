/*import LoadingComponent from './index.vue'
const goodAbc = {
  install:function (Vue) {
    Vue.component('goodAbc',LoadingComponent)
  }
};
// 导出组件
export default goodAbc*/

import axios from 'axios'
const goodService =  {
  getList: async (params) => {
  	console.log(params)
    //return await axios.get(`./data.json`,params).then(res => res).catch(err => err)
    return await axios.post(`http://www.good1230.com/good/google.php`,params).then(res => res).catch(err => err)
  },
  remove: async (params) => {
  	console.log(params)
    return await axios.post(`http://www.good1230.com/good/google.php`,params).then(res => res).catch(err => err)
  },
  switchs: async (params) => {
  	console.log(params)
    return await axios.post(`http://www.good1230.com/good/google.php`,params).then(res => res).catch(err => err)
  },
}
export default goodService