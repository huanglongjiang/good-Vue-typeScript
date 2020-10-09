<template>
  <div>

    <div class="table-data">
      <table class="table-group panel-9">
        <thead class="block-header">
          <tr>
            <th>用户名</th>
            <th>用户邮箱</th>
            <th>头像</th>
            <th>注册时间</th>
            <th>类型</th>
            <th>状态</th>
            <th>操作</th>
            
          </tr>
        </thead>
        <tbody>
          <template v-for="(item,index) in list">
            <tr :key="index">
              <td>{{item.name}}</td>
              <td>{{item.email}}</td>
              <td>{{item.image}}</td>
              <td>{{item.role}}</td>
              <td>{{item.name}}</td>
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
  google= "t-10010"
  list=[]
  params={
      google: "t-10010",
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
