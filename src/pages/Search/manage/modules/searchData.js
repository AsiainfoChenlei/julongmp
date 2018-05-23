const state = {
  searchListData: {},
  route: {}
}
const getters = {
  searchListData: state => state.searchListData,
  route: state => state.route
}

const actions = {
  reloadSearchListData ({
    commit
  }, data) {
    commit('setSearchListData', data)
  },
  loadRoute ({
    commit
  }, route) {
    commit('setRoute', route)
  }
}

const mutations = {
  setSearchListData (state, data) {
    state.searchListData = data
  },
  setRoute (state, route) {
    state.route = route
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
