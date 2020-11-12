<template>
  <div class="layout">
    <el-upload
      class="avatar-uploader"
      :action="server+'?type='+data.id"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <div class="layout margin-top-10 margin-bottom-10 color-ccc font-size-12"> 
       注 ：图片上传后保存修改才能生效 (普通用户无法操作！)
    </div>
  </div>
</template>

<script lang="ts">
import { Component,Watch,Prop,Vue } from 'vue-property-decorator';
import service from '@/service/index'
@Component
export default class GoodUpload extends Vue{
  @Prop() private data
  server=''
  imageUrl=''
  filePath=''
  private created() {
    this.server=service.upload();
    this.filePath=service.filePath();
    this.loadImg(this.data);
  }

  @Watch('data',{ deep: true })
  onDataChanged(data) {
    this.loadImg(data);
  }

  loadImg(data){

    if(data=='undefined'||data.form.file=="") {
      this.imageUrl='';
    }
    if(data.form.file!=undefined&&data.form.file.length<7){
      this.imageUrl=`http://www.good1230.com/good/RandomUser//${this.data.form.file}`;
    }
     if(data.form.file!=undefined&&data.form.file.length>7){
      this.imageUrl=`${this.filePath}/${this.data.form.file}`;
    }
  }
  handleAvatarSuccess(res, file) {
    this.imageUrl = URL.createObjectURL(file.raw);
    this.data.form.image=res.name;
    this.data.form.file=res.file;
  }
  beforeAvatarUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isJPG) {
      this.$message.error('上传头像图片只能是 JPG 格式!');
    }
    if (!isLt2M) {
      this.$message.error('上传头像图片大小不能超过 2MB!');
    }
    return isJPG && isLt2M;
  }
}
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
    background: #fff;
  }
  .avatar {
    width: 150px;
    height: 150px;
    display: block;
  }
</style>