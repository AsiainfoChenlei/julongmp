import Util from '../../../../../util/common'
import Vue from 'vue'
const state = {
  token: 0,
  mobile: null
}

const mutations = {

}

let vm = new Vue({})

// action提交mutations，不直接更改状态（通过store.dispatch触发）
const actions = {

  /* ---收藏--- */
  iSCoSeller ({commit}, param) { // 一家店是否被收藏
    return vm.$api({
      method: 'get',
      url: Util.ajaxUrl + ':8003/admin/Seller/isBusiness' + Util.urlEncode(param, vm.$localStorage.get('TOKEN'))
    })// 直接返回对象给页面调用
  },

  CoGoodsList ({commit}, param) { // 收藏商品的列表数据
    return vm.$api({
      method: 'get',
      url: Util.ajaxUrl + ':8003/admin/Goods/index' + Util.urlEncode(param, vm.$localStorage.get('TOKEN'))
    })// 直接返回对象给页面调用
  },

  CoSellerindex ({commit}, param) { // 收藏商家的列表数据
    return vm.$api({
      method: 'get',
      url: Util.ajaxUrl + ':8003/admin/Seller/index' + Util.urlEncode(param, vm.$localStorage.get('TOKEN'))
    })// 直接返回对象给页面调用
  },

  CoSelleradd ({commit}, param) { // 收藏商家的数据新增
    return vm.$api({
      method: 'post',
      url: Util.ajaxUrl + ':8003/admin/Seller/add?token=' + vm.$localStorage.get('TOKEN'),
      data: param
    })// 直接返回对象给页面调用
  },

  CoSellerDelete ({commit}, param) { // 删除商家收藏
    return vm.$api({
      method: 'delete',
      url: Util.ajaxUrl + ':8003/admin/Seller/delete?token=' + vm.$localStorage.get('TOKEN'),
      data: param
    })// 直接返回对象给页面调用
  },
  /* ------ */
  iSCoGoods ({commit}, param) { // 一家店是否被收藏
    return vm.$api({
      method: 'get',
      url: Util.ajaxUrl + ':8003/admin/Goods/isGood' + Util.urlEncode(param, vm.$localStorage.get('TOKEN'))
    })// 直接返回对象给页面调用
  },
  CoGoodsadd ({commit}, param) { // 收藏商品的数据新增
    return vm.$api({
      method: 'post',
      url: Util.ajaxUrl + ':8003/admin/Goods/add?token=' + vm.$localStorage.get('TOKEN'),
      data: param
    })// 直接返回对象给页面调用
  },

  CoGoodsDelete ({commit}, param) { // 删商品收藏
    return vm.$api({
      method: 'delete',
      url: Util.ajaxUrl + ':8003/admin/Goods/delete?token=' + vm.$localStorage.get('TOKEN'),
      data: param
    })// 直接返回对象给页面调用
  }

}

export default {
  state,
  actions,
  mutations
}
