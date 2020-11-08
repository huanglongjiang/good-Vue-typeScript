/*编辑新增*/
import { Vue, Component } from 'vue-property-decorator'
import service from '@/service/index'
// 该处需先声明
declare module 'vue/types/vue' {
  interface Vue {
    params2
  }
}

@Component
export default class myMixins extends Vue {
  
  public submit(){
    
    service.api(this.params2).then(res =>{
      this.dataList();
    })
  }
}