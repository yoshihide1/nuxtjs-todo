import getters from './getters.js'
import actions from './actions.js'
export const state = () => ({
  messages: [],
  sample: 'test',
})

export const mutations = {
  messageBox(state, messageData) {
    state.messages.push(messageData)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
