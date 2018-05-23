import Util from '../../../../../util/common'
import Vue from 'vue'

let vm = new Vue({})

// action提交mutations，不直接更改状态（通过store.dispatch触发）
const actions = {

  goodsList_shop2 ({commit}, param) { // 获取商店信息
    return vm.$api({
      method: 'get',
      // url:Util.ajaxUrl+":8004/admin/front/getGoodsListByClass"+Util.urlEncode(param,vm.$localStorage.get('TOKEN')),
      url: Util.ajaxUrl + ':8002/ucenter/goods/getGoodsList' + Util.urlEncode(param, vm.$localStorage.get('TOKEN')),
      data: param
    })// 直接返回对象给页面调用
  }
}

export default {
  actions
}
