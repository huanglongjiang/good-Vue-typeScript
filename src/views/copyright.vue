<template>
    <good-page>
        <good-breadcrumb :list="constant.breadcrumb.copyright" />
        <div class="layout">
            <div class="table-default">
                <table style="width:800px;">
                    <tbody>
                        <tr>
                            <tds-label>版权信息：</tds-label>
                            <td><el-input v-model="form.title" placeholder="请输入内容"></el-input></td>
                        </tr>
                        <tr>
                            <tds-label>版权所有：</tds-label>
                            <td><el-input v-model="form.title2" placeholder="请输入内容"></el-input></td>
                        </tr>
                        <tr>
                            <tds-label>版权链接：</tds-label>
                            <td><el-input v-model="form.url" placeholder="请输入内容"></el-input></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <good-button v-if="permission.copyright_edit" type="primary" @click="submit">保存修改</good-button>
                            </td>
                        </tr>
                    </tbody>
                </table> 
            </div>
        </div>
    </good-page>
</template>

<script lang="ts">
import { Component,Watch,Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';
import service from '@/service/index'
import list from './mixins/list'     //列表
import edit from './mixins/edit'   //编辑

@Component({
  mixins: [list,edit],
})
export default class Index extends Vue {
  @State(state => state.state.permission) permission: any 
  list
  params={
      file: "",
      google: "t-10004",
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
    Promise.all([this.dataList()]).then((res)=>{
        this.form=res[0]
        this.params2={
          google: "t-10004",
          operating:'update',
          form:this.form,
        }
    })
  }
}
</script>