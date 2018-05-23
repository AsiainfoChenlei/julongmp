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

  getUserStatus ({commit}, param) {
    return vm.$api({
      method: 'get',
      url: Util.ajaxUrl + ':8002/ucenter/user/getUserStatus?token=' + vm.$localStorage.get('TOKEN')
    })
  },

  addApply ({commit}, param) {
    return vm.$api({
      method: 'post',
      url: Util.ajaxUrl + ':8004/admin/business/addApply' + Util.urlEncode(param, vm.$localStorage.get('TOKEN')),
      data: param
    })
  },
  businessApply ({commit}, param) {
    return vm.$api({
      method: 'post',
      // url: Util.ajaxUrl+':8991/business/editCompany?token='+ vm.$localStorage.get('TOKEN'),
      url: Util.ajaxUrl + ':8002/ucenter/editCompany?token=' + vm.$localStorage.get('TOKEN'),
      data: param
    })
  },
  applyForShop ({commit}, param) {
    return vm.$api({
      method: 'post',
      url: Util.ajaxUrl + ':8002/ucenter/editShop?token=' + vm.$localStorage.get('TOKEN'),
      data: param
    })
  },
  applyForShopV2 ({commit}, param) {
    return vm.$api({
      method: 'post',
      url: Util.ajaxUrl + ':8002/ucenter/editShopV2?token=' + vm.$localStorage.get('TOKEN'),
      data: param
    })
  },
  getOwnSingleShop ({commit}, param) {
    return vm.$api({
      method: 'get',
      url: Util.ajaxUrl + ':8002/ucenter/getOwnSingleShop?token=' + Util.urlEncode(param, vm.$localStorage.get('TOKEN')),
      data: param
    })
  },
  getShopInfo ({commit}, param) { // 获取商店信息
    return vm.$api({
      method: 'get',
      url: Util.ajaxUrl + ':8004/admin/business/getShopInfo' + Util.urlEncode(param, vm.$localStorage.get('TOKEN'))
      // data:param
    })// 直接返回对象给页面调用
  },

  goodsList_shop2 ({commit}, param) { // 获取商店信息
    return vm.$api({
      method: 'get',
      // url:Util.ajaxUrl+":8004/admin/front/getGoodsListByClass"+Util.urlEncode(param,vm.$localStorage.get('TOKEN')),
      url: Util.ajaxUrl + ':8002/ucenter/goods/getGoodsList' + Util.urlEncode(param, vm.$localStorage.get('TOKEN')),
      data: param
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
  getCurrentPosition ({commit}, param) {
    return vm.$api({
      method: 'get',
      url: 'http://apis.map.qq.com/ws/geocoder/v1/' + Util.urlEncodeParam(param)
    })
  },
  goodsList_shop ({commit}, param) { // 获取商店信息
    return vm.$api({
      method: 'get',
      url: Util.ajaxUrl + ':8004/admin/front/getGoodsListByClass' + Util.urlEncode(param, vm.$localStorage.get('TOKEN')),
      // url:Util.ajaxUrl+":8002/ucenter/goods/getGoodsList"+Util.urlEncode(param,vm.$localStorage.get('TOKEN')),
      data: param
    })// 直接返回对象给页面调用
  },
  getOwnShops ({commit}, param) { // 获取商店信息
    return vm.$api({
      method: 'get',
      url: Util.ajaxUrl + ':8002/ucenter/getOwnShops' + Util.urlEncode(param, vm.$localStorage.get('TOKEN')),
      // url:Util.ajaxUrl+":8002/ucenter/goods/getGoodsList"+Util.urlEncode(param,vm.$localStorage.get('TOKEN')),
      data: param
    })// 直接返回对象给页面调用
  },
  /* --以下为UserPublic部分-- */
  // 父组件发送异步请求
  checkMobile_shop ({commit}, param) { // 验证该手机号已被注册
    return vm.$api({
      method: 'post',
      url: Util.ajaxUrl + ':8002/ucenter/user/checkMobile',
      data: param
    })// 直接返回对象给页面调用
  },

  getCode_shop ({commit}, param) { // 用户得到验证码
    return vm.$api({
      method: 'post',
      url: Util.ajaxUrl + ':8003/admin/Api/getCode',
      data: param
    })// 直接返回对象给页面调用
  },

  checkCode_shop ({commit}, param) { // 验证验证码
    return vm.$api({
      method: 'post',
      url: Util.ajaxUrl + ':8003/admin/Api/checkCode',
      data: param
    })// 直接返回对象给页面调用
  },

  setPassword_shop ({commit}, param) { // 设置密码
    return vm.$api({
      method: 'post',
      url: Util.ajaxUrl + ':8002/ucenter/user/register',
      data: param
    })// 直接返回对象给页面调用
  },

  getCates ({commit}, param) { // 获取商店二级分类
    return vm.$api({
      method: 'get',
      url: Util.ajaxUrl + ':8004/admin/front/getCates' + Util.urlEncode(param, vm.$localStorage.get('TOKEN')),
      data: param
    })// 直接返回对象给页面调用
  },
  getGoodsInfo ({
    commit
  }, param) { // 获取商品详情
    return vm.$api({
      method: 'get',
      // url:Util.ajaxUrl+":8002/ucenter/goods/getGoodsInfo"+Util.urlEncode(param,vm.$localStorage.get('TOKEN')),
      url: Util.ajaxUrl + ':8004/admin/front/getGoodsInfo' + Util.urlEncode(param, vm.$localStorage.get('TOKEN'))
      // data:param
    }) // 直接返回对象给页面调用
  },

  cartList ({
    commit
  }, param) { // 购物车的列表数据
    return vm.$api({
      method: 'get',
      url: Util.ajaxUrl + ':8003/admin/Shop/index' + Util.urlEncode(param, vm.$localStorage.get('TOKEN'))
      // data:param
    }) // 直接返回对象给页面调用
  },
  cart_delete ({
    commit
  }, param) { // 删除购物的某商品
    return vm.$api({
      method: 'delete',
      url: Util.ajaxUrl + ':8003/admin/Shop/delete?token=' + vm.$localStorage.get('TOKEN'),
      data: param
    }) // 直接返回对象给页面调用
  },
  getSignPackage ({
    commit
  }, param) {
    return vm.$api({
      method: 'get',
      // url: 'http://jlgo.shop/signPackge.php',
      url: 'http://jlgo.shop/signPackge.php' + Util.urlEncode(
        param
      )
    })
  },

  // 父组件发送异步请求
  setDatas ({
    commit
  }) {
    // let param
    vm.$api({
      method: 'get',
      url: Util.ajaxUrl + ':8002/ucenter/goods/getGoodsInfo' + Util.urlEncode({
        'id': 40
      }, vm.$localStorage.get('TOKEN'))
    }).then(response => {
      commit('SET_DATAS', response.data.msg)
    })
  },

  // 购物车数量增减,true是加,false是减
  setLocalCount ({
    commit
  }, bool = true) {
    let count = Util.getLocal('count') || 0
    if (bool) {
      Util.setLocal(++count, 'count')
    } else {
      Util.setLocal(--count, 'count')
    }
    commit(types.CHANGE_COUNT)
  },

  // 网购物车列表添加数据
  addCarList ({
    commit
  }, res) {
    Util.setLocal(res, 'carList', true)
    commit(types.ADD_PRODUCT)
  },

  // 重新设置购物车商品列表,把打钩并提交的商品去掉,即保留unSelectedList

  resetCarList ({
    commit,
    getters
  }) {
    const unSelectedList = Util.getLocal('unSelectedList')
    Util.setLocal(unSelectedList, 'carList')
    commit(types.RESET_CARLIST)
  },
  // 重置购物车数量Count,即没打钩的商品的数量
  resetCount ({
    commit,
    getters
  }) {
    const count = Util.getLocal('unSelectedList').length
    Util.setLocal(count, 'count')
    commit(types.RESET_COUNT)
  },

  // 删除购物车列表的某一项 （用新的数组直接替换）
  cutCarList ({
    commit
  }, res) {
    Util.setLocal(res, 'carList')
    commit(types.RESET_CARLIST)
  },

  // 分别保存打钩的商品和为打钩的商品
  setSelectedList ({
    commit,
    getters
  }) {
    Util.setLocal(getters.selectedList, 'selectedList')
    commit('SET_SELECTEDLIST')
    Util.setLocal(getters.unSelectedList, 'unSelectedList')
    commit('SET_UNSELECTEDLIST')
  },
  /* --以下为User部分-- */
  userLogin_shop ({commit}, param) { // 用户登录
    return vm.$api({
      method: 'post',
      url: Util.ajaxUrl + ':8002/ucenter/user/userLogin',
      data: param
    })// 直接返回对象给页面调用
  },

  /* ---以下是收藏部分--- */
  iSCoSeller ({commit}, param) { // 一家店是否被收藏
    return vm.$api({
      method: 'get',
      url: Util.ajaxUrl + ':8003/admin/Seller/isBusiness' + Util.urlEncode(param, vm.$localStorage.get('TOKEN'))
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
  CoGoodsList ({commit}, param) { // 收藏商品的列表数据
    return vm.$api({
      method: 'get',
      url: Util.ajaxUrl + ':8003/admin/Goods/index' + Util.urlEncode(param, vm.$localStorage.get('TOKEN'))
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
  },

  addComment ({commit}, param) {
    return vm.$api({
      method: 'post',
      url: Util.ajaxUrl + ':8002/ucenter/comment/addComment?token=' + vm.$localStorage.get('TOKEN'),
      data: param
    })// 直接返回对象给页面调用
  },
  commentList ({commit}, param) {
    return vm.$api({
      method: 'get',
      url: Util.ajaxUrl + ':8002/ucenter/comment/getComment' + Util.urlEncode(param, vm.$localStorage.get('TOKEN'))
    })// 直接返回对象给页面调用
  },
  updateOrderStatus_comment ({commit}, param) {
    return vm.$api({
      method: 'post',
      url: Util.ajaxUrl + ':8002/ucenter/order/updateOrderStatus?token=' + vm.$localStorage.get('TOKEN'),
      data: param
    })
  },
  getOrderByType_comment ({commit}, param) {
    return vm.$api({
      method: 'get',
      url: Util.ajaxUrl + ':8002/ucenter/order/getOrdersByType?token=' + vm.$localStorage.get('TOKEN'),
      data: param
    })
  }
}

export default {
  state,
  actions,
  mutations
}
