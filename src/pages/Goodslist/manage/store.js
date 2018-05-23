import Vue from 'vue'
import Vuex from 'vuex'

import goodslist from './modules/goodslist'
import tagsView from './modules/tagsView'
import shop from './modules/shop'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    goodslist,
    tagsView,
    shop
  }
  // plugins: [logger],
})

export default store
