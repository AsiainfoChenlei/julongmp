import axios from 'axios'
// import store from '@/vuex/store.js'
import router from '../manage/router'
import {
  Toast
} from 'mint-ui'

const api = axios.create()
api.defaults.baseURL = 'http://api.com'
api.defaults.timeout = 5000
api.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
api.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest'

// 请求拦截
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // store.commit('SET_LOADING',true);//luoGod注释掉的原因是因为不适合下拉翻页的页面。
  // 如果有token,添加到请求报文 后台会根据该报文返回status
  // if(store.state.login.token) {
  //   config.headers.Authorization = `token ${store.state.login.token}`;
  // }
  return config
}, function (error) {
  // 对请求错误做些什么
  Toast('网络错误,请稍后再试')
  // store.commit('SET_LOADING',false);

  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // 加到时器主要是为了 展示Loading效果 项目中应去除
  setTimeout(() => {
    // store.commit('SET_LOADING',false);
  }, 300)
  //  if (+response.data.code === 0 || response.data.code === 'error' || Object.prototype.toString.call(response.data.msg) === '[object String]' && response.data.msg.indexOf('token')!==-1) {
  if ((+response.data.code === 0 || response.data.code === 'error') && Object.prototype.toString.call(response.data.msg) === '[object String]' && response.data.msg.indexOf('token') !== -1) {
    console.log("+response.data.code,response.data.code,response.data.msg.indexOf('token')")
    console.log(+response.data.code, response.data.code, response.data.msg.indexOf('token'))
    // store.commit('CHANGE_TOKEN',0);
    //   Toast('请重新登录');
    //   //alert('请重新登录');
    //   router.push({
    //     path: '/login',
    //     query: {redirect: router.currentRoute.fullPath}
    //   })
  }
  return response
}, function (error) {
  // 对响应错误做点什么
  // store.commit('SET_LOADING',false);

  if (error.response) {
    if (error.response.status === 401) {
      // 如果返回401 即没有权限，跳到登录页重新登录
      // store.commit('CHANGE_TOKEN', 0)
      Toast('请重新登录')
      // alert('请重新登录');

      router.push({
        path: '/login',
        query: {
          redirect: router.currentRoute.fullPath
        }
      })
    }
  }

  return Promise.reject(error)
})
export default api
