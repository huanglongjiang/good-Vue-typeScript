<template>
    <good-page>
        <good-breadcrumb :list="constant.breadcrumb.help" />
        <good-box data="true">
        <good-tag tagName="服务类型" :list="constant.filter.help.type" :selected.sync='params.type' />
        <good-tag tagName="服务状态" :list="constant.filter.help.status" :selected.sync='params.status' />
        </good-box>
        
        <good-menu>
            <good-statusall v-if="permission.help_status_all" :data="{google,selected,random}"></good-statusall>
            <good-button class='float-right' type="primary" v-if="permission.help_add" @click="dialog">新增客服</good-button>
            <good-total class="float-right" :total='total'></good-total>
        </good-menu>

        <good-box :data="list">
            <div class="table-data">
                <table class="table-group line-height-30">
                    <thead class="block-header">
                        <tr>
                            <th class="width-100" v-if="permission.help_status_all">
                                <good-checkbox v-model="selectAll">全选择</good-checkbox>
                            </th>
                            <th>类型</th>
                            <th>用户名</th>
                            <th>QQ</th>
                            <th>状态</th>
                            <th v-if="permission.help_edit||permission.help_delete">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(item,index) in list">
                            <tr :class="{'background-disabled':item.status==0}">
                                <td v-if="permission.help_status_all">
                                    <good-checkbox v-model="selected" :label="item.id">
                                        <template v-if="selected.includes(item.id)">已选择</template>
                                        <template v-else>选择</template>
                                    </good-checkbox>
                                </td>
                                <td>    
                                    <good-label background="background-one" v-if="item.type==0">咨询客服</good-label>
                                    <good-label background="background-two" v-if="item.type==1">技术客服</good-label>
                                    <good-label background="background-three" v-if="item.type==2">售后客服</good-label>
                                </td>
                                <td>{{item.name}}</td>
                                <td>{{item.qq}}</td>
                                <td>
                                    <good-switch :data="{item,google}" :key="index" v-if="permission.help_status"></good-switch>
                                    <good-status :val='item' :key="index" v-else></good-status>
                                </td>
                                <td>
                                    <good-button2 v-if="permission.help_edit" @click="dialog(item)">改</good-button2>
                                    <good-button2 v-if="permission.help_delete" @click="remove(item)">弃</good-button2>
                                </td>
                            </tr>
                        </template>
                    </tbody>    
                </table> 
            </div>
        </good-box>
        <good-pagination :data="{total,params}"></good-pagination>

        <!-- 模态框 -->

        <good-dialog :title="helpTitle" :visible.sync='dialogVisible'>
            <div slot="body">
                <div class="table-default">
                    <table class="table-group">
                        
                        
                        <tr>
                            <tds-label star>用户名：</tds-label>
                            <td><el-input v-model="form.name" placeholder="请输入内容"></el-input></td>
                        </tr>
                        <tr>
                            <tds-label star>QQ：</tds-label>
                            <td><el-input v-model="form.qq" placeholder="请输入内容"></el-input></td>
                        </tr>
                        <tr>
                            <tds-label>代码标签：</tds-label>
                            <td><el-input v-model="'{$qq.'+form.id+'}'" :disabled="true" placeholder="请输入内容"></el-input></td>
                        </tr>
                        <tr>
                            <tds-label>用户类型：</tds-label>
                            <td>
                                <good-radio v-model="form.type" label="0">咨询客服</good-radio>
                                <good-radio v-model="form.type" label="1">技术客服</good-radio>
                                <good-radio v-model="form.type" label="2">售后客服</good-radio>
                            </td>
                        </tr>
                        <tr>
                            <tds-label>服务状态：</tds-label>
                            <td>

                                <good-radio v-model="form.status" label="0">关闭</good-radio>
                                <good-radio v-model="form.status" label="1">开启</good-radio>
                            </td>
                        </tr>
                    </table> 
                </div>
            </div>
            <div slot="footer">

                <good-button type="default" @click="dialogVisible = false">取 消</good-button>
                <good-button type="primary" @click="submit">确 定</good-button>
            </div>
        </good-dialog>
        <!-- 模态框 -->
    </good-page>
</template>

<script lang="ts">
import { Watch,Vue } from 'vue-property-decorator';
import Component, { mixins } from 'vue-class-component'
import { State } from 'vuex-class';
import list from './mixins/list'     //列表
import edit from './mixins/edit'   //编辑
import remove from './mixins/remove'   //删除
import statusall from './mixins/statusall'   //全选状态设置

@Component({
  mixins: [list,edit,remove,statusall],
})
export default class Index extends mixins( list) {
  @State(state => state.state.permission) permission: any 
  dialogVisible=false
  helpTitle='新增客服'
  list
  total
  google= "t-10011"
  params={
      google: this.google,
      name: "",
      operating: "lists",
      page: 0,
      pagesize: 10,
      status: "",
      type:"",
  }

  form={}
  params2={}
  selected= []
  random={random:0}   //用来出发mixins文件，达到数据同步，也不知道为啥得用对象才能同步

  @Watch('random',{ deep: true })
  onRandomChanged(val) {
    this.dataList();
  }

  @Watch('params',{ deep: true })
  onParamsChanged(val) {
    this.dataList();
  }

  private created() {
    this.dataList()
  }

  dialog(item){
    this.helpTitle='新增客服'
    this.dialogVisible=true;
    let operating='insert'
    if(item){
      this.helpTitle='编辑客服'
      operating='update';
      this.form={...item}
    }else{
      this.form={
        id: 0,
        name: "",
        qq: "",
        status: "1",
        type: "0",
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