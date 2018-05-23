import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const search = r => require.ensure([], () => r(require('../views/search')))
const shop = r => require.ensure([], () => r(require('../views/shop'))) // 商家首页
const detail = r => require.ensure([], () => r(require('../views/detail'))) // 详情页

const commentlist = r => require.ensure([], () => r(require('../views/comment'))) // 详情页

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
    redirect: baseUrl + '/search'
  },
  {
    name: '商品搜索',
    path: baseUrl + '/search',
    meta: {
      position: {
        x: 0,
        y: 0
      },
      level: 0
    },
    component: search
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
    component: shop
  },
  {
    name: '详情页',
    path: baseUrl + '/detail',
    meta: {
      position: {
        x: 0,
        y: 0
      },
      level: 0
    },
    component: detail
  },
  {
    name: '评论列表',
    path: baseUrl + '/commontlist',
    meta: {
      position: {
        x: 0,
        y: 0
      },
      level: 0
    },
    component: commentlist
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
