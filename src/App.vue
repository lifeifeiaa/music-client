<template>
  <div id="app">
    <the-header/>
    <router-view class="music-content" :key="key"/>
    <song-audio/>
    <the-aside/>
    <play-bar/>
    <scroll-top/>
    <the-footer/>
  </div>
</template>

<script>
  import TheHeader from "./components/TheHeader";
  import ScrollTop from "./components/ScrollTop";
  import TheFooter from "./components/TheFooter";
  import SongAudio from "./components/SongAudio";
  import PlayBar from "./components/PlayBar";
  import TheAside from "./components/TheAside";
export default {
  name: 'App',
  components: {
    TheAside,
    PlayBar,
    SongAudio,
    TheFooter,
    ScrollTop,
    TheHeader
  },
  computed: {
    key(){
      return this.$route.name?this.$router.name+ +new Date():this.$route+ +new Date()
    }
  }
}
</script>

<style lang="scss" scoped>
  @import './assets/css/app.scss';
</style>
