<template>
    <good-page>
        <good-breadcrumb :list="constant.breadcrumb.link" />
        <good-box data="true">

        <good-tag tagName="服务类型" :list="constant.filter.link.type" :selected.sync='params.type' />
        <good-tag tagName="服务状态" :list="constant.filter.link.status" :selected.sync='params.status' />
        </good-box>
        <good-menu>
            <good-statusall :data="{google,selected,random}" v-if="permission.link_status_all"></good-statusall>
            <good-button class='float-right' icon="el-icon-edit" type="primary" v-if="permission.link_add" @click="dialog">新增友情链接</good-button>
            <good-total class="float-right" :total='total'></good-total>
        </good-menu>
        <good-box :data="list"> 
            <div class="table-data">
                <table class="table-group line-height-30">
                    <thead class="block-header">
                        <tr>
                            <th class="width-100" v-if="permission.link_status_all">
                                <good-checkbox v-model="selectAll">全选择</good-checkbox>
                            </th>
                            <th>网站名称</th>
                            <th>网址</th>
                            <th>开始时间</th>
                            <th>结束时间</th>
                            <th>类型</th>
                            <th>服务状态</th>
                            <th v-if="permission.link_edit || permission.link_delete">操作</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(item,index) in list">
                            <tr :class="{'background-disabled':item.status==0}">
                                <td v-if="permission.link_status_all">
                                    <good-checkbox v-model="selected" :label="item.id">
                                        <template v-if="selected.includes(item.id)">已选择</template>
                                        <template v-else>选择</template>
                                    </good-checkbox>
                                </td>
                                <td>{{item.name}}</td>
                                <td>{{item.link}}</td>
                                <td>{{item.starttime,'YYYY-MM-DD'}}</td>
                                <td>{{item.endtime,'YYYY-MM-DD'}}</td>
                                <td>
                                    <good-label background="background-one" v-if="item.type==0">友情链接</good-label>
                                    <good-label background="background-two" v-if="item.type==1">友情链接2</good-label>
                                    <good-label background="background-three" v-if="item.type==2">全站链接</good-label>
                                    <good-label background="background-four" v-if="item.type==3">友情链接2</good-label>
                                    <good-label background="background-five" v-if="item.type==4">全站链接</good-label>
                                </td>
                                <td>
                                    <good-switch :data="{item,google}" :key="index" v-if="permission.link_status"></good-switch>
                                    <good-status :val='item' :key="index" v-else></good-status>
                                </td>
                                <td>
                                    <good-button2 v-if="permission.link_edit" @click="dialog(item)">改</good-button2>
                                    <good-button2 v-if="permission.link_delete" @click="remove(item)">弃</good-button2>
                                </td>
                            </tr>
                        </template>
                    </tbody>    
                </table> 
            </div>
        </good-box>
        <good-pagination :data="{total,params}"></good-pagination>

        <!-- 模态框 -->
          <good-dialog :title="linkTitle" :visible.sync='dialogVisible'>
            <div slot="body">
                <div class="table-default" style="margin:0px">
                        <table class="table-group">
                            <tr>
                                <tds-label star>网站名称：</tds-label>
                                <td><el-input v-model="form.name"></el-input></td>
                            </tr>
                            <tr>
                                <tds-label star>网站地址：</tds-label>
                                <td><el-input v-model="form.link"></el-input></td>
                            </tr>
                            <tr>
                                <tds-label>用户邮箱：</tds-label>
                                <td><el-input v-model="form.email"></el-input></td>
                            </tr>
                            <tr>
                                <tds-label>服务类型：</tds-label>
                                <td>
                                    <el-radio v-model="form.type" label="0">首页链接</el-radio>
                                    <el-radio v-model="form.type" label="1">全站链接</el-radio>
                                    <el-radio v-model="form.type" label="2">服务结束</el-radio>
                                </td>
                            </tr>
                            <tr>
                                <tds-label>服务状态：</tds-label>
                                <td>
                                    <el-radio v-model="form.status" label="0">关闭</el-radio>
                                    <el-radio v-model="form.status" label="1">开启</el-radio>
                                </td>
                            </tr>
                            <tr>
                                <tds-label star>开始时间：</tds-label>
                                <td>
                              
                                    <el-date-picker
                                      v-model="form.starttime"
                                      type="date"
                                      placeholder="选择日期"
                                      :picker-options="pickerOptions"
                                      value-format="default-time">
                                    </el-date-picker>
                                </td>
                            </tr>
                            <tr>
                                <tds-label star>结束时间：</tds-label>
                                <td>
                                    <el-date-picker
                                      v-model="form.endtime"
                                      type="date"
                                      placeholder="选择日期"
                                      :picker-options="pickerOptions"
                                      value-format="default-time">
                                    </el-date-picker>
                                </td>
                            </tr>
                            <tr>
                                <tds-label>链接价格：</tds-label>
                                <td><el-input v-model="form.price"></el-input></td>
                            </tr>
                            <tr>
                                <tds-label class=" position-r">
                                    <div class="position-a top-0 right-0">备注说明：</div>
                                </tds-label>
                                <td><el-input type="textarea" :rows="6" v-model="form.text" placeholder="请输入内容"></el-input></td>
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
import remove from './mixins/remove'   //删除
import list from './mixins/list'     //列表
import edit from './mixins/edit'   //编辑
import statusall from './mixins/statusall'   //全选状态设置

@Component({
  mixins: [remove,list,edit,statusall],
})
export default class Index extends mixins( list) {
  @State(state => state.state.permission) permission: any 
  @State(state => state.state.pickerOptions) pickerOptions: any 
  linkTitle='新增友情链接';
  selectAll
  dialogVisible=false
  google= "t-10002"
  list
  status=0
  total
  params={
      endtime: '',
      google: this.google,
      link: '',
      operating: "lists",
      page: 0,
      pagesize: 10,
      starttime:'',
      status: '',
      type: '',
  }

  params2={}
  form={}
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
    this.dataList();
  }

  dialog(item){
    this.linkTitle='新增友情链接';
    this.dialogVisible=true;
    let operating='insert'
    if(item){
      this.linkTitle='编辑友情链接';
      operating='update'
      this.form={...item}
    }else{
      this.form={
        email: '',
        endtime: '',
        link: '',
        name: '',
        price: '',
        starttime: '',
        status: '1',
        text: '',
        type: '0',
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
