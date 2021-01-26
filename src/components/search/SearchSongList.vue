<template>
    <div class="search-song-Lists">
      <content-list :content-list="albumData"></content-list>
    </div>
</template>

<script>
  import {getSongListOfLikeTitle} from "../../api";
  import ContentList from "../ContentList";

  export default {
    name: "SearchSongList",
    components: {
      ContentList
    },
    data(){
      return {
        albumData: []
      }
    },
    mounted() {
      this.getSearchList();
    },
    methods:{
      getSearchList(){
        if (!this.$route.query.keywords){
          this.$message.error("你输入的内容为空")
        }else{
          getSongListOfLikeTitle(this.$route.query.keywords)
          .then(res => {
            if (!res.length){
              this.$message.error("暂无该歌单😅")
            }else{
              this.albumData = res
            }
          })
          .catch(() => {
            this.$message.error("出错了。。😰")
          })
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
@import '../../assets/css/search-song-Lists';
</style>
