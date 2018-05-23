import Vue from 'vue'
import VueRouter from 'vue-router'

const register = r => require.ensure([], () => r(require('../views/register'))) // 首页

const forgetPassword = r => require.ensure([], () => r(require('../views/forgetPassword'))) // 首页

const setPasswordSecond = r => require.ensure([], () => r(require('../views/setPasswordSecond'))) // 首页

const login = r => require.ensure([], () => r(require('../views/login'))) // 首页

const setPassword = r => require.ensure([], () => r(require('../views/setPassword'))) // 首页

const verificationCode = r => require.ensure([], () => r(require('../views/verificationCode'))) // 首页

const verificationSecCode = r => require.ensure([], () => r(require('../views/verificationSecCode'))) // 首页

const agregister = r => require.ensure([], () => r(require('../views/agregister'))) // 注册协议
Vue.use(VueRouter)

const baseUrl = ''

const routes = [
  {
    name: 'root',
    path: baseUrl + '/',
    meta: {
      position: {
        x: 0,
        y: 0
      },
      level: 0
    },
    redirect: baseUrl + '/login'
  },
  {
    name: '注册页',
    path: baseUrl + '/register',
    meta: {
      position: {
        x: 0,
        y: 0
      },
      level: 0
    },
    component: register
  },
  {
    name: '登录',
    path: baseUrl + '/login',
    meta: {
      position: {
        x: 0,
        y: 0
      },
      level: 0
    },
    component: login
  },
  {
    name: '设置密码',
    path: baseUrl + '/setPassword',
    meta: {
      position: {
        x: 0,
        y: 0
      },
      level: 0
    },
    component: setPassword
  },
  {
    name: '忘记密码',
    path: baseUrl + '/forgetPassword',
    meta: {
      position: {
        x: 0,
        y: 0
      },
      level: 0
    },
    component: forgetPassword
  },
  {
    name: '验证码验证',
    path: baseUrl + '/verificationCode',
    meta: {
      position: {
        x: 0,
        y: 0
      },
      level: 0
    },
    component: verificationCode
  },
  {
    name: '验证码验证',
    path: baseUrl + '/verificationSecCode',
    meta: {
      position: {
        x: 0,
        y: 0
      },
      level: 0
    },
    component: verificationSecCode
  },
  {
    name: '密码重置',
    path: baseUrl + '/setPasswordSecond',
    meta: {
      position: {
        x: 0,
        y: 0
      },
      level: 0
    },
    component: setPasswordSecond
  },
  {
    name: '注册协议',
    path: baseUrl + '/agregister',
    meta: {
      position: {
        x: 0,
        y: 0
      },
      level: 0
    },
    component: agregister
  }

]

// scrollBehavior:
// - only available in html5 history mode
// - defaults to no scroll behavior
// - return false to prevent scroll
const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    // savedPosition is only available for popstate navigations.
    return savedPosition
  }
  if (to.meta.position) {
    return to.meta.position
  }
  const position = {}
  // new navigation.
  // scroll to anchor by returning the selector
  if (to.hash) {
    position.selector = to.hash
  }
  // check if any matched route config has meta that requires scrolling to top
  if (to.matched.some(m => m.meta.scrollToTop)) {
    // cords will be used if no selector is provided,
    // or if the selector didn't match any element.
    position.x = 0
    position.y = 0
  }
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  return position
}

const router = new VueRouter({
  hashbang: true, // 将路径格式化为#!开头
  history: true, // use history=false when testing
  // mode: 'history',
  base: __dirname,
  linkActiveClass: 'v-link-active',
  routes, // （缩写）相当于 routes: routes
  scrollBehavior
})

export default router
