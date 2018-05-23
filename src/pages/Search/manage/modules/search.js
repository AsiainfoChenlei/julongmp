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
  searchGoodsByKeyword ({
    commit
  }, param) {
    return vm.$api({
      method: 'get',
      url: Util.ajaxUrl + ':8002/ucenter/goods/getGoodsList' + Util.urlEncode(param)
      // data:param
    }) // 直接返回对象给页面调用
  },
  searchShopByKeyword ({
    commit
  }, param) {
    return vm.$api({
      method: 'get',
      url: Util.ajaxUrl + ':8004/admin/business/getShops' + Util.urlEncode(param)
      // data:param
    }) // 直接返回对象给页面调用
  },
  searchList ({
    commit
  }, param) {
    return vm.$api({
      method: 'get',
      url: Util.ajaxUrl + ':8003/admin/Search/index?token=' + vm.$localStorage.get('TOKEN')
      // data:param
    }) // 直接返回对象给页面调用
  },
  searchUpdate ({
    commit
  }, param) {
    return vm.$api({
      method: 'post',
      url: Util.ajaxUrl + ':8003/admin/Address/update?token=' + vm.$localStorage.get('TOKEN'),
      data: param
    }) // 直接返回对象给页面调用
  },
  searchAdd ({
    commit
  }, param) {
    return vm.$api({
      method: 'post',
      url: Util.ajaxUrl + ':8003/admin/Address/add?token=' + vm.$localStorage.get('TOKEN'),
      data: param
    }) // 直接返回对象给页面调用
  },
  searchDelete ({
    commit
  }, param) {
    return vm.$api({
      method: 'delete',
      url: Util.ajaxUrl + ':8003/admin/Address/delete?token=' + vm.$localStorage.get('TOKEN'),
      data: param
    }) // 直接返回对象给页面调用
  }
}

export default {
  state,
  actions,
  mutations
}
