<template>
    <good-page>

        <good-breadcrumb :list="constant.breadcrumb.slider" />
        <good-box data="true">
        <good-tag tagName="服务类型" :list="constant.filter.slider.type" :selected.sync='params.type' />
        <good-tag tagName="服务状态" :list="constant.filter.slider.status" :selected.sync='params.status' />
        </good-box>
        <good-menu>
            <good-statusall :data="{google,selected,random}" v-if="permission.slider_status_all"></good-statusall>
            <good-button class='float-right' icon="el-icon-edit" type="primary" v-if="permission.slider_add" @click="dialog">新增轮播图</good-button>
            <good-total class="float-right" :total='total'></good-total>
        </good-menu>
        
        <good-box :data="list">
            <div class="table-data">
                <table class="table-group line-height-30">
                    <thead class="block-header">
                        <tr>
                            <th class="width-100" v-if="permission.slider_status_all">
                                <good-checkbox v-model="selectAll">全选择</good-checkbox>
                            </th>
                            <th class="width-100;">图片</th>
                            <th style="min-width:50px;width:300px;">标题</th>
                            <th class="width-150;">类型</th>
                            <th class="width-100;">状态</th>
                            <th v-if="permission.slider_edit || permission.slider_delete">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(item,index) in list">
                            <tr class="width-80" :class="{'background-disabled':item.status==0}" :key="index">
                                <td v-if="permission.slider_status_all">
                                    <good-checkbox v-model="selected" :label="item.id">
                                        <template v-if="selected.includes(item.id)">已选择</template>
                                        <template v-else>选择</template>
                                    </good-checkbox>
                                </td>
                                <td>
                                    <div class="line-height-30 padding-3">
                                        <img class="width-auto height-60 block" :src="filePath+'/'+item.file" v-if="item.file!=''">
                                        <img class="width-auto height-60 block" src="static/images/tianmao.jpg" alt="" v-else>
                                    </div>
                                    
                                </td>
                                <td><span>{{item.title}}</span></td>
                                <td>
                                    <good-label background="background-one" v-if="item.type==0">通用轮播图</good-label>
                                    <good-label background="background-two" v-if="item.type==1">首页轮播图</good-label>
                                    <good-label background="background-three" v-if="item.type==2">栏目页轮播图</good-label>
                                    <good-label background="background-four" v-if="item.type==3">内容页轮播图</good-label>
                                </td>
                                <td>
                                    <good-switch :data="{item,google}" :key="index" v-if="permission.slider_status"></good-switch>
                                    <good-status :val='item' :key="index" v-else></good-status>
                                </td>
                                <td>
                                    <good-button2 v-if="permission.slider_edit" @click="dialog(item)">改</good-button2>
                                    <good-button2 v-if="permission.slider_delete" @click="remove(item)">弃</good-button2>
                                </td>
                            </tr>
                        </template>    
                    </tbody>
                </table> 
            </div>
        </good-box>
        <good-pagination :data="{total,params}"></good-pagination>
        <!-- 模态框 -->
          <good-dialog :title="sliderTitle" :visible.sync='dialogVisible'>
            <div slot="body">
            <div class="table-default">
                <table class="table-group line-height-30 width-max">
                    <tr>
                        <tds-label star>图片标题：</tds-label>
                        <td><el-input v-model="form.title" placeholder="请输入内容"></el-input></td>
                    </tr>

                    <tr>
                        <tds-label>链接地址：</tds-label>
                        <td><el-input v-model="form.url" placeholder="请输入内容"></el-input></td>
                    </tr>
                    <tr>
                       <tds-label>图片类型：</tds-label>
                       <td>
                            <el-radio v-model="form.type" label="0">通用轮播图</el-radio>
                            <el-radio v-model="form.type" label="1">首页轮播图</el-radio>
                            <el-radio v-model="form.type" label="2">栏目页轮播图</el-radio>
                            <el-radio v-model="form.type" label="3">内容页轮播图</el-radio>
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
                        <tds-label>图片路径：</tds-label>
                        <td>
                        <good-upload id="u3" type="slider" :data.sync='form'></good-upload>
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
import { Watch } from 'vue-property-decorator';
import Component, { mixins } from 'vue-class-component'
import { State } from 'vuex-class';
import remove from './mixins/remove'   //删除
import list from './mixins/list'     //列表
import edit from './mixins/edit'   //编辑
import service from '@/service/index'
import statusall from './mixins/statusall'   //全选状态设置

@Component({
  mixins: [remove,list,edit,statusall],
})
export default class Index extends mixins( list) {
  @State(state => state.state.permission) permission
  sliderTitle='新增轮播图'
  filePath
  dialogVisible=false
  google= "t-10007"
  list
  total
  params={
      google: this.google,
      operating: "lists",
      page: 0,
      pagesize: 10,
      status:'',
      title:'',
      type:'',
  }
  params2={}
  form={}
  selected= []
  random={random:0}   //用来出发mixins文件，达到数据同步，也不知道为啥得用对象才能同步

  @Watch('random',{ deep: true })
  onRandomChanged() {
    this.dataList();
  }

  @Watch('params',{ deep: true })
  onParamsChanged() {
    this.dataList();
  }

  private created() {
    this.filePath=service.filePath();
    this.dataList();
  }

  dialog(item){
    this.sliderTitle='新增轮播图';
    this.dialogVisible=true;
    let operating='insert'
    if(item){
      this.sliderTitle='编辑轮播图';
      operating='update'
      this.form={...item}
    }else{
      this.form={
        id: 0,
        image: '',
        status: '1',
        title: '',
        type: '0',
        url: '',
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
