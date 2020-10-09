import { Vue, Component } from 'vue-property-decorator'
import service from '@/service/index'
// 该处需先声明


@Component
export default class myMixins extends Vue {
	google= ''
  list=[]
  params={}

  public dataList(){
    service.getList(this.params).then(res =>{
      this.list=res.data.data;
      console.log(this.list)
    })
  }
}