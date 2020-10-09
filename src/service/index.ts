// 正式环境调用service（实际开发请查看该部分代码）
//import service from '../util/request'
// mock数据直接调用axios

/*const qs = require('qs')*/
// const baseUrl = '/'

import axios from 'axios'
export default  {
  getList: async (params) => {
  	console.log(params)
    //return await axios.get(`./data.json`,params).then(res => res).catch(err => err)
    return await axios.post(`http://www.good1230.com/vue/google.php`,params).then(res => res).catch(err => err)
  },
  remove: async (params) => {
  	console.log(params)
    return await axios.post(`http://www.good1230.com/vue/google.php`,params).then(res => res).catch(err => err)
  },
}