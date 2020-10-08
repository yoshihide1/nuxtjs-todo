import getters from './getters'
export default {
  postMessage({ commit }, message) {
    const postData = {
      id: getters.fetchId(),
      memo: message,
      date: getters.fetchDate(),
    }
    commit('messageBox', postData)
  },
}
