import {get,post} from './http';
import axios from "axios";

/*--------------歌手相关------------------*/
//查询歌手
export const getAllSinger = () => get('singer/allSinger');

//通过性别查询歌手
export const getSingerOfSex =(sex) => get(`singer/singerBySex?sex=${sex}`)

/*--------------歌曲相关------------------*/
//通过歌手id查询歌曲
export const songBySingerId = (id) => get(`song/singer/detail?singerId=${id}`)

//通过歌曲id查询歌曲对象
export const songOfSongId = (id) => get(`song/songOfSongId?songId=${id}`)

//通过歌曲名模糊查询歌曲
export const likeSongOfName = (keywords) => get(`song/likeSongOfName?songName=${keywords}`)

//查询所有的歌曲
export const getAllSong = () => get('song/allSong')

/*------------------歌单相关---------------------*/
//查询歌单
export const getAllSongList = () => get('songList/allSongList');

//根据标题模糊查询
export const getSongListOfLikeTitle = (keywords) => get(`songList/likeTitle?title=${keywords}`)

//根据风格模糊查询歌单列表
export const getSongListOfLikeStyle = (style) => get(`songList/likeStyle?style=${style}`)

/*----------------------歌单的歌曲相关----------------------*/
//根据歌单id查询歌曲列表
export const listSongDetail = (songListId) => get(`listSong/detail?songListId=${songListId}`)

/*--------------用户相关------------------*/
//查询用户
export const getAllConsumer = () => get('consumer/allConsumer');

//用户注册
export const SignUp = (params) => post(`/consumer/add`,params);

//用户登录
export const loginIn = (params) => post(`consumer/login`,params);

//根据用户id查询详细信息
export const getUserOfId = (id) => get(`consumer/selectById?id=${id}`)

//更新用户信息
export const UpdateUser = (params) => post(`consumer/update`,params)

//下载音乐
export const downLoad = (url) => axios({
  method: 'get',
  url: url,
  responseType: 'blob'
})

/*--------------评价------------------*/
//新增评价
export const setRank = (params) => post(`/rank/add`,params);

//平均分
export const getRankOfSongListId = (songListId) => get(`/rank/count?songListId=${songListId}`);

/*--------------评论------------------*/
//提交评论
export const setComment =(params) => post(`/comment/add`,params);

//点赞
export const setLike =(params) => post(`/comment/like`,params);

//返回当前歌曲或歌单的评论列表
export const getAllComment =(type,id) => {
  if (type == 0){       //歌曲
    return get(`/comment/commentOfSongId?songId=${id}`)
  }else{                //歌单
    return get(`/comment/commentOfSongListId?songListId=${id}`)
  }
}

/*--------------收藏------------------*/
//新增收藏
export const setCollect = (params) => post(`collect/add`,params)

//指定用户的收藏列表
export const getCollectOfUserId = (userId) => get(`collect/collectOfUserId?userId=${userId}`)
