import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const auditing = r => require.ensure([], () => r(require('../views/auditing'))) // 申请入驻

const auditingstatus = r => require.ensure([], () => r(require('../views/auditing-1'))) // 申请状态

const apply = r => require.ensure([], () => r(require('../views/apply'))) // 店铺申请

const applyshop = r => require.ensure([], () => r(require('../views/applyshop'))) // 申请开店

const manageshop = r => require.ensure([], () => r(require('../views/manageshop'))) // 商铺管理

const agenter = r => require.ensure([], () => r(require('../views/agenter'))) // 入驻协议


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
    redirect: baseUrl + '/auditing'
  },
  {
    name: '申请入驻',
    path: baseUrl + '/auditing',
    meta: {
      position: {
        x: 0,
        y: 0
      },
      level: 0
    },
    component: auditing
  },
  {
    name: '入驻状态',
    path: baseUrl + '/auditingstatus',
    meta: {
      position: {
        x: 0,
        y: 0
      },
      level: 0
    },
    component: auditingstatus
  },
  {
    name: 'test',
    path: baseUrl + '/apply',
    meta: {
      position: {
        x: 0,
        y: 0
      },
      level: 0
    },
    component: apply
  },
  {
    name: '申请开店',
    path: baseUrl + '/applyshop',
    meta: {
      position: {
        x: 0,
        y: 0
      },
      level: 0
    },
    component: applyshop
  },
  {
    name: '店铺管理',
    path: baseUrl + '/manageshop',
    meta: {
      position: {
        x: 0,
        y: 0
      },
      level: 0
    },
    component: manageshop
  },
  {
    name: '入驻协议',
    path: baseUrl + '/agenter',
    meta: {
      position: {
        x: 0,
        y: 0
      },
      level: 0
    },
    component: agenter
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
