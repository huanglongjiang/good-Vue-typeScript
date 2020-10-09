<template>
  <div>

    <div class="table-data">
      <table class="table-group panel-9">
        <thead class="block-header">
          <tr>
            <th>缩略图</th>
            <th>发布作者</th>
            <th>所属栏目</th>
            <th>标题</th>
            <th>创建时间</th>
            <th>状态</th>
            <th>操作</th>
            
          </tr>
        </thead>
        <tbody>
          <template v-for="(item,index) in list">
            <tr :key="index">
              <td>{{item.image}}</td>
              <td>{{item.author}}</td>
              <td>{{item.parentName}}</td>
              <td>{{item.title}}</td>
              <td>{{item.insertTime}}</td>
              <td>{{item.status}}</td>
              <td>
                <span class="a-link pointer margin-right-10">编辑</span>
                <span class="a-link pointer" @click="remove(item.id)">删除</span>
              </td>
            </tr>
          </template>
        </tbody>
      </table> 
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import remove from './mixins/remove'
import list from './mixins/list'

@Component({
  mixins: [remove,list]
})
export default class Index extends Vue {
  google= "t-10008"
  list=[]
  params={
      google: "t-10008",
      operating: "lists",
      page: 0,
      pagesize: 10,
  }
  private created() {
    this.chart='123465dfsdfsf';
    this.dataList();
  }
}
</script>
