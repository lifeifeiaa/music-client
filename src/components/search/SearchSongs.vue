<template>
  <div class="search-songs">
    <album-content :songList="listOfSongs"></album-content>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import {mixin} from "../../mixins";
  import AlbumContent from "../AlbumContent";
    export default {
      name: "SearchSongs",
      mixins: [mixin],
      components: {AlbumContent},
      computed: {
        ...mapGetters([
          'listOfSongs'
        ])
      },
      mounted() {
        this.getSong();
      },
    }
</script>

<style lang="scss" scoped>
  @import '../../assets/css/search-songs';
</style>
