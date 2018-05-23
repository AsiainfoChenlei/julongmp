import Vue from 'vue'
import Vuex from 'vuex'

import address from './modules/address'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    address
  }
  // plugins: [logger],
})

export default store
