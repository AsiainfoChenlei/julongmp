import Vue from 'vue'
import Util from '../../../../../util/common'
let vm = new Vue({})

const state = {
  isLoading: false,
  canNext: true,
  currentPage: 1,
  pageSize: 10,
  cid: '',
  sid: 0,
  categoryid: '',
  categorys: [],
  results: [],
  options: [],
  scrollTop: 0,
  totalCount: 0
}

const getters = {
  isLoading: state => state.isLoading,
  canNext: state => state.canNext,
  cid: state => state.cid,
  categoryid: state => state.categoryid,
  results: state => state.results,
  categorys: state => state.categorys,
  currentPage: state => state.currentPage,
  options: state => state.options,
  pageSize: state => state.pageSize,
  sid: state => state.sid,
  scrollTop: state => state.scrollTop,
  totalCount: state => state.totalCount,
  store: state => state
}

const actions = {
  resetAll ({commit}) {
    commit('resetAll')
  },
  setScrollTop ({commit}, scrollTop) {
    commit('setScrollTop', scrollTop)
  },
  setSid ({commit}, sid) {
    commit('setSid', sid)
  },
  reLoadState ({commit}, param) {
    commit('setState', param)
  },
  async loadAtFirstPage (context, firstPage) {
    let requireSize = firstPage * 10
    if (context.state.totalCount < requireSize) {
      context.commit('setPageSize', requireSize)
      context.commit('setCurrentPage', 1)
      await context.dispatch('loadMoreData')
    }
  },
  async getAllCategorys ({dispatch, commit, state}, cid) {
    commit('setCid', cid)
    try {
      let res = await vm.$api({
        method: 'get',
        url: Util.ajaxUrl + ':8004/admin/business/getCircleFirstCategories' + Util.urlEncode({circle_id: cid})
      })
      commit('setCategorys', res.data.msg ? res.data.msg : [])
      let results = Array(res.data.msg.length).fill([]).filter(item => true)
      commit('setResults', results)
    } catch (error) {
      console.log(error)
      commit('setCategorys', [])
    }
  },
  async loadMoreData (context) {
    if (context.state.canNext && !context.state.isLoading) {
      context.commit('setIsLoading', true)
      let query = {circle_id: context.state.cid, now_page: context.state.currentPage, page_size: context.state.pageSize}
      try {
        let res = await vm.$api({
          method: 'get',
          url: Util.ajaxUrl + ':8004/admin/business/getShopsByCircleId' + Util.urlEncode(query)
        })
        let results = context.state.results
        context.state.categorys.map((item, index) => {
          let arr = res.data.msg.rows.filter(i => +i.cate_id === +item.id)
          // 去除重复值
          let fixed = arr.filter(j => results[index].length < 1 ? true : !(results[index].some(k => +k.id === +j.id)))
          results[index] = results[index].concat(fixed)
        })
        if (res.data.msg.rows.length > 0 && Array.isArray(results[0]) && results[0].length < 1) {
          // 可能需要重复一遍 多维数组遍历比较慢 卡线程
          context.state.categorys.map((item, index) => {
            let arr = res.data.msg.rows.filter(i => +i.cate_id === +item.id)
            let fixed = arr.filter(j => results[index].length < 1 ? true : !(results[index].some(k => +k.id === +j.id)))
            results[index] = results[index].concat(fixed)
          })
        }
        context.commit('setResults', results)
        if (res.data.msg.rows.length < context.state.pageSize) {
          context.commit('setCanNext', false)
        } else {
          context.commit('addPageCount')
        }
        context.commit('setIsLoading', false)
      } catch (error) {
        console.log(error)
      }
    }
  }
}

const mutations = {
  setState (state, rState) {
    state.isLoading = rState.isLoading
    state.canNext = rState.canNext
    state.currentPage = rState.currentPage
    state.pageSize = rState.pageSize
    state.cid = rState.cid
    state.sid = rState.sid
    state.categoryid = rState.categoryid
    state.categorys = rState.categorys
    state.results = rState.results
    state.scrollTop = rState.scrollTop
    state.totalCount = rState.totalCount
    state.options = rState.options
  },
  setSid (state, sid) {
    state.sid = sid
  },
  setScrollTop (state, scrollTop) {
    state.scrollTop = +scrollTop
  },
  setCategorys (state, results) {
    state.categorys = results
  },
  setCurrentPage (state, page) {
    state.currentPage = +page
  },
  setCid (state, cid) {
    state.cid = cid
  },
  setCategoryID (state, category) {
    state.categoryid = category
  },
  setCanNext (state, canNext) {
    state.canNext = canNext
  },
  setIsLoading (state, isLoading) {
    state.isLoading = isLoading
  },
  setPageSize (state, pageSize) {
    state.pageSize = +pageSize
  },
  setResults (state, results) {
    console.log(results)
    state.results = results.filter(item => Array.isArray(item))
    let i = 0
    results.map(item => {
      i += item.length
    })
    state.totalCount = i
  },
  addPageCount (state) {
    state.currentPage++
  },
  resetAll (state) {
    state.isLoading = false
    state.canNext = true
    state.currentPage = 1
    state.sid = 0
    state.pageSize = 10
    state.categoryid = ''
    state.categorys = []
    state.results = []
  },
  resetRequest (state) {
    state.isLoading = false
    state.canNext = true
    state.currentPage = 1
    state.pageSize = 10
    state.results = Array(state.categorys.length).fill([])
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
