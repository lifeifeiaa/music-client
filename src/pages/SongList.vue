<template>
  <div class="song-list">
    <ul class="song-list-header">
      <li v-for="(item,index) in songStyle"
          :key="index"
          @click="handleChangeView(item.name)" :class="{active:item.name == activeName}">
        {{item.name}}
      </li>
    </ul>
    <div>
      <content-list :content-list="data"></content-list>
      <div class="pagination">
        <el-pagination
          @current-change="handleCurrentChange" background
          layout="total,prev,pager,next"
          :current-page="currentPage"
          :page-size="pageSize" :total="albumData.length">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import {getAllSongList,getSongListOfLikeStyle} from "../api";
  import ContentList from "../components/ContentList";
  import {songStyle} from "../assets/data/songList";
  export default {
    name: "SongList",
    components: {
      ContentList
    },
    data(){
      return {
        albumData: [],      //歌单数据
        pageSize: 10,       //翻页数据
        currentPage: 1,     //当前页，默认1
        songStyle: [],      //风格
        activeName: '全部歌单',     //当前风格
      }
    },
    computed:{
      //计算当前表格数据
      data(){
        return this.albumData.slice((this.currentPage - 1) * this.pageSize,this.currentPage*this.pageSize)
      },
    },
    mounted() {
      this.songStyle = songStyle;
      this.getSongList();
    },
    methods:{
      getSongList(){
        getAllSongList()
          .then(res => {
            this.currentPage = 1
            this.albumData = res
          })
          .catch(() => {
            this.$message.error("出错了。。😰")
          })
      },
      //获取当前页
      handleCurrentChange(val){
        this.currentPage = val
      },
      //通过style显示对应的歌单
      handleChangeView(name){
        this.activeName = name
        this.albumData = [];
        if (name == '全部歌单'){
          this.getSongList()
        }else{
          this.goSongListOfStyle(name)
        }
      },
      //通过style查询对应的歌单
      goSongListOfStyle(style){
        getSongListOfLikeStyle(style)
        .then(res => {
          this.currentPage = 1
          this.albumData = res
        })
        .catch(err => {
          console.log(err)
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import '../assets/css/song-List';
</style>
