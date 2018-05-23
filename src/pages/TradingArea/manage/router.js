import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const Tread = r => require.ensure([], () => r(require('../views/Tread3'))) // 商圈

const Tread4 = r => require.ensure([], () => r(require('../views/Tread4'))) // 商圈4

const Tread6 = r => require.ensure([], () => r(require('../views/Tread6'))) // 商圈6

const Stread = r => require.ensure([], () => r(require('../views/Stread'))) // 小商圈

const Tread7 = r => require.ensure([], () => r(require('../views/Tread7.vue')))

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
    redirect: baseUrl + '/tread'
  },
  {
    name: '商圈',
    path: baseUrl + '/tread',
    meta: {
      position: {
        x: 0,
        y: 0
      },
      level: 0
    },
    component: Tread
  },
  {
    name: '商圈4',
    path: baseUrl + '/Tread4',
    meta: {
      position: {
        x: 0,
        y: 0
      },
      level: 0
    },
    component: Tread4
  },
  {
    name: '商圈6',
    path: baseUrl + '/tread6',
    meta: {
      position: {
        x: 0,
        y: 0
      },
      level: 0
    },
    component: Tread6
  },
  {
    name: '商圈7',
    path: baseUrl + '/tread7',
    meta: {
      position: {
        x: 0,
        y: 0
      },
      level: 0
    },
    component: Tread7
  },
  {
    name: '小商圈',
    path: baseUrl + '/stread',
    meta: {
      position: {
        x: 0,
        y: 0
      },
      level: 0
    },
    component: Stread
  }
]

// scrollBehavior:
// - only available in html5 history mode
// - defaults to no scroll behavior
// - return false to prevent scroll
const scrollBehavior = (to, from, savedPosition) => {
  // console.log('to.meta.position', to, from, savedPosition)
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
  // 读取数据
  if (to.meta.position && to.meta.position.y > 0) {
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
