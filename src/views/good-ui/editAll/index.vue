<template>
<div>
  <div class="layout float-left margin-top-5">
    <template v-if="data.selected.length!=0">
    <div class="width-80 height-25 line-height-25 align-center radius-30 font-size-12 color-white inline-block pointer margin-right-5 background-primary" style="box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.12), inset 0 0 2px rgba(0, 0, 0, 0.15);" @click="editAll(1)">批量开启</div>

    <div class="width-80 height-25 line-height-25 align-center radius-30 font-size-12 color-white inline-block pointer background-primary" style="box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.12), inset 0 0 2px rgba(0, 0, 0, 0.15);" @click="editAll(0)">批量关闭</div>
    </template>
    <template v-else>
      <div class="width-80 height-25 line-height-25 align-center radius-30 font-size-12 color-999 inline-block margin-right-5" style="background: #eceeef;box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.12), inset 0 0 2px rgba(0, 0, 0, 0.15);">批量开启</div>
      <div class="width-80 height-25 line-height-25 align-center radius-30 font-size-12 color-999 inline-block" style="background: #eceeef;box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.12), inset 0 0 2px rgba(0, 0, 0, 0.15);">批量开启</div>
    </template>
    
</div>
</div>
</template>

<script lang="ts">
import { Component,Prop,Vue } from 'vue-property-decorator';
import service from '@/service/index'

@Component
export default class goodStatusall extends Vue{
  @Prop() private data: Array<object>

  random=this.data.random
  editAll(item){
    const params={
          "google":this.data.google,
          "operating":"editAll",
          "from":{
              'status':item,
              "selected":this.data.selected,
          }
    }
    service.api(params).then(res =>{
      Object.assign(this.random, this.data.random, {random: Math.round(Math.random()*10000)});
    })
  }
}
</script>