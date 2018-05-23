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

  getBusinessCircle ({commit}, param) { // 商圈列表
    return vm.$api({
      method: 'get',
      url: Util.ajaxUrl + ':8004/admin/business/getBusinessCircle?token=' + vm.$localStorage.get('TOKEN')
      // data:param
    })// 直接返回对象给页面调用
  },
  getSecond ({commit}, param) { // 二级商品类
    return vm.$api({
      method: 'get',
      url: Util.ajaxUrl + ':8002/admin/category/getChildrenCategories' + Util.urlEncode(param, vm.$localStorage.get('TOKEN'))
      // data:param
    })// 直接返回对象给页面调用
  },
  getShopsByCircle ({commit}, param) {
    return vm.$api({
      method: 'get',
      url: Util.ajaxUrl + ':8004/admin/business/getShopsByCircle' + Util.urlEncode(param, vm.$localStorage.get('TOKEN'))
    })// 直接返回对象给页面调用
  },
  getShopsInfoByID ({commit}, param) {
    return vm.$api({
      method: 'get',
      url: Util.ajaxUrl + ':8004/admin/business/getShopsByCircle' + Util.urlEncode(param)
    })// 直接返回对象给页面调用
  },
  getGoodsByCircleId ({commit}, param) {
    return vm.$api({
      method: 'get',
      url: Util.ajaxUrl + ':8004/admin/business/getGoodsByCircleId' + Util.urlEncode(param, vm.$localStorage.get('TOKEN'))
    })// 直接返回对象给页面调用
  },
  getShopsByCircleId ({commit}, param) {
    return vm.$api({
      method: 'get',
      url: Util.ajaxUrl + ':8004/admin/business/getShopsByCircleId' + Util.urlEncode(param)
    })// 直接返回对象给页面调用
  },
  getCircleFirstCategories ({commit}, param) {
    return vm.$api({
      method: 'get',
      url: Util.ajaxUrl + ':8004/admin/business/getCircleFirstCategories' + Util.urlEncode(param)
    })// 直接返回对象给页面调用
  },
  getShopInfo ({commit}, param) { // 获取商店信息
    return vm.$api({
      method: 'get',
      url: Util.ajaxUrl + ':8004/admin/business/getShopInfo' + Util.urlEncode(param, vm.$localStorage.get('TOKEN'))
      // data:param
    })// 直接返回对象给页面调用
  },
  goodsList_shop ({commit}, param) { // 获取商店信息
    return vm.$api({
      method: 'get',
      url: Util.ajaxUrl + ':8004/admin/front/getGoodsListByClass' + Util.urlEncode(param, vm.$localStorage.get('TOKEN')),
      // url:Util.ajaxUrl+":8002/ucenter/goods/getGoodsList"+Util.urlEncode(param,vm.$localStorage.get('TOKEN')),
      data: param
    })// 直接返回对象给页面调用
  }
}

export default {
  state,
  actions,
  mutations
}
