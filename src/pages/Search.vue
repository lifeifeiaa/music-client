<template>
  <div class="search">
    <nav class="searchList-nav" ref="change">
      <span :class="{isActive: toggle == 'Songs'}" @click="handleChangeView('Songs')">歌曲</span>
      <span :class="{isActive: toggle == 'SongList'}" @click="handleChangeView('SongList')">歌单</span>
    </nav>
    <component :is="currentView" ></component>
  </div>
</template>

<script>
  import SearchSongs from "../components/search/SearchSongs";
  import SearchSongList from "../components/search/SearchSongList";
    export default {
      name: "Search",
      components: {
        SearchSongs,
        SearchSongList
      },
      data(){
        return {
          toggle: 'Songs',
          currentView: 'SearchSongs'
        }
      },
      methods: {
        //切换主键
        handleChangeView(component){
          this.currentView = 'Search'+component;
          this.toggle = component;
        },
      }
    }
</script>

<style lang="scss" scoped>
  @import '../assets/css/search';
</style>
