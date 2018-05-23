import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Index = r => require.ensure([], () => r(require('../views/Index'))) // 首页

const Category = r => require.ensure([], () => r(require('../views/Category'))) // 分类

const CategoryMain = resolve => require(['../components/category/main.vue'], resolve)

const Collection = r => require.ensure([], () => r(require('../views/Collection'))) // 收藏

const User = r => require.ensure([], () => r(require('../views/User'))) // 我的

const Logout = r => require.ensure([], () => r(require('../views/logout'))) // 我的

// const User = r => require.ensure([], () => r(require('../views/User'))) // 我的

// const User = r => require.ensure([], () => r(require('../views/User'))) // 我的

const Bags = r => require.ensure([], () => r(require('../views/Bags'))) // 首页

const HomeDection = r => require.ensure([], () => r(require('../views/HomeDection'))) // 分类
const Wring = r => require.ensure([], () => r(require('../views/Wring'))) // 分类

const Detail = r => require.ensure([], () => r(require('../views/Detail'))) // 详情

const Refuse = r => require.ensure([], () => r(require('../views/Refuse'))) // 首页拒绝

const Car = r => require.ensure([], () => r(require('../../Car/views/Car'))) // 购物车页

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
    redirect: baseUrl + '/home'
  },
  {
    name: '首页',
    path: baseUrl + '/home',
    meta: {
      position: {
        x: 0,
        y: 0
      },
      level: 0
    },
    component: Index
  },
  {
    path: '/category',
    name: '分类页',
    redirect: '/category/all',
    component: Category,
    children: [{
      path: '/category/:tab',
      name: '分类子页',
      meta: {
        position: {
          x: 0,
          y: 0
        },
        level: 0
      },
      component: CategoryMain
    }]
  },
  {
    name: '收藏夹',
    path: baseUrl + '/collection',
    component: Collection,
    meta: {
      level: 0,
      requireAuth: true // 添加该字段，表示进入这个路由是需要登录才能进入的
    }
  },
  {
    name: '用户页',
    path: baseUrl + '/user',
    component: User,
    meta: {
      level: 0,
      requireAuth: true // 添加该字段，表示进入这个路由是需要登录才能进入的
    }
  },
  {
    name: '个人设置',
    path: baseUrl + '/logout',
    component: Logout,
    meta: {
      requireAuth: true // 添加该字段，表示进入这个路由是需要登录才能进入的
    }
  },
  {
    name: '家具',
    path: baseUrl + '/wring',
    meta: {
      position: {
        x: 0,
        y: 0
      }
    },
    component: Wring
  },
  {
    name: '家电',
    path: baseUrl + '/homeDection',
    meta: {
      position: {
        x: 0,
        y: 0
      }
    },
    component: HomeDection
  },
  {
    name: '包包',
    path: baseUrl + '/bags',
    meta: {
      position: {
        x: 0,
        y: 0
      }
    },
    component: Bags
  },
  {
    name: '详情页',
    path: baseUrl + '/detail',
    meta: {
      position: {
        x: 0,
        y: 0
      }
    },
    component: Detail
  },
  {
    name: '首页拒绝',
    path: baseUrl + '/refuse',
    meta: {
      position: {
        x: 0,
        y: 0
      }
    },
    component: Refuse
  },
  {
    name: '购物车页',
    path: baseUrl + '/car',
    meta: {
      position: {
        x: 0,
        y: 0
      }
    },
    component: Car
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
