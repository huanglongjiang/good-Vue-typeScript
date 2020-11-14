<template>
    <good-page>
        <good-breadcrumb :list="constant.breadcrumb.adsense" />
        <good-box data="true">
        <good-tag tagName="服务状态" :list="constant.filter.adsense.status" :selected.sync='params.status' />
        </good-box>
        <good-menu>
            <good-statusall :data="{google,selected,random}" v-if="permission.adsense_status_all"></good-statusall>
            <good-button class='float-right' icon="el-icon-edit" type="primary" v-if="permission.adsense_add" @click="dialog">新增广告位</good-button>
            <good-total class="float-right" :total='total'></good-total>
        </good-menu>
        
        <good-box :data="list">
            <div class="table-data">
                <table class="table-group line-height-30">
                    <thead class="block-header">
                        <tr>
                            <th class="width-100" v-if="permission.adsense_status_all">
                                <good-checkbox v-model="selectAll">全选择</good-checkbox>
                            </th>
                            <th>用户邮箱</th>
                            <th>广告名称</th>
                            <th>投放位置</th>
                            <th>广告价格</th>
                            <th>广告尺寸</th>
                            <th>代码标签</th>
                            <th>开始时间</th>
                            <th>结束时间</th>
                            <th>投放状态</th>
                            <th v-if="permission.adsense_edit || permission.adsense_delete">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(item,index) in list">
                            <tr :class="{'background-disabled':item.status==0}" :key="index">
                                <td v-if="permission.adsense_status_all">
                                    <good-checkbox v-model="selected" :label="item.id">
                                        <template v-if="selected.includes(item.id)">已选择</template>
                                        <template v-else>选择</template>
                                    </good-checkbox>
                                </td>
                                <td>{{item.email}}</td>
                                <td>{{item.name}}</td>
                                <td>{{item.position}}</td>
                                <td>{{item.price}}</td>
                                <td>{{item.size}}</td>
                                <td>{$adsense.{{item.id}}}</td>
                                <td>{{item.starttime , 'YYYY-MM-DD' | moment}}</td>
                                <td>{{item.endtime , 'YYYY-MM-DD' | moment}}</td>

                                <td>
                                    <good-switch :data="{item,google}" :key="index" v-if="permission.adsense_status"></good-switch>
                                    <good-status :val='item' :key="index" v-else></good-status>
                                </td>
                                <td>
                                    <good-button2 v-if="permission.adsense_edit" @click="dialog(item)">改</good-button2>
                                    <good-button2 v-if="permission.adsense_delete" @click="remove(item)">弃</good-button2>
                                </td>
                            </tr>
                        </template>    
                    </tbody>
                </table> 
            </div>
        </good-box>
        <good-pagination :data="{total,params}"></good-pagination>
    
        <!-- 模态框 -->

        <good-dialog :title="AdsenseTitle" :visible.sync='dialogVisible'>
          <div slot="body">
            <div class="table-default">
                <table class="table-group">
                    <tr>
                        <tds-label star>用户邮箱</tds-label>
                        <td><el-input v-model="form.email" placeholder="请输入内容"></el-input></td>
                    </tr>
                    <tr>
                        <tds-label star>广告名称</tds-label>
                        <td><el-input v-model="form.name" placeholder="请输入内容"></el-input></td>
                    </tr>
                    <tr>
                        <tds-label>投放位置</tds-label>
                        <td><el-input v-model="form.position" placeholder="请输入内容"></el-input></td>
                    </tr>
                    <tr>
                        <tds-label>广告价格</tds-label>
                        <td><el-input v-model="form.price" placeholder="请输入内容"></el-input></td>
                    </tr>
                    <tr>
                        <tds-label>广告尺寸</tds-label>
                        <td><el-input v-model="form.size" placeholder="请输入内容"></el-input></td>
                    </tr>
                    <tr>
                        <tds-label>代码标签</tds-label>
                        <td><el-input v-model="form.id" placeholder="请输入内容"></el-input></td>
                    </tr>
                    <tr>
                            <tds-label>服务状态</tds-label>
                            <td>
                                <good-radio v-model="form.status" label="0">关闭</good-radio>
                                <good-radio v-model="form.status" label="1">开启</good-radio>
                            </td>
                        </tr>
                    <tr>
                            <tds-label star>开始时间</tds-label>
                            <td>
                                <!-- <el-date-picker
                                  v-model="form.starttime"
                                  type="date"
                                  placeholder="选择日期"
                                  :picker-options="state.pickerOptions"
                                  value-format="default-time">
                                </el-date-picker> -->
                            </td>
                        </tr>
                    <tr>
                            <tds-label star>结束时间</tds-label>
                            <td>
                                <!-- <el-date-picker
                                  v-model="form.endtime"
                                  type="date"
                                  placeholder="选择日期"
                                  :picker-options="state.pickerOptions"
                                  value-format="default-time">
                                </el-date-picker> -->
                            </td>
                        </tr>
                        <tr>
                                <tds-label>广告图片</tds-label>
                                <td>
                                    <good-upload :data='{form,id:"u4",type:"adsense"}' v-if="permission.system_upload"></good-upload>
                                    <!-- <div class="color-ccc font-size-12 margin-bottom-10">图片地址{{state.Imgpath}}adsense/{{form.image}}</div> -->
                                </td>
                        </tr> 
                        <tr>
                            <tds-label>投放代码</tds-label>
                            <td>
                                <el-input type="textarea" :rows="6" placeholder="请输入内容" v-model="form.code"></el-input>
                            </td>
                        </tr>
                        <tr>
                            <tds-label>备注说明</tds-label>
                            <td>
                                <el-input type="textarea" :rows="6" placeholder="请输入内容" v-model="form.code"></el-input>
                            </td>
                        </tr> 
                </table> 
            </div>
            </div>
          <div slot="footer">
            <good-button @click="submit">确定</good-button>
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
import statusall from './mixins/statusall'   //全选状态设置

@Component({
  mixins: [remove,list,edit,statusall],
})
export default class Index extends mixins( list) {
  @State(state => state.state.permission) permission: any 
  AdsenseTitle='新增广告位';
  dialogVisible=false
  google= "t-10003"
  list
  total
  params={
      email:'',
      endtime:'',
      google: this.google,
      operating: 'lists',
      page: 0,
      pagesize: 10,
      starttime:'',
      status:'',
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
    this.dataList();
  }

  dialog(item){
    this.AdsenseTitle='新增广告位';
    this.dialogVisible=true;
    let operating='insert'
    if(item){
      this.AdsenseTitle='编辑广告位';
      operating='update'
      this.form={...item}
    }else{
      this.form={
        code:'',
        email:'',
        endtime:'',
        image:'',
        label:'',
        link:'',
        name:'',
        price:'',
        size:'',
        starttime:'',
        status: '1',
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
