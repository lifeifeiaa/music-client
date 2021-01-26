<template>
  <div class="upload">
    <p class="title">修改头像</p>
    <hr>
    <div class="section">
      <el-upload drag :action="uploadUrl()"
                 :show-file-list="false"
                 :on-success="handleAvatarSuccess"
                 :before-upload="beforeAvatarUpload">
        <i class="el-icon-upload"></i>
        <div>
          将文件拖到此处，或<span style="color: #30a4fc;font-size: 18px">修改头像</span>
        </div>
        <div style="text-align: center" slot="tip">只能上传jpg/png文件，且不能超过10MB</div>
      </el-upload>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {mixin} from '../mixins'
    export default {
      name: "Upload",
      mixins: [mixin],
      computed:{
        ...mapGetters([
          'userId',
        ])
      },
      methods:{
        //上传地址
        uploadUrl(){
          return `${this.$store.state.HOST}/consumer/updateConsumerPic?id=${this.userId}`
        },
        //上传成功后
        handleAvatarSuccess(res,file){
          if (res.code == 1){
            this.$store.commit('setAvatar',res.avatar);
            this.$message.success(res.msg)
          }else{
            this.$message.success(res.msg)
          }
        },
        //上传前
        beforeAvatarUpload(file){
          const isJPG = file.type == 'image/jpeg' || 'image/jpg';
          const isLt10M = file.size /1024/1024 < 10;
          if (!isJPG){
            this.$message.error("上传头像图片只能是JPG格式")
            return false
          }
          if (!isLt10M){
            this.$message.error("上传头像图片不能大于10Mb")
            return false
          }
          return true
        },
      },
    }
</script>

<style lang="scss" scoped>
  @import '../assets/css/upload';
</style>
