import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const M_PATH_PUSH = 'path:push'
export const M_PATH_POP = 'path:pop'
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
      state.path.push(payload)
    },
    [M_PATH_POP](state) {
      state.path.pop()
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
