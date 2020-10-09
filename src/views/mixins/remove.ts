import { Vue, Component } from 'vue-property-decorator'
import service from '@/service/index'
// 该处需先声明


@Component
export default class myMixins extends Vue {
	chart= ''
	google= ''
    public remove(id) {
    const params={
      google: this.google,
      id: id,
      operating: "delete",
    }
    service.remove(params).then(res =>{
      console.log(res)
      console.log(this.dataList)
    })
  }
}