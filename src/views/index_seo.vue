<template>
    <good-page>
        <good-breadcrumb :list="constant.breadcrumb.index_seo" />
        <div class="layout">
            <div class="table-default">
                <table style="width:800px;">
                    <tbody>
                        <tr>
                            <tds-label>标题：</tds-label>
                            <td><el-input v-model="form.title" placeholder="请输入内容"></el-input></td>
                        </tr>
                        <tr>
                            <tds-label>关键词：</tds-label>
                            <td><el-input v-model="form.keywords" placeholder="请输入内容"></el-input></td>
                        </tr>
                        <tr>
                            <tds-label class=" position-r">网页描述：</tds-label> 
                            <td><el-input type="textarea" :rows="2" v-model="form.description" placeholder="请输入内容"></el-input></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td class="padding-top-10">
                                <good-button v-if="permission.index_seo_edit" type="primary" @click="submit">保存修改</good-button>
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
import list from './mixins/list'     //列表
import edit from './mixins/edit'   //编辑

@Component({
  mixins: [list,edit],
})
export default class Index extends mixins( list) {
  @State(state => state.state.permission) permission
  list
  params={
      file: "",
      google: "t-10006",
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
          google: "t-10006",
          operating:'update',
          form:this.form,
        }
    })
  }
}
</script>