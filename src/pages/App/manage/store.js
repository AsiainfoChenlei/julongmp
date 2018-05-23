import Vue from 'vue'
import Vuex from 'vuex'

import order from './modules/order'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    order
  }
  // plugins: [logger],
})

export default store
