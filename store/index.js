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
}

export default {
  state,
  mutations,
  actions,
  getters,
}
