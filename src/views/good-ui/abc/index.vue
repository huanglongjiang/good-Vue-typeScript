<template>
  <div class="layout">
  <el-switch @change="switchs(data.item)"
    v-model="data.item.status"
    active-value="1"
    inactive-value="0">
  </el-switch>
  </div>
  </div>
</template>

<script>
import { Component,Prop,Vue } from 'vue-property-decorator';
import remove from './../../mixins/remove'
import list from './../../mixins/list'
@Component({
  mixins: [list,remove],
})
export default class goodAbc extends Vue{
@Prop() data
google
created() {
    this.google=this.data.google;
  }

}
</script>