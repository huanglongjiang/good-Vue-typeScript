<template>
    <good-page>
        <good-breadcrumb :list="constant.breadcrumb.cnzz" />
        <good-menu>
          <good-statusall v-if="permission.cnzz_status_all" :data="{google,selected,random}"></good-statusall>
          <good-total class="float-right" :total='total'></good-total>
        </good-menu>
        <good-box data="list">
            <div class="table-data">
                <table class="table-group line-height-30">
                    <thead class="block-header">
                        <tr>
                            <th class="width-100" v-if="permission.cnzz_status_all">
                                <good-checkbox v-model="selectAll">全选择</good-checkbox>
                            </th>
                            <th class="width-100">统计类型</th>
                            <th class="width-auto">code</th>
                            <th class="width-100">服务状态</th>
                            <th class="width-100" v-if="permission.cnzz_edit">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(item,index) in list">
                        <tr :class="{'background-disabled':item.status==0}">
                            <td v-if="permission.cnzz_status_all">
                                <good-checkbox v-model="selected" :label="item.id">
                                    <template v-if="selected.includes(item.id)">已选择</template>
                                    <template v-else>选择</template>
                                </good-checkbox>
                            </td>
                            <td><span>{{item.type}}</span></td>
                            <td><span>{{item.code}}</span></td>
                            <td>
                                <good-switch :data="{item,google}" :key="index" v-if="permission.cnzz_status"></good-switch>
                                <good-status :val='item' :key="index" v-else></good-status>
                            </td>
                            <td>
                                <good-button2 v-if="permission.cnzz_edit" @click="dialog(item)">改</good-button2>
                            </td>
                        </tr>
                       </template>
                    </tbody>
                </table> 
            </div>
        </good-box>

        <!-- 模态框 -->
        <good-dialog :title="form.type+'统计'" :visible.sync='dialogVisible'>
            <div slot="body">
                <div class="table-default">
                    <table class="table-group">
                        <tr>
                            <tds-label>统计类型：</tds-label>
                            <td><el-input v-model="form.type" :disabled="true"></el-input></td>
                        </tr>
                        <tr>
                            <tds-label>服务状态：</tds-label>
                            <td>
                                <el-radio v-model="form.status" label="0">关闭</el-radio>
                                <el-radio v-model="form.status" label="1">开启</el-radio>
                            </td>
                        </tr>
                        <tr>
                            <tds-label>统计代码：</tds-label>
                            <td><el-input type="textarea" :rows="6" v-model="form.code" placeholder="请输入内容"></el-input></td>
                        </tr>
                    </table> 
                </div>
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
import { Component,Watch,Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';
import list from './mixins/list'     //列表
import edit from './mixins/edit'   //编辑
import statusall from './mixins/statusall'   //全选状态设置

@Component({
  mixins: [list,edit,statusall],
})
export default class Index extends Vue {
  @State(state => state.state.permission) permission: any 
  dialogVisible=false
  list
  total
  google= "t-10009"
  params={
      google: this.google,
      operating: "lists",
      page: 0,
      pagesize: 10,
  }
  params2={}
  form={}
  selected= []
  random={random:0}   //用来出发mixins文件，达到数据同步，也不知道为啥得用对象才能同步

  @Watch('random',{ deep: true })
  onRandomChanged(val) {
    this.dataList();
  }

  private created() {
    this.dataList()
  }

  dialog(item){
    this.dialogVisible=true;
    this.form={...item}
    this.params2={
      google: this.google,
      operating: 'update',
      form:this.form,
    }

  }
}
</script>