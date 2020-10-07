import getters from './getters.js'
import actions from './actions.js'
export const state = () => ({
  messages: [],
  sample: 'test',
})

export const mutations = {
  messageBox(state, memo) {
    const postData = {
      message: memo,
      date: getters.fetchDate(),
    }
    state.messages.push(postData)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
