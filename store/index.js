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

  doneLine(state, memo) {
    const index = state.messages.findIndex((message) => message.id === memo.id)
    if (state.messages[index].isDone) {
      state.messages[index].checkBox = false
      state.messages[index].isDone = false
    } else {
      state.messages[index].checkBox = true
      state.messages[index].isDone = true
    }
  },

  deleteAll(state) {
    state.messages = []
  },
}

export default {
  state,
  mutations,
  actions,
  getters,
}
