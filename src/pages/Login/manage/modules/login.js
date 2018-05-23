import Util from '../../../../../util/common'
import * as types from '@/components/types'
import Vue from 'vue'
const state = {
  token: 0,
  mobile: null
}

const mutations = {
  [types.CHANGE_TOKEN] (state, res) {
    state.token = res
  },
  [types.CHANGE_MOBILE] (state, res) {
    state.mobile = res
  }
}

let vm = new Vue({})

// action提交mutations，不直接更改状态（通过store.dispatch触发）
const actions = {

  logOut ({commit}, param) { // 退出登录
  //  console.log(state.login.token);
  //  return;
    return vm.$api({
      method: 'post',
      url: Util.ajaxUrl + ':8002/ucenter/user/logOut?token=' + vm.$localStorage.get('TOKEN'),
      data: param
    })// 直接返回对象给页面调用
  },

  /* --以下为UserPublic部分-- */
  // 父组件发送异步请求
  checkMobile ({commit}, param) { // 验证该手机号已被注册
    return vm.$api({
      method: 'post',
      url: Util.ajaxUrl + ':8002/ucenter/user/checkMobile',
      data: param
    })// 直接返回对象给页面调用
  },

  getCode ({commit}, param) { // 用户得到验证码
    return vm.$api({
      method: 'post',
      url: Util.ajaxUrl + ':8003/admin/Api/getCode',
      data: param
    })// 直接返回对象给页面调用
  },

  checkCode ({commit}, param) { // 验证验证码
    return vm.$api({
      method: 'post',
      url: Util.ajaxUrl + ':8003/admin/Api/checkCode',
      data: param
    })// 直接返回对象给页面调用
  },

  setPassword ({commit}, param) { // 设置密码
    return vm.$api({
      method: 'post',
      url: Util.ajaxUrl + ':8002/ucenter/user/register',
      data: param
    })// 直接返回对象给页面调用
  },

  /* --以下为User部分-- */
  userLogin ({commit}, param) { // 用户登录
    return vm.$api({
      method: 'post',
      url: Util.ajaxUrl + ':8002/ucenter/user/userLogin',
      data: param
    })// 直接返回对象给页面调用
  },

  resetPWD ({commit}, param) { // 重置密码
    return vm.$api({
      method: 'post',
      url: Util.ajaxUrl + ':8002/ucenter/user/resetPWD',
      data: param
    })// 直接返回对象给页面调用
  }

}

export default {
  state,
  actions,
  mutations
}
