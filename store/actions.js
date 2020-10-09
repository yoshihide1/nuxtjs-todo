import { myFunc } from '../plugins/myFunc'
export default {
  postMessage({ commit }, message) {
    const postData = {
      id: myFunc.fetchId(),
      memo: message,
      date: myFunc.fetchDate(),
      isDone: false,
      checkBox: false,
    }
    commit('newMemo', postData)
  },
}
