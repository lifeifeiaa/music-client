import {getCollectOfUserId, likeSongOfName} from "../api";
import {mapGetters} from "vuex";

export const mixin = {
  computed:{
    ...mapGetters([
      'loginIn',
      'userId'
    ])
  },
  methods: {
    //获取图片地址
    attachImageUrl(srcUrl) {
      return srcUrl ? this.$store.state.configure.HOST+srcUrl : this.$store.state.configure.HOST+'/img/consumerPic/consumer.jpg';
    },
    //根据歌手名字模糊搜索
    getSong() {
      if (!this.$route.query.keywords){
        this.$store.commit('setListOfSongs',[]);
        this.$message.error({message:"你输入的内容为空",duration:600});
      }else{
        likeSongOfName(this.$route.query.keywords)
          .then(res => {
            if (!res.length){
              this.$store.commit('setListOfSongs',[]);
              this.$message.error({message:"没有该歌曲 😓",duration:600});
            }else{
              this.$store.commit('setListOfSongs',res);
            }
          }).catch(err => {
            console.log(err)
        })
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
    //播放
    toplay:function (id,url,pic,index,name,lyric) {
      this.$store.commit('setId',id);
      this.$store.commit('setUrl',this.$store.state.HOST+url);
      this.$store.commit('setPicUrl',this.$store.state.HOST+pic);
      this.$store.commit('setListIndex',index);
      this.$store.commit('setTitle',this.replaceFName(name));
      this.$store.commit('setArtist',this.replaceLName(name));
      this.$store.commit('setLyric',this.parseLyric(lyric));
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
    //获取生日
    attachBirth(val){
      return val.substr(0,10);
    },
  }
}
