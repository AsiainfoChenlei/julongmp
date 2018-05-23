import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Shop = r => require.ensure([], () => r(require('../views/shop'))) // 商家首页

const Tshop = r => require.ensure([], () => r(require('../views/Tshop'))) // 小商城页

const Detail = r => require.ensure([], () => r(require('../views/Detail'))) // 详情页

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
    redirect: baseUrl + '/shop'
  },
  {
    name: '小商城页',
    path: baseUrl + '/tshop',
    meta: {
      position: {
        x: 0,
        y: 0
      },
      level: 0
    },
    component: Tshop
  },
  {
    name: '商家首页',
    path: baseUrl + '/shop',
    meta: {
      position: {
        x: 0,
        y: 0
      },
      level: 0
    },
    component: Shop
  },
  {
    name: '详情页',
    path: baseUrl + '/shopdetail',
    meta: {
      position: {
        x: 0,
        y: 0
      },
      level: 0
    },
    component: Detail
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
