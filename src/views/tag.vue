<template>
    <good-page>
        <good-breadcrumb :list="constant.breadcrumb.root" />
        <good-menu>
            <good-button class='float-right' icon="el-icon-edit" type="primary" v-if="permission.tag_add" @click="dialog">新增标签</good-button>
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
                                <span class="pointer keys" @click="dialog(item)" v-if="permission.tag_edit">{{index+1}}、{{item.name}}</span>
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
                               <el-button class="button-new-tag" size="small" v-if="permission.tag_edit" @click="dialog(item,'key')">+ 新增</el-button>
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
import { Watch,Vue } from 'vue-property-decorator';
import Component, { mixins } from 'vue-class-component'
import { State } from 'vuex-class';
import remove from './mixins/remove'   //删除
import list from './mixins/list2'     //列表
import edit from './mixins/edit'   //编辑

@Component({
  mixins: [remove,list,edit],
})
export default class Index extends mixins( list) {
  @State(state => state.state.permission) permission: any
  columnTitle='编辑标签';
  dialogVisible=false
  dialogVisible2=false
  google= "t-20001"
  list
  total
  listKeywords=[]
  params={
      google: this.google,
      operating: "lists",
      name: "",
  }
  params2={}
  form={
    keywords:'',
    image: '',
    name: '',
    type: 2,
    url: '',
  }

  @Watch('listKeywords',{ deep: true })
  onListKeywordsChanged(val) {
    this.form.keywords=this.listKeywords.join(',')
  }

  private created() {
    this.dataList();
  }

  dialog(item,key){
    
    let operating='insert'
    this.columnTitle='编辑标签';

    if(item==undefined&&key==undefined){
      this.columnTitle='新增标签';
      this.dialogVisible=true;
      this.form={
        keywords:'',
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