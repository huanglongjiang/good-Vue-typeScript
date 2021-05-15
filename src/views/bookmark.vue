<template>
    <good-page>
        <good-breadcrumb :list="constant.breadcrumb.bookmark" />
        <good-menu>
            <good-total class="float-right" :total='total'></good-total>
        </good-menu>
        <good-box :data="list">
            <div class="table-data">
                <table class="table-group line-height-30">
                    <thead class="block-header">
                        <tr>
                            <th class="width-200">标题</th>
                            <th class="width-200">网址/Git</th>
                            <th class="width-200">备注</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(item,index) in list">
                            <tr  :key="item.id">
                                <td>
                                    <span style="min-width:20px" class="padding-left-5 padding-right-5 height-20 block radius-20 align-center line-height-20 color-white float-left position-r top-5 font-size-12 margin-right-10" :class="setBackground(index)">
                                        {{item.id}}</span>{{item.title}}</td>
                                <td><a class="a-link" :href="item.url" target="_blank">{{item.url}}</a></td>
                                <td>{{item.text?item.text:'-'}}</td>
                            </tr>
                        </template>
                    </tbody>
                </table> 
            </div>
        </good-box>
        <good-pagination :data="{total,params}"></good-pagination>
    </good-page>
</template>

<script lang="ts">
import { Watch } from 'vue-property-decorator';
import Component, { mixins } from 'vue-class-component'
import service from '@/service/index'
import list from './mixins/list'     //列表

@Component({
  mixins: [list],
})
export default class Index extends mixins( list) {
  filePath
  list
  total
  params={
      google: "t-20009",
      operating: "lists",
      page: 0,
      pagesize: 10,
  }

  @Watch('params',{ deep: true })
  onParamsChanged() {
    this.dataList();
  }
  private created() {
    this.filePath=service.filePath();
    this.dataList();
  }
  setBackground(item){
     return item===0?'background-one':
     item===1?'background-two':
     item===2?'background-three':'background-ddd'
  }

}
</script>
