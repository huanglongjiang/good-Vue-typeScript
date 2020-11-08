import { Vue, Component } from 'vue-property-decorator'
import service from '@/service/index'
// 该处需先声明
@Component
export default class myMixins extends Vue {


  public switchs(item) {
    const params={
      google: this.google,
      id: item.id,
      operating: "status",
      status: item.status==1?0:1,
    }
    service.api(params).then(res =>{
      this.dataList()
    })
  }
}