import Vue from 'vue'
import App from './app.vue'
import 'babel-polyfill'
import store from './manage/store'
import router from './manage/router'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import api from '@/components/api' // http请求P
import VueLocalStorage from 'vue-localstorage'
import helper from '@/components/helper'
import Mui from 'vue-awesome-mui'

// mount with global
Vue.use(Mui)
Vue.use(VueLocalStorage)
Vue.use(Mint)
// 用钩子函数beforeEach()对路由进行判断
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) { // 需要权限,进一步进行判断
    // if (store.state.login.token) {  // 通过vuex state获取当前的token是否存在
    // console.log();
    if (Vue.prototype.$localStorage.get('TOKEN')) {
      next()
    } else { // 如果没有权限,重定向到登录页,进行登录
      location.assign('login.html')
    }
  } else { // 不需要权限 直接跳转
    next()
  }
})

Vue.use(router)
Vue.config.productionTip = false
Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$helper = helper
console.log(api)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: page => page(App)
})
