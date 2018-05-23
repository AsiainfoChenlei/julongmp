import Vue from 'vue'
import Vuex from 'vuex'

import shop from './modules/shop'
import tagsView from './modules/tagsView'
import search from './modules/search'

import searchData from './modules/searchData'
Vue.use(Vuex)

const state = {
  selected: '商城首页'
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
    shop,
    tagsView,
    search,
    searchData
  }
})

export default store
