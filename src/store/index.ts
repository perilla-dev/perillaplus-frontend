import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const M_PATH_PUSH = 'path:push'
export const M_PATH_POP = 'path:pop'
export const M_PATH_REPLACE = 'path:replace'
export const M_LOGIN = 'user:login'
export const M_LOGOUT = 'user:logout'

export default new Vuex.Store({
  state: {
    title: 'Home',
    path: [{ text: 'Home', to: '/' }],
    userId: ''
  },
  mutations: {
    [M_PATH_PUSH](state, payload) {
      state.path.push({ ...payload, exact: true })
    },
    [M_PATH_POP](state) {
      state.path.pop()
    },
    [M_PATH_REPLACE](state, payload) {
      const i = state.path.findIndex(x => x.to === payload.to)
      state.path[i].text = payload.text
    },
    [M_LOGIN](state, payload) {
      state.userId = payload
    },
    [M_LOGOUT](state) {
      state.userId = ''
    }
  },
  actions: {},
  modules: {}
})
