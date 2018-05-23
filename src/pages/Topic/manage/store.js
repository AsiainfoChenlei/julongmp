import Vue from 'vue'
import Vuex from 'vuex'

import index from './modules/index'
Vue.use(Vuex)

const state = {
  selected: '首页'
}

const mutations = {
  currentTab (state, current) {
    //  变更状态
    state.selected = current
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  modules: {
    index
  }
})

export default store
