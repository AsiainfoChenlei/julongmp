import Vue from 'vue'
import Vuex from 'vuex'

import tread from './modules/tread'

import tagsView from './modules/tagsView'

import tread7 from './modules/tread7'
// import tagsView6 from './modules/tagsView6'

Vue.use(Vuex)

const state = {
  selected: '商城页面'
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
    tread,
    tagsView,
    tread7
    //  tagsView6
  }
})

export default store
