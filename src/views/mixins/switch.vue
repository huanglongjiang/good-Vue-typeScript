<template>
  <div>
   <!-- <el-switch @change="switchs(data.item)"
    v-model="data.item.status"
    active-value="1"
    inactive-value="0"
    active-color="#13ce66"
    inactive-color="#ff4949">
  </el-switch> -->
  <el-switch @change="switchs(data.item)"
    v-model="data.item.status"
    active-value="1"
    inactive-value="0">
  </el-switch>
  </div>
</template>

<script lang="ts">
import { Component,Prop,Vue } from 'vue-property-decorator';
import remove from './remove'
@Component({
  mixins: [remove],
})
export default class goodSwitch extends Vue{
  
  @Prop() private data!: Array<object>
  google
  private created() {
    this.google=this.data.google;
  }
}
</script>
