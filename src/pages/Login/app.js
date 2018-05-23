import Vue from 'vue'
import App from './app.vue'
import 'babel-polyfill'
import store from './manage/store'
import router from './manage/router'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import api from '@/components/api' // http请求
import VueLocalStorage from 'vue-localstorage'
import Mui from 'vue-awesome-mui'
// mount with global
Vue.use(Mui)
Vue.use(VueLocalStorage)
Vue.use(Mint)
Vue.use(router)
Vue.config.productionTip = false
Vue.config.productionTip = false
Vue.prototype.$api = api
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: page => page(App)
})
