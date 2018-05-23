import Vue from 'vue'
import Vuex from 'vuex'

import order from './modules/order'
import address from './modules/address'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    order,
    address
  }
  // plugins: [logger],
})

export default store
