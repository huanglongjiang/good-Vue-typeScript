<template>
  <div>

    <div class="font-size-24 color-white align-center position-f left-0 top-110 background-primary z-index-100" style=" width:36px; height:36px; display:block;border;border-top-right-radius: 10px;border-bottom-right-radius: 10px;">
        <span class="block width-max height-max line-height-36 el-icon-s-fold pointer" v-if="sidebar" @click="switch3"></span>
        <span class="block width-max height-max line-height-36 el-icon-s-unfold pointer" v-else @click="switch3"></span>
    </div>

    <div class="panel-backdrop2" style="background:rgba(0,0,0,0.2);z-index:110" v-if="showBool" @click="close"></div>
    <div class="div " :class="{'b':!showBool,'b2':showBool}" style="transition:all 0.1s ease;">
      <div class="font-size-24 color-white align-center line-height-48 position-a top-250 background-primary" style=" width:48px; height:48px; display:block; left:-48px;border;border-top-left-radius: 5px;border-bottom-left-radius: 5px;">
        <span class="block width-max height-max line-height-48 el-icon-close pointer" style="line-height:48px;" v-if="showBool" @click="close"></span>
        <span class="block width-max height-max line-height-48 el-icon-setting pointer" style="line-height:48px;" v-else @click="open"></span>
      </div>
      <div class="overflow-auto-y height-max">
        <span class="align-center bold height-36 line-height-36 margin-bottom-10 block color-999 background-eee">切换主题</span>
        <div class="margin-10 margin-left-30"><sketch-picker v-model="color" /></div>
        <span class="align-center bold height-36 line-height-36 margin-bottom-10 block color-999 background-eee border-ddd border-top-1">切换角色</span>
        <ul class="align-left padding-20 padding-top-1">
          <template v-for="(item,index) in data.roleList">
            <li :key="index" class="block padding-5 padding-left-10 padding-right-10 font-size-14 background-primary color-white inline-block radius-5" v-if="data.roleId===item.id">{{index+1}}、{{item.title}}
            </li>
            <li :key="index" class="block padding-5 font-size-14 pointer" v-else @click="Submit(item,data)">{{index+1}}、{{item.title}}
            </li>
          </template>
        </ul>
        <span class="align-center bold height-36 line-height-36 margin-bottom-10 block color-999 background-eee border-ddd border-top-1">小功能</span>
        <ul class="align-left padding-20 padding-top-10">
            <!-- <li class="block padding-5 font-size-14 clearfix">
              <span class="float-left">Background Image</span>
              <div class="layout float-right">
                  <div class="layout container">
                  <div class="switch" :class="{'a':topFixed}" @click="switch2">
                    <span class="switch-label" data-on="on" data-off="off"></span>
                    <span class="switch-handle"></span>
                  </div>
                </div>
              </div>
            </li> -->
            <li class="block padding-5 font-size-14 clearfix">
              <span class="float-left">头部固定</span>
              <div class="layout float-right">
                  <div class="layout container">
                  <div class="switch" :class="{'a':topFixed}" @click="switch2">
                    <span class="switch-label" data-on="on" data-off="off"></span>
                    <span class="switch-handle"></span>
                  </div>
                </div>
              </div>
            </li>
            <li class="block padding-5 font-size-14 clearfix">
              <span class="float-left">隐藏导航</span>
              <div class="layout float-right">
                  <div class="layout container">
                  <div class="switch" :class="{'a':sidebar}" @click="switch3">
                    <span class="switch-label" data-on="on" data-off="off"></span>
                    <span class="switch-handle"></span>
                  </div>
                </div>
              </div>
            </li>
            
        </ul>
        <span class="align-center bold height-36 line-height-36 margin-bottom-10 block color-999 background-eee border-ddd border-top-1">切换到其他平台</span>
        <ul class="align-left padding-20 padding-top-1">
          <li class="block padding-5 font-size-14 pointer"><a class="none-line a-666" target="_blank" href="http://www.good1230.com/good_vue2/#/index">1、vue管理平台</a></li>
          <li class="block padding-5 padding-left-10 padding-right-10 font-size-14 background-primary color-white inline-block radius-5">2、vue+typescript管理平台</li>
          <li class="block padding-5 font-size-14 pointer"><a class="none-line a-666" target="_blank" href="http://www.good1230.com/react/">3、react管理平台</a></li>
        </ul>
</div>
</div>

</div>
</template>

<script lang="ts">
  import { Sketch } from 'vue-color'
  import { Component,Prop,Watch,Vue } from 'vue-property-decorator';
  import { State } from 'vuex-class';
  import service from '@/service/index'
  import Color from './../../../../public/color.js'
  @Component({
    components: {
      'sketch-picker': Sketch,
    },
  })
  export default class Index extends Vue {
    @Prop() data
    
    colors='#194d33'
    color={
      hex:localStorage.getItem("color")==null?'#4fc08d':localStorage.getItem("color")
    }
    topFixed=localStorage.getItem("topFixed")=='true'?true:false
    sidebar=localStorage.getItem("sidebar")=='true'?true:false
    showBool=false
    showBool2=false
    value1=20
    form={
      userId:'',
      roleId:'',
    }


    @Watch('color',{ deep: true })
    onColorChanged() {
      if(this.color.hex!='null'){
        localStorage.color = this.color.hex;
      }
      Color()
    }

    open(){
      this.showBool=true;
      this.showBool2=false;
      document.body.style.overflowY="hidden";
    }
    close(){
      this.showBool=false;
      this.showBool2=true;
      document.body.style.overflowY="";
    }
    switch2(){
      this.topFixed=!this.topFixed;
      this.$store.state.state.topFixed=this.topFixed
      localStorage.topFixed=this.topFixed?'true':false;
    }
    switch3(){
      this.sidebar=!this.sidebar;
      this.$store.state.state.sidebar=this.sidebar
      localStorage.sidebar=this.sidebar?'true':false;
    }
    Submit(item,obj){

      this.form={
        userId:obj.id,
        roleId:item.id,
      }
      const params={
        "google":"t-100142",
        "operating":"configRole",
        "form":this.form,
      }
      service.api(params).then(res =>{
        if(res.data.retType=='success'){
          this.data.roleId=item.id
          this.$emit('updata:data',this.data)

        }
      });
    }
  }
</script>

<style>
  .vc-sketch{box-shadow:initial!important; border: 0px solid #ddd}
  .div {
    position: fixed; right:-270px; width:270px; height:auto;
    background: #fff;
    top: 0px;
    bottom: 0px;
    /*box-shadow: -3px 0px 3px #ccc;*/
    z-index: 121;
  }

.b{right:-270px;}
.b2{right:0px;}

</style>