<template>
  <div class="singer">
    <ul class="singer-header">
      <li v-for="(item,index) in singerStyle"
          :key="index"
          @click="handleChangeView(item.type)"
          :class="{active:item.type == activeName}">
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
  import {getAllSinger,getSingerOfSex} from "../api";
  import ContentList from "../components/ContentList";
  import {singerStyle} from "../assets/data/singer";
  export default {
    name: "Singer",
    components: {
      ContentList
    },
    data(){
      return {
        albumData: [],      //歌手数据
        pageSize: 10,       //翻页数据
        currentPage: 1,     //当前页，默认1
        singerStyle: [],      //性别
        activeName: -1,     //当前风格
      }
    },
    computed:{
      //计算当前表格数据
      data(){
        return this.albumData.slice((this.currentPage - 1) * this.pageSize,this.currentPage*this.pageSize)
      },
    },
    mounted() {
      this.singerStyle = singerStyle;
      this.getSingerList();
    },
    methods:{
      getSingerList(){
        getAllSinger()
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
      handleChangeView(type){
        this.activeName = type
        this.albumData = [];
        if (type == -1){
          this.getSingerList()
        }else{
          this.goSingerOfSex(type)
        }
      },
      //通过style查询对应的歌单
      goSingerOfSex(style){
        getSingerOfSex(style)
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
  @import '../assets/css/singer';
</style>
