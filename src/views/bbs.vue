<template>
    <good-page>
        <good-breadcrumb :list="constant.breadcrumb.bbs" />
        <good-menu>
            <good-button type="primary" icon="el-icon-edit" class="float-right margin-left-20" v-if="permission.bbs_add" @click="dialog">留言</good-button>
            <good-total class="float-right" :total='total'></good-total>
        </good-menu>
        <good-box data="list">

            <div class="table-data">
                    <table class="table-group line-height-30">
                        <thead class="block-header">
                            <tr>
                                <th>头像</th>
                                <th>名称</th>
                                <th>访问IP</th>
                                <th>留言内容</th>
                                <th>留言时间</th>
                            </tr>
                        </thead>
                        </thead>
                        <tbody>
                            <template v-for="(item,index) in list">
                            <tr>
                                <td>
                                    <img :src="'http://www.good1230.com/good_vue2/static/RandomUser/'+item.image" alt="" class="width-30 height-30 margin-auto radius-20 float-left" style="display: inherit;">
                                </td>
                                <td><span>{{item.account}} <span class="color-999">({{item.name}})</span></span></td>
                                <td>{{item.ip}}</td>
                                <td><span>{{item.text}}</span></td>
                                <td>{{item.time}}</td>
                            </tr>
                           </template>
                        </tbody>
                    </table> 
                </div>
        </good-box>
        <good-pagination :data="{total,params}"></good-pagination>
        <!-- 模态框 --> 
        <good-dialog title="留言" :visible.sync='dialogVisible'>
            <div slot="body">
               <div class="table-default">
                  <table class="table-group">
                      <tr>
                        <tds-label class=" position-r">
                            <div class="position-a top-0 right-0">留言内容：</div>
                        </tds-label>
                        <td>
                        <el-input type="textarea" :rows="6" placeholder="请输入内容" v-model="form.text"></el-input>
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
import { Component,Watch,Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';
import remove from './mixins/remove'   //删除
import list from './mixins/list'     //列表
import edit from './mixins/edit'   //编辑
import service from '@/service/index'
@Component({
  mixins: [remove,list,edit],
})
export default class Index extends Vue {
  @State(state => state.state.permission) permission: any 
  filePath
  dialogVisible=false
  google= "t-10015"
  list
  total
  params={
      google: this.google,
      operating: "lists",
      status:status,
      page: 0,
      pagesize: 10,
  }
  params2={}
  form={}

  private created() {
    this.filePath=service.filePath();
    this.dataList();
  }

  dialog(item){
    this.dialogVisible=true;
    let operating='insert'
    this.form={
        id:'',
        name:'',
        link:'',
        email:'',
        status:'0',
      }
    this.params2={
      google: "t-10015",
      operating: operating,
      form:this.form,
    }

  }
}
</script>
