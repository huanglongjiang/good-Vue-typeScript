<template>
    <good-page>
        <good-breadcrumb :list="constant.breadcrumb.role" />
        <good-menu>
            <good-button class='float-right no-drop' icon="el-icon-edit" type="primary" @click="dialog">新增角色</good-button>
            <good-total class="float-right" :total='total'></good-total>
        </good-menu>
        <good-box :data="list">
            <div class="table-data">
                <table class="table-group line-height-30">
                    <thead class="block-header">
                        <tr>
                            <th class="width-200">角色名称</th>
                            <th>用户</th>
                            <th class="width-100">状态</th>
                          <!--   <th>操作</th> -->
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(item,index) in list">
                            <tr :class="{'background-disabled':item.status==0}">
                                <td><span>{{item.title}}</span></td>
                                <td>
                                  <template v-for="item2 in item.image">
                                    <template v-if="item2.length<7">
                                      <div class="width-32 height-32 radius-20 float-left  overflow-hidden" style="margin-right: -5px; border:2px solid #fff">
                                        <img class="width-max" :src="'http://www.good1230.com/good/RandomUser/'+item2" :key="item2" />
                                      </div>
                                    </template>
                                    <template v-else>
                                      <div class="width-32 height-32 radius-20 float-left  overflow-hidden" style="margin-right: -5px; border:2px solid #fff">
                                        <img class="width-max" :src="filePath+'/'+item2" :key="item2" />
                                      </div>
                                    </template>
                                  </template>
                                  <span v-if="item.image.length>0" class="width-32 height-32  float-left color-999 line-height-32 font-size-12 margin-left-10" style="color:#0366d6">+{{item.image.length}}</span>
                                </td>
                                <td>
                                    <!-- <good-switch :data="{item,google}"></good-switch> -->
                                    <good-status :val='item' :key="index"></good-status>
                                </td>
                              <!--   <td>
                                    <span class="margin-right-10 color-ccc" v-if="item.status==0">权限配置</span>
                                    <span class="a-link margin-right-10 pointer" v-if="item.status==0" @click="dialog(item)">权限查看</span>
                                    <span class="a-link margin-right-10 pointer" v-else @click="dialog(item)">权限配置</span>
                                    <good-button2 v-if="item.status==1" @click="dialog(item)">改</good-button2>

                                    <good-button2 v-if="item.status==1" @click="remove(item)">弃</good-button2>
                                </td> -->
                            </tr>
                        </template>    
                    </tbody>
                </table> 
            </div>
        </good-box>
        <!-- <good-pagination :page.sync="init"></good-pagination> -->
        <!-- 模态框 -->
          
        <!-- 模态框 -->
        

</good-page>
</template>

<script lang="ts">
import { Watch,Vue } from 'vue-property-decorator';
import Component, { mixins } from 'vue-class-component'
import remove from './mixins/remove'   //删除
import list from './mixins/list'     //列表
import edit from './mixins/edit'   //编辑
import service from '@/service/index'
@Component({
  mixins: [remove,list,edit],
})
export default class Index extends mixins( list) {
  filePath
  dialogVisible=false
  dialogVisible2=false
  google= "t-20013"
  list
  listTitle
  authorityId
  status=0
  total
  params={
      google: "t-20013",
      operating: "lists",
      status:status,
      page: 0,
      pagesize: 10,
  }
  tag=['服务结束','服务中'];
  params2={}
  form={}

  @Watch('params',{ deep: true })
  onParamsChanged(val) {
    this.dataList();
  }

  private created() {
    this.dataList();
    this.dataList2();
    this.filePath=service.filePath();
  }

  dataList2(){
      const params={
          "google":"t-20012",
          "operating":"lists",
      }
      service.api(params).then(res =>{
          this.listTitle=res.data.data;
  
      });
  }

  dialog(item){
    this.dialogVisible2=true;
    let operating='insert'
    if(item){
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
      google: "t-20013",
      operating: operating,
      form:this.form,
    }

  }
}
</script>
