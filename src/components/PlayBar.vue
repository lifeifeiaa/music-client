<template>
  <div class="play-bar" :class="{show:!toggle}">
    <div class="item-up" :class="{turn: !toggle}" @click="toggle = !toggle">
      <svg class="icon">
        <use xlink:href="#icon-jiantou-xia-cuxiantiao"></use>
      </svg>
    </div>
    <div class="kongjian">
      <!--上一首-->
      <div class="item" @click="prev">
        <svg class="icon">
          <use xlink:href="#icon-ziyuanldpi"></use>
        </svg>
      </div>
      <!--播放-->
      <div class="item" @click="togglePlay">
        <svg class="icon">
          <use :xlink:href="playButtonUrl"></use>
        </svg>
      </div>
      <!--下一首-->
      <div class="item" @click="next">
        <svg class="icon">
          <use xlink:href="#icon-ziyuanldpi1"></use>
        </svg>
      </div>
      <!--歌曲图片-->
      <div class="item-img" @click="toLyric">
        <img :src="picUrl">
      </div>
      <!--播放进度-->
      <div class="playing-speed">
        <!--播放开始时间-->
        <div class="current-time">{{nowTime}}</div>
        <div class="progress-box">
          <div class="item-song-title">
            <div>{{this.title}}</div>
            <div>{{this.artist}}</div>
          </div>
          <div ref="progress" class="progress" @mousemove="mousemove">
            <!--进度条-->
            <div ref="bg" class="bg" @click="updatemove">
              <div ref="curProgress" class="cur-progress" :style="{width: curLength+'%'}"></div>
            </div>
            <!--拖动的-->
            <div ref="idot" class="idot" :style="{left: curLength+'%'}" @mousedown="mousedown" @mouseup="mouseup"></div>
          </div>
        </div>
        <!--播放的结束时间-->
        <div class="left-time">{{songTime}}</div>
        <!--音量-->
        <div class="item item-volume">
          <svg v-if="volume == 0" class="icon">
            <use xlink:href="#icon-yinliangjingyinheix"></use>
          </svg>
          <svg v-else class="icon">
            <use xlink:href="#icon-yinliang"></use>
          </svg>
          <el-slider class="volume" v-model="volume" :vertical="true"></el-slider>
        </div>
        <!--收藏-->
        <div class="item" @click="collection">
          <svg :class="{active:isActive}" class="icon">
            <use xlink:href="#icon-xihuan-shi"></use>
          </svg>
        </div>
        <!--下载-->
        <div class="item" @click="downLoad">
          <svg class="icon">
            <use xlink:href="#icon-xiazai"></use>
          </svg>
        </div>
        <!--当前播放的歌曲列表-->
        <div class="item" @click="changeAside">
          <svg class="icon">
            <use xlink:href="#icon-liebiao"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import {downLoad, getCollectOfUserId, setCollect} from '../api';
    export default {
      name: "PlayBar",
      data(){
        return{
          nowTime: '00:00',  //当前时间
          songTime: '00:00',  //当前歌曲总时间
          curLength: 0,       //进度条的位置
          progressLength: 0,  //进度条的总长度
          mouseStartX: 0,     //拖拽开始的位置
          tag: false,         //拖拽开始结束的标志，当开始拖拽，它的值才会编程true
          volume: 50,        //音量，默认一半
          toggle: true,     //显示隐藏播放器页面
        }
      },
      computed:{
        ...mapGetters([
          'id',
          'url',
          'isPlay',
          'playButtonUrl',
          'picUrl',       //正在播放音乐的图片
          'title',        //歌名
          'artist',       //歌手
          'duration',     //音乐时长
          'lyric',
          'curTime',      //当前音乐的播放时间
          'showAside',
          'listIndex',    //当前歌曲在歌单中的位置
          'listOfSongs',
          'autoNext',     //是否自动播放下一首
          'loginIn',      //用户是否已登录
          'userId',       //当前登录用户的id
          'isActive',     //是否已收藏
        ])
      },
      watch:{
        //切换播放状态的图标
        isPlay(){
          if (this.isPlay){
            this.$store.commit('setPlayButtonUrl','#icon-zanting');
          }else {
            this.$store.commit('setPlayButtonUrl','#icon-bofang');
          }
        },
        //取得当前时间
        curTime(){
          this.nowTime = this.formatSeconds(this.curTime);
          this.songTime = this.formatSeconds(this.duration);
          this.curLength = (this.curTime / this.duration) * 100;
        },
        //音量变化
        volume(){
          this.$store.commit('setVolume',this.volume / 100);
        },
        //自动播放
        autoNext(){
          this.next()
        },
      },
      mounted() {
        this.progressLength = this.$refs.progress.getBoundingClientRect().width;
        document.querySelector('.item-volume').addEventListener('click',function (e) {
          document.querySelector('.volume').classList.add('show-volume');
          e.stopPropagation();
        },false);
        document.querySelector('.item-volume').addEventListener('click',function (e) {
          e.stopPropagation();
        },false);
        document.addEventListener('click',function (e) {
          document.querySelector('.volume').classList.remove('show-volume');
        },false)
      },
      methods:{
        //控制音乐播放暂停
        togglePlay(){
          if (this.isPlay){
            this.$store.commit('setIsPlay',false);
          }else {
            this.$store.commit('setIsPlay',true);
          }
        },
        //解析时间格式
        formatSeconds(value){
          let theTime = parseInt(value);
          let result = '';
          let hour = parseInt(theTime / 3600 )    //多少小时
          let minute = parseInt((theTime / 60) % 60 )    //分钟
          let second = parseInt(theTime % 60 )  //秒
          if( hour > 0){
            if (hour < 10){
              result = '0' + hour + ':';
            }else {
              result = hour + ':';
            }
          }
          if(minute > 0){
            if (minute < 10){
              result += '0' + minute + ':';
            }else {
              result += minute + ':';
            }
          }else {
            result += '00:';
          }
          if (second > 0){
            if (second < 10){
              result += '0' + second;
            }else {
              result += second;
            }
          }else {
            result += '00';
          }
          return result;
        },
        //拖拽开始
        mousedown(e){
          this.mouseStartX = e.clientX;
          this.tag = true

        },
        //拖拽结束
        mouseup(){
          this.tag = false;
        },
        //拖拽中
        mousemove(e){
          if (!this.duration){
            return false;
          }
          if (this.tag){
            let movementX = e.clientX - this.mouseStartX;     //移动的距离
            let curLength = this.$refs.curProgress.getBoundingClientRect().width
            let newPercent = ((movementX + curLength) / this.progressLength)*100;
            if (newPercent > 100){
              newPercent = 100;
            }
            this.curLength = newPercent;
            this.mouseStartX = e.clientX;     //球移动
            this.changTime(newPercent)
          }
        },
        //更改歌曲进度
        changTime(percent){
          let newCurTime = (percent*0.01)* this.duration;
          this.$store.commit('setChangeTime',newCurTime);
        },
        //点击播放条切换播放进度
        updatemove(e){
          if (!this.tag){
            //进度条左侧坐标
            let curLength = this.$refs.bg.offsetLeft;
            let newPercent = ((e.clientX - curLength) / this.progressLength)*100;
            if (newPercent > 100){
              newPercent = 100;
            }else if (newPercent < 0){
              newPercent = 0;
            }
            this.curLength = newPercent;
            this.changTime(newPercent);
          }
        },
        //显示播放中的歌曲列表
        changeAside(){
          this.$store.commit('setShowAside',true);
        },
        //上一首
        prev(){
          if (this.listIndex != -1 || this.listOfSongs.length > 1){ //当前处于不可能状态或者只有一首歌的状态
            if (this.listIndex > 0){  //不是第一首
              this.$store.commit('setListIndex',this.listIndex - 1) //返回上一首
            }else{
              this.$store.commit('setListIndex',this.listOfSongs.length - 1)     //切换到倒数第一首
            }
            this.toplay(this.listOfSongs[this.listIndex].url);
          }
        },
        //下一首
        next(){
          if (this.listIndex != -1 || this.listOfSongs.length > 1){ //当前处于不可能状态或者只有一首歌的状态
            if (this.listIndex < this.listOfSongs.length - 1){  //不是第一首
              this.$store.commit('setListIndex',this.listIndex + 1) //返回下一首
            }else{
              this.$store.commit('setListIndex', 0)     //切换到第一首
            }
            this.toplay(this.listOfSongs[this.listIndex].url);
          }
        },
        //播放音乐
        toplay:function (url) {
          if (url && url != this.url){
            this.$store.commit('setId',this.listOfSongs[this.listIndex].id);
            this.$store.commit('setUrl',this.$store.state.HOST+url);
            this.$store.commit('setPicUrl',this.$store.state.HOST+this.listOfSongs[this.listIndex].pic);
            this.$store.commit('setTitle',this.replaceFName(this.listOfSongs[this.listIndex].name));
            this.$store.commit('setArtist',this.replaceLName(this.listOfSongs[this.listIndex].name));
            this.$store.commit('setLyric',this.parseLyric(this.listOfSongs[this.listIndex].lyric));
            this.$store.commit('setIsActive',false);
            if (this.loginIn){
              getCollectOfUserId(this.userId)
                .then(res => {
                  for (let item of res){
                    if (item.songId == id){
                      this.$store.commit('setIsActive',true);
                      break;
                    }
                  }
                })
            }
          }
        },
        //获取名字前半部分--歌手名
        replaceLName(str){
          let arr = str.split('-');
          return arr[0];
        },
        //后半部分--歌名
        replaceFName(str){
          let arr = str.split('-');
          return arr[1];
        },
        //跳转歌词界面
        toLyric(){
          this.$router.push({path:`/lyric`})
        },
        //解析歌词
        parseLyric(text){
          let lines = text.split("\n");
          let pattern = /\[\d{2}:\d{2}.(\d{2}|\d{3})\]/g;
          let result = [];
          //对于歌词格式不对的直接返回
          if (!(/\[.+\]/.test(text))){
            return [[0,text]]
          }
          //去掉格式不正确的
          while (!pattern.test(lines[0])){
            lines = lines.slice(1)
          }
          for(let item of lines){
            let time = item.match(pattern)    //存前面的时间段
            let value = item.replace(pattern,''); //存后面的歌词
            for (let item1 of time){
              let t = item1.slice(1,-1).split(":");
              if (value != ''){
                result.push([parseInt(t[0],10)*60 + parseFloat(t[1]),value])
              }
            }
          }
          //按照第一个元素时间排序
          result.sort(function (a,b) {
            return a[0] - b[0];
          })
          return result;
        },
        //下载音乐
        downLoad(){
          downLoad(this.url)
          .then(res => {
            let content = res.data;
            let eleLink = document.createElement('a');
            eleLink.download = `${this.artist}-${this.title}.mp3`;
            eleLink.style.display = 'none';
            //把字符内容转换位blob地址
            let blob = new Blob([content]);
            eleLink.href = URL.createObjectURL(blob);
            //把链接地址加到document中
            document.body.appendChild(eleLink)
            //触发点击地址
            eleLink.click();
            //然后移除掉这个新加的空间
            document.body.removeChild(eleLink)
          })
          .catch(err => {
            console.log(err);
          })
        },
        //收藏
        collection(){
          if (this.loginIn){
            let params = new URLSearchParams();
            params.append('userId',this.userId)
            params.append('type',0)
            params.append('songId',this.id)
            setCollect(params)
            .then(res => {
              if(res.code == 1){
                this.$store.commit('setIsActive',true)
                this.$message.success(res.msg)
              }else if(res.code == 2){
                this.$message.warning(res.msg)
              }else if (res.code == 0){
                this.$message.error(res.msg)
              }
            })
            .catch(err => {
              console.log(err)
            })
          }else{
            this.$message.error("请先注册/登录")
          }
        },
      },
    }
</script>

<style lang="scss" scoped>
  @import '../assets/css/play-bar';
</style>
