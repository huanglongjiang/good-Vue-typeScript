<template>
<div class="header height-60 width-max background-primary z-index-100" style="box-shadow: rgba(0, 0, 0, 0.25) 0px 0px 1px;">
    <div class="header height-60 width-max position-r">

        <div class="position-a clearfix">
            <div class="float-left width-280 height-60 font-size-24 bold line-height-60 color-999">
              <good-logo class="float-left"></good-logo>
              <span class="padding-left-20 color-white">{{state.webTitle}}</span>
            </div>
            <!-- <a :href="domain" class="color-666 none-line float-left" target="_blank"> -->
            <a class="color-666 none-line float-left" target="_blank">
            <div class=" inline-block  radius-20 overflow-hidden float-left">
              <template v-if="form.file!=''&&form.file!=undefined">
                  <img :src="filePath+'/'+form.file" alt="" class="width-30 height-30 margin-top-15 radius-20 float-left" v-if="form.file.length>7">
                  <img :src="'http://www.good1230.com/good/RandomUser/'+form.file" alt="" class="width-30 height-30 margin-top-15 radius-20 float-left" v-else>
              </template>
              <template v-else>
                  <img src="static/images/tianmao.jpg" alt="" class="width-30 height-30 margin-top-15 radius-20 float-left">
              </template>
              </div>
              <span class="line-height-60 margin-left-20  margin-right-10 color-white" >
                {{form.name}}
              </span>
              

            </a>
            
            <span class="color-white float-left font-size-14 line-height-60 margin-left-5" v-if="form.role==0">用户类型：普通用户</span>
            <span class="color-white float-left font-size-14 line-height-60 margin-left-5" v-if="form.role==1">(用户类型：管理员</span>
            <span class="color-white float-left font-size-14 line-height-60 margin-left-5" v-if="form.role==2">(用户类型：超级管理员</span>

            <span class="color-white float-left font-size-14 line-height-60 margin-left-5">、用户角色：{{form.roleName}})</span>
            <!-- <template v-if="state.authority!=2">
            <marquee class="float-left position-r top-20 margin-left-20" style="width:450px;">{{state.marquee}}</marquee>
            </template> -->
        </div>
        <ul class="padding-top-20">

            <li class="width-30 height-30 line-height-30 align-center inline-block padding-bottom-5 margin-left-20 radius-4 float-right position-r radius-20 margin-right-20 pointer" style="color: #adb5bd; top:-3px;" @click="logOut()">
              
                <i class="fa fa-sign-in font-size-18 color-white"></i>
            </li>
            <!-- <li class="width-30 height-30 line-height-30 align-center inline-block padding-bottom-5 margin-left-20 radius-4 float-right position-r radius-20  no-drop" style="color: #adb5bd; top:-3px;" title="修改密码">
              
                <i class="fa fa-lock font-size-18" style="color: #adb5bd;"></i>
            </li> -->

            <li class="width-30 height-30 line-height-30 align-center inline-block padding-bottom-5 margin-left-20 radius-4 float-right position-r radius-20 pointer" style="color: #adb5bd; top:-3px;" title="修改密码" @click="editPass()">
              
                <i class="fa fa-lock font-size-18 color-white"></i>
            </li>

            <li class="width-30 height-30 line-height-30 align-center inline-block padding-bottom-5 margin-left-30 radius-4 float-right position-r radius-20 pointer" style="color: #adb5bd; top:-3px;" title="编辑个人资料" @click="select()">
              
                <i class="fa fa-user font-size-18 color-white"></i>
            </li>
            <!-- <li class="width-30 height-30 line-height-30 align-center inline-block padding-bottom-5 margin-left-30 radius-4 float-right position-r radius-20 no-drop" style="color: #adb5bd; top:-3px;" title="编辑个人资料">
              
                <i class="fa fa-user font-size-18" style="color: #adb5bd;"></i>
            </li> -->
            <router-link to="bbs" tag="li" class="width-30 height-30 line-height-30 align-center inline-block padding-bottom-5 margin-left-20 radius-4 float-right position-r radius-20 pointer " style="color: #adb5bd; top:-3px;">
                <i class="fa fa-envelope-o font-size-18 color-white"></i>
            
                <good-info class="position-a left-20 height-18 line-height-18" :data="state.bbsTotal" v-if="state.bbsTotal" style="top: -10px;"></good-info>
                <good-info class="position-a left-20 height-18 line-height-18" :data="0" v-else style="top: -10px;"></good-info>
            </router-link>
            
            <li class="width-30 height-30 line-height-30 align-center inline-block padding-bottom-5 margin-left-20 radius-4 float-right position-r radius-20" style="color: #adb5bd; top:-3px;">
              <a :href="domain" target="_blank">
                <i class="fa fa-bell-o font-size-18 color-white"></i>
            
                <div class="notify  position-a top-0 right-0">
                    <span class="ring  position-a top-0 right-0"></span>
                    <span class="ring-point background-danger position-a top-0 right-0 color-white radius-20"></span>
                </div>
              </a>
            </li>
            <!-- <li class="width-auto height-36 line-height-36 align-center inline-block padding-bottom-5 margin-left-20 radius-4 float-right position-r radius-20 clearfix pointer" style="color: #adb5bd; top:-3px;">
              <a :href="constant.qq" rel="nofollow"><img src="http://good1230.com//templates/code/images/button_11.gif" style="position:relative; top:3px;"></a>
            </li> -->
            <!-- <router-link to="money" tag="li" class="width-auto height-36 line-height-36 align-center inline-block padding-bottom-5 margin-left-20 radius-4 float-right position-r radius-20 clearfix pointer" style="color: #adb5bd; top:-3px;">
              <img src="static/images/money-bag.png" alt="" class="width-30 float-left">
              <span class="float-left bold color-primary">+{{income}}</span>
            </router-link> -->

        </ul>
      
    </div>

      <!-- 模态框 -->
      <good-dialog title="个人资料" :visible.sync='dialogShow'>   
        <div slot="body">
               <div class="table-default" style="margin:0px">
              <table class="table-group">
                  
                  
                  
                  <tr>
                      <tds-label>用户邮箱：</tds-label>
                      <td><el-input v-model="form.email" disabled></el-input></td>
                  </tr>
                  
                  <tr>
                      <tds-label>用户类型：</tds-label>

                      <td>
                        <el-input v-if="form.role==0" value="普通用户" disabled></el-input>
                        <el-input v-if="form.role==1" value="管理员" disabled></el-input>
                        <el-input v-if="form.role==2" value="超级管理员" disabled></el-input>
                      </td>
                  </tr>
                  <tr>
                      <tds-label>用户角色：</tds-label>
                      <td><el-input v-model="form.roleName" disabled></el-input></td>
                  </tr>
                  <tr>
                      <tds-label>用户名称：</tds-label>
                      <td><el-input v-model="form.name"></el-input></td>
                  </tr>
                  <tr>
                      <tds-label class=" position-r">用户头像：</tds-label>
                      <td>
                        <good-upload :data='{form,id:"u1",type:"user"}'></good-upload>
                      </td>
                  </tr>

              </table> 
          </div>
        </div>
        <div slot="footer">
          <good-button @click="Submit">确定</good-button>
        </div>
       </good-dialog>

       <!-- 修改密码 -->
      <good-dialog title="修改密码" :visible.sync='dialogShow2'>
        <div slot="body">
               <div class="table-default">
              <table class="table-group">
                  <tr>
                      <tds-label>旧密码：</tds-label>
                      <td><el-input v-model="form2.passOld"></el-input></td>
                  </tr>
                  <tr>
                      <tds-label>新密码：</tds-label>
                      <td><el-input v-model="form2.passNew"></el-input></td>
                  </tr>
              </table> 
          </div>
        </div>
        <div slot="footer">
          <good-button @click="SubmitEdit">确定</good-button>
        </div>
       </good-dialog>
        <!-- 模态框 -->
       <good-config :data.sync="form"></good-config>
</div>
</template>
<script>
import service from '@/service/index'
    import { mapState } from 'vuex'
    //import Images from '../common/image'
    //import UploadFiles from '../common/uploadFile'
    export default {
        components: {
            //Images,//UploadFiles,
        },
        data() {
            return {
              filePath:'',
              dialogShow:false,
              dialogShow2:false,
              domain:'',
              bbs:0,
              income:0,
              paycount:0,
              form:{
                  name:'',
                  email:'',
                  image:'',
              },
              form2:{
                  id:0,
                  passOld:'',
                  passNew:'',
              },
            }
        },
        created: function() {
            this.submitForm();
            this.domain=window.location.origin
            this.filePath=service.filePath();
        },
        computed: {
            ...mapState(['state']),
        },
        watch: {  
            'form.roleId': function(val,val2){
              if(val2!=undefined){
                this.submitForm();
              }
            },
        }, 
        methods:{
            logOut(){
              this.$router.push('login');
               // this.$axios.post('http://127.0.0.1/vue/return.php').then(res => {
                 
              //  })
            },
           
            submitForm(){
                const params={
                        "google":"t-100142",
                        "operating":"select",
                    }
                service.api(params).then(res =>{
                  localStorage.setItem("lastname", "Smith");
                    localStorage.setItem("permission",JSON.stringify(res.data.data.authority));
                    this.form2.id=res.data.data.id
                    this.form=res.data.data;
                    this.bbs=res.data.bbs;
                    this.income=res.data.income;
                    this.paycount=res.data.paycount;
                    this.state.authority=res.data.data.role;
                    this.constant.authority=res.data.data.role;
                    this.state.account=res.data.data.account;
                    this.state.bbsTotal=res.data.bbs_total;
                    this.state.logTotal=res.data.log_total;
                    this.state.userTotal=res.data.user_total;
                    this.state.permission=res.data.data.authority;
                    this.state.roleId=res.data.data.roleId;
                    this.state.menu2=res.data.data.menu;
                    //localStorage.setItem = ('permission',res.data.data.authority);
                })
            },
            Submit(index){
                const params={
                    "google":"t-10014",
                    "operating":"update",
                    "form":this.form
                }
                service.api(params).then(res =>{
                  if(res.data.retType=='success'){
                    this.dialogShow=false; 
                    this.submitForm();
                  }
                });
            },
            SubmitEdit(index){
                const params={
                    "google":"t-10014",
                    "operating":"updatePass",
                    "form":this.form2
                }
                service.api(params).then(res =>{
                  if(res.data.retType=='success'){
                    this.dialogShow2=false; 
                  }
                    //this.submitForm();
                });
            },
            
            select(){
              this.dialogShow=true;
            },
            editPass(){
              this.dialogShow2=true;
            },
            imgNames(item){
              this.form.image=item;
            },
        },
    }
</script>

<style>
.background-disabled{background: #f5f7fa}
  .rotate {
    -webkit-animation: rotating 1.2s linear infinite;
    -moz-animation: rotating 1.2s linear infinite;
    -o-animation: rotating 1.2s linear infinite;
    animation: rotating 1.2s linear infinite;
}

@-webkit-keyframes rotating {
from {
-webkit-transform:rotate(0deg)
}
to {
  -webkit-transform: rotate(360deg)
}
}
@keyframes rotating {
from {
transform:rotate(0deg)
}
to {
  transform: rotate(360deg)
}
}
@-moz-keyframes rotating {
from {
-moz-transform:rotate(0deg)
}
to {
  -moz-transform: rotate(360deg)
}
}
</style>
<style>
      .uploader-list{display: none;}  
      .main-cloud{
    fill: #fff;
}
</style>