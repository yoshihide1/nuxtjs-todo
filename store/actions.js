export default {
  postMessage({ commit, getters }, message) {
    const postData = {
      id: getters.fetchId,
      memo: message,
      date: getters.fetchDate,
    }
    commit('messageBox', postData)
  },
}
