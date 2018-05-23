import Vue from 'vue'
import Vuex from 'vuex'

import detail from './modules/detail'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    detail
  }
  // plugins: [logger],
})

export default store
