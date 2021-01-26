<template>
  <div class="song-audio">
    <audio ref="player"
           :src="url"
           controls = "controls"
           preload="true"
           @canplay="startPlay"
           @ended="ended"
           @timeupdate="timeupdate"
    ></audio>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import {mixin} from '../mixins';
    export default {
      name: "SongAudio",
      mixins: [mixin],
      computed:{
        ...mapGetters([
          'id',
          'url',
          'isPlay',
          'listOfSongs',     //当前歌曲列表
          'curTime',     //当前音乐的播放位置
          'changeTime',  //指定播放位置
          'autoNext', //自动触发播放下一首
          'volume',     //音量
        ])
      },
      watch:{
        //监听播放还是暂停
        isPlay: function(){
          this.togglePlay();
        },
        //跳转到指定的播放时刻
        changeTime() {
          this.$refs.player.currentTime = this.changeTime;
        },
        //改变音量
        volume(val){
          this.$refs.player.volume = val;
        }
      },
      methods:{
        //获取链接后准备播放
        startPlay(){
          let player = this.$refs.player;
          this.$store.commit('setDuration',player.duration);
          //开始播放
          player.play();
          this.$store.commit('setIsPlay',true);
        },
        //播放完之后操作
        ended(){
          this.$store.commit('setIsPlay',false);
          this.$store.commit('setCurTime',0);
          this.$store.commit('setAutoNext',!this.autoNext);
        },
        togglePlay(){
          let player = this.$refs.player;
          if (this.isPlay){
            player.play();
          }else{
            player.pause();
          }
        },
        //音乐播放时记录音乐的播放位置
        timeupdate(){
          this.$store.commit('setCurTime',this.$refs.player.currentTime);
        },
      }
    }
</script>

<style scoped>
  .song-audio {
    display: none;
  }
</style>
