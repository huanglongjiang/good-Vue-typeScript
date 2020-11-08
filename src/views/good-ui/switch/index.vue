<template>
  <div class="layout">
    <div class="layout container">
    <div class="switch" :class="{'a':data.item.status==1}" @click="checked(data.item)">
      <span class="switch-label" data-on="on" data-off="off"></span>
      <span class="switch-handle"></span>
    </div>
  </div>
  </div>
</template>

<script>
import { Component,Prop,Vue } from 'vue-property-decorator';
import service from '@/service/index'
import remove from './../../mixins/remove'
import list from './../../mixins/list'
@Component({
  mixins: [list,remove],
})
export default class goodSwitch extends Vue{
@Prop() data
google
item2
created() {
  this.google=this.data.google;
  this.item2=this.data.item;
}
checked(item){
  console.log(item)
    const params={
      "google":this.data.google,
      "operating":"status",
      "id":item.id,
      "status":item.status,
    }

    service.api(params).then(res =>{
      if(res.status==200){
        Object.assign(this.data.item, {status: item.status==1?0:1});
        Object.assign(this.item2, this.data.item,);
      }
                  
    });
    
}

}
</script>