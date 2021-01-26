<template>
    <div class="the-header">
      <div class="header-logo" @click="goHome">
        <svg class="icon">
          <use xlink:href = "#icon-erji"></use>
        </svg>
        music
      </div>
      <ul class="navbar">
        <li :class="{active: item.name == activeName}" v-for="item in navMsg" :key="item.path" @click="goPage(item.path,item.name)">
          {{item.name}}
        </li>
        <li>
          <div class="header-search">
            <input type="text" placeholder="搜索音乐" @keyup.enter="goSearch()" v-model="keywords">
            <div class="search-btn" @click="goSearch()">
              <svg class="icon">
                <use xlink:href="#icon-sousuo"></use>
              </svg>
            </div>
          </div>
        </li>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <li v-show="!loginIn" :class="{active: item.name == activeName}" v-for="item in loginMsg"
            :key="item.path"
            @click="goPage(item.path,item.name)">
          {{item.name}}
        </li>
      </ul>
      <div class="header-right" v-show="loginIn">
        <div id="user">
          <img :src="attachImageUrl(avatar)">
        </div>
        <ul class="menu">
          <li v-for="(item,index) in menuList" :key="index" @click="gpMenuList(item.path)">{{item.name}}</li>
        </ul>
      </div>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import {navMsg,loginMsg,menuList} from "../assets/data/header";
  import {mixin} from '../mixins'
  export default {
    name: "TheHeader",
    mixins: [mixin],
    data() {
      return {
        navMsg: [],    //导航栏
        loginMsg: [],
        menuList: [],
        keywords: '',   //搜索关键字
      }
    },
    computed: {
      ...mapGetters([
        'activeName',
        'loginIn',
        'avatar',
      ])
    },
    created() {
      this.navMsg = navMsg;
      this.loginMsg = loginMsg;
      this.menuList = menuList;
    },
    mounted() {
      document.querySelector('#user').addEventListener('click',function (e) {
        document.querySelector('.menu').classList.add("show");
        e.stopPropagation();
      },false);

      document.querySelector('.menu').addEventListener('click',function (e) {
        e.stopPropagation();
      },false);
      document.addEventListener('click',function () {
        document.querySelector('.menu').classList.remove("show")
      },false)
    },
    methods: {
      goHome(){
          this.$router.push({path: '/'});
      },
      goPage(path,name){
        if (!this.loginIn && path == '/my-music'){
          this.$message.warning({message:'请先注册/登录',duration:800})
        }else {
          this.$store.commit('setActiveName', name);
          this.$router.push({path: path});
        }
      },
      goSearch(){
        this.$router.push({path: '/search',query:{keywords: this.keywords}})
      },
      gpMenuList(path){
        if (path == 0){
          this.$router.push({path: '/'});
          this.$store.commit('setLoginIn',false);
          this.$store.commit('setIsActive',false);
          this.$router.go(0);
          this.$store.commit('setIsPlay',false);
          this.$store.commit('setTempList',[]);
        }else{
          this.$router.push({path: path})
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/css/the-header';
</style>
