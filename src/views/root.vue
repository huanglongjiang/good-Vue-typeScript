<template>
    <good-page>
        <good-breadcrumb :list="constant.breadcrumb.root" />
        <good-menu>
            <good-button class='float-right' icon="el-icon-edit" type="primary" v-if="permission.root_add" @click="dialog">新增栏目</good-button>
            <good-total class="float-right" :total='total'></good-total>
        </good-menu>
        <good-box :data="list">
            <div class="table-data">
                <table class="table-group">
                    <thead class="block-header">
                        <tr>
                            <th>栏目名称</th>
                            <th>关键词</th>
                        </tr>
                    </thead>
                    <tbody>
                    <template v-for="(item,index) in list">
                        <tr v-if="item.type==2" style="height:45px;">
                            <td>
                                <span class="pointer keys" v-if="permission.root_edit" @click="dialog(item)"  >{{index+1}}、{{item.name}}</span>
                                <span class="keys" v-else>{{index+1}}、{{item.name}}</span>
                            </td>
                            <td>
                                <div class="layout keys">
                                <template v-if="item.keywords!=''">
                                    <template v-for="(item,index) in item.keywords.split(',')">

                                    <el-tag
                                        :key="index"
                                        type="info" class="margin-right-10">
                                        {{ item }}
                                      </el-tag>

                                    </template>
                                </template>
                               <el-button class="button-new-tag" size="small" v-if="permission.root_edit" @click="dialog(item,'key')">+ 新增</el-button>
                                </div>


                            </td>
                        </tr>
                    </template>    
                    </tbody>
                </table> 
            </div>    
        </good-box>  
        <!-- 模态框 -->
          <good-dialog :title="columnTitle" :visible.sync='dialogVisible'>
            <div slot="body">
                <div class="table-default">
                    <table class="table-group">
                        <tr>
                            <tds-label star>名称</tds-label>
                            <td><el-input v-model="form.name"></el-input></td>
                        </tr>
                        <tr>
                            <tds-label>缩 略 图</tds-label>
                            <td>
                                <good-upload id="u7" type="article_title " :data.sync='form'></good-upload>
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


          <good-dialog :title="columnTitle" :visible.sync='dialogVisible2'>
            <div slot="body">
                <div class="table-default">
                    <good-key :data.sync="listKeywords" v-if="dialogVisible2"></good-key>
                </div>
            </div>
            <div slot="footer">
                <good-button type="default" @click="dialogVisible = false">取 消</good-button>
                <good-button type="primary" @click="submit">确 定</good-button>
            </div>
        </good-dialog>   
</good-page>
</template>

<script lang="ts">
import { Component,Watch,Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';
import remove from './mixins/remove'   //删除
import list from './mixins/list'     //列表
import edit from './mixins/edit'   //编辑

@Component({
  mixins: [remove,list,edit],
})
export default class Index extends Vue {
  @State(state => state.state.permission) permission: any 
  columnTitle
  dialogVisible=false
  dialogVisible2=false
  google= "t-10016"
  list
  total
  listKeywords=[]
  params={
      google: this.google,
      operating: "lists",
      name: "",
  }
  params2={}
  form={}

  @Watch('listKeywords',{ deep: true })
  onListKeywordsChanged(val) {
    this.form.keywords=this.listKeywords.join(',')
  }

  private created() {
    this.dataList();
  }

  dialog(item,key){
    
    let operating='insert'
    this.columnTitle='编辑栏目';

    if(item==undefined&&key==undefined){
      this.columnTitle='新增栏目';
      this.dialogVisible=true;
      this.form={
        image: '',
        name: '',
        type: 2,
        url: '',
      }
    }else if(item!=undefined&&key!=undefined){
      operating='update'
      this.form={...item}
      this.dialogVisible2=true;
      this.listKeywords=item.keywords==''?[]:this.listKeywords=item.keywords.split(',');
      
    }else{
      this.dialogVisible=true;
      operating='update'
      this.form={...item}
    }


    this.params2={
      google: this.google,
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