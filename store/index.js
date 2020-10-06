import getters from './getters.js'
import actions from './actions.js'
export const state = () => ({
  messages: [],
})

export const mutations = {
  messageBox(state, memo) {
    state.messages.push(memo)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
