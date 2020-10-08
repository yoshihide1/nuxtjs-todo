import getters from './getters'
import actions from './actions'
export const state = () => ({
  messages: [],
  sample: 'test',
})

export const mutations = {
  newMemo(state, messageData) {
    state.messages.push(messageData)
  },

  memoBox(state, messageData) {
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
