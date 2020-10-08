import getters from './getters'
import actions from './actions'
export const state = () => ({
  messages: [],
  sample: 'test',
})

export const mutations = {
  messageBox(state, messageData) {
    state.messages.push(messageData)
  },

  newMessageBox(state, messageData) {
    state.messages = []
    state.messages = messageData
  },
}

export default {
  state,
  mutations,
  actions,
  getters,
}
