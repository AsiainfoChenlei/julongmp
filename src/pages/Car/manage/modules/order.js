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

  createOrder ({commit}, param) {
    console.log('param', param)
    return vm.$api({
      method: 'post',
      url: Util.ajaxUrl + ':8002/ucenter/order/createOrder?token=' + vm.$localStorage.get('TOKEN'),
      data: param
    })// 直接返回对象给页面调用
  },
  getOrderDetail ({commit}, param) {
    return vm.$api({
      method: 'get',
      url: Util.ajaxUrl + ':8002/ucenter/order/getOrderDetail' + Util.urlEncode(param, vm.$localStorage.get('TOKEN'))
    })// 直接返回对象给页面调用
  },
  defaultAddress ({commit}, param) {
    return vm.$api({
      method: 'get',
      url: Util.ajaxUrl + ':8003/admin/Address/getDefault?token=' + vm.$localStorage.get('TOKEN')
    })// 直接返回对象给页面调用
  },
  updateOrderStatus ({commit}, param) {
    return vm.$api({
      method: 'post',
      url: Util.ajaxUrl + ':8002/ucenter/order/updateOrderStatus?token=' + vm.$localStorage.get('TOKEN'),
      data: param
    })
  },
  getOrderByType ({commit}, param) {
    console.log('param', param)
    return vm.$api({
      method: 'get',
      url: Util.ajaxUrl + ':8002/ucenter/order/getOrdersByType' + Util.urlEncode(param, vm.$localStorage.get('TOKEN')),
      data: param
    })
  }
}

export default {
  state,
  actions,
  mutations
}
