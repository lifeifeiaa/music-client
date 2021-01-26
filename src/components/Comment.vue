<template>
    <div>
      <div class="comment">
        <h2>评论</h2>
        <div class="comment-msg">
          <div class="comment-img">
            <img :src="attachImageUrl(avatar)">
          </div>
          <el-input class="comment-input"
                    type="textarea" :rows="2"
                    placeholder="请输入内容" v-model="textarea">
          </el-input>
        </div>
        <el-button type="primary" class="sub-btn" @click="postComment">评论</el-button>
      </div>
      <p>精彩评论:共{{commentList.length}}条评论</p>
      <hr>
      <ul class="popular" v-for="(item,index) in commentList" :key="index">
        <li>
          <div class="popular-img">
            <img :src="attachImageUrl(userPic[index])">
          </div>
          <div class="popular-msg">
            <ul>
              <li class="name">{{userName[index]}}</li>
              <li class="time">{{item.createTime}}</li>
              <li class="content">{{item.content}}</li>
            </ul>
          </div>
          <div class="up" ref="up" @click="postUp(item.id,item.up,index)">
            <svg class="icon">
              <use xlink:href="#icon-zan"></use>
            </svg>
            {{item.up}}
          </div>
        </li>
      </ul>
    </div>
</template>

<script>
  import {mixin} from '../mixins'
  import {mapGetters} from 'vuex'
  import {setComment, setLike, getAllComment, getUserOfId} from "../api";
    export default {
      name: "Comment",
      mixins: [mixin],
      props: [
        'playId',       //歌曲或歌单id
        'type',         //0歌曲，1歌单
      ],
      computed:{
        ...mapGetters([
          'id',       //歌单或歌曲id
          'loginIn',
          'userId',
          'avatar',

        ])
      },
      data(){
        return {
          textarea: '',       //存放输入的评论内容
          commentList: [],    //存放评论列表
          userPic: [],        //评论者的头像
          userName: [],       //评论者的昵称
        }
      },
      mounted() {
        this.getComment()
      },
      methods: {
        //提交评论
        postComment(){
          if(this.loginIn){
            let params = new URLSearchParams();
            if (this.type == 0){    //歌曲
              params.append('songId',this.playId)
            }else{                  //歌单
              params.append('songListId',this.playId)
            }
            params.append('userId',this.userId)
            params.append('type',this.type)
            params.append('content',this.textarea)
            setComment(params)
            .then(res => {
              if (res.code == 1){
                this.$message.success("评论成功😀")
                this.textarea = '';
                this.getComment();
              }else{
                this.$message.error("评论失败")
              }
            })
            .catch(err => {
              this.$message.error("评论失败")
            })
          }else{
            this.$message.warning("请先注册或登录")
          }
        },
        //评论列表
        getComment(){
          getAllComment(this.type,this.playId)
          .then(res => {
            this.commentList = res;
            for (let item of res){
              this.getUsers(item.userId);
            }
          })
          .catch(err => {
            this.$message.error("评论加载失败😀")
          })
        },
        //获取用户的头像和昵称
        getUsers(id){
          getUserOfId(id)
          .then(res => {
            this.userPic.push(res.avatar)
            this.userName.push(res.username)
          })
          .catch(err => {
            this.$message.error("出错了😀")
          })
        },
        //给某一个评论点赞
        postUp(id,up,index){
          if(this.loginIn){
            let params = new URLSearchParams();

            params.append('id',id)
            params.append('up',up+1)
            setLike(params)
              .then(res => {
                if (res.code == 1){
                  this.$refs.up[index].children[0].style.color = '#cc0033'
                  this.getComment();
                }else{
                  this.$message.error("点赞失败😭")
                }
              })
              .catch(err => {
                this.$message.error("点赞失败😭")
              })
          }else{
            this.$message.warning("请先注册或登录")
          }
        },
      }
    }
</script>

<style lang="scss" scoped>
@import '../assets/css/comment';
</style>
