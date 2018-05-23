import Vue from 'vue'
import App from './app.vue'
import 'babel-polyfill'
// import store from './manage/store'
// import router from './manage/router'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.use(Mint)

// Vue.use(router)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // store,
  // router,
  render: page => page(App)
})
