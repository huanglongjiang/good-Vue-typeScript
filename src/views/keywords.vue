<template>
    <div class="layout  width-max position-r left-0  border-success margin-top-10">
        <good-breadcrumb :list="constant.breadcrumb.keywords" />
        <good-menu>
            <good-button class='float-right' type="primary" v-if="permission.keywords_add" @click="dialog">新增关键词</good-button>
            <good-total class="float-right" :total='total'></good-total>
        </good-menu>
        
        <good-box :data="list">
            <div class="align-center clearfix">
                <template v-for="(item,index) in list">
                    <template v-if="permission.keywords_edit">
                        <div class="layout margin-bottom-10 pointer" @click="dialog(item)">
                            <el-tag type="info" class="float-left margin-5">{{item.name}}</el-tag>
                        </div>
                    </template>
                    <template v-else>
                        <div class="layout margin-bottom-10">
                            <el-tag type="info" class="float-left margin-5">{{item.name}}</el-tag>
                        </div>
                    </template>
                </template> 
            </div>
        </good-box>  
        <good-pagination :data="{total,params}"></good-pagination>
         <!-- 模态框 -->
        <good-dialog :title="columnTitle" :visible.sync='dialogVisible'>
            <div slot="body">
            <div class="table-default" style="margin:0px">
                <table class="table-group">
                    <tr>
                        <tds-label star>名称：</tds-label>
                        <td><el-input v-model="form.name"></el-input></td>
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
</div>
</template>

<script lang="ts">
import { Watch,Vue } from 'vue-property-decorator';
import Component, { mixins } from 'vue-class-component'
import { State } from 'vuex-class';
import remove from './mixins/remove'   //删除
import list from './mixins/list'     //列表
import edit from './mixins/edit'   //编辑

@Component({
  mixins: [remove,list,edit],
})
export default class Index extends mixins( list) {
  @State(state => state.state.permission) permission: any 
  columnTitle='新增关键词';
  dialogVisible=false
  google= "t-20006"
  list
  status=0
  total
  params={
      google: this.google,
      name: '',
      operating: 'lists',
      page: 0,
      pagesize: 250,
  }

  params2={}
  form={}

  @Watch('params',{ deep: true })
  onParamsChanged(val) {
    this.dataList();
  }

  private created() {
    this.dataList();
  }

  dialog(item){
    this.columnTitle='新增关键词';
    this.dialogVisible=true;
    let operating='insert'
    if(item){
      this.columnTitle='编辑关键词';
      operating='update'
      this.form={...item}
    }else{
      this.form={
        id:'',
        name:'',
        link:'',
        email:'',
        status:'0',
      }
    }
    this.params2={
      google: "t-20006",
      operating: operating,
      form:this.form,
    }

  }
}
</script>
<style scoped>
   .tag-group .tag-block{display: inline-table;}
   .tag-group .tag-block:hover{color: #333;}
   .el-tag.el-tag--info{
    background-color: #e4e8f1;
    border-color: #e4e8f1;
    color: #48576a;
   }
</style>