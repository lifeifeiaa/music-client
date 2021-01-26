<template>
  <div>
    <loginLogo/>
    <div class="signUp">
      <div class="signUp-head">
        用户注册
      </div>
      <el-form :model="loginForm" ref="loginForm" label-width="70px" class="demo-ruleForm" :rules="rules">
        <el-form-item prop="username" label="用户名">
          <el-input v-model="loginForm.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input type="password" v-model="loginForm.password" placeholder="密码"></el-input>
        </el-form-item>

        <div class="login-btn">
          <el-button @click="goSignUp">注册</el-button>
          <el-button type="primary" @click="handleLoginIn">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  import LoginLogo from '../components/LoginLogo';
  import {loginIn} from '../api';
    export default {
      name: "LoginIn",
      components:{
        LoginLogo
      },
      data(){
        return {
          loginForm: {
            username: '',
            password: '',
          },
          rules: {
              username: [
                { required: true, trigger: 'blur' , message: '请输入用户名'}
              ],
              password: [
                { required: true, trigger: 'blur' ,message: '请输入密码'}
              ]
          }
        }
      },
      mounted() {
        this.changeIndex('登录');
      },
      methods:{
        handleLoginIn(){
          let _this = this;
          let params = new URLSearchParams();
          params.append('username',this.loginForm.username);
          params.append('password',this.loginForm.password);
          loginIn(params)
            .then(res => {
              if (res.code == 1){
                _this.$message.success(res.msg);
                _this.$store.commit('setLoginIn',true);
                _this.$store.commit('setUserId',res.userMsg.id);
                _this.$store.commit('setUsername',res.userMsg.username);
                _this.$store.commit('setAvatar',res.userMsg.avatar);
                setTimeout(function () {
                  _this.$router.push({path: '/'});
                  _this.changeIndex('首页');
                },2000);
              }else{
                _this.$message.error(res.msg);
              }
            })
            .catch(err => {
              _this.$message.error("用户名或密码错误");
              console.log(err);
            })
        },
        goSignUp(){
          this.$router.push({path: '/sign-up'});
          this.changeIndex('注册');
        },
        changeIndex(value){
          this.$store.commit('setActiveName',value);
        },
      },
    }
</script>

<style lang="scss" scoped>
  @import '../assets/css/sign-up';
</style>
