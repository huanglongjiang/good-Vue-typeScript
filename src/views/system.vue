<template>
    <good-page>
        <good-breadcrumb :list="constant.breadcrumb.system" />
        <div class="layout">
            <div class="table-default">
                <table style="width:800px;">
                    <tbody>
                        <tr>
                            <tds-label>标题：</tds-label>
                            <td><el-input v-model="form.title" placeholder="请输入内容"></el-input></td>
                        </tr>
                        <tr>
                            <tds-label>副标题：</tds-label>
                            <td><el-input v-model="form.title2" placeholder="请输入内容"></el-input></td>
                        </tr>
                        <tr>
                            <tds-label>站点地址：</tds-label>
                            <td><el-input v-model="form.url" placeholder="请输入内容"></el-input></td>
                        </tr>
                        <tr>
                            <tds-label class=" position-r">前台LOGO：</tds-label>                    
                            <td>
                               <good-upload :data='{form,id:"u2",type:"logo"}' v-if="permission.system_upload"></good-upload>
                                <img class="width-150 height-150 radius-3" v-else :src="filePath+'/'+form.file">
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <good-button type="primary" v-if="permission.system_edit" @click="submit">保存修改</good-button>
                            </td>
                        </tr>

                    </tbody>
                </table> 
            </div>
        </div>
    </good-page>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component'
import { State } from 'vuex-class';
import service from '@/service/index'
import list from './mixins/list2'     //列表
import edit from './mixins/edit'   //编辑

@Component({
  mixins: [list,edit],
})
export default class Index extends mixins( list) {
  @State(state => state.state.permission) permission
  list
  params={
      file: "",
      google: "t-10005",
      image: "",
      operating: "select",
      title: "",
      title2: "",
      url: "",
  }
  
  filePath
  params2={}
  form={}

  private created() {
    this.filePath=service.filePath();
    service.api(this.params).then(res =>{
        this.form=res.data.data
        this.params2={
          google: "t-10005",
          operating:'update',
          form:this.form,
        }
    })
  }
}
</script>