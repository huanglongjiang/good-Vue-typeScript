<template>
    <good-page>
        <good-breadcrumb :list="constant.breadcrumb.user" />
        <good-box data="true">
        <good-tag tagName="服务类型" :list="constant.filter.user.type" :selected.sync='params.role' />
        <good-tag tagName="服务状态" :list="constant.filter.user.status" :selected.sync='params.status' />
        </good-box>
        <good-menu>
            <!-- <good-statusall :google="google" :selected="selected" :random.sync='random'></good-statusall> -->
            <good-button class='float-right' icon="el-icon-edit" type="primary" v-if="permission.user_add" @click="dialog">新增用户</good-button>
            <good-total class="float-right" :total='total'></good-total>
        </good-menu>
        
        <good-box :data="list">
            <div class="table-data">
                <table class="table-group line-height-30">
                    <thead class="block-header">
                        <tr>
                           <!--  <th style="width:100px;">
                                <good-checkbox v-model="selectAll">全选择</good-checkbox>
                            </th> -->
                            <th>用户头像</th>
                            <th>用户名</th>
                            <th>用户邮箱</th>
                            <th>注册时间</th>
                            <th>类型</th>
                            <th>状态</th>
                            <!-- <th v-if="state.permission.user_edit || state.permission.user_delete">操作</th> -->
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(item,index) in list">
                            <tr :class="{'background-disabled':item.status==0}" :key="index">
                                <!-- <td>
                                    <good-checkbox v-model="selected" :label="item.id">
                                        <template v-if="selected.includes(item.id)">已选择</template>
                                        <template v-else>选择</template>
                                    </good-checkbox>
                                </td> -->
                                <td>
                                    <div class="line-height-30 padding-3">
                                        <template v-if="item.file!=''">
                                        <img :src="filePath+'/'+item.file" alt="" class="width-30 height-30 radius-20 block" v-if="item.file.length>7">
                                        <img :src="'http://www.good1230.com/good/RandomUser/'+item.file" alt="" class="width-30 height-30 radius-20 block" v-else>
                                    </template>
                                    <template v-else>
                                        <img src="static/images/tianmao.jpg" alt="" class="width-30 height-30 radius-20 block">
                                    </template>
                                    </div>
                                    
                                </td>
                                <td><span>{{item.name}}</span></td>
                                <td><span>{{item.email}}</span></td>
                                
                                <td>{{item.time}}</td>
                                <td>
                                    <good-label background="background-one" v-if="item.role==0">普通用户</good-label>
                                    <good-label background="background-two" v-if="item.role==1">管理员</good-label>
                                    <good-label background="background-three" v-if="item.role==2">超级管理员</good-label>
                                </td>
                                <td>
                                    <good-switch :data="{item,google}" :key="index" v-if="permission.user_status"></good-switch>
                                    <good-status :val='item' :key="index" v-else></good-status>
                                </td>

                                <template>
                                     <!-- <td>
                                        <good-button2 v-if="state.permission.user_edit" @click="select(item)">改</good-button2>
                                        <good-button2 v-if="state.permission.user_delete" @click="remove(item)">弃</good-button2>
                                    </td> -->
                                </template>
                            </tr>
                        </template>
                    </tbody>    
                </table> 
            </div>
        </good-box>
        <div class="layout margin-bottom-10 color-ccc float-left margin-top-10  margin-left-10 font-size-12"> 
                注：超级管理员可操作此页面
        </div>
        <good-pagination :data="{total,params}"></good-pagination>
        <!-- 模态框 -->
        
          <good-dialog :title="userTitle" :visible.sync='dialogVisible'>
            <div slot="body">
            <div class="table-default">
                <table class="table-group line-height-30 width-max">
                    
                    <template v-if="userTitle=='新增用户'">
                        <tr>
                            <tds-label star>用户名：</tds-label>
                            <td><el-input v-model="form.name" placeholder="请输入内容"></el-input></td>
                        </tr>
                        <tr>
                            <tds-label star>用户邮箱：</tds-label>
                            <td><el-input v-model="form.email" placeholder="请输入内容"></el-input></td>
                        </tr>
                    </template>
                    <template v-else>
                        <tr>
                            <tds-label star>用户名：</tds-label>
                            <td><el-input v-model="form.name" disabled placeholder="请输入内容"></el-input></td>
                        </tr>
                        <tr>
                            <tds-label star>用户邮箱：</tds-label>
                            <td><el-input v-model="form.email" disabled placeholder="请输入内容"></el-input></td>
                        </tr>
                    </template>
                    <tr>
                        <tds-label>用户类型：</tds-label>
                        <td>
                            <el-radio v-model="form.role" label="0">普通用户</el-radio>
                            <el-radio v-model="form.role" label="1">管理员</el-radio>
                            <el-radio v-model="form.role" label="2" disabled>超级管理员</el-radio>
                        </td>
                    </tr>
                    <tr>
                        <tds-label>服务状态：</tds-label>
                        <td>
                            <el-radio v-model="form.status" label="0">冻结</el-radio>
                            <el-radio v-model="form.status" label="1">正常</el-radio>
                        </td>
                    </tr>
                </table> 
            </div>
            </div>
          <div slot="footer">
            <good-button type="primary" @click="submit">确 定</good-button>
          </div>
        </good-dialog>
        <!-- 模态框 -->
</good-page>
</template>

<script lang="ts">
import { Watch } from 'vue-property-decorator';
import Component, { mixins } from 'vue-class-component'
import { State } from 'vuex-class';
import service from '@/service/index'
import remove from './mixins/remove'   //删除
import list from './mixins/list2'     //列表
import edit from './mixins/edit'   //编辑

@Component({
  mixins: [remove,list,edit],
})
export default class Index extends mixins( list) {
  @State(state => state.state.permission) permission
  userTitle='新增用户';
  dialogVisible=false
  google= "t-10010"
  filePath
  list
  status=0
  total
  params={
      google: this.google,
      name: '',
      operating: 'lists',
      page: 0,
      pagesize: 10,
      role: '',
      status: '',
  }

  params2={}
  form={}

  @Watch('params',{ deep: true })
  onParamsChanged() {
    this.dataList();
  }

  private created() {
    this.filePath=service.filePath();
    this.dataList();
  }

  dialog(item){
    this.dialogVisible=true;
    this.userTitle='新增用户';
    let operating='insert'

    if(item){
      operating='update';
      this.userTitle='编辑用户';
      this.form={...item}
    }else{
      this.form={
        email: '',
        name: '',
        role: '0',
        status: '1',
      }
    }
    this.params2={
      google: this.google,
      operating: operating,
      form:this.form,
    }

  }
}
</script>
