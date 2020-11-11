import Component, { mixins } from 'vue-class-component'
import service from '@/service/index'
import list from './list'     //列表
// 该处需先声明
declare module 'vue/types/vue' {
  interface Vue {
    params2
  }
}

@Component
export default class Index extends mixins( list) {
  
  public submit(){
    
    service.api(this.params2).then(res =>{
      this.dataList();
    })
  }
}