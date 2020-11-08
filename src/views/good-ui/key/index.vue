<template>
  <div class="layout">

    <el-tag v-for="item in selectList" :key="item" closable :type="item" @close="handleClose(item)" v-if="selectList!=''">  {{item}} </el-tag>
    <div class="border-bottom-1 border-eee padding-bottom-20 margin-bottom-20" style="overflow: auto;"></div>
    <div class="align-center clearfix">
        <template v-for="(item,index) in list">
           
            <div class="layout margin-bottom-10 pointer" @click="add(item)">
              <template v-if="data.includes(item.name)">
                <el-tag class="float-left margin-5">{{item.name}}</el-tag>
              </template>
              <template v-else>
                <el-tag type="info" class="float-left margin-5">{{item.name}}</el-tag>
              </template>
            </div>
        </template> 
    </div>
    <good-pagination :data="{total,params}"></good-pagination>
  </div>
</template>

<script lang="ts">
import { Component,Watch,Prop,Vue } from 'vue-property-decorator';
import service from '@/service/index'
import list from './../../mixins/list'     //列表

@Component({
  mixins: [list],
})
export default class Index extends Vue {
  @Prop() data
  google= "t-20006"
  list
  status=0
  total
  selectList=this.data
  params={
      google: this.google,
      name: '',
      operating: 'lists',
      page: 0,
      pagesize: 100,
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

  //数据状态
  checked(item){
      const data={
        "google":this.val.coding,
        "operating":"status",
        "id":this.val.id,
        "status":this.val.status,
      }

      
      service.api(params).then(res =>{
        if(res.status==200){
          this.val.status=this.val.status==1?0:1;
          this.$emit('update:val', this.val);
        }
                    
      });
      
  }
  handleClose(tag) {
      this.selectList.map((item,index)=>{
        if(item==tag){
          this.selectList.splice(index,1);
        }
      })
      this.$emit('update:data', this.selectList)
    
  }
  add(tag){
       
          if(this.selectList.includes(tag.name)){
            this.selectList.map((item,index)=>{
              if(item==tag.name){
                this.selectList.splice(index,1);
              }
            })
          }else{
            if(this.selectList.length==5){
              let options={
                  type:'warning',
                  message:'最多选择5个关键字',
              }
              this.$message(options);
              return
            }
            this.selectList.push(tag.name)
          }
          this.data=this.selectList
          this.$emit('updata:data',this.selectList)

        
      }
}
</script>
