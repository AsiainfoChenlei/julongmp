import Util from '../../../../../util/common'
import * as types from '@/components/types'
import Vue from 'vue'

// 容器
const state = {
  oneGoodsForOrder: {}, // lz
  productDatas: '', // detail父组件请求的当前页面商品数据
  colSelected: 0, // 0是index,表示第一个
  sizeSelected: 0, // 0是index,表示第一个
  count: 0, // 购物车里的商品数量
  carList: '', // 购物车的商品列表
  fetchLoading: false, // 全局加载状态的Loading
  selectedList: '', // 已选择的购物车商品列表
  unSelectedList: '' // 未选择的购物车商品列表,提交订单后用它替换carList
}

// 更改 store 中的状态的唯一方法:提交 mutation
/*
  购物车逻辑:
      unSelectedList：未打钩的购物车商品列表
      SelectedList：已勾选的购物车商品列表
      carList:购物车商品列表
      当支付成功之后,购物车列表需要减掉SelectedList，留下unSelectedList
      直接用unSelectedList替换当前carList即可
*/
const mutations = {

  // 给订单数据的一个商品
  [types.ONE_GOODS_FOR_ORDER] (state, res) {
    state.oneGoodsForOrder = res
  },

  // 异步请求的数据
  [types.SET_DATAS] (state, res) {
    state.productDatas = res
  },

  // 详情页商品颜色的选择
  [types.CHANGE_COL_SELECTED] (state, res) {
    state.colSelected = res
  },

  // 详情页商品尺寸的选择

  [types.CHANGE_SIZE_SELECTED] (state, res) {
    state.sizeSelected = res
  },

  // 向购物车商品列表添加商品
  [types.ADD_PRODUCT] (state) {
    state.carList = Util.getLocal('carList')
  },

  // 获取当前购物车商品数量
  [types.CHANGE_COUNT] (state) {
    state.count = Util.getLocal('count')
  },

  // 重置购物车
  [types.RESET_CARLIST] (state) {
    state.carList = Util.getLocal('carList')
  },

  // 重置购物车数量
  [types.RESET_COUNT] (state) {
    state.count = Util.getLocal('carList').length
  },

  // loading开关
  [types.SET_LOADING] (state, res) {
    state.fetchLoading = res
  },
  // 购物车里打钩的商品
  'SET_SELECTEDLIST' (state, res) {
    state.selectedList = Util.getLocal('selectedList')
  },

  // 购物车里没打钩的商品

  'SET_UNSELECTEDLIST' (state) {
    state.unSelectedList = Util.getLocal('unSelectedList')
  }

}

let vm = new Vue({})

// action提交mutations，不直接更改状态（通过store.dispatch触发）
const actions = {

// 父组件发送异步请求
  swiper ({commit}) { // 广告图的列表数据
    // vm.$api({
    //     method:'get',
    //     url:Util.ajaxUrl+":8003/admin/Advertise/index"
    // }).then(response=>{
    //     console.error("test");
    //     console.error(response);
    // commit('SET_DATAS',response.data); //触发上面的 types.SET_DATAS存储数据    //推荐使用此方法
    // })
    return vm.$api({
      method: 'get',
      url: Util.ajaxUrl + ':8003/admin/Advertise/index'
    })// 直接返回对象给页面调用
  },

  getVerison ({commit}, param) { // 获取线上版本号
    return vm.$api({
      method: 'get',
      url: Util.ajaxUrl + ':8991/business/getVerison' + Util.urlEncode(param, vm.$localStorage.get('TOKEN'))
    })
  },

  getTopShopList ({commit}, param) { // Today's concession shop
    // console.log('Util.ajaxUrl');
    // console.log(Util.ajaxUrl);
    return vm.$api({
      method: 'get',
      url: Util.ajaxUrl + ':8002/admin/getTopShopList' + Util.urlEncode(param, vm.$localStorage.get('TOKEN'))
    })// 直接返回对象给页面调用
  },

  getTopGoodsList ({commit}, param) { // Today's concession shop
    // console.log('Util.ajaxUrl');
    // console.log(Util.ajaxUrl);
    return vm.$api({
      method: 'get',
      url: Util.ajaxUrl + ':8002/ucenter/goods/getTopGoodsList' + Util.urlEncode(param, vm.$localStorage.get('TOKEN'))
    })// 直接返回对象给页面调用
  },

  getOrderList ({commit}, param) { // 订单的列表数据
    return vm.$api({
      method: 'get',
      url: Util.ajaxUrl + ':8002/ucenter/order/getOrderList' + Util.urlEncode(param, vm.$localStorage.get('TOKEN'))
    })// 直接返回对象给页面调用
  },

  // 专题页面
  getGoodsByTopClassId ({commit}, param) { // 订单的列表数据
    return vm.$api({
      method: 'get',
      url: Util.ajaxUrl + ':8002/ucenter/goods/getGoodsByTopClassId' + Util.urlEncode(param)
    })// 直接返回对象给页面调用
  },

  getFaceShopAndGoods ({commit}, param) { // Today's concession shop
  // console.log('Util.ajaxUrl');
  // console.log(Util.ajaxUrl);
    return vm.$api({
      method: 'get',
      url: Util.ajaxUrl + ':8002/ucenter/getFaceShopAndGoods' + Util.urlEncode(param)
    })// 直接返回对象给页面调用
  },

  // 购物车数量增减,true是加,false是减
  setLocalCount ({commit}, bool = true) {
    let count = Util.getLocal('count') || 0
    if (bool) {
      Util.setLocal(++count, 'count')
    } else {
      Util.setLocal(--count, 'count')
    }
    commit(types.CHANGE_COUNT)
  },

  // 网购物车列表添加数据
  addCarList ({commit}, res) {
    Util.setLocal(res, 'carList', true)
    commit(types.ADD_PRODUCT)
  },

  // 重新设置购物车商品列表,把打钩并提交的商品去掉,即保留unSelectedList

  resetCarList ({commit, getters}) {
    const unSelectedList = Util.getLocal('unSelectedList')
    Util.setLocal(unSelectedList, 'carList')
    commit(types.RESET_CARLIST)
  },
  // 重置购物车数量Count,即没打钩的商品的数量
  resetCount ({commit, getters}) {
    const count = Util.getLocal('unSelectedList').length
    Util.setLocal(count, 'count')
    commit(types.RESET_COUNT)
  },

  // 删除购物车列表的某一项 （用新的数组直接替换）
  cutCarList ({commit}, res) {
    Util.setLocal(res, 'carList')
    commit(types.RESET_CARLIST)
  },

  // 分别保存打钩的商品和为打钩的商品
  setSelectedList ({commit, getters}) {
    Util.setLocal(getters.selectedList, 'selectedList')
    commit('SET_SELECTEDLIST')
    Util.setLocal(getters.unSelectedList, 'unSelectedList')
    commit('SET_UNSELECTEDLIST')
  }

}

// 如同计算属性,处理state的某个状态
const getters = {

  selectedList (state) {
    // choseBool为真的商品 即打钩的商品
    if (state.carList !== '') {
      let arr = state.carList.filter((ele) => {
        return ele.choseBool === true
      })
      return arr
    }
  },

  unSelectedList (state) {
    if (state.carList !== '') {
      let arr = state.carList.filter((ele) => {
        return ele.choseBool === false
      })
      return arr
    }
  }

}

export default {
  state,
  actions,
  getters,
  mutations
}
