import Vue from 'vue'
import Vuex from 'vuex'

import category from './modules/category'
import index from './modules/index'
import collection from './modules/collection'
import shop from './modules/shop'
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
    shop,
    category,
    index,
    collection
  }
})

export default store
