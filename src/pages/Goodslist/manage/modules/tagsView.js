const tagsView = {
  state: {
    visitedViews: [],
    cachedViews: []
  },
  mutations: {
    ADD_VISITED_VIEWS: (state, view) => {
      console.log('state.visitedViewsNONONONONONONONONONONONONONONONONONgoodlist', state.visitedViews)
      state.visitedViews.forEach(v => {
        if (v.path === view.path && +v.query.cid === +view.query.cid && +v.query.second === +view.query.second) {
          v.meta.position = view.meta.position
        }
      })
      if (state.visitedViews.some(v => v.path === view.path && +v.query.cid === +view.query.cid && +v.query.second === +view.query.second)) return
      state.visitedViews.push({
        name: view.name,
        path: view.path,
        title: view.meta.title || 'no-name',
        meta: view.meta || {},
        query: view.query
      })
      if (!view.meta.noCache) {
        state.cachedViews.push(view.name)
      }
    },
    ADD_VISITED_VIEWS6: (state, view) => {
      console.log('state.visitedViewsNONONONONONONONONONONONONONONONONONgoodlist666666666', state.visitedViews)
      console.log('view', view)
      state.visitedViews.forEach(v => {
        console.log('v', v)
        if (v.path === view.path && +v.query.cid === +view.query.cid && v.query.keyword === view.query.keyword) {
          v.meta.position = view.meta.position
          console.log('v.meta.position', v.meta.position)
        }
      })
      console.log('agoview', view)
      if (state.visitedViews.some(v => v.path === view.path && +v.query.cid === +view.query.cid && v.query.keyword === view.query.keyword)) {
        console.log('state.visitedViews', state.visitedViews)
        return
      } else {
        state.visitedViews.push({
          name: view.name,
          path: view.path,
          title: view.meta.title || 'no-name',
          meta: view.meta || {},
          query: view.query
        })
        console.log('state.visitedViews', state.visitedViews)
      }
      if (!view.meta.noCache) {
        state.cachedViews.push(view.name)
      }
    },
    DEL_VISITED_VIEWS: (state, view) => {
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          state.visitedViews.splice(i, 1)
          break
        }
      }
      for (const i of state.cachedViews) {
        if (i === view.name) {
          const index = state.cachedViews.indexOf(i)
          state.cachedViews.splice(index, 1)
          break
        }
      }
    },
    DEL_OTHERS_VIEWS: (state, view) => {
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          state.visitedViews = state.visitedViews.slice(i, i + 1)
          break
        }
      }
      for (const i of state.cachedViews) {
        if (i === view.name) {
          const index = state.cachedViews.indexOf(i)
          state.cachedViews = state.cachedViews.slice(index, i + 1)
          break
        }
      }
    },
    DEL_ALL_VIEWS: (state) => {
      state.visitedViews = []
      state.cachedViews = []
    },
    LOAD_VISITED_VIEWS: (state, views) => {
      state.visitedViews = views
      for (let i in views) {
        if (!views[i].meta.noCache) {
          state.cachedViews.push(views[i].name)
        }
      }
    }
  },
  actions: {
    addVisitedViews6 ({ commit }, view) {
      commit('ADD_VISITED_VIEWS6', view)
    },
    addVisitedViews ({ commit }, view) {
      commit('ADD_VISITED_VIEWS', view)
    },
    delVisitedViews ({ commit, state }, view) {
      return new Promise((resolve) => {
        commit('DEL_VISITED_VIEWS', view)
        resolve([...state.visitedViews])
      })
    },
    delOthersViews ({ commit, state }, view) {
      return new Promise((resolve) => {
        commit('DEL_OTHERS_VIEWS', view)
        resolve([...state.visitedViews])
      })
    },
    delAllViews ({ commit, state }) {
      return new Promise((resolve) => {
        commit('DEL_ALL_VIEWS')
        resolve([...state.visitedViews])
      })
    },
    loadVisitedViews ({commit}, views) {
      commit('LOAD_VISITED_VIEWS', views)
    }
  }
}

export default tagsView
