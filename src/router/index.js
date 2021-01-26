import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/Home'
import Singer from "../pages/Singer";
import MyMusic from "../pages/MyMusic";
import SongList from "../pages/SongList";
import Search from "../pages/Search";
import Lyric from "../pages/Lyric";
import LoginIn from "../pages/LoginIn";
import SignUp from "../pages/SignUp";
import Setting from "../pages/Setting";
import SingerAlbum from "../pages/SingerAlbum";
import SongListAlbum from "../pages/SongListAlbum";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/singer',
      name: 'singer',
      component: Singer
    },
    {
      path: '/song-list',
      name: 'song-list',
      component: SongList
    },
    {
      path: '/my-music',
      name: 'my-music',
      component: MyMusic
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/lyric',
      component: Lyric
    },
    {
      path: '/login-in',
      component: LoginIn
    },
    {
      path: '/sign-up',
      component: SignUp
    },
    {
      path: '/setting',
      component: Setting
    },
    {
      path: `/singer-album/:id`,
      name: 'singer-album',
      component: SingerAlbum
    },
    {
      path: `/song-list-album/:id`,
      name: 'song-list-album',
      component: SongListAlbum
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return {x: 0,y: 0}
  }
})
