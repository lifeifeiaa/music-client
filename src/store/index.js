import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import song from './song'
import configure from './configure'

Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
    HOST: 'http://47.100.137.146:8888',
  },
  modules: {
    song,
    user,
    configure
  }
})

export default store
