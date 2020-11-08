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
get selectAll(){return this.list ? this.selected.length == this.list.length : false;}
set selectAll(value){
  var selected = [];
      if (value) {
          this.list.forEach(function (item) {
              selected.push(item.id);
          });
      }
      this.selected = selected;
}
}