<template>
  <div>

    <div class="table-data">
      <table class="table-group panel-9">
        <thead class="block-header">
          <tr>
            <th>头像</th>
            <th>账号(匿名)</th>
            <th>邮箱</th>
            <th>登录账号</th>
            <th>用户角色</th>
            <th>来源IP</th>
            <th>操作类型</th>
            <th>登录时间</th>
            <th>操作结果</th>
            
          </tr>
        </thead>
        <tbody>
          <template v-for="(item,index) in list">
            <tr :key="index">
              <td>{{item.account}}</td>
              <td>{{item.account}}</td>
              <td>{{item.email}}</td>
              <td>{{item.loginType}}</td>
              <td>{{item.role}}</td>
              <td>{{item.ip}}</td>
              <td>{{item.type}}</td>
              <td>{{item.time}}</td>
              <td>
                <span class="a-link pointer margin-right-10">编辑</span>
                <span class="a-link pointer" @click="remove(index)">删除</span>
              </td>
            </tr>
          </template>
        </tbody>
      </table> 
    </div>
  </div>
</template>

<script lang="ts">
import service from '@/service/index'
import { Component, Vue } from 'vue-property-decorator';
import remove from './mixins/remove'
import list from './mixins/list'

@Component({
  mixins: [remove,list]
})
export default class Index extends Vue {
  google: string = "t-10001"
  list=[]
  params={
      google: "t-10001",
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
