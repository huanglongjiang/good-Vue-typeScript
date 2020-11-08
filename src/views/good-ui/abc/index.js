import LoadingComponent from './index.vue'
const goodAbc = {
  install:function (Vue) {
    Vue.component('goodAbc',LoadingComponent)
  }
};
// 导出组件
export default goodAbc