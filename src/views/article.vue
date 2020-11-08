<template>
    <good-page>
        <good-breadcrumb :list="constant.breadcrumb.article" />
        <good-box data="true">
        <good-tag tagName="栏目" :list="tagList" :selected.sync='params.fid' :json="true" v-if="tagList.length!=undefined" />
        <good-tag tagName="自定义属性" :list="constant.filter.article.status" :selected.sync='params.type' />
        </good-box>
        <good-menu>
            <good-statusall :data="{google,selected,random}" v-if="permission.article_status_all"></good-statusall>
            <good-button class='float-right no-drop' icon="el-icon-edit" type="primary" v-if="permission.article_add">新增文章</good-button>

            <good-total class="float-right" :total='total' ></good-total>
            <div class="clear"></div>
        </good-menu>

        <good-box :data="list">
            <div class="table-data">
                <table class="table-group line-height-30">
                    <thead class="block-header">
                        <tr>
                            <th class="width-100" v-if="permission.article_status_all">
                                <good-checkbox v-model="selectAll">全选择</good-checkbox>
                            </th>
                            <th>缩略图</th>
                            <th>发布作者</th>
                            <th>所属栏目</th>
                            <th>标题</th>
                            <th>创建时间</th>
                            <th>状态</th>
                            <th v-if="permission.article_edit || permission.article_delete">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(item,index) in list">
                            <tr :class="{'background-disabled':item.status==0}">
                                <td v-if="permission.article_status_all">
                                    <good-checkbox v-model="selected" :label="item.id">
                                        <template v-if="selected.includes(item.id)">已选择</template>
                                        <template v-else>选择</template>
                                    </good-checkbox>
                                </td>
                                <td class="position-r">
                                  <!-- <good-paper background="background-one" v-if="item.type==3">推荐f</good-paper>
                                  <good-paper background="background-tow" v-if="item.type==2">热门</good-paper>
                                  <good-paper background="background-three" v-if="item.type==1">优质</good-paper> -->
                               
                                
                                  <div class="line-height-30 padding-3">
                                        <img class="width-auto height-60 block" :src="filePath+'/'+item.file" v-if="item.file!=''">
                                        <img class="width-auto height-60 block" src="static/images/tianmao.jpg" alt="" v-else>
                                    </div>
                                </td>
                                <td>{{item.account}}</td>
                                

                                <td>
                                    <template v-for="(items,index) in item.parentName">
                                        <span class=" padding-2 padding-left-5 padding-right-5 margin-bottom-10">{{items}}
                                            <template v-if="index+1<item.parentName.length">、</template>
                                        </span>
                                    </template>
                                </td>
                                
                                <td>
                                    <div class="width-max break">
                                        <router-link tag="span" class=" a-link textline pointer" :to="{path:'/article/action',query: {type:2,templateId: item.id}}" >{{item.title}}</router-link>
                                        <span>{{item.title}}</span>
                                    </div>
                                </td>
                                <td>{{item.insertTime}}</td>
                                <td>
                                    <good-switch :data="{item,google}" :key="index" v-if="permission.article_status"></good-switch>
                                    <good-status :val='item' :key="index" v-else></good-status>
                                </td>
                                <td>
                                    <template>
                                        <!-- <router-link tag="a" class="a-link pointer none-line" :to="{path:'/article/action',query: {type:2,templateId: item.id}}">
                                        <good-button2 @click="select(item)">改</good-button2>
                                        </router-link> -->

                                        <good-button2 class="no-drop" v-if="permission.article_edit">改</good-button2>
                                        <good-button2 v-if="permission.article_delete" @click="remove(item)">弃</good-button2>
                                    </template>
                                </td>
                            </tr>
                        </template>
                    </tbody>    
                </table> 
            </div>
        </good-box>
        <good-pagination :data="{total,params}"></good-pagination>

</good-page>
</template>

<script lang="ts">
import { Component,Watch,Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';
import remove from './mixins/remove'   //删除
import list from './mixins/list'     //列表
import edit from './mixins/edit'   //编辑
import statusall from './mixins/statusall'   //全选状态设置
import service from '@/service/index'

@Component({
  mixins: [remove,list,edit,statusall],
})
export default class Index extends Vue {
  @State(state => state.state.permission) permission: any 
  dialogVisible=false
  google= "t-10008"
  google2="t-10016"
  filePath
  list
  tagList=[]
  status=0
  total
  params={
      fid: '',
      google: this.google,
      operating: "lists",
      page: 0,
      pagesize: 10,
      title: '',
      type: '',
  }

  params2={}
  form={}
  selected= []
  random={random:0}   //用来出发mixins文件，达到数据同步，也不知道为啥得用对象才能同步

  @Watch('random',{ deep: true })
  onRandomChanged(val) {
    this.dataList();
  }

  @Watch('params',{ deep: true })
  onParamsChanged(val) {
    this.dataList();
  }

  private created() {
    this.filePath=service.filePath();
    this.dataTagList();
    this.dataList();
  }


  dataTagList(){
      const data={
          "google":this.google2,
          "operating":"lists",
          "type":2,
      }
      service.api(data).then(res =>{
          this.tagList=res.data.data;
      });
  }

}
</script>
