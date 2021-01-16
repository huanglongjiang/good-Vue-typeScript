// 统一接口文件

import axios from 'axios'
export default  {
  /*getList: async (params) => {
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
  },*/
  api: (params) => {

    return axios.post(`/good2/google.php`,params).then(res => res).catch(err => err)
  },
  upload: () => {
    return `/good2/server/fileupload.php`
  },
  filePath: () => {
    return `/good2`
  },
  api2: (params) => {
    return axios.post(`http://100sucai.com/phpajax/${params}.php`,params).then(res => res).catch(err => err)
  },
}