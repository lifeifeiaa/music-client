<template>
    <div class="my-music">
      <div class="album-slide">
        <div class="album-img">
          <img :src="attachImageUrl(avatar)">
        </div>
        <ul class="album-info">
          <li>昵称:{{username}}</li>
          <li>性别:{{userSex}}</li>
          <li>生日:{{birth}}</li>
          <li>故乡:{{location}}</li>
        </ul>
      </div>
      <div class="album-content">
        <div class="album-title">
          <span>个性签名:{{introduction}}</span>
        </div>
        <div class="songs-body">
          <album-content :song-list="collectList">
            <template slot="title">我的收藏</template>
          </album-content>
        </div>
      </div>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {mixin} from '../mixins'
  import {getUserOfId,getCollectOfUserId,songOfSongId} from '../api'
  import AlbumContent from "../components/AlbumContent";
    export default {
      name: "MyMusic",
      mixins: [mixin],
      components:{
        AlbumContent,
      },
      data(){
        return {
          avatar: '',
          username: '',
          userSex: '',
          birth: '',
          location: '',
          introduction: '',
          collection: [],     //收藏的歌曲列表
          collectList: [],     //收藏的歌曲列表（带歌曲详情）
        }
      },
      computed:{
        ...mapGetters([
          'listOfSongs',      //当前播放列表
          'userId',
        ])
      },
      created() {
        this.getMsg(this.userId)
        this.getCollection(this.userId)
      },
      methods:{
        getMsg(userId){
          getUserOfId(userId)
          .then(res => {
            this.avatar = res.avatar
            this.username = res.username
            if (res.sex == 0){
              this.userSex = '女'
            }else{
              this.userSex = '男'
            }
            this.birth = this.attachBirth(res.birth)
            this.location = res.location
            this.introduction = res.introduction
          })
          .catch(err => {
            console.log(err)
          })
        },
        //获取我的收藏列表
        getCollection(userId){
          getCollectOfUserId(userId)
          .then(res => {
            this.collection = res
            //通过歌曲id获取歌曲信息
            for (let item of this.collection){
              this.getSongsOfIds(item.songId)
            }
          })
          .catch(err => {
            console.log(err)
          })
        },
        //通过歌曲id获取歌曲信息
        getSongsOfIds(songId){
          songOfSongId(songId)
          .then(res => {
            this.collectList.push(res)
          })
          .catch(err => {
            console.log(err)
          })
        }
      }
    }
</script>

<style lang="scss" scoped>
@import '../assets/css/my-music';
</style>
