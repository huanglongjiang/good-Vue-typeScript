import { Vue, Component } from 'vue-property-decorator'
import service from '@/service/index'
// 该处需先声明
declare module 'vue/types/vue' {
  interface Vue {
    google
    total:number
    params
  }
}

@Component
export default class myMixins extends Vue {
  list=[]
  total=0
  
  public dataList(){
    return new Promise((resolve,reject)=>{
      service.api(this.params).then(res =>{
        this.list=res.data.data;
        this.total=parseInt(res.data.total);
        resolve(res.data.data)
      })
    })
  }
}