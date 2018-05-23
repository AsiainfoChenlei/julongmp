import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Bags = r => require.ensure([], () => r(require('../views/Bags'))) // 首页

const HomeDection = r => require.ensure([], () => r(require('../views/HomeDection'))) // 分类
const Wring = r => require.ensure([], () => r(require('../views/Wring'))) // 分类
const baseUrl = '' // 多页面路径配置

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
    redirect: baseUrl + '/wring'
  },
  {
    name: '家具',
    path: baseUrl + '/wring',
    meta: {
      position: {
        x: 0,
        y: 0
      },
      level: 0
    },
    component: Wring
  },
  {
    name: '家电',
    path: baseUrl + '/homeDection',
    component: HomeDection,
    meta: {
      level: 0,
      requireAuth: true // 添加该字段，表示进入这个路由是需要登录才能进入的
    }
  },
  {
    name: '包包',
    path: baseUrl + '/bags',
    component: Bags,
    meta: {
      level: 0,
      requireAuth: true // 添加该字段，表示进入这个路由是需要登录才能进入的
    }
  },
  {
    name: '家具',
    path: baseUrl + '/wring',
    component: Wring,
    meta: {
      requireAuth: true // 添加该字段，表示进入这个路由是需要登录才能进入的
    }
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
  // new navigation.
  // scroll to anchor by returning the selector
  if (to.hash) {
    const position = {}
    position.selector = to.hash
    return position
  }
  // check if any matched route config has meta that requires scrolling to top
  // if (to.matched.some(m => m.meta.scrollToTop)) {
  //   // cords will be used if no selector is provided,
  //   // or if the selector didn't match any element.
  //   position.x = 0
  //   position.y = 0
  // }
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  if (to.meta.position) {
    return to.meta.position
  }
}

const router = new VueRouter({
  hashbang: true, // 将路径格式化为#!开头
  history: true, // use history=false when testing
  // mode: 'history',
  base: __dirname,
  linkActiveClass: 'v-link-active',
  routes,
  scrollBehavior
})

export default router
