import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Order = r => require.ensure([], () => r(require('../views/Order'))) // 首页

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
    component: Order
  }
/*  {
    name: 'root',
    path: baseUrl + '/',
    meta: {
      position: {
        x: 0,
        y: 0
      },
      level: 0
    },
    redirect: baseUrl + '/order'
  },
  {
    name: '订单',
    path: baseUrl + '/order',
    meta: {
      position: {
        x: 0,
        y: 0
      },
      level: 0
    },
    component: Order
  } */
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
