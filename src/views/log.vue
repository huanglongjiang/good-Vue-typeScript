<template>
    <good-page>
        <good-breadcrumb :list="constant.breadcrumb.log" />
        <good-menu>
            <good-total class="float-right" :total='total'></good-total>
        </good-menu>
        <good-box :data="list">
            <div class="table-data">
                <table class="table-group line-height-30">
                    <thead class="block-header">
                        <tr>
                            <th>访客头像</th>
                            <th>账号(匿名)</th>
                            <th>邮箱</th>
                            <th>登录账号</th>
                            <th>用户角色</th>
                            <th>来源IP</th>
                            <th>操作类型</th>
                            <th>登录日期</th>
                            <th>操作结果</th>
                        </tr>
                    </thead>
                    </thead>
                    <tbody>
                        <template v-for="(item,index) in list">
                        <tr>
                            <td>
                                <div class="line-height-30 padding-3">
                                    <template v-if="item.file!=''">
                                    <img :src="filePath+'/'+item.file" alt="" class="width-30 height-30 radius-20 block">
                                </template>
                                <template v-else>
                                    <img src="static/images/tianmao.jpg" alt="" class="width-30 height-30 radius-20 block">
                                </template>
                                </div>
                            </td>
                            <td><span>{{item.account}} <span class="color-999">({{item.name}})</span></span></td>
                            <td><span>{{item.email}}</span></td>
                            <td><span>{{item.loginType}}</span></td>
                            <td>
                                <good-label background="background-one" v-if="item.role==0">普通用户</good-label>
                                <good-label background="background-two" v-if="item.role==1">管理员</good-label>
                                <good-label background="background-three" v-if="item.role==2">超级管理员</good-label>
                            </td>
                            <td>{{item.ip}}</td>
                            <td>{{item.type}}</td>
                            <td>{{item.time}}</td>
                            <td class="color-ccc">{{item.result}}</td>
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
import { Component,Watch,Vue } from 'vue-property-decorator';
import list from './mixins/list'     //列表

@Component({
  mixins: [list],
})
export default class Index extends Vue {
  list
  total
  params={
      google: "t-10001",
      operating: "lists",
      page: 0,
      pagesize: 10,
  }

  @Watch('params',{ deep: true })
  onParamsChanged(val) {
    this.dataList();
  }
  private created() {
    this.dataList();
  }

}
</script>
